# gen_year.ps1
# Gera words_ptbr_year.json com 365 dias a partir de hoje
# usando o mesmo algoritmo hash do index.html / index.ts

$g = "c:\Users\ander\Dropbox\04_Profissional_e_Projetos\Dev_TI\Claude\gliffo"

# Le banco curado
$banco  = Get-Content "$g\data\banco_curado.json" -Raw | ConvertFrom-Json
$aceitos = $banco.banco_so_aceitos

$PALAVRAS = @{
    facil         = @($aceitos.facil)
    medio         = @($aceitos.medio)
    dificil       = @($aceitos.dificil)
    muito_dificil = @($aceitos.muito_dificil)
}

# CICLO_DIF indexado pelo dia da semana .NET (0=Dom, 1=Seg, etc.)
$CICLO_DIF = @("facil","facil","medio","medio","dificil","dificil","muito_dificil")
$NIVEL_LABELS = @{
    facil         = "F" + [char]0x00e1 + "cil"          # Fácil
    medio         = "M" + [char]0x00e9 + "dio"          # Médio
    dificil       = "Dif" + [char]0x00ed + "cil"        # Difícil
    muito_dificil = "Muito Dif" + [char]0x00ed + "cil"  # Muito Difícil
}

$EPOCA = [DateTime]::new(2026, 3, 8, 0, 0, 0, [DateTimeKind]::Utc)  # dia 0 = puzzle #1
$start = [DateTime]::new(2026, 3, 8, 0, 0, 0, [DateTimeKind]::Utc)  # hoje
$totalDias = 365

Write-Host "Gerando schedule: $($start.ToString('yyyy-MM-dd')) + $totalDias dias"
Write-Host "Banco: f=$($PALAVRAS.facil.Count) m=$($PALAVRAS.medio.Count) d=$($PALAVRAS.dificil.Count) md=$($PALAVRAS.muito_dificil.Count)"

$days = [System.Collections.Generic.List[object]]::new()
$dupes = 0
$prevWord = ""

for ($i = 0; $i -lt $totalDias; $i++) {
    $d = $start.AddDays($i)
    $diasDesdeEpoca = [int]($d - $EPOCA).TotalDays
    $diaSemana = [int]$d.DayOfWeek   # 0=Dom..6=Sab (igual ao JS getUTCDay)
    $nivel = $CICLO_DIF[$diaSemana]
    $lista = $PALAVRAS[$nivel]

    # Mesmo hash do index.html: ((diasDesdeEpoca * 2654435761) >>> 0) % lista.length
    # -band 0xFFFFFFFFL simula o '>>> 0' do JS (trunca para 32-bit unsigned)
    $hash = [uint32](([int64]$diasDesdeEpoca * 2654435761L) -band 0xFFFFFFFFL)
    $idx  = [int]($hash % [uint32]$lista.Count)
    $word = $lista[$idx]

    if ($word -eq $prevWord) { $dupes++ }
    $prevWord = $word

    $days.Add([PSCustomObject]@{
        date       = $d.ToString("yyyy-MM-dd")
        word       = $word
        nivel      = $nivel
        nivelLabel = $NIVEL_LABELS[$nivel]
        puzzle     = $diasDesdeEpoca + 1
    })
}

Write-Host "Dias gerados: $($days.Count) | Palavras repetidas consecutivas: $dupes"

# Monta JSON final
$endDate = $start.AddDays($totalDias - 1)
$out = [ordered]@{
    metadata = [ordered]@{
        version     = 3
        generated   = (Get-Date -Format "yyyy-MM-dd")
        start       = $start.ToString("yyyy-MM-dd")
        end         = $endDate.ToString("yyyy-MM-dd")
        total_days  = $totalDias
        epoch       = "2026-03-08"
        ciclo_dif   = $CICLO_DIF
        banco_stats = [ordered]@{
            facil         = $PALAVRAS.facil.Count
            medio         = $PALAVRAS.medio.Count
            dificil       = $PALAVRAS.dificil.Count
            muito_dificil = $PALAVRAS.muito_dificil.Count
            total         = ($PALAVRAS.facil.Count + $PALAVRAS.medio.Count + $PALAVRAS.dificil.Count + $PALAVRAS.muito_dificil.Count)
        }
    }
    days = $days.ToArray()
}

$json = $out | ConvertTo-Json -Depth 5
$outPath = "$g\data\words_ptbr_year.json"
[System.IO.File]::WriteAllText($outPath, $json, [System.Text.Encoding]::UTF8)

$size = [math]::Round((Get-Item $outPath).Length / 1KB, 1)
Write-Host "Salvo em: $outPath ($size KB)"

# Mostra amostra
Write-Host "--- Proximos 7 dias ---"
$days[0..6] | Select-Object date,word,nivel,puzzle | Format-Table -AutoSize
