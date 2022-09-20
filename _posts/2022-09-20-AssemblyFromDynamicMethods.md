---
layout: post
title:  "Assembly from DynamicMethod"
isPost: true
description: "Get function pointer or view assembly of dynamic methods"
date:   2022-09-18 00:00:00 +0300
permalink: /asm-from-dynamic-method
categories: csharp reflection asm
color: orange
related: 
  - /fast-delegate-invoke
---
# Pointer
Pointers to methods/delegates can be obtained via `GetFunctionPointer()`in MethodInfo:
{% highlight csharp %}
IntPtr ptr = fun.Method.MethodHandle.GetFunctionPointer();
{% endhighlight %}
<br/>
But there are no such method in DynamicMethod. The solution is to call `method.GetMethodDescriptor()` instead. 
This method is internal, so use reflection:
{% highlight csharp %}
MethodInfo getMethodDescriptor = typeof(DynamicMethod).GetMethod("GetMethodDescriptor", BindingFlags.Instance | BindingFlags.NonPublic)!;
RuntimeMethodHandle handle = (RuntimeMethodHandle)getMethodDescriptor.Invoke(method, null)!;
IntPtr ptr = handle.GetFunctionPointer();
{% endhighlight %}
<br/>
You can now cast it to function pointer:
{% highlight csharp %}
delegate*<IterData<Vector128<uint>>*, int, object?, uint*, void> fnPtr = (delegate*<IterData<Vector128<uint>>*, int, object?, uint*, void>) ptr;
{% endhighlight %}

# Assembly
Obtained pointer points not just to metadata. This is a complete machine code. You can call it, pass to external dll or view assembly code!
<br/>
<br/>
To decode machine code you can use [Iced]:
{% highlight csharp %}
using UnmanagedMemoryStream mem = new((byte*)ptr, 1024);
StreamCodeReader reader = new(mem);
Decoder decoder = Decoder.Create(64, reader, (ulong) ptr);

foreach (Instruction instruction in decoder)
    Console.WriteLine(instruction);
{% endhighlight %}
<br/>
The result will be something like this:
{% highlight nasm %}
push rbp
vzeroupper
mov rbp,rsp
mov eax,esi
and eax,0FFFFFFFCh
xor edx,edx
test eax,eax
jle short 00007FECE4A40078h
mov [rdi],edx
mov r8d,edx
shl r8d,2
movsxd r8,r8d
add r8,rcx
vmovupd xmm0,[rdi+10h]
vpmulld xmm0,xmm0,[r8]
vmovupd [r8],xmm0
add edx,4
cmp edx,eax
jl short 00007FECE4A40052h
cmp eax,esi
jge short 00007FECE4A4009Ah
nop dword [rax]
mov [rdi],eax
mov edx,eax
shl edx,2
movsxd rdx,edx
add rdx,rcx
imul r8d,[rdx],37h
mov [rdx],r8d
inc eax
cmp eax,esi
jl short 00007FECE4A40080h
pop rbp
ret
{% endhighlight %}
Note that this method does not provide code length. You can use just a big number like 1024, but there are a chance for AccessViolationException to be thrown.

# Microsoft.Diagnostics.Runtime
You can use core dumps to get code (Microsoft.Diagnostics.Runtime nuget package):
{% highlight csharp %}
using DataTarget dataTarget = DataTarget.CreateSnapshotAndAttach(Process.GetCurrentProcess().Id);
ClrRuntime runtime = dataTarget.ClrVersions.Single().CreateRuntime();
string typeName = typeof(T).FullName ?? typeof(T).Name;
IEnumerable<ClrModule> modules = runtime.EnumerateModules().ToArray();

ClrType clrType = modules.Select(module => module.GetTypeByName(typeName)).First(t => t != null)!;
ClrMethod clrMethod = clrType.Methods.First(m => m.Signature == fun.Method.ToString());

ulong start = clrMethod.HotColdInfo.HotStart;
uint size = clrMethod.HotColdInfo.HotSize;

using UnmanagedMemoryStream mem = new((byte*)start, size);
StreamCodeReader reader = new(mem);
Decoder decoder = Decoder.Create(64, reader);
foreach (Instruction instruction in decoder)
    Console.WriteLine(instruction);
{% endhighlight %}
This method is slow, doesn't allow invoke of any methods and doesn't include dynamic methods. 
<br/>
If you using Linux, make sure that you dispose DataTarget (even if you in Debugger) - it's creating a complete core dump of a process and loading it to the ram. If you quit app, data will persist in memory - you will need to manually delete it in /tmp folder.

[Iced]: https://github.com/icedland/iced