---
layout: post
title:  "Fast delegate invoke"
isPost: true
description: "Using IlGenerator for invoking delegates in a loop"
date:   2022-09-18 00:00:00 +0300
permalink: /fast-delegate-invoke
categories: csharp reflection il performance
color: orange
related: 
  - /asm-from-dynamic-method
---
# Problem
Do you want to invoke action million times? Delegates are slow - they cannot be inlined. Not inlined methods have a call overhead - jumps and reduntant data movement. Sure, you can just inline manually or replace delegates with methods, but there are a lot of boilerplate code.
<br/>
<br/>
However there are a trick. C# dynamic methods allow to generate IL code at runtime. You can emit call instruction using MethodInfo which will be inlined by compiler (or not - it's depends on size of method and compiler settings).

# Dynamic methods
## Instance Action<int>
Let's create method to call `Action<int>`
<br/>
<br/>
First, create instance:
{% highlight csharp %}
DynamicMethod meth = new("CallFun", typeof(void), new[] {typeof(int), typeof(object?)});
{% endhighlight %}
<br/>
Second, obtain IlGenerator:
{% highlight csharp %}
ILGenerator il = meth.GetILGenerator();
{% endhighlight %}
<br/>
And finally, emit IL code:
{% highlight csharp %}
il.EmitLdArg(1);                        // load instance
il.EmitLdArg(0);                        // load int argument
il.Emit(OpCodes.Call, original.Method); // call MethodInfo of delegate
il.Emit(OpCodes.Ret);                   // return;
{% endhighlight %}
<br/>
Let's invoke our dynamic method:
{% highlight csharp %}
Action<int,object?> generated = meth.CreateDelegate<Action<int,object?>>();
generated(7653, original.Target);
{% endhighlight %}

## Static Action<int>
If you have an error in previous section, that's probably because you used static methods.
All anonymous methods are instance (even if they have static modifier), but local functions and normal methods can be static.
<br/>
<br/>
You can check it using `original.Method.IsStatic`.
<br/>
To call static method, you don't need instance, so remove second argument:
{% highlight csharp %}
DynamicMethod meth = new("CallFun", typeof(void), new[] {typeof(int)});
ILGenerator il = meth.GetILGenerator();
il.EmitLdArg(0);                        // load int argument
il.Emit(OpCodes.Call, original.Method); // call MethodInfo of delegate
il.Emit(OpCodes.Ret);                   // return;
{% endhighlight %}

# Loops
Methods above are not so efficient - you just create another delegate that call's method. If you want to invoke original delegate in a loop efficiently - emit a loop in DynamicMethod.
<p class="notice--info">
    <i class="fa-solid fa-code notice-icon"></i> You can write required code and use Rider IL viewer to view il code you need to emit
</p>
The required code for `for (int i = 0; i < end; i++) {}` will be:
{% highlight csharp %}
// set end to 1000
IL_0000: ldc.i4       1000
IL_0005: stloc.0

// set i to 0
IL_0006: ldc.i4.0
IL_0007: stloc.1

// goto if (i >= end) break;
IL_0008: br.s         IL_0018
// start of loop
    // loop body
    // ...

    // i++
    IL_0014: ldloc.1      // i
    IL_0015: ldc.i4.1
    IL_0016: add
    IL_0017: stloc.1      // i

    // if (i >= end) break;
    IL_0018: ldloc.1      // i
    IL_0019: ldloc.0      // end
    IL_001a: blt.s        IL_000a
// end of loop
{% endhighlight %}
<br/>
So, our loop method will be:
{% highlight csharp %}
// setup
Action<int> original = i => Console.WriteLine($"[{i}] Hello!");
// the arguments are: (iterations, instance)
// iterations argument is not a argument from original delegate
DynamicMethod meth = new("CallFun", typeof(void), new[] {typeof(int), typeof(object)});
ILGenerator il = meth.GetILGenerator();

// init i
il.DeclareLocal(typeof(int));           // declare i
il.Emit(OpCodes.Ldc_I4_0);              // load 0 as int
il.Emit(OpCodes.Stloc_0);               // store to i
// define loop labels
Label testLabel = il.DefineLabel();
Label execLabel = il.DefineLabel();

// loop start
il.Emit(OpCodes.Br, testLabel);
il.MarkLabel(execLabel);
// loop body
il.Emit(OpCodes.Ldarg_1);               // load instance
il.Emit(OpCodes.Ldloc_0);               // load i
il.Emit(OpCodes.Call, original.Method);	// call
// i++
il.Emit(OpCodes.Ldloc_0);               // load i
il.Emit(OpCodes.Ldc_I4_1);              // load 1 as int
il.Emit(OpCodes.Add);
il.Emit(OpCodes.Stloc_0);               // store to i
// loop test (if (i < iterations) goto exec;)
il.MarkLabel(testLabel);
il.Emit(OpCodes.Ldloc_0)                // load i
il.Emit(OpCodes.Ldarg_0);               // load iterations
il.Emit(OpCodes.Blt, execLabel);        // goto exec if i < iterations

// return
il.Emit(OpCodes.Ret);

// complete and invoke
Action<int,object?> generated = meth.CreateDelegate<Action<int,object?>>();
generated(10, original.Target);
{% endhighlight %}

# Batches
<p class="notice--danger">
    <i class="fa-solid fa-microchip notice-icon"></i> Check instruction support before execution! Many processors doesn't support all of the instruction sets
</p>
JIT compiler doesn't vectorize code (like c++), but you can manually vectorize code using System.Runtime.Intrinsics:
{% highlight csharp %}
int iterations = 1000;
int batchSize = 4;
int end = iterations & ~(batchSize-1);
for (int i = 0; i < end; i+=batchSize) {
    // simd code
}
for (int i = end; i < iterations; i++) {
    // simple code
}
{% endhighlight %}

# Benchmarks
Formula:
- simple: `*v = 3 * *v`
- Sse41 : `*(Vector128<int>*)v = Sse41.MultiplyLow(i->extraData, *(Vector128<int>*)v)`

Setup:
- lib: Benchmark.Net
- cpu: AMD FX(tm)-8300
- logical cores: 8
- physical cores: 4
- OS: Arch linux
<p class="notice--info">
    <i class="fa-solid fa-arrows-up-down notice-icon"></i> This scale is logarithmic
</p>
<div>
  <canvas id="myChart"></canvas>
</div>
<script>
  const countLabels = [
    '10',
    '100',
    '1000',
    '10_000',
    '100_000',
    '1_000_000',
    '10_000_000',
  ];
  const typesLabels = [
    'delegate',
    'simple',
    'Sse41 simd (x4)',
    'DynamicMethod',
    'DynamicMethod Sse41 simd (x4)',
  ];

  const data = {
    labels: countLabels,
    datasets: [
        {
            label: 'Delegate',
            backgroundColor: '#ff456d',
            borderColor: '#ff456d',
            data: [24,231,2262,22857,225780,2277937,24112279],
        },
        {
            label: 'Simple',
            backgroundColor: '#ffae57',
            borderColor: '#ffae57',
            data: [15,122,1150,11682,116285,1183494,13382037],
        },
        {
            label: 'Sse41 simd (x4)',
            backgroundColor: '#ffd2a1',
            borderColor: '#ffd2a1',
            data: [9,74,687,6825,68566,687895,8862754],
        },
        {
            label: 'DynamicMethod',
            backgroundColor: '#455eff',
            borderColor: '#455eff',
            data: [27,258,1343,11984,111778,1082219,12365704],
        },
        {
            label: 'DynamicMethod Sse41 simd (x4)',
            backgroundColor: '#a1adff',
            borderColor: '#a1adff',
            data: [31,251,500,3429,31219,446669,9010925],
        },
    ]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'iterations'
                }
            },
            y: {
                type: 'logarithmic',
                format: {
                    style: 'unit',
                    unit: 'nanosecond',
                    unitDisplay: 'long'
                },
                title: {
                    display: true,
                    text: 'nanoseconds'
                }
            }
        }
    }
  };

  const myChart = new Chart(document.getElementById('myChart'),config);
</script>


