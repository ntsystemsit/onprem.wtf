---
title: "How to connect to Exchange Online powershell with a managed identity"
author: tto
tags: PowerShell Azure Exchange
excerpt: "Connect to Exchange Online powershell without app registration"
---

The latest preview version of the ExchangeOnlineManagement powershell module includes the following new parameters: `-ManagedIdentity` and `-ManagedIdentityAccountId`.

As their names imply, they can be used to connect to Exchange Online with a managed identity. According to the documentation this is currently only supported with Azure Virtual Machines and Virtual Machine Scale Sets, however I have used this successfully within Azure Automation runbooks.

## Create the automation account

If you have an existing account skip this step. I will be reusing the variables from this first example, so fill in the name of your automation account and the resource group.

```powershell
$accountName = 'azautomation1'
$rgName = 'onprem-core'
$location = 'West Europe'
Connect-AzAccount
New-AzAutomationAccount -Name $accountName -ResourceGroupName $rgName -Location $location
```

## Get the module

The first step is to add the module to the Automation Account. Installing it through the Azure Portal did not work, as that way only seems to support the latest non-preview version. I used the following commands from the Az powershell module to install the preview version of the module in my automation account:

```powershell
$moduleName = 'ExchangeOnlineManagement'
$moduleVersion = '2.0.6-Preview7'
New-AzAutomationModule -AutomationAccountName $accountName -ResourceGroupName $rgName -Name $moduleName -ContentLinkUri "https://www.powershellgallery.com/api/v2/package/$moduleName/$moduleVersion"
```

## Managed Identity

Now it's time to enable the system assigned managed identity for the automation account. We can do this through the Azure portal by navigating to the automation account and setting the *Status* to *On* under *Identity*. Alternatively, we can use the Az powershell module like this:

```powershell
Set-AzAutomationAccount -Name $accountName -ResourceGroupName $rgName -AssignSystemIdentity
```

Next we will need the id of the managed identity. It will show up in the Azure portal once it has been enabled or it can be retrieved with Az powershell:

```powershell
Get-AzADServicePrincipal -DisplayName $accountName
```

In my case the object id is `b395da15-4904-490c-9109-2bc91a12a08d`. With this id in hand, we use the Microsoft Graph powershell SDK to grant the necessary permissions to the managed identity.

```powershell
Connect-MgGraph
$params = @{
    ServicePrincipalId = 'b395da15-4904-490c-9109-2bc91a12a08d' # managed identity object id
    PrincipalId = 'b395da15-4904-490c-9109-2bc91a12a08d' # managed identity object id
    ResourceId = (Get-MgServicePrincipal -Filter "AppId eq '00000002-0000-0ff1-ce00-000000000000'").id # Exchange online
    AppRoleId = "dc50a0fb-09a3-484d-be87-e023b12c6440" # Exchange.ManageAsApp
}
New-MgServicePrincipalAppRoleAssignedTo @params
```

Lastly we want to assign the role *Exchange Administrator* to the managed identity. Again, we can do this through the Azure portal or with the following command:

```powershell
$roleId = (Get-MgRoleManagementDirectoryRoleDefinition -Filter "DisplayName eq 'Exchange Administrator'").id
New-MgRoleManagementDirectoryRoleAssignment -PrincipalId b395da15-4904-490c-9109-2bc91a12a08d -RoleDefinitionId 29232cdf-9323-42fd-ade2-1d097af3e4de -DirectoryScopeId "/"

```

Please assign the role with the least amount of privileges to complete the task you need. 

## Connect to Exchange Online in the runbook

After completing the steps above we are ready to connect to Exchange Online using the managed identity in the runbook. If you create a new runbook, please make sure to use runtime version `5.1` as the that's where we have imported the module earlier.

```powershell
Connect-ExchangeOnline -ManagedIdentity -Organization 'onpremwtf.onmicrosoft.com'
Get-AcceptedDomain
```

Tom
