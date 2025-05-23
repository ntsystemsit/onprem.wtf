---
layout: post
title: "Convert PowerShell Help to a Website"
category: PowerShell
tags: PowerShell Help MarkDown
author: tto
date_modified: 2020-01-12
---

How to use the platyPS PowerShell module to convert comment-based help to markdown and easily host it on GitHub pages.

<!-- more -->

Now you might have read that our blog is powered by [Jekyll]({% link _posts/2016-10-06-Welcome-to-the-all-new-ntSystems.md %}), which is a static-site generator that turns markdown files into html. So, obviously, if I would be able to convert PowerShell help content to markdown files, I could simply put them into a folder an serve them via the blog.

## Create markdown files

The first step is to install platyPS (available on the PS Gallery) and create the markdown files for every function.

```powershell
Install-Module platyPS
Import-Module platyPS, TAK, PSSpeech

foreach ($cmdlet in (Get-Command -Module PSSpeech)) { 
    $h = Get-Help $($cmdlet.Name)
    $meta = @{
        'layout' = 'pshelp';
        'author' = 'tto';
        'title' = $($cmdlet.Name);
        'category' = $($cmdlet.ModuleName.ToLower());
        'excerpt' = "`"$($h.Synopsis)`"";
        'date' = $(Get-Date -Format yyyy-MM-dd);
        'redirect_from' = "[`"/PowerShell/$($cmdlet.ModuleName)/$($cmdlet.Name)/`", `"/PowerShell/$($cmdlet.ModuleName)/$($cmdlet.Name.ToLower())/`", `"/PowerShell/$($cmdlet.Name.ToLower())/`"]"
    }
    if($h.Synopsis -notmatch "\[|\]") {
        New-MarkdownHelp -Command $cmdlet -OutputFolder .\_OnlineHelp\a -Metadata $meta -Force 
    }
}
```
The above example creates a `.md` help file for every function in the `TAK` module. The files are almost ready to be used by our Jekyll-powered blog, I'm using the `-Metadata` parameter to add some additional information to the 'front matter' of each file.

> I could be using `New-MarkdownHelp -Module TAK` but that way, I was not able to include the metadata automatically.
{:.note}

## Rename files for Jekyll

The only thing that I have to do now, in order to have Jekyll pick up the files and create websites, is to rename them accordingly. 

```powershell
foreach ($file in (Get-ChildItem '.\tak-md-help\*.md')) {
    $timestamp = (Get-Date -Format 'yyyy-MM-dd')
    $NewName = $timestamp, $file.name -join '-'
    Rename-Item -Path $file.FullName -NewName $NewName
}
```

The above example renames all `*.md` files in the `tak-md-help` folder to include a timestamp. This step is not necessary if you are using a collection in Jekyll.

## Include HelpUri

The `Get-Help` command has an `-Online` parameter, that can be used to easily open a related link when looking for help. To include this functionality in my scripts, I just have to put the URL of the online article in the `[CmdletBinding()]` statement, like so:

```powershell
[CmdletBinding(HelpUri = 'https://ntsystems.it/PowerShell/TAK/test-tlsconnection/')]
```

## Links 
- <https://github.com/PowerShell/platyPS>


That's it :) 

Tom
