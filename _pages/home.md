---
layout: page
permalink: /
---
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script type="text/javascript" id="MathJax-script" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js">
</script>

# My posts:
---
<div class="entries-{{ page.entries_layout | default: 'list' }}">
  {%- if site.plugins contains 'jekyll-paginate' and page.paginate or site.gems contains 'jekyll-paginate' and page.paginate -%}
    {% include posts-paginated.html %}
  {%- else -%}
    {% include posts-limit.html %}
  {%- endif -%}
</div>