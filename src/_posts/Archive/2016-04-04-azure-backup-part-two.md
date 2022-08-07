---
layout: post
title: "Azure Backup - Part Two"
date: 2016-04-04 17:00:00 +0200
comments: true
category: Archive
tags: ["Azure"]
redirect_from: ["/post/Azure-Backup-Part-Two", "/post/azure-backup-part-two"]
author: dni
---
<!-- more -->
<p>Let’s focus on Option 1 the direct Azure VM Backup:</p> <h2>The Backup Tasks</h2> <p><strong><br></strong>We are now going to Backup an Azure VM from the Web interface. First of all, you have to start a discovery search.</p> <p><a href="/assets/archive/image_713.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/assets/archive/image_thumb_711.png" width="534" height="117"></a></p> <p><a href="/assets/archive/image_705.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/assets/archive/image_thumb_703.png" width="698" height="160"></a></p> <p>When the discovery search is completed you can select the VM you want to Backup. <br>Keep in mind: Today it’s not possible to Backup VM’s that's located on the Azure premium storage (SSD) or VM’s in created with the Resource Manager model. <p><a href="/assets/archive/image_706.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/assets/archive/image_thumb_704.png" width="638" height="213"></a> <p>The next step is to create a Backup policy. You can have a single policy that works for all servers or multiple policies with different settings regarding Backup Windows and retention period. This step should be known from other Backup solutions. <p><a href="/assets/archive/image_707.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/assets/archive/image_thumb_705.png" width="446" height="306"></a> <p>On the retention range page you specify how long protected VM’s are kept. <p><a href="/assets/archive/image_708.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/assets/archive/image_thumb_706.png" width="727" height="471"></a> <p>We have created the Backup policy and can now assign it to our VM. <p>From now a VM Backup will be started on a daily basis. <h2>Lets restore a VM</h2> <p>To restore a VM you basically highlight the VM in the Backup Vault and select the Restore function.  <p><a href="/assets/archive/image_709.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/assets/archive/image_thumb_707.png" width="757" height="186"></a> <p>After you selected the restore point you want to restore, the wizard asks you some information. This step is important because you can specify the name and VNET the VM will belong to. Be careful to not place you restores VM in the same Network as the productive one as this is only a test. <p><a href="/assets/archive/image_710.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/assets/archive/image_thumb_708.png" width="429" height="240"></a> <p><a href="/assets/archive/image_711.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/assets/archive/image_thumb_709.png" width="580" height="492"></a> <p>A nice log shows the progress and result of the restore request. <p><a href="/assets/archive/image_712.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/assets/archive/image_thumb_710.png" width="587" height="334"></a> <p>When the restore is done a new VM with the specified name is visible in the Virtual Machine section of Azure. We can start this VM, restore our files or put the VM into production if this was a real restore. <p>Greetings          
