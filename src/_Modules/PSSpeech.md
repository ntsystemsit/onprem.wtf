---
layout: page
title: PSSpeech
author: tto
redirect_from: ["/psspeech"]
---

[![PowerShell Gallery](https://img.shields.io/powershellgallery/dt/psspeech.svg)](https://www.powershellgallery.com/packages/psspeech) <br> PSSpeech is a collection of functions to work with Azure Cognitive Services, more specifically the Speech Service.

The function  `Get-SpeechToken` can be used to get an OAuth token for authentication to the service. The function `Get-SpeechVoicesList` can be use to get a list of available voices and the function `Covert-TextToSpeech` can be used to convert a given string to speech.

```powershell
Get-SpeechToken -Key <yourkey> 
Convert-TextToSpeech -Text "Hi there, how are you doing today?" -Path hithere.mp3
```

{% render "module_functions", collections: collections, title: page.data.title %}

{% render "psgallery", data: page.data %}