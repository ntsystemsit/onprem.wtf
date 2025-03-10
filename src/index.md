---
layout: default
---

## Welcome
{: .bold-title}

**{{ site.metadata.title }}** is the evolution of ntsystems.it. It contains a complete [archive]({% link post.md %}) of the old site as well as new content. 

Just like the old site, this site is **free**. There are no trackers, no ads, no cookies. ~~We use a service worker to store pages you visited in your browser's cache storage. That makes the site [installable](https://web.dev/discover-installable/), [fast]({% link _posts/2021-01-16-why-is-this-website-fast.md %}), and it will continue to work even if you're offline.~~

## Popular Tags
{: .bold-title}

Since 2009 we have written {{ collections.posts.resources.size }} posts. You can browse our more popular topics below or find [all tags](/tags) in the menu above.

{% assign tags_max = 0 %}
{% for tag in site.tags %}
    {% if tag[1].size > tags_max %}
    {% assign tags_max = tag[1].size %}
    {% endif %}
{% endfor %}

<ul class="tagscontainer">
{%- for i in (1..tags_max) reversed -%}
{%- for tag in site.tags -%}
{% if tag[1].size == i and tag[1].size > 4 %}
<li class="tag"><a href="/tags/{{ tag[0] | downcase }}">{{ tag[0] }}</a><span class="float-right">{{ i }}</span></li>
{% endif %}
{%- endfor -%}
{%- endfor -%}
</ul>

## Recent Posts
{: .bold-title}

<aside class="postscontainer">
    {% for post in collections.posts.resources limit:3 %}
    <div class="post-list borderl">
        <h2 class="post-title"><a href="{{ post.relative_url }}">{{ post.data.title }}</a></h2>
        {% if post.excerpt %}{{ post.excerpt }}{% else %}{{ post.summary }}{% endif %}
    </div>
    {%- endfor -%}
</aside>

## Archive
{: .bold-title}

You can find an archive of all posts here: [Archive]({% link post.md %})
