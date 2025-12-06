---
title: Archive
layout: pagewt
paginate:
  collection: posts
  per_page: 20
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
{% for post in paginator.resources %}
<div class="post-list borderl">
    <h2 class="post-title" itemprop="headline"><a href="{{ post.relative_url }}">{{ post.data.title }}</a></h2>
    {%- render "post_meta", page: post, site: site, home: "true" -%}
</div>
{% endfor %}
</aside>

{% if paginator.total_pages > 1 %}
<nav class="pagination" aria-label="Archive pagination">
  <ul class="pagination-list">
    {% if paginator.previous_page %}
    <li class="pagination-item">
      <a href="{{ paginator.previous_page_path }}" class="pagination-link pagination-prev">← Newer</a>
    </li>
    {% endif %}
    
    <li class="pagination-item pagination-info">
      Page {{ paginator.page }} of {{ paginator.total_pages }}
    </li>
    
    {% if paginator.next_page %}
    <li class="pagination-item">
      <a href="{{ paginator.next_page_path }}" class="pagination-link pagination-next">Older →</a>
    </li>
    {% endif %}
  </ul>
</nav>
{% endif %}
</div>
