---
title: PowerShell
layout: pagewt
---

# Modules
{: .bold-title}

<div class="gridcontainer">
    {%- for post in collections.Modules.resources -%}
    <div class="post-list borderl">
        <h2 class="post-title"><a href="{{ post.relative_url }}">{{ post.data.title }}</a></h2>
        {{ post.summary }}
    </div>
    {%- endfor -%}
</div>

# Scripts
{: .bold-title}

<div class="gridcontainer">
    {%- for post in collections.Scripts.resources -%}
    <div class="post-list borderl">
        <h2 class="post-title"><a href="{{ post.relative_url }}">{{ post.data.title }}</a></h2>
        {{ post.summary | strip_html }}
    </div>
    {%- endfor -%}
</div>