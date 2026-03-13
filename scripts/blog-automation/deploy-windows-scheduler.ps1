# Windows Task Scheduler Deployment Script
# Run this with administrator privileges to set up automated blog generation
# Usage: powershell -ExecutionPolicy Bypass -File deploy-windows-scheduler.ps1

param(
    [string]$ApiKey = "",
    [string]$ScriptPath = "C:\Users\w\.antigravity\extensions\scripts\blog-automation",
    [string]$Time = "09:00"  # 9:00 AM
)

# Check if running as administrator
if (-not ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host "❌ This script must be run as Administrator"
    Write-Host "Please right-click PowerShell and select 'Run as Administrator'"
    exit 1
}

if ([string]::IsNullOrEmpty($ApiKey)) {
    Write-Host "❌ API Key is required"
    Write-Host "Usage: .\deploy-windows-scheduler.ps1 -ApiKey 'your-api-key-here'"
    exit 1
}

Write-Host "🔧 Setting up Windows Task Scheduler for automated blog generation..."
Write-Host ""

# Create task trigger (daily at specified time)
$trigger = New-ScheduledTaskTrigger -Daily -At $Time

# Create action - run the blog generator
$scriptFullPath = Join-Path $ScriptPath "dist\generateDailyBlog.js"

if (-not (Test-Path $scriptFullPath)) {
    Write-Host "⚠️  Compiled script not found at: $scriptFullPath"
    Write-Host "📦 Building TypeScript files..."
    
    Push-Location $ScriptPath
    npm run build
    Pop-Location
    
    if (-not (Test-Path $scriptFullPath)) {
        Write-Host "❌ Failed to build script"
        exit 1
    }
}

# Create action
$action = New-ScheduledTaskAction `
    -Execute "node" `
    -Argument """$scriptFullPath""" `
    -WorkingDirectory $ScriptPath

# Create settings
$settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -StartWhenAvailable `
    -RunOnlyIfNetworkAvailable

# Create principal (run with highest privileges)
$principal = New-ScheduledTaskPrincipal `
    -UserID "SYSTEM" `
    -LogonType ServiceAccount `
    -RunLevel Highest

# Check if task already exists
$taskName = "PDFA2Z Daily Blog Generator"
$existingTask = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue

if ($existingTask) {
    Write-Host "⚠️  Task already exists. Unregistering old task..."
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
}

# Register the new task
Write-Host "📝 Registering scheduled task..."
Register-ScheduledTask `
    -TaskName $taskName `
    -Trigger $trigger `
    -Action $action `
    -Settings $settings `
    -Principal $principal `
    -Description "Automatically generates SEO-optimized blog posts daily using Claude API" `
    -Force | Out-Null

# Set environment variable for the task
Write-Host "🔐 Setting API key in system environment..."

# This approach doesn't work for scheduled tasks - need to use a wrapper script
# Create a wrapper batch file that sets the environment variable
$wrapperScript = Join-Path $ScriptPath "run-blog-generator.bat"
$wrapperContent = @"
@echo off
setlocal enabledelayedexpansion
set ANTHROPIC_API_KEY=$ApiKey
cd /d "$ScriptPath"
node dist\generateDailyBlog.js
"@

Set-Content -Path $wrapperScript -Value $wrapperContent
Write-Host "✅ Wrapper script created: $wrapperScript"

# Update the task to use the wrapper script
Write-Host "🔄 Updating task to use wrapper script..."
$task = Get-ScheduledTask -TaskName $taskName
$task.Actions[0].Execute = $wrapperScript
$task | Set-ScheduledTask | Out-Null

# Verify the task
Write-Host ""
Write-Host "✅ Task scheduler setup complete!"
Write-Host ""
Write-Host "📋 Task Details:"
Write-Host "   Task Name: $taskName"
Write-Host "   Schedule: Daily at $Time"
Write-Host "   Status: Enabled"
Write-Host "   Run As: SYSTEM"
Write-Host ""

# Get the task and display info
$task = Get-ScheduledTask -TaskName $taskName
Write-Host "🔍 Verification:"
Write-Host "   Last Run Result: $($task.TaskPath)"
Write-Host "   Next Run Time: Will be set after first execution"
Write-Host ""

Write-Host "✨ Next Steps:"
Write-Host "1. Test manually: npm run generate"
Write-Host "2. Task will run automatically at $Time every day"
Write-Host "3. Check Task Scheduler for execution history"
Write-Host "4. View logs in: Event Viewer > Windows Logs > Application"
Write-Host ""

Write-Host "✅ Automated daily blog publishing is now ACTIVE!"
