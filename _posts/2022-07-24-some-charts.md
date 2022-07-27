---
layout: post
title:  "SomeCharts"
description: "SomeCharts library"
date:   2022-07-24 17:32:00 +0300
permalink: /some-charts
categories: data csharp opengl avalonia
---
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script type="text/javascript" id="MathJax-script" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js">
</script>

{: .notice--success}
This website is open source. Code is available on <br/>
[https://github.com/firedef/SomeCharts][Source]
{: .notice--success}

{: .notice--warning}
The library is not in the release state. Some functionality can be changed, some hardcoded and some bugs may appear.
{: .notice--warning}

{% include toc %}


## Description
SomeCharts is a fast cross-platform C# library for data visualisation. Current backend uses Avalonia and OpenGl, but can been ported to any environment.


## Problem
There are some alternative libraries:
- [ScottPlot][ScottPlot]
- [OxyPlot][OxyPlot]
- [LiveCharts2][LiveCharts]

But all of them have different downsides. For example, they are extremely slow. So i'm tried to make possible to plot huge amount of data.

SomeCharts is using (almost) raw OpenGl. All charts are constructing to meshes which can be rendering very efficiently. Levels of detalisation and 2D frustum culling removes non-visible elements. Lot's of code is *unsafe* (pointers, stack allocations, etc.) which reduces garbage.


## Text rendering
SomeCharts uses custom text rendering. Library **FreeType** uses for texture generation from font chars. Generated textures are packed into texture atlases to reduce state changes (improve performance).

normal text | text mesh
![image-left]({{ '/images/../../../images/SomeCharts/text.png' | absolute_url }}){: .align-left} | ![image-right]({{ '/images/../../../images/SomeCharts/textMesh.png' | absolute_url }}){: .align-right}

![image-left]({{ '/images/../../../images/SomeCharts/textSmall.png' | absolute_url }}){: .align-left} | 2.7mb Utf-8 text file (**2.7 million characters!**). The most of text are not fitting to screen. Rendering at almost 60 fps and mesh building in ~5 sec. No downscales or levels of detalisations are using in text rendering

![image-left]({{ '/images/../../../images/SomeCharts/textBig.png' | absolute_url }}){: .align-left} | SDF rendering preserve detail on big scale. The resolution is equal or less then 32x32 per character. There are no pixels, but text can looks wry on small resolutions.

Unicode and different fonts is supported. Texture atlas is dynamic so chars are adding on demand. When atlas overflowing, new atlas creates.

Signed distance field text shaders are complicated. Simple SDF rendering:
{% highlight glsl %}
float sample(vec2 coord, float gammaAdd) {
	float dist = texture2D(texture0, coord).r - u_gamma - gammaAdd;
	return gain(dist / fwidth(dist) + u_gamma + gammaAdd, 2);
}
{% endhighlight %}
There are LCD (subpixel) attempt. LCD samples text on subpixels of screen. LCD rendering can be toggle by key \[L\]. Current version increases contrast, but result looks ugly in some cases.
Full text shader can be found here: [fragment][TextShaderFrag] and [vertex][TextShaderVert]


## Charts
### [Line chart:][LineChart]

Simple line chart | 10K different lines at runtime (~5 fps)
![image-left]({{ '/images/../../../images/SomeCharts/lineChart.png' | absolute_url }}){: .align-left} | ![image-right]({{ '/images/../../../images/SomeCharts/10000LinesAtRuntime.png' | absolute_url }}){: .align-right}

### [Pie chart:][PieChart]

Dark theme | Light theme
![image-left]({{ '/images/../../../images/SomeCharts/pieChart.png' | absolute_url }}){: .align-left} | ![image-right]({{ '/images/../../../images/SomeCharts/pieChartLight.png' | absolute_url }}){: .align-right}

### [Scatter chart:][ScatterChart]

![image-left]({{ '/images/../../../images/SomeCharts/scatterChart.png' | absolute_url }}){: .align-left} | Render items with different shapes, sizes, colors and positions

### [Heatmap:][HeatMap]

![image-left]({{ '/images/../../../images/SomeCharts/heatmap.png' | absolute_url }}){: .align-left} | Renders cells at different meshes to handle lot's of vertices and support multithreading.

### [Mesh:][MeshRenderer]

![image-left]({{ '/images/../../../images/SomeCharts/monkey.png' | absolute_url }}){: .align-left} | SomeCharts can render mesh from `.obj` files


## Data
SomeCharts uses [interfaces][DataInterfaces] to handle different data types. By default, data can be applied as functions, arrays, ienumerable and constants.
{% highlight csharp %}
const int lineLength = 81920;
IChartData<float> data = new FuncChartData<float>(j => LineChartFunc(j, i * 10), lineLength);
IChartData<indexedColor> colors = new ConstChartData<indexedColor>(color);
LineChart chart = canvas.AddLineChart(data, colors);
{% endhighlight %}


## Examples
Examples can be found [there][Examples]

[Source]: https://github.com/firedef/SomeCharts
[ScottPlot]: https://github.com/scottplot/scottplot
[OxyPlot]: https://github.com/oxyplot/oxyplot-avalonia
[LiveCharts]: https://github.com/beto-rodriguez/LiveCharts2
[TextShaderFrag]: https://github.com/firedef/SomeCharts/blob/master/SomeChartsUiAvalonia/data/shaders/text.frag
[TextShaderVert]: https://github.com/firedef/SomeCharts/blob/master/SomeChartsUiAvalonia/data/shaders/text.vert

[LineChart]: https://github.com/firedef/SomeCharts/blob/master/SomeChartsUi/src/elements/charts/line/LineChart.cs
[PieChart]: https://github.com/firedef/SomeCharts/blob/master/SomeChartsUi/src/elements/charts/pie/PieChart.cs
[ScatterChart]: https://github.com/firedef/SomeCharts/blob/master/SomeChartsUi/src/elements/charts/scatter/ScatterChart.cs
[HeatMap]: https://github.com/firedef/SomeCharts/blob/master/SomeChartsUi/src/elements/charts/heatmap/HeatmapChart.cs
[MeshRenderer]: https://github.com/firedef/SomeCharts/blob/master/SomeChartsUi/src/elements/other/MeshRenderer.cs

[DataInterfaces]: https://github.com/firedef/SomeCharts/tree/master/SomeChartsUi/src/data

[Examples]: https://github.com/firedef/SomeCharts/tree/master/SomeChartsAvaloniaExamples/src