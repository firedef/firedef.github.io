---
layout: post
title:  "Elliptical orbits are hard"
description: "Time function for elliptical orbits"
date:   2022-08-01 14:50:00 +0300
categories: csharp unity astrus astronomy
permalink: /posts/elliptical-orbits
image:
  thumbnail: /images/Thumbnails/EllipticalOrbitsThumb.png
---
{% include math %}

# Elliptical orbits
My game, i'm working on, uses circular orbits. They are really easy to compute and maintain. But they, well... circular. I want to add stretched orbits for some objects. So i made a little research about how they works. By now i only need time function, so in this article i will present equations and code required to achive it.

Elliptical orbit is an orbit with eccentricity in range 0-1. Elliptical orbits also include circular orbits (eccentricity = 0).

The problem with elliptical orbits, is ecentricity. Eccentricity determines how much orbit deviates from circular orbit. 0 for circular, 1 for parabolic trajectory and >1 for hyperbolic trajectory. 

Elliptical can't been described with $$\displaystyle{ \frac {x^{2}}{a^{2}}}+{\frac {y^{2}}{b^{2}}}=1$$ like ellipse - gravity is not linear and affects velocity differently at different points.

# Minor, major axis and eccentricity
Semi major axis: <br/>
$$\displaystyle a={\frac {r_{\text{max}}+r_{\text{min}}}{2}}$$
{% highlight csharp %}
public float semiMajorAxis => (aphelion + perihelion) * .5f;
{% endhighlight %}

Semi minor axis: <br/>
$$\displaystyle b={\sqrt {r_{\text{max}}r_{\text{min}}}}$$
{% highlight csharp %}
public float semiMinorAxis => math.sqrt(aphelion * perihelion);
{% endhighlight %}

Eccentricity: <br/>
$$\displaystyle e={\sqrt {1-{\frac {b^{2}}{a^{2}}}}}$$
{% highlight csharp %}
public float eccentricity => 
  math.sqrt(1 - (aphelion * perihelion) / (semiMajorAxis * semiMajorAxis));
{% endhighlight %}

[https://en.wikipedia.org/wiki/Semi-major_and_semi-minor_axes][SemiMajorAndSemiMinorAxis]


# Orbital period
Orbital period is the amount of time required to complete one orbit turn. For example, Earth have orbital period equal to 1 year, Mercury - 0.24 years and Neptune - 164.8 years.

Orbital period can be calculated as: <br/>
$$\displaystyle T=2\pi\sqrt{a^3\over{\mu}}$$
where:
- $$\mu$$ - standard gravitational parameter
- a - semi-major axis

I don't use gravitational parameters in my orbit class, so my formula will be:
{% highlight csharp %}
public override float orbitalPeriod => 
  2 * math.PI * 
  math.sqrt(semiMajorAxis * semiMajorAxis * semiMajorAxis) / orbitalSpeed;
{% endhighlight %}

# Polar coordinates
Polar coordinated are an easy way to work with round objects. They require angle and radius from heliocentric center. Heliocentric coordinates using Sun as a center. Angle in heliocentric polar coordinates will be [true anomaly][TrueAnomaly].

There are 3 types of anomalies:
- [Mean][MeanAnomaly] (elapsed angle on circular orbit with same orbital period, if body moving at constant speed)
- [Eccentric][EccentricAnomaly] (elapsed angle on circular orbit with same orbital period)
- [True anomaly][TrueAnomaly] (angle from sun to body)

To find true anomaly, we need to find mean anomaly and then eccentric anomaly.

## Mean anomaly
Mean anomaly is a linear function. We just need to divide time by orbital period <br/>
$$\displaystyle M=\frac{2\pi t}{T}$$
{% highlight csharp %}
public float meanMotion => 2 * math.PI / orbitalPeriod;
public double MeanAnomaly(Time time) => meanMotion * time.seconds;
{% endhighlight %}

## Eccentric anomaly
Eccentric anomaly is pretty simple: <br/>
$$\displaystyle M=E-e\sin E$$

But this is a *fun* part: We need to calculate $$E$$ in equation, which doesn't have closed-form solution.

Simple equation above become not so simple: <br/>
$$\displaystyle E=M+2\sum _{n=1}^{\infty }{\frac {J_{n}(ne)}{n}}\sin(nM)$$

$$J_{n}(x)$$ is the Bessel function: <br/>
$$\displaystyle J_{n}(x)=\sum _{m=0}^{\infty }{\frac {(-1)^{m}}{m!\Gamma (m+\alpha +1)}}{\left({\frac {x}{2}}\right)}^{2m+\alpha }$$ <br/>
I took C# bessel implementation from [here][BesselSrc].

{% highlight csharp %}
public double EccentricAnomaly(Time time) {
    double fEccentricity = eccentricity;     // e
    double fMeanAnomaly = MeanAnomaly(time); // M
    fMeanAnomaly %= math.PI * 2; // anomalies are angles, normalize to save precision
    
    double sum = 0;
    
    const int iter = 32;
    for (int i = 1; i <= iter; i++) {   
        double bessel = Bessel.J(i, i * fEccentricity);
        sum += bessel / i * math.sin(i * fMeanAnomaly);
    }

    double eccentricAnomaly = fMeanAnomaly + 2 * sum;
    return eccentricAnomaly;
}
{% endhighlight %}

## True anomaly
True anomaly is just a <br/>

{% highlight csharp %}
2 * math.atan(math.sqrt((1 + eccentricity) / (1 - eccentricity)) * 
    math.tan(eccentricAnomaly * .5));
{% endhighlight %}

## Radius
{% highlight csharp %}
public double RadiusFromEccentricAnomaly(double eccentricAnomaly) => 
  semiMajorAxis * (1 - eccentricity * math.cos(eccentricAnomaly));
{% endhighlight %}

## Position
{% highlight csharp %}
public override float2 GetPosition(Time time) {
    double eccentricAnomaly = ParallelEccentricAnomaly(time);
    double angle = TrueAnomalyFromEccentricAnomaly(eccentricAnomaly);
    double radius = RadiusFromEccentricAnomaly(eccentricAnomaly);

    return new((float)(math.sin(angle) * radius), (float)(math.cos(angle) * radius));
}
{% endhighlight %}

# Precision of coordinates
You can control performance and precision by changing iterations in eccentric anomaly calculation. Orbits with high eccentricity require more iterations.

$$\displaystyle StdDev(1-\frac{M}{E-\epsilon\sin{E}}) $$, $$ e \approx 0.97 $$ <br/>

| Iterations | 2       | 4      | 8      | 16     | 32    | 64    | 128   | 256   | 512   | 1024  | 2048  | 4096  |
|------------|---------|--------|--------|--------|-------|-------|-------|-------|-------|-------|-------|-------|
| StdDev     | 167.95% | 89.54% | 42.43% | 17.15% | 4.99% | 0.74% | 0.36% | 0.09% | 0.01% | 0.00% | 0.00% | 0.00% |

I'm using 32 iterations. It's fine if orbit is not so stretched. 

Equation is not linear because of Bessel function:
{% highlight csharp %}
m = 2 * ((n + (int)math.sqrt(40.0 * n)) / 2);
for (j = m; j > 0; j--) {...}
{% endhighlight %}

# Multithreading
$$\sum$$ can be easly parallelized. It's a great place to use Unity job system. Note that job version have lot's of allocations, which can be avoided in different scenarios.

| Type   | Basic  | Jobs  |
|--------|--------|-------|
| time   | 1539ms | 188ms |
| orbits | 100k   | 100k  |
| iter   | 32     | 32    |

{% highlight csharp %}
[BurstCompile]
public struct EccentricAnomalyJob : IJobParallelFor {
    [WriteOnly] public NativeArray<double> results;
    [ReadOnly] public NativeArray<double> eccentricity;
    [ReadOnly] public NativeArray<double> meanAnomaly;
    public int iterations;

    public void Execute(int index) {
        int bodyIndex = index / iterations;
        int i = (index % iterations) + 1;
        
        double bessel = Bessel.J(i, i * eccentricity[bodyIndex]);
        results[index] = bessel / i * math.sin(i * meanAnomaly[bodyIndex]);
    }
}
{% endhighlight %}

[SemiMajorAndSemiMinorAxis]: https://en.wikipedia.org/wiki/Semi-major_and_semi-minor_axes
[MeanAnomaly]: https://en.wikipedia.org/wiki/Mean_anomaly
[EccentricAnomaly]: https://en.wikipedia.org/wiki/Eccentric_anomaly
[TrueAnomaly]: https://en.wikipedia.org/wiki/True_anomaly
[WikipediaPositionAsFunctionOfTime]: https://en.wikipedia.org/wiki/Kepler%27s_laws_of_planetary_motion
[BesselSrc]: https://github.com/accord-net/framework/blob/master/Sources/Accord.Math/Functions/Bessel.cs#218
