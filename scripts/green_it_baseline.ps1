[CmdletBinding()]
param(
    [string]$ApiBaseUrl = "http://127.0.0.1:8000",
    [int]$ApiSamples = 10
)

$ErrorActionPreference = 'Continue'
$repoRoot = Split-Path -Parent $PSScriptRoot
$frontendPath = Join-Path $repoRoot 'frontend'
$relativeEvidence = Join-Path (Join-Path (Join-Path 'docs' ('03 Implementaci' + [char]0x00F3 + 'n')) 'reduccion del impacto ambiental') 'evidencias'
$evidenceDir = Join-Path $repoRoot $relativeEvidence
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$reportPath = Join-Path $evidenceDir "green-it-baseline-$stamp.md"
New-Item -ItemType Directory -Force -Path $evidenceDir | Out-Null

$report = [System.Collections.Generic.List[string]]::new()
function Add-Report([string]$Line = '') { $script:report.Add($Line) }
function Add-Section([string]$Name) { Add-Report "`n## $Name`n" }

Add-Report '# EcoLogistics — Green IT baseline'
Add-Report "- Fecha local de captura: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss zzz')"
Add-Report '- Naturaleza: observaciones locales previas a optimizaciones; no equivale por sí sola a una auditoría ambiental completa.'

Add-Section 'Repositorio'
$branch = (& git -C $repoRoot branch --show-current 2>&1 | Out-String).Trim()
$commit = (& git -C $repoRoot rev-parse --short HEAD 2>&1 | Out-String).Trim()
$status = (& git -C $repoRoot status --short --branch 2>&1 | Out-String).Trim()
Add-Report "- Rama: ``$branch``"
Add-Report "- Commit: ``$commit``"
Add-Report '- Estado de Git:'
Add-Report '```text'
Add-Report $status
Add-Report '```'
if ($branch -ne 'main') {
    Add-Report '> AVISO: la rama local no es `main`. Este informe se ha capturado, pero comprueba la rama antes de usarlo como evidencia de entrega.'
}

Add-Section 'Build de producción y tamaño de activos'
if (-not (Test-Path (Join-Path $frontendPath 'package.json'))) {
    Add-Report '- ERROR: no se encontró frontend/package.json.'
} else {
    Push-Location $frontendPath
    try {
        $buildOutput = & npm run build 2>&1
        $buildExit = $LASTEXITCODE
        $buildText = ($buildOutput | Out-String).Trim()
    } catch {
        $buildExit = 999
        $buildText = $_.Exception.Message
    }
    Pop-Location
    Add-Report "- Comando: ``npm run build``; código de salida: $buildExit"
    Add-Report '```text'
    Add-Report $buildText
    Add-Report '```'

    $distAssets = Join-Path $frontendPath 'dist/assets'
    if ($buildExit -eq 0 -and (Test-Path $distAssets)) {
        $builtFiles = @(Get-ChildItem -LiteralPath $distAssets -File -Recurse -ErrorAction SilentlyContinue)
        $totalBytes = ($builtFiles | Measure-Object -Property Length -Sum).Sum
        if ($null -eq $totalBytes) { $totalBytes = 0 }
        Add-Report "- Archivos en ``frontend/dist/assets``: $($builtFiles.Count)"
        Add-Report "- Tamaño sin comprimir de esos archivos: $totalBytes bytes ($([math]::Round($totalBytes / 1KB, 2)) KiB)."
        Add-Report '- Este tamaño es el total de archivos bajo dist/assets, no el total exacto de transferencia de la página; no incluye la variación por caché, peticiones ni respuestas del backend.'
        Add-Report '| Tipo | Archivos | Bytes | KiB |'
        Add-Report '|---|---:|---:|---:|'
        foreach ($group in ($builtFiles | Group-Object { [IO.Path]::GetExtension($_.Name).ToLowerInvariant() } | Sort-Object Name)) {
            $sum = ($group.Group | Measure-Object -Property Length -Sum).Sum
            Add-Report "| ``$($group.Name)`` | $($group.Count) | $sum | $([math]::Round($sum / 1KB, 2)) |"
        }
    } else {
        Add-Report '- No se pudo medir frontend/dist/assets porque el build falló o no produjo el directorio.'
    }
}

Add-Section 'Inventario de imágenes'
$imageExts = @('.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif', '.svg')
$imageFiles = @()
foreach ($root in @((Join-Path $frontendPath 'public'), (Join-Path $frontendPath 'src'))) {
    if (Test-Path $root) {
        $imageFiles += Get-ChildItem -LiteralPath $root -File -Recurse -ErrorAction SilentlyContinue | Where-Object { $imageExts -contains $_.Extension.ToLowerInvariant() }
    }
}
$imageFiles = @($imageFiles | Sort-Object FullName -Unique)
$imageBytes = ($imageFiles | Measure-Object -Property Length -Sum).Sum
if ($null -eq $imageBytes) { $imageBytes = 0 }
$largeImages = @($imageFiles | Where-Object { $_.Length -gt 200KB })
Add-Report "- Imágenes/recursos de imagen encontrados en frontend/public y frontend/src: $($imageFiles.Count)."
Add-Report "- Tamaño total de esos archivos: $imageBytes bytes ($([math]::Round($imageBytes / 1KB, 2)) KiB)."
Add-Report "- Archivos mayores a 200 KiB: $($largeImages.Count)."
if ($largeImages.Count -gt 0) {
    Add-Report '| Archivo | Bytes | KiB |'
    Add-Report '|---|---:|---:|'
    foreach ($f in $largeImages) {
        $shortPath = $f.FullName.Substring($repoRoot.Length).TrimStart('\','/')
        Add-Report "| ``$shortPath`` | $($f.Length) | $([math]::Round($f.Length / 1KB, 2)) |"
    }
} else {
    Add-Report '- No se encontraron imágenes mayores a 200 KiB en las carpetas examinadas. Esto no garantiza que no existan recursos remotos ni imágenes incluidas de otra forma.'
}

Add-Section 'Importaciones estáticas de páginas React'
$routesFile = Join-Path $frontendPath 'src/routes/AppRoutes.jsx'
if (Test-Path $routesFile) {
    $staticImports = @(Select-String -LiteralPath $routesFile -Pattern '^\s*import\s+.+\s+from\s+["'']\.\.?/pages/' -AllMatches)
    Add-Report "- Importaciones estáticas de páginas detectadas por patrón: $($staticImports.Count)."
    Add-Report '- Candidatas a estudiar para división de código (no se modificó ningún archivo en este paso):'
    foreach ($m in $staticImports) { Add-Report "  - ``$($m.Line.Trim())``" }
} else {
    Add-Report '- No se encontró frontend/src/routes/AppRoutes.jsx.'
}

Add-Section 'Comprobación de endpoint de salud de API'
$healthUrl = $ApiBaseUrl.TrimEnd('/') + '/health'
$latencies = [System.Collections.Generic.List[double]]::new()
$statuses = [System.Collections.Generic.List[int]]::new()
for ($i = 1; $i -le [math]::Max(1, $ApiSamples); $i++) {
    $watch = [System.Diagnostics.Stopwatch]::StartNew()
    try {
        $response = Invoke-WebRequest -Uri $healthUrl -Method Get -TimeoutSec 5 -UseBasicParsing
        $watch.Stop()
        $statuses.Add([int]$response.StatusCode)
        $latencies.Add([double]$watch.Elapsed.TotalMilliseconds)
    } catch {
        $watch.Stop()
        Add-Report "- Intento ${i}: no disponible ($($_.Exception.Message))."
        break
    }
}
if ($latencies.Count -gt 0) {
    $sorted = @($latencies | Sort-Object)
    $median = if ($sorted.Count % 2 -eq 1) { $sorted[[int][math]::Floor($sorted.Count / 2)] } else { ($sorted[$sorted.Count / 2 - 1] + $sorted[$sorted.Count / 2]) / 2 }
    $avg = ($latencies | Measure-Object -Average).Average
    Add-Report "- URL: ``$healthUrl``"
    Add-Report "- Respuestas correctas: $($latencies.Count) de $([math]::Max(1, $ApiSamples)); códigos: $((@($statuses | Sort-Object -Unique)) -join ', ')."
    Add-Report "- Latencia de esta comprobación local: mediana $([math]::Round($median, 2)) ms; promedio $([math]::Round($avg, 2)) ms."
    Add-Report '- Límite: `/health` mide la comprobación de salud, no el rendimiento de endpoints de negocio ni el rendimiento bajo carga. No presentarlo como latencia de API de pedidos/clientes/rutas.'
} else {
    Add-Report "- API no disponible en ``$healthUrl`` o no se completaron muestras. Ejecutar el backend en otro terminal y volver a correr este script si se desea medir /health."
}

Add-Section 'Lighthouse y transferencia real'
Add-Report '- Lighthouse Performance/FCP/LCP/TBT/CLS: NO MEDIDO por este script.'
Add-Report '- Solicitudes y transferencia real de página: NO MEDIDAS por este script.'
Add-Report '- Abrir la vista de producción en Chrome, iniciar sesión si se desea medir una pantalla autenticada, ejecutar DevTools → Lighthouse y guardar el reporte HTML/JSON. En DevTools → Network, guardar una captura o HAR para el mismo flujo y anotar caché fría o caliente.'
Add-Report '- No usar métricas del HTML de referencia (38/96 Lighthouse, 8.4/1.1 MB, 480/65 ms o 2.15/0.28 gCO2e) como datos de EcoLogistics sin evidencia propia.'

Add-Section 'Decisión de línea base'
Add-Report '- Este archivo conserva datos de estado antes de las optimizaciones Green IT en el commit local indicado al comienzo.'
Add-Report '- No representa medición directa de consumo eléctrico ni de CO2e.'
Add-Report '- Mantener el archivo original después de implementar cambios y generar un segundo registro identificado como `despues`, con el mismo protocolo y entorno.'

[System.IO.File]::WriteAllText($reportPath, ($report -join [Environment]::NewLine) + [Environment]::NewLine, [System.Text.UTF8Encoding]::new($false))
Write-Host "`nInforme de línea base guardado en:`n$reportPath" -ForegroundColor Green
Write-Host 'Revisa el archivo y añade el reporte Lighthouse/Network de Chrome. Este script no modifica código de la aplicación.' -ForegroundColor Cyan
