---
layout: page
permalink: /
disable-navigation: true
disable-center: true
---
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script type="text/javascript" id="MathJax-script" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js">
</script>

<div class="home-page-main waypoint">
  <div class="entries-list reveal">
      <h1 class="home-page-label firedef">firedef</h1>
      {% include navigation.html %}
      {% include links.html %}
  </div>
</div>

<div class="home-page-projects waypoint">
  <h1 class="home-page-label projects">projects</h1>
  <div class="entries-list reveal">
      {% include projects.html %}
  </div>
</div>

<div class="home-page-posts waypoint">
  <h1 class="home-page-label posts">posts</h1>
  <div class="entries-list reveal">
      {% include posts.html %}
  </div>
</div>

<div class="home-page-other waypoint">
  <div class="entries-list reveal">
      <h1 class="home-page-label other loader unloaded">🤨</h1>
  </div>
</div>

<div class="home-page-end waypoint">
</div>