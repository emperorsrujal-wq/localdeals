# Windows Task Scheduler Deployment Script (Gemini Version)
# Run this with administrator privileges to set up automated blog generation
# Usage: powershell -ExecutionPolicy Bypass -File deploy-windows-scheduler-gemini.ps1

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

Write-Host "🔧 Setting up Windows Task Scheduler for automated blog generation (Gemini API)..."
Write-Host ""

# Check if .env file exists
$envPath = Join-Path $ScriptPath ".env"
if (-not (Test-Path $envPath)) {
    Write-Host "⚠️  .env file not found!"
    Write-Host ""
    Write-Host "Creating .env file..."
    
    if ([string]::IsNullOrEmpty($ApiKey)) {
        Write-Host "❌ API Key is required to create .env"
        Write-Host "Usage: .\deploy-windows-scheduler-gemini.ps1 -ApiKey 'AIza_YOUR_KEY_HERE'"
        exit 1
    }
    
    $envContent = @"
GEMINI_API_KEY=$ApiKey
NODE_ENV=production
GEMINI_MODEL=gemini-pro
"@
    Set-Content -Path $envPath -Value $envContent
    Write-Host "✅ .env file created"
} else {
    Write-Host "✅ .env file found"
    if (-not [string]::IsNullOrEmpty($ApiKey)) {
        Write-Host "⚠️  Updating .env with new API key..."
        $envContent = Get-Content $envPath
        $envContent = $envContent -replace "GEMINI_API_KEY=.*", "GEMINI_API_KEY=$ApiKey"
        Set-Content -Path $envPath -Value $envContent
        Write-Host "✅ API key updated in .env"
    }
}

Write-Host ""

# Check if npm dependencies are installed
$nodeModules = Join-Path $ScriptPath "node_modules"
if (-not (Test-Path $nodeModules)) {
    Write-Host "📦 Installing npm dependencies..."
    Push-Location $ScriptPath
    npm install
    Pop-Location
    
    if (-not (Test-Path $nodeModules)) {
        Write-Host "❌ Failed to install npm dependencies"
        exit 1
    }
    Write-Host "✅ Dependencies installed"
}

Write-Host ""

# Check if TypeScript is built
$distPath = Join-Path $ScriptPath "dist"
if (-not (Test-Path $distPath)) {
    Write-Host "🔨 Building TypeScript..."
    Push-Location $ScriptPath
    npm run build
    Pop-Location
    
    if (-not (Test-Path $distPath)) {
        Write-Host "❌ Failed to build TypeScript"
        exit 1
    }
    Write-Host "✅ TypeScript built"
}

Write-Host ""

# Create wrapper batch file
Write-Host "📝 Creating wrapper batch file..."
$wrapperPath = Join-Path $ScriptPath "run-blog-generator.bat"
$wrapperContent = @"
@echo off
setlocal enabledelayedexpansion

REM Load environment variables from .env
for /f "tokens=*" %%a in (.env) do (
    if not "%%a"=="" if not "%%a:~0,1%%"=="#" (
        set "%%a"
    )
)

REM Change to script directory and run
cd /d "$ScriptPath"
node dist\generateDailyBlog-gemini.js

REM Log execution
echo. >> blog-generator.log
echo [%date% %time%] Execution completed >> blog-generator.log
"@

Set-Content -Path $wrapperPath -Value $wrapperContent
Write-Host "✅ Wrapper script created: $wrapperPath"

Write-Host ""

# Create task trigger
Write-Host "📋 Creating scheduled task..."
$trigger = New-ScheduledTaskTrigger -Daily -At $Time

# Create action
$action = New-ScheduledTaskAction `
    -Execute $wrapperPath `
    -WorkingDirectory $ScriptPath

# Create settings
$settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -StartWhenAvailable `
    -RunOnlyIfNetworkAvailable

# Create principal
$principal = New-ScheduledTaskPrincipal `
    -UserID "SYSTEM" `
    -LogonType ServiceAccount `
    -RunLevel Highest

# Check if task already exists
$taskName = "PDFA2Z Daily Blog Generator"
$existingTask = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue

if ($existingTask) {
    Write-Host "⚠️  Updating existing task..."
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
}

# Register the new task
Register-ScheduledTask `
    -TaskName $taskName `
    -Trigger $trigger `
    -Action $action `
    -Settings $settings `
    -Principal $principal `
    -Description "Automatically generates SEO-optimized blog posts daily using Google Gemini API" `
    -Force | Out-Null

Write-Host "✅ Task scheduled"

Write-Host ""
Write-Host "✅ Windows Task Scheduler setup complete!"
Write-Host ""
Write-Host "📋 Task Details:"
Write-Host "   Task Name: $taskName"
Write-Host "   Schedule: Daily at $Time"
Write-Host "   Status: Enabled"
Write-Host "   Run As: SYSTEM"
Write-Host "   API: Google Gemini (FREE)"
Write-Host ""

Write-Host "✨ Next Steps:"
Write-Host "1. Test manually: npm run generate"
Write-Host "2. Task will run automatically at $Time every day"
Write-Host "3. Check 'blog-generator.log' for execution history"
Write-Host "4. View logs in: Event Viewer > Windows Logs > Application"
Write-Host ""

Write-Host "📊 Cost:"
Write-Host "   Monthly: FREE (Gemini free tier)"
Write-Host "   Daily Posts: 1 per day"
Write-Host "   Monthly Content: 30+ new posts"
Write-Host ""

Write-Host "✅ Automated daily blog publishing with Gemini is now ACTIVE!"
Write-Host ""
Write-Host "🎉 Your first post will be generated at $Time tomorrow!"
