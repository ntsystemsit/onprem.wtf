---
layout: post
title: "WMF 5 Preview: Update is not applicable to your computer"
date: 2014-10-21 19:49:57 +0200
comments: true
category: Archive
tags: ["en", "PowerShell"]
redirect_from: ["/post/WMF-5-Preview-Update-is-not-applicable-to-your-computer", "/post/wmf-5-preview-update-is-not-applicable-to-your-computer"]
author: tto
---
<!-- more -->
<p>I just stumbled upon this one on a new machine I was working with:&nbsp;&nbsp; </p> <p>Are you trying to install the Windows Management Framework 5 Preview, to get all the new PowerShell stuff, and see an error like this one?</p> <p>"The update is not applicable to your computer"  <p><a href="{{ site.url }}/assets/archive/clip_image002%5B1%5D.jpg"><img title="clip_image002_thumb[1][1]" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="clip_image002_thumb[1][1]" src="{{ site.url }}/assets/archive/clip_image002_thumb%5B1%5D%5B1%5D.jpg" width="244" height="174"></a>  <p>This preview actually requires the system local to be set to "en-US", you can easily check this using Get-Host within PowerShell:  <p><a href="{{ site.url }}/assets/archive/clip_image004%5B1%5D.jpg"><img title="clip_image004_thumb[1][1]" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="clip_image004_thumb[1][1]" src="{{ site.url }}/assets/archive/clip_image004_thumb%5B1%5D%5B1%5D.jpg" width="244" height="244"></a>  <p>In my example, the CurrentUICulture was set to "en-GB" and, apparently, that's why the update failed to install. Once I changed my regional settings and downloaded the "en-US" language pack, the update installed just fine.  <p>In case you haven’t heard of the preview as of yet, you can grab it here: <a title="http://www.microsoft.com/en-us/download/details.aspx?id=44070" href="http://www.microsoft.com/en-us/download/details.aspx?id=44070">http://www.microsoft.com/en-us/download/details.aspx?id=44070</a>  <p>The issue is also listed in Connect: <a title="https://connect.microsoft.com/PowerShell/feedback/details/877188/update-is-not-applicable-to-your-computer-windows-management-framework-5-0-preview-may-2014" href="https://connect.microsoft.com/PowerShell/feedback/details/877188/update-is-not-applicable-to-your-computer-windows-management-framework-5-0-preview-may-2014">https://connect.microsoft.com/PowerShell/feedback/details/877188/update-is-not-applicable-to-your-computer-windows-management-framework-5-0-preview-may-2014</a>  <p>&nbsp; <p>Have fun,<br>Tom </p>

