---
title: "Mastodon and WebFinger"
author: tto
tags: ntSystems PowerShell
excerpt: "A simple JSON file tells servers in the fediverse where to find me."
---

With the uncertainty surrounding Twitter I have decided to set up an account on Mastodon. If you haven't heard about it [Mastodon](https://joinmastodon.org/) is an de-centralized, open-source alternative to centralized social media. It is powered by open protocols such as [ActivityPub](https://www.w3.org/TR/activitypub/) and [WebFinger](https://www.rfc-editor.org/rfc/rfc7033) which allow federation of individual servers (called instances).

If a user on one server searches for a user on another server, they will enter the full name, i.e. @user@example.com, into the search field. The server will then look for information about the user at the path `https://example.com/.well-known/webfinger`. If found, the reply contains information about where the profile of the user can be found.

We can use this protocol to be discoverable by servers on our own domain. We are using [Bridgetown](https://www.bridgetownrb.com/) to build this site so placing a JSON file at this path `src/.well-known/webfinger` did the trick. So even though my profile is currently hosted at `masto.ai` you can still find me with `@tom@onprem.wtf`. And if you do find me, give me a follow :)

I used this PowerShell function to test the WebFinger endpoint on our and other sites.

```powershell
function Invoke-WebFinger {
    [CmdletBinding()]
    param(
        [Parameter(ValueFromPipeline)]
        [ValidatePattern('^@?[\d\w]+@[\d\w]+\.[\d\w]+')]
        [string]$Uri,
        [string]$Server,
        [string]$Username
    )
    process {
        if($Uri){
            $Username, $server = $uri -replace '^@' -split '@'
        }
        $webFingerUri = "https://$server/.well-known/webfinger?resource=acct:$Username@$Server"
        Write-Verbose "GET $webFingerUri"
        $r = Invoke-RestMethod -Uri $webFingerUri
        [PSCustomObject]@{
            Uri = $Username,$Server -join '@'
            Subject = $r.subject
            Aliases = $r.Aliases
            ProfilePage = $r.links.where{$_.rel -eq 'http://webfinger.net/rel/profile-page'}.href
        }
    }
}

# Examples

'tto@masto.ai','@tom@onprem.wtf' | Invoke-WebFinger

Invoke-WebFinger -Uri tom@onprem.wtf

Invoke-WebFinger -Server onprem.wtf -Username tom
```

Other people wrote about this:

- [Use your own user @ domain for Mastodon discoverability with the WebFinger Protocol without hosting a server](https://www.hanselman.com/blog/use-your-own-user-domain-for-mastodon-discoverability-with-the-webfinger-protocol-without-hosting-a-server)
- [Mastodon on your own domain without hosting a server](https://blog.maartenballiauw.be/post/2022/11/05/mastodon-own-donain-without-hosting-server.html)
- [Using Cloudflare to Customize Your Mastodon Username Domain](https://rpm.sh/custom-mastodon-domain/)