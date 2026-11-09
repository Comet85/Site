# ==========================================
# 쇼핑몰 프로젝트 간이 WAR 빌드 스크립트 (PowerShell)
# Maven / JDK 설치 없이도 webapp 리소스를 기반으로
# 배포 가능한 WAR 파일을 즉시 생성합니다.
# ==========================================
$ProgressPreference = 'SilentlyContinue'

$CurrentDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$TargetDir = Join-Path $CurrentDir "target"
$WebappDir = Join-Path $CurrentDir "src\main\webapp"
$WarPath = Join-Path $TargetDir "shopping-mall.war"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  쇼핑몰 WAR 패키징 시작" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# 1. target 디렉터리 준비
if (Test-Path $TargetDir) {
    Remove-Item -Path $TargetDir -Recurse -Force
}
New-Item -ItemType Directory -Path $TargetDir | Out-Null

# 2. webapp 디렉터리 존재 여부 확인
if (-not (Test-Path $WebappDir)) {
    Write-Error "오류: $WebappDir 폴더를 찾을 수 없습니다."
    exit 1
}

# 3. .NET ZipFile을 활용하여 즉시 WAR 파일 생성
Write-Host "1. 웹 리소스 압축 중: $WebappDir" -ForegroundColor Yellow
Add-Type -AssemblyName "System.IO.Compression.FileSystem"
[System.IO.Compression.ZipFile]::CreateFromDirectory($WebappDir, $WarPath)

Write-Host "2. WAR 파일 생성 완료: $WarPath" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  빌드 성공! Tomcat webapps/ 등에 배포 가능합니다." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
