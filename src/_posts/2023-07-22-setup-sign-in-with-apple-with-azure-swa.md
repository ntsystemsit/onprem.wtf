---
title: "Configure Sign in with Apple for Azure Static Web App"
author: tto
tags: Azure
excerpt: "How to configure Sign in with Apple for Azure Static Web App."
---

I'm working on a side project and decided to use [Sign in with Apple](https://developer.apple.com/documentation/sign_in_with_apple) as an additional authentication provider, next to AAD that I would normally use.

As per Microsoft's [documentation](https://learn.microsoft.com/en-us/azure/static-web-apps/authentication-custom?tabs=apple%2Cinvitations), adding apple as custom authentication provider is simple enough, just add the following lines to your `staticwebapp.config.json` file:

```json
"identityProviders": {
    "apple": {
    "registration": {
        "clientIdSettingName": "APPLE_CLIENT_ID",
        "clientSecretSettingName": "APPLE_CLIENT_SECRET"
    }
  }
}
```

Then we add the two setting names to the Web App's configuration and we're done, right? Almost.

First we have to take a deep-dive into JWT as the `APPLE_CLIENT_SECRET` must be a signed JWT. There is no documentation specifically for Static Web Apps but this one for [App Service](https://learn.microsoft.com/en-us/azure/app-service/configure-authentication-provider-apple) is close enough.

I converted the sample C# code to powershell for easier use. The required package have a dependency loop and so, instead of easily installing them with `Install-Package` I had to use `nuget`. Follow the documentation above to obtain client id, team id, key id, and the key in pkcs8 format, then use the following snippet to generate the client secret:

```powershell
function Get-AppleClientSecret {
    param (
        [string]$TeamId,
        [string]$ClientId,
        [string]$KeyId,
        [System.IO.FileInfo]$P8KeyFile
    )

    $p8Content = Get-Content -Path $p8keyfile
    $p8key = $p8Content.where{$_ -notmatch "^---"} -join("")

    [string]$audience = "https://appleid.apple.com"
    [string]$issuer = $teamId
    [string]$subject = $clientId
    [string]$kid = $keyId

    $Claims = New-Object -TypeName System.Collections.Generic.List[System.Security.Claims.Claim]
    $Claims.Add(
        (New-Object -TypeName System.Security.Claims.Claim("sub", $subject))
    )
    
    $cngKey = [System.Security.Cryptography.CngKey]::Import(
        [Convert]::FromBase64String($p8key), 
        [System.Security.Cryptography.CngKeyBlobFormat]::Pkcs8PrivateBlob
    )

    $signingCred = New-Object Microsoft.IdentityModel.Tokens.SigningCredentials(
        (New-Object Microsoft.IdentityModel.Tokens.ECDsaSecurityKey(
            (New-Object System.Security.Cryptography.ECDsaCng($cngKey)
        ))),
        "ES256" # EcdsaSha256
    )

    $NotBefore = Get-Date
    $Expires = (Get-Date).AddDays(180)
    $token = New-Object -TypeName System.IdentityModel.Tokens.Jwt.JwtSecurityToken(
        $Issuer, 
        $Audience, 
        $Claims, 
        $NotBefore, 
        $Expires, 
        $signingCred
    )

    $null = $token.Header.Add("kid", $kid)
    $null = $token.Header.Remove("typ")

    $tokenHandler = New-Object System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler
    
    return $tokenHandler.WriteToken($token)
}

# install & import requirements
Invoke-WebRequest -Uri 'https://dist.nuget.org/win-x86-commandline/latest/nuget.exe' -OutFile "$env:USERPROFILE\Downloads\nuget.exe"
& "$env:USERPROFILE\Downloads\nuget.exe" Install System.IdentityModel.Tokens.Jwt -Version 6.32.0 -OutputDirectory "$env:USERPROFILE\Downloads\.nuget"

Add-Type -Path "$env:USERPROFILE\.nuget\packages\Microsoft.IdentityModel.Tokens\6.32.0\lib\netstandard2.0\Microsoft.IdentityModel.Tokens.dll"
Add-Type -Path "$env:USERPROFILE\.nuget\packages\System.IdentityModel.Tokens.Jwt\6.32.0\lib\netstandard2.0\System.IdentityModel.Tokens.Jwt.dll"
Add-Type -Path "$env:USERPROFILE\.nuget\packages\Microsoft.IdentityModel.Logging\6.32.0\lib\netstandard2.0\Microsoft.IdentityModel.Logging.dll"
Add-Type -Path "$env:USERPROFILE\.nuget\packages\Microsoft.IdentityModel.JsonWebTokens\6.32.0\lib\netstandard2.0\Microsoft.IdentityModel.JsonWebTokens.dll"
Add-Type -Path "$env:USERPROFILE\.nuget\packages\microsoft.identitymodel.abstractions\6.32.0\lib\netstandard2.0\Microsoft.IdentityModel.Abstractions.dll"

# set parameters and get secret
$p = @{
    TeamId = "Q847A7FG64"
    ClientId = "wtf.onprem.appleid"
    KeyId = "8QKD4J6XDZ"
    P8KeyFile = ".\AuthKey_8QKD4J6XDZ.p8"
}
Get-AppleClientSecret @p
```

Once we have obtained the `APPLE_CLIENT_SECRET`, the sign in process with Apple should be successful. However, after signing in, we are redirected to the Static Web App and greeted with a `403: Forbidden`:

> We need an email address or a handle from your login service. To use this login, please update your account with the missing info.

It turns out the `identityProviders` example given in Microsoft's documentation is not quite complete. Sign in with Apple only inserts the user's email address as claim in the authentication token if we specifically ask for it during the sing in process. To do that, we have to add the `scopes` property to the `staticwebapp.config.json` file:

```json
"identityProviders": {
    "apple": {
    "registration": {
        "clientIdSettingName": "APPLE_CLIENT_ID",
        "clientSecretSettingName": "APPLE_CLIENT_SECRET"
    },
    "login": {
        "scopes": ["email"]
    }
  }
}
```

Adding the scope will allow new users to sign in successfully. Users that had already signed in must first remove the app from Sign in with Apple in their [Apple account](https://appleid.apple.com/account/manage).

So, after adding the scope and removing the app from Sign in with Apple, we can finally attempt to sign in again and we should see that the user has to consent sharing their email address in the sign in process:

{% render "img", img:"/assets/2023/2023-07-22_23-11-08.png" %}