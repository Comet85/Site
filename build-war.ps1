$ProgressPreference = 'SilentlyContinue'

$CurrentDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$TargetDir = Join-Path $CurrentDir "target"
$WebappDir = Join-Path $CurrentDir "src\main\webapp"
$WarPath = Join-Path $TargetDir "shopping-mall.war"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  쇼핑몰 WAR 패키징 시작" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Prepare target directory
if (Test-Path $TargetDir) {
    Remove-Item -Path $TargetDir -Recurse -Force
}
New-Item -ItemType Directory -Path $TargetDir | Out-Null

# Check webapp directory
if (-not (Test-Path $WebappDir)) {
    Write-Error "Error: Cannot find $WebappDir directory."
    exit 1
}

# Create WAR file using .NET ZipFile
Write-Host "1. 웹 리소스 압축 중: $WebappDir" -ForegroundColor Yellow
Add-Type -AssemblyName "System.IO.Compression.FileSystem"
[System.IO.Compression.ZipFile]::CreateFromDirectory($WebappDir, $WarPath)

Write-Host "2. WAR 파일 생성 완료: $WarPath" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  빌드 성공! Tomcat webapps/ 등에 배포 가능합니다." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
