---
layout: simple
title:  "Projects"
description: "My projects"
permalink: /projects
disableTitleInPost: true
pageWip: true
---

<div class="entries-list entries-list-in-page">
    <h1>0:</h1>
    {% assign entry = site.posts | where:"url", "/astrus" | first %}
    {% include postEntry.html %}

    <h1>1:</h1>
    {% assign entry = site.posts | where:"url", "/some-charts" | first %}
    {% include postEntry.html %}
</div>