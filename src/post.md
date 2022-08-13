---
title: Archive
layout: pagewt
---
# Search
{: .bold-title}

{% render "bridgetown_quick_search/search", placeholder: "Search", input_class: "search-input", snippet_length: 200 %}
# Archive
{: .bold-title}

<div id="search-results" class="post-list">

{% for post in collections.posts.resources %}
<div itemscope>
    <h2 class="post-title" itemprop="headline"><a href="{{ post.relative_url }}">{{ post.data.title }}</a></h2>
    {%- render "post_meta", page: post, site: site, home: "true" -%}
</div>
{% endfor %}

</div>
