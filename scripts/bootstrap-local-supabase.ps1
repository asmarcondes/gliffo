$ErrorActionPreference = 'Stop'

$dockerCliPath = 'C:\Program Files\Docker\Docker\resources\bin'
if ((Test-Path $dockerCliPath) -and -not ($env:Path -split ';' | Where-Object { $_ -eq $dockerCliPath })) {
  $env:Path = "$dockerCliPath;$env:Path"
}

Write-Host 'Gerando seed local da daily_schedule...'
pnpm run build:daily-seed
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host 'Subindo stack local do Supabase...'
pnpm exec supabase start
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host 'Recriando banco local com migrations + seed...'
'y' | pnpm exec supabase db reset --local
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ''
Write-Host 'Bootstrap local concluido.'
Write-Host 'Proximo passo para testar a function:'
Write-Host 'pnpm exec supabase functions serve daily-word --env-file supabase/.env.local --no-verify-jwt'