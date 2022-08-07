---
layout: post
title: "Exchange 2010 Zertifikat anfordern"
date: 2010-09-03 13:55:54 +0200
comments: true
category: Archive
tags: ["Exchange"]
redirect_from: ["/post/Exchange-2010-Zertifikat-anfordern", "/post/exchange-2010-zertifikat-anfordern"]
author: dni
language: de
---
<!-- more -->
<p>Um OWA, Active Sync usw. betreiben zu können benötigt Exchange ein entsprechendes Zertifikat. Seit Exchange 2010 hat Microsoft hierfür einen komfortablen Wizard zur Verfügung gestellt.</p>  <p>Der Wizard befindet sich unter der Serverkonfiguration und wird über den Menüpunkt “<strong>New Exchange Certificate</strong>” aufgerufen.</p>  <p><a href="/assets/archive/image_263.png"><img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/assets/archive/image_thumb_261.png" width="244" height="150" /></a></p>  <p>Sobald der Wizard startet, muss zunächst ein Namen vergeben werden. Auf der nächsten Seite kann das Zertifikat noch für alle Subdomains freigegeben werden.</p>  <p>Nun können die Einstellungen gesetzt werden, wie der Certificate-Request erstellt werden soll. Als Beispiel habe ich hier einige Parameter aufgelistet:</p>  <p><strong>OWA</strong></p>  <p><a href="/assets/archive/image_264.png"><img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/assets/archive/image_thumb_262.png" width="244" height="217" /></a></p>  <p><strong>ActiveSync</strong></p>  <p><a href="/assets/archive/image_265.png"><img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/assets/archive/image_thumb_263.png" width="244" height="199" /></a></p>  <p><strong>Outlook Anywhere und Autodiscover</strong></p>  <p><a href="/assets/archive/image_266.png"><img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/assets/archive/image_thumb_264.png" width="244" height="169" /></a></p>  <p>Als Ergebnis werden dann die Domains angezeigt, die im Zertifikat registriert werden</p>  <p><a href="/assets/archive/image_267.png"><img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/assets/archive/image_thumb_265.png" width="244" height="157" /></a></p>  <p>Nachdem die Informationen zu Organisation und Standort ausgefüllt wurde, kann der Certficate-Request abgespeichert und bei der CA eingereicht werden. Bevor die CA das Zertifikat ausstellen kann, muss die CA noch für die <a href="/post/Exchange-2010-SAN-Zertifikate28093Server-2008-PKI.aspx">Registrierung mehrere Subject Names</a> aktiviert werden.</p>  <p>Nachdem die CA das Zertifikat ausgestellt hat, muss der Request noch abgeschlossen werden. Hier klickt man rechts auf das Zertifikat in der EMC und wählt die Option “<strong>Complete Pending Request</strong>”.</p>  <p>Sobald das Zertifikat installiert ist, muss es noch mit den jeweiligen Diensten verbunden werden. Hier ist uns wieder ein Wizard behilflich. Rechtslick auf das Zertifikat und “<strong>Assign Services to Certificate</strong>”</p>  <p><a href="/assets/archive/image_268.png"><img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/assets/archive/image_thumb_266.png" width="244" height="150" /></a></p>  <p>Nun kann man sämtliche Services auswählen, für die das Zertifikat zuständig ist.</p>  <p><a href="/assets/archive/image_269.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/assets/archive/image_thumb_267.png" width="244" height="110" /></a></p>  <p>Mit Assign wird das Zertifikat dann hinzugefügt.</p>  <p>Grüße   <br />dn</p>  <p>live vom ntSystems techDAY :)</p>
