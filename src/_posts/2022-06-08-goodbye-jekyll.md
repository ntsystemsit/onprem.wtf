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