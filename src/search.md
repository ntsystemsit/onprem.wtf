---
title: Find
layout: pagewt
---

<div class="search-overlay" id="search-overlay"></div>
<div class="search-focus-container search-focus-standalone" id="search-container">
  <div class="search-focus-inner">
    <h1 class="search-focus-title">Find anything</h1>
    <p class="search-focus-hint">Search posts, tags, and PowerShell documentation</p>
    {% render "bridgetown_quick_search/search", placeholder: "Start typing to search…", input_class: "search-input search-focus-input", snippet_length: 400 %}
  </div>
</div>
