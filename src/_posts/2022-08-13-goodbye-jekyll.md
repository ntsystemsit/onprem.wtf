---
title: "Goodbye Jekyll, hello Bridgetown!"
author: tto
tags: Jekyll
---

We have been using Jekyll for our little site since 2016. It was fast, simple, it did it's job nicely. [Bridgetown](https://www.bridgetownrb.com/) does all the same things, and much more. It's Jekyll's modern cousin.

We have used GitHub pages to host our site as it integrates nicely with Jekyll. I have long wanted to play with Cloudflare pages, so I decided to upgrade the site and move it over to Cloudflare in the progress.

# How to run Bridgetown on Cloudflare pages?

Well, it's easy enough, we just have to things to consider:

1. Include a `.node-version` file because Cloudflare pages defaults to `12.18.0` and bridgetown requires a version newer than `14`
2. Set the `BRIDGETOWN_ENV` environment variable to `production`

To tell Cloudflare pages to use a newer version of node, I created the file `.node-version` with the content `16.16.0` in the root directory of my repository. Just like with Jekyll, the base is a GitHub repository. All that's left to do is sign in to [Cloudflare](https://dash.cloudflare.com) and create a new pages project. I sign in to my GitHub account from Cloudflare, select the repository and enter the following information:

Build command: `bin/bridgetown deploy`
Build output directory: `output`
Environment variable: `BRIDGETOWN_ENV`  `production`

Done.

# Cloudflare redirects

We have used Jekyll's `jekyll-redirect-from` plugin to create redirects for some URLs. It seems bridgetown does not yet have a [plugin](https://www.bridgetownrb.com/plugins) for that, so I used Cloudflare page's `_redirect` file instead. I created a file with the name `_redirect` in the `src` folder of my bridgetown project. The content of the file is like this:

```text
/a/very/long/url/path /shorturl 301
```

You can read more in the [docs](https://developers.cloudflare.com/pages/platform/redirects/)

I used the following few lines of powershell code to find Jekyll's `redirect_from` statements in my source folder, convert them into slugs, and add them to the `_redirect` file.

```powershell
Get-ChildItem ./src/ -Recurse -Filter *.md | Select-String -pattern "redirect_from" | ForEach-Object {
    $p = $_.path
    $n = $_.filename
    $l = $_.line
    # remove date and extension from filename as slug contains neither
    if($n -match "^\d{4}-"){
        $n = $n -replace "\d{4}-\d{2}-\d{2}-","" 
    }
    $n = $n -replace ".md",""
    $name = $n.ToLower()

    # find parent path and create slug
    $p = Split-Path -Path $p -Parent | Split-Path -Leaf
    switch($p){
        "_OnlineHelp" { $slug = "/powershell/$name" }
        "Archive" { $slug = "/post/$name" }
        "_Modules" { $slug = "/powershell/$name" }
        "_Scripts" { $slug = "/powershell/$name" }
        "_posts" { $slug = "/post/$name" }
    }

    # write _redirects file
    $l -replace "redirect_from: ","" | ConvertFrom-Json | ForEach-Object {
        "$_ $slug 301"
    } 
} | Set-Content ./src/_redirects
```
