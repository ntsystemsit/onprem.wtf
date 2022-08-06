---
layout: page
title: ntSystemsPSDrive
author: tto
type: Module
redirect_from: ["/ntsystemspsdrive"]
---

[![PowerShell Gallery](https://img.shields.io/powershellgallery/dt/ntsystemspsdrive.svg)](https://www.powershellgallery.com/packages/ntsystemspsdrive) <br> ntSystemsPSDrive is a SHiPS provider for [ntSystems.it](https://ntsystem.it/). 

It uses the [SHiPS](https://github.com/PowerShell/SHiPS/) module to create a PSProvider for our blog which exposes our [json-api]({{ "/post/Jekyll-Fun-Consuming-ntsystems-with-PowerShell" | prepend: site.baseurl }}) as PSDrive and enables the following:


```powershell
Import-Module ntSystemsPSDrive
New-ntSystemsPSDrive
dir ntSystems:
dir ntSystems: -Depth 1
Get-ChildItem 'ntSystems:\Posts by Category\PowerShell\' | Select-Object -Property name,url
Get-Content 'ntSystems:\Posts by Category\ntSystems\Jekyll Fun: Consuming ntSystems with PowerShell' 
```

You can read more about it [here]({{ "/post/ntsystemspsdrive-a-ships-drive-for-the-blog" | prepend: site.baseurl }}).

{% render "module_functions", collections: collections, title: page.data.title %}

{% render "psgallery", data: page.data %}