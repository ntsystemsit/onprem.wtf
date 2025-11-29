---
title: Archive
layout: pagewt
---

<div class="search-overlay" id="search-overlay"></div>
<div class="search-focus-container" id="search-container">
  <div class="search-focus-inner">
    <h1 class="search-focus-title">Search the Archive</h1>
    {% render "bridgetown_quick_search/search", placeholder: "Start typing to search…", input_class: "search-input search-focus-input", snippet_length: 200 %}
  </div>
</div>

<div class="page-content" id="page-content">
<h1 class="bold-title">Archive</h1>

<aside class="postscontainer">
{% for post in collections.posts.resources %}
<div class="post-list borderl">
    <h2 class="post-title" itemprop="headline"><a href="{{ post.relative_url }}">{{ post.data.title }}</a></h2>
    {%- render "post_meta", page: post, site: site, home: "true" -%}
</div>
{% endfor %}
</aside>
</div>
