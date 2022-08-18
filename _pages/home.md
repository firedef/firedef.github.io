---
layout: page
permalink: /
disable-center: true
---
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script type="text/javascript" id="MathJax-script" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js">
</script>

<div class="home-page-main">
  <div class="entries-list reveal">
      <h1 class="home-page-label firedef">firedef</h1>
      <div class="horizontal-container">
        <a class="card home-page-button" href="https://github.com/firedef"><i class="fab fa-github noHover home-page-button-icon"></i></a>
        <a class="card home-page-button" href="mailto://firedef2019@gmail.com"><i class="fa-solid fa-envelope-open-text noHover home-page-button-icon"></i></a>
        <a class="card home-page-button" href="https://t.me/firedef"><i class="fab fa-telegram-plane noHover home-page-button-icon"></i></a>
        <a class="card home-page-button" href="https://www.linkedin.com/in/dmitriy-nosov-06b76221b"><i class="fab fa-linkedin noHover home-page-button-icon"></i></a>
      </div>
  </div>
</div>

<div class="home-page-projects">
  <h1 class="home-page-label projects">projects</h1>
  <div class="entries-list reveal">
      {% include projects.html %}
  </div>
</div>

<div class="home-page-posts">
  <h1 class="home-page-label posts">posts</h1>
  <div class="entries-list reveal">
      {% include posts.html %}
  </div>
</div>

<div class="home-page-other">
  <div class="entries-list reveal">
      <h1 class="home-page-label other">other</h1>
  </div>
</div>

<div class="home-page-end">
</div>