---
layout: page
title:  "Posts"
description: "Posts"
permalink: /posts
disableTitleInPost: true
posts_limit: 1000
disable-center: true

body-background:
    - src: /images/Backgrounds/General/Dots/1.svg
      parallax: 1
    - src: /images/Backgrounds/General/Dots/2.svg
      parallax: 2
    - src: /images/Backgrounds/General/Dots/3.svg
      parallax: 3
    - src: /images/Backgrounds/General/Dots/4.svg
      parallax: 4     

extra:
  style:
    page-body-background: "opacity: 0.1;"
---

<div class="waypoint">
  <h1 class="home-page-label posts">posts</h1>
  <div class="entries-list reveal">
      {% include posts-ext.html %}
  </div>
</div>