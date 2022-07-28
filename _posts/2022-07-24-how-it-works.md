---
layout: post
title:  "How this site works"
description: "This website is based on jekyll, so simple theme and hosted by Github..."
date:   2022-07-24 15:05:00 +0300
permalink: /posts/how-it-works
categories: web
image:
  thumbnail: /images/Thumbnails/HowItWorksThumb.png
---
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script type="text/javascript" id="MathJax-script" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js">
</script>

{: .notice}
Run local: `bundle exec jekyll serve` <br/>
Compile sass: `sass --watch sass/custom.scss sass/custom.css` <br/>
Update gemfile: `bundle install` <br/>
{: .notice}

{: .notice--success}
This website is open source. Code is available on <br/>
[https://github.com/firedef/firedef.github.io][Source]
{: .notice--success}

{% include toc %}

## Dependencies
This website is based on [jekyll][Jekyll], [so simple theme][SoSimple] and hosted by Github. Jekyll is a website generator using **markdown** files.

## Customization
Colors are custom and defined in [custom.scss][CustomScss]. There are small style tweaks in [scss][Scss].
Scss can been compiled by `sass --watch sass/custom.scss sass/custom.css`. `--watch` flag will recompile files on changes.

## Build, deploy and access
All site can be build and launch locally by `bundle exec jekyll serve`. It will also rebuild all changed files without server restart.
Jekyll is using rubby. All changes in [gemfile][GemFile] must been applied using `bundle install`.

Local website can be accessed on [`http://localhost:4000/`][LocalAddress] if `bundle exec jekyll serve` is running.
Global version will be deployed automatically by Github to [`https://firedef.github.io/`][GlobalAddress].

## MathJax
MathJax can be used for LaTex rendering. 
If so, following script must been added on top of file with math: 
{% highlight markdown %}
---
layout: ...
title:  ...
date:   ...
categories: ...
---
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script type="text/javascript" id="MathJax-script" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js">
</script>
{% endhighlight %}
For example, `$$x = {\frac{1}{n^{2}}}$$` will be rendered as $$x = {\frac{1}{n^{2}}}$$. All formula must be surrounded with `$$`. To prevent rendering, you can surround formula with `` ` ``.

[Jekyll]: https://jekyllrb.com/
[SoSimple]: https://github.com/mmistakes/so-simple-theme
[CustomScss]: https://github.com/firedef/firedef.github.io/blob/main/sass/custom.scss
[Scss]: https://github.com/firedef/firedef.github.io/blob/main/sass/
[GemFile]: https://github.com/firedef/firedef.github.io/blob/main/Gemfile
[LocalAddress]: http://localhost:4000/
[GlobalAddress]: https://firedef.github.io/
[Source]: https://github.com/firedef/firedef.github.io