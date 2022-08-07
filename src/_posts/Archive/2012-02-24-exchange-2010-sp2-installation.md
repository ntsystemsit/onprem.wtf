---
layout: post
title: "Exchange 2010 SP2 Installation"
date: 2012-02-24 22:14:58 +0100
comments: true
category: Archive
tags: ["Exchange", "Server"]
redirect_from: ["/post/Exchange-2010-SP2-Installation", "/post/exchange-2010-sp2-installation"]
author: tto
language: de
---
<!-- more -->
<p>Service Pack 2 für Exchange 2010 ist seit über zwei Monaten verfügbar,langsam Zeit sich ernsthaft gedanken über ein Update zu machen. Dabei gibt es ein paar Dinge zu berücksichtigen, hier eine kurze Zusammenfassung.</p>  <h1></h1>  <h1></h1>  <h1>Active Directory Schema</h1>  <p>Es gibt ein neues Active Directory Schema, ein paar Infos dazu hier: <a title="http://blogs.technet.com/b/exchange/archive/2012/01/17/custom-aka-extension-attributes-in-exchange-2010-sp2-and-their-use.aspx" href="http://blogs.technet.com/b/exchange/archive/2012/01/17/custom-aka-extension-attributes-in-exchange-2010-sp2-and-their-use.aspx">http://blogs.technet.com/b/exchange/archive/2012/01/17/custom-aka-extension-attributes-in-exchange-2010-sp2-and-their-use.aspx</a></p>  <p>Um das AD Schema zu aktualisieren benötigt man “Schema Admin” Berechtigungen, installiert man Exchange 2010 SP2 mit einem Benutzer der diese Rechte hat wird das Schema automatisch erweitert. Alternativ kann man die Setup Files von SP2 auf den Schema-Master kopieren und mit setup.com /prepareAD das Update durchführen.</p>  <p>Die aktuelle Schema Version findet man folgendermaßen:</p>  <p>Active Directory Schema:</p>  <p><code>Get-ADObject &quot;cn=schema,cn=configuration,dc=ath,dc=int&quot; -Properties ObjectVersion</code></p>  <p>Exchange Schema:</p>  <p><code>Get-ADObject &quot;cn=ms-Exch-Schema-Version-Pt,cn=schema,cn=configuration,dc=domain,dc=local&quot; -Properties RangeUpper</code></p>  <p>Genauere Infos und die genauen Schema Versionsnummern gibt es im <a href="http://social.technet.microsoft.com/wiki/contents/articles/2772.exchange-schema-versions-common-questions-answers.aspx">TechNet Wiki.</a></p>  <h1>Client Access Sever Prerequisite</h1>  <p>Die Systemvoraussetzungen für die Client Access Rolle wurden geändert, hinzugefügt wurde IIS 6 Wmi Compatibility oder “web-wmi”. </p>  <p>Das Feature kann automatisch installiert werden wenn die entsprechende Option beim Setup aktiviert wird, alternativ kann man es im Servermanager oder per Powershell installieren.</p>  <p><code>Import-Module Servermanager</p>    <p>Add-WindowsFeature Web-WMI</code></p>  <h1>Execution Policy GPO</h1>  <p>In vielen Umgebungen werden Einstellungen wie z.B. die PowerShell Execution Policy über Gruppenrichtlinien gesteuert. Diese Gruppenrichtlinie führt zu einem Problem bei der Installation des Service Packs das den Server in einem Status zurücklässt in dem Exchange nicht mehr läuft und die Installation nicht fortgesetzt werden kann. Der Fehler “AuthorizationManager check failed” wird angezeigt. Klingt nach Restore.</p>  <p>Um das zu verhindern muss man die Gruppenrichtlinie vor dem Update deaktivieren, überprüft werden kann das so:</p>  <p><code>Get-ExecutionPolicy –List</code></p>  <p><a href="/assets/archive/image_373.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/assets/archive/image_thumb_371.png" width="244" height="71" /></a></p>  <p>Wichtig ist hierbei dass MachinePolicy und UserPolicy auf “Undefined” stehen.</p>  <p>Genaueres gibt es in der <a href="http://support.microsoft.com/?kbid=2668686">Knowledge Base.</a></p>  <p>Release Notes</p>  <p>Wie vor jedem Update empfehle ich hier auf jeden Fall einen Blick auf die <a href="http://technet.microsoft.com/en-us/library/hh529928.aspx">Release Notes</a> zu werfen.</p>  <p>&#160;</p>  <p>so long,   <br />tom</p>
