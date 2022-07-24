---
layout: post
title:  "How this site works"
date:   2022-07-24 15:05:00 +0300
categories: web
---

{: .notice}
Run local: `bundle exec jekyll serve` <br/>
Compile sass: `sass --watch sass/custom.scss sass/custom.css` <br/>
Update gemfile: `bundle install` <br/>
Source: [`https://github.com/firedef/firedef.github.io`][Source]
{: .notice}

{: .notice--success}
This website is open source. Code is available on <br/>
[https://github.com/firedef/firedef.github.io][Source]
{: .notice--success}

This website is based on [jekyll][Jekyll], [so simple theme][SoSimple] and hosted by Github. Jekyll is a website generator from markdown files.

Colors are custom and defined in [custom.scss][CustomScss]. There are other small style tweaks in [sass][Sass].
Scss can been compiled by `sass --watch sass/custom.scss sass/custom.css`. `--watch` flag will recompile files on changes.

All site can be build and launch locally by `bundle exec jekyll serve`. It will also rebuild all changed files without server restart.
Jekyll is using rubby. All changes in [gemfile][GemFile] must been applied using `bundle install`.

Local website can be accessed on [`http://localhost:4000/`][LocalAddress] if `bundle exec jekyll serve` is running.
Global version will be deployed automatically by Github to [`https://firedef.github.io/`][GlobalAddress].

This site is open source: [`https://github.com/firedef/firedef.github.io`][Source]

[Jekyll]: https://jekyllrb.com/
[SoSimple]: https://github.com/mmistakes/so-simple-theme
[CustomScss]: https://github.com/firedef/firedef.github.io/blob/main/sass/custom.scss
[Sass]: https://github.com/firedef/firedef.github.io/blob/main/sass/
[GemFile]: https://github.com/firedef/firedef.github.io/blob/main/Gemfile
[LocalAddress]: http://localhost:4000/
[GlobalAddress]: https://firedef.github.io/
[Source]: https://github.com/firedef/firedef.github.io