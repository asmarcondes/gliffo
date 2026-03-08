
# gen_banco.ps1 — Generates expanded BANCO with new SV formula
# Run from the gliffo/ directory

$GRID = 20
$BASE = $PSScriptRoot | Split-Path

# ── Letter SVG paths (from curadoria.html LETTERS) ────────────
$LETTERS_PATHS = @{
  A = @("M 5 200 L 100 0 L 195 200","M 0 100 L 200 100")
  B = @("M 5.0 5.0 L 177.0 5.0 L 195.0 23.0 L 195.0 82.0 L 177.0 100.0 L 5.0 100.0 L 177.0 100.0 L 195.0 118.0 L 195.0 177.0 L 177.0 195.0 L 5.0 195.0 Z","M 5.0 5.0 L 5.0 195.0")
  C = @("M 200.0 5.0 L 0.0 5.0 M 5.0 5.0 L 5.0 195.0 M 0.0 195.0 L 200.0 195.0")
  D = @("M 5.0 5.0 L 177.0 5.0 L 195.0 23.0 L 195.0 177.0 L 177.0 195.0 L 5.0 195.0 Z")
  E = @("M 5.0 0.0 L 5.0 200.0 M 0.0 5.0 L 200.0 5.0 M 0.0 100.0 L 200.0 100.0 M 0.0 195.0 L 200.0 195.0")
  F = @("M 5.0 0.0 L 5.0 200.0 M 0.0 5.0 L 200.0 5.0 M 0.0 100.0 L 200.0 100.0")
  G = @("M 195.0 100.0 L 195.0 195.0 L 5.0 195.0 L 5.0 5.0 L 195.0 5.0","M 100.0 100.0 L 195.0 100.0")
  H = @("M 5.0 0.0 L 5.0 200.0 M 195.0 0.0 L 195.0 200.0 M 0.0 100.0 L 200.0 100.0")
  I = @("M 0.0 5.0 L 200.0 5.0 M 100.0 0.0 L 100.0 200.0 M 0.0 195.0 L 200.0 195.0")
  J = @("M 195.0 0.0 L 195.0 200.0 M 0.0 195.0 L 200.0 195.0 M 5.0 195.0 L 5.0 100.0")
  L = @("M 5.0 0.0 L 5.0 195.0 L 200.0 195.0")
  M = @("M 5.0 195.0 L 5.0 5.0 L 97.5 97.5 L 102.5 97.5 L 195.0 5.0 L 195.0 195.0","M 100.0 97.5 L 100.0 100.0")
  N = @("M 5.0 200.0 L 5.0 5.0 L 195.0 195.0 L 195.0 200.0","M 5.0 5.0 L 5.0 0.0","M 195.0 195.0 L 195.0 0.0")
  O = @("M 23.0 5.0 L 177.0 5.0 L 195.0 23.0 L 195.0 177.0 L 177.0 195.0 L 23.0 195.0 L 5.0 177.0 L 5.0 23.0 Z")
  P = @("M 5.0 0.0 L 5.0 200.0","M 5.0 5.0 L 195.0 5.0 L 195.0 100.0 L 5.0 100.0")
  Q = @("M 23.0 5.0 L 177.0 5.0 L 195.0 23.0 L 195.0 177.0 L 177.0 195.0 L 23.0 195.0 L 5.0 177.0 L 5.0 23.0 Z","M 100.0 100.0 L 195.0 195.0")
  R = @("M 5.0 0.0 L 5.0 200.0","M 5.0 5.0 L 195.0 5.0 L 195.0 100.0 L 5.0 100.0","M 100.0 100.0 L 195.0 195.0")
  S = @("M 200.0 5.0 L 0.0 5.0 M 5.0 5.0 L 5.0 100.0 M 0.0 100.0 L 200.0 100.0 M 195.0 100.0 L 195.0 195.0 M 0.0 195.0 L 200.0 195.0")
  T = @("M 0.0 5.0 L 200.0 5.0 M 100.0 0.0 L 100.0 200.0")
  U = @("M 5.0 0.0 L 5.0 200.0","M 195.0 0.0 L 195.0 200.0","M 5.0 195.0 L 195.0 195.0")
  V = @("M 5 0 L 100 200 L 195 0")
  X = @("M 5.0 5.0 L 195.0 195.0 M 195.0 5.0 L 5.0 195.0")
  Z = @("M 5.0 5.0 L 195.0 5.0 L 5.0 195.0 L 195.0 195.0")
}

# ── Rasterize SVG path to pixel set ───────────────────────────
function Get-LetterPixels([string[]]$paths, [int]$g) {
  $pix = @{}
  foreach ($pathStr in $paths) {
    $tokens = $pathStr -split '\s+' | Where-Object { $_ -ne '' }
    $i=0; $cx=0.0; $cy=0.0; $sx=0.0; $sy=0.0
    while ($i -lt $tokens.Count) {
      $cmd=$tokens[$i]; $i++
      if ($cmd -eq 'M')  { $cx=[double]$tokens[$i]; $cy=[double]$tokens[$i+1]; $i+=2; $sx=$cx; $sy=$cy }
      elseif ($cmd -eq 'L' -or $cmd -eq 'Z') {
        if ($cmd -eq 'Z') { $x1=$sx; $y1=$sy } else { $x1=[double]$tokens[$i]; $y1=[double]$tokens[$i+1]; $i+=2 }
        $x0g=[int]([Math]::Round($cx/200.0*($g-1))); $y0g=[int]([Math]::Round($cy/200.0*($g-1)))
        $x1g=[int]([Math]::Round($x1/200.0*($g-1))); $y1g=[int]([Math]::Round($y1/200.0*($g-1)))
        $dx=[Math]::Abs($x1g-$x0g); $dy=[Math]::Abs($y1g-$y0g)
        $dsx=if($x0g-le$x1g){1}else{-1}; $dsy=if($y0g-le$y1g){1}else{-1}
        $err=$dx-$dy; $px=$x0g; $py=$y0g
        for ($k=0;$k-lt($dx+$dy+2);$k++) {
          $pix["$px,$py"]=1
          if ($px-eq$x1g -and $py-eq$y1g) { break }
          $e2=2*$err
          if ($e2-gt-$dy){$err-=$dy;$px+=$dsx}
          if ($e2-lt$dx){$err+=$dx;$py+=$dsy}
        }
        $cx=$x1; $cy=$y1
      }
    }
  }
  return $pix
}

Write-Host "Computing letter pixel sets..."
$lpix = @{}
foreach ($l in $LETTERS_PATHS.Keys) { $lpix[$l] = Get-LetterPixels $LETTERS_PATHS[$l] $GRID }

Write-Host "Computing Jaccard similarity matrix..."
$lkeys = $LETTERS_PATHS.Keys | Sort-Object
$SIM = @{}    # SIM[a][b] = jaccard(a,b)
foreach ($a in $lkeys) { $SIM[$a] = @{} }   # pre-init all sub-hashtables
foreach ($a in $lkeys) {
  foreach ($b in $lkeys) {
    if ($a -eq $b) { $SIM[$a][$b] = 1.0; continue }
    if ($SIM.ContainsKey($b) -and $SIM[$b].ContainsKey($a)) { $SIM[$a][$b] = $SIM[$b][$a]; continue }
    $inter=0; foreach ($k in $lpix[$a].Keys) { if ($lpix[$b].ContainsKey($k)) { $inter++ } }
    $union=$lpix[$a].Count+$lpix[$b].Count-$inter
    $SIM[$a][$b] = if ($union -gt 0) { [Math]::Round([double]$inter/$union,4) } else { 0.0 }
    $SIM[$b][$a] = $SIM[$a][$b]
  }
}
Write-Host "  Done. Top pairs:"
$rawpairs = @()
foreach ($a in $lkeys) { foreach ($b in $lkeys) { if ([string]$a -lt [string]$b) { $rawpairs += [PSCustomObject]@{p="$a-$b";j=$SIM[$a][$b]} } } }
$rawpairs | Sort-Object j -Desc | Select -First 10 | ForEach-Object { Write-Host ("  {0,-5} {1:F3}" -f $_.p,$_.j) }

# ── Normalize Portuguese word (lowercase accented → uppercase plain) ──
function Normalize-Word([string]$w) {
  return ($w.ToUpper() `
    -replace '[ÁÀÃÂÄ]','A' `
    -replace '[ÉÈÊË]','E' `
    -replace '[ÍÌÎÏ]','I' `
    -replace '[ÓÒÔÕÖ]','O' `
    -replace '[ÚÙÛÜ]','U' `
    -replace 'Ç','C' `
    -replace 'Ñ','N')
}

# ── Compute SV (new formula: all positional pairs, inverse direction) ──
function Compute-SV([string]$word) {
  $ls = $word.ToUpper().ToCharArray() | Where-Object { $SIM.ContainsKey([string]$_) }
  $n = $ls.Count
  if ($n -le 1) { return 47.0 }
  $sumOverlap = 0.0; $numPairs = 0
  for ($i=0; $i -lt $n-1; $i++) {
    for ($j=$i+1; $j -lt $n; $j++) {
      $a=[string]$ls[$i]; $b=[string]$ls[$j]
      if ($a -eq $b) { $sumOverlap += 1.0 }
      elseif ($SIM[$a][$b]) { $sumOverlap += $SIM[$a][$b] }
      $numPairs++
    }
  }
  $avgOvlp = $sumOverlap / $numPairs
  $nUniq = ($ls | Sort-Object -Unique).Count
  return [Math]::Round(45.0 + (1.0 - $avgOvlp)*35.0 + $nUniq*2.0, 1)
}

# ── SV thresholds (calibrated for new formula) ─────────────────
# Sample calibration:
$samples = @("MESA","PELE","MEIA","CAFE","AMOR","CLUBE","FACIL","FORTE","ESTRELA","PROPRIO")
Write-Host "`nSV calibration:"
$samples | ForEach-Object { Write-Host ("  {0,-10} SV={1}" -f $_, (Compute-SV $_)) }

# Thresholds calibrated to new formula's output range (~50-90)
function Get-SvFlag([double]$sv) {
  if ($sv -ge 80) { return "sv_alto" }
  if ($sv -ge 68) { return "sv_medio" }
  if ($sv -lt 60) { return "sv_baixo" }
  return $null
}

# ── Accent normalization lookup (lowercase → uppercase w/o accents) ──
function Simple-Normalize([string]$w) {
  $s = $w.ToUpper()
  $s = $s -replace 'Á','A' -replace 'À','A' -replace 'Ã','A' -replace 'Â','A'
  $s = $s -replace 'É','E' -replace 'È','E' -replace 'Ê','E'
  $s = $s -replace 'Í','I' -replace 'Ì','I' -replace 'Î','I'
  $s = $s -replace 'Ó','O' -replace 'Ò','O' -replace 'Ô','O' -replace 'Õ','O'
  $s = $s -replace 'Ú','U' -replace 'Ù','U' -replace 'Û','U'
  $s = $s -replace 'Ç','C'
  $s = $s -replace 'Ñ','N'
  return $s
}

# ── Load existing BANCO words ──────────────────────────────────
Write-Host "`nLoading existing BANCO..."
$curadoriaPath = Join-Path $BASE "curadoria.html"
$curFile = [System.IO.File]::ReadAllText($curadoriaPath)
$bancoMatch = [regex]::Match($curFile, 'const BANCO = (\{.*?\});')
if (-not $bancoMatch.Success) {
  # Try multiline
  $bancoMatch = [regex]::Match($curFile, 'const BANCO = (\{[\s\S]*?\});[\r\n\s]*// ── LETTERS')
}
# Extract all "w":"WORD" entries
$existingWords = @{}
[regex]::Matches($curFile, '"w":"([A-Z]+)"') | ForEach-Object { $existingWords[$_.Groups[1].Value] = 1 }
Write-Host "  Found $($existingWords.Count) existing words in BANCO"

# ── Load ICF data ──────────────────────────────────────────────
Write-Host "Loading ICF data..."
$icfPath = Join-Path $BASE "data\icf.txt"
$icfLines = [System.IO.File]::ReadAllLines($icfPath)
$ICF = @{}
foreach ($line in $icfLines) {
  if ($line -match '^([^,]+),(\d+[\.,]\d+)$') {
    $w = $matches[1].Trim()
    $score = [double]($matches[2] -replace ',','.')
    $ICF[$w] = $score
  }
}
Write-Host "  Loaded $($ICF.Count) ICF entries"

# ── Load verbos (infinitives) ──────────────────────────────────
Write-Host "Loading verbos..."
$verbosPath = Join-Path $BASE "data\verbos.txt"
$verbosLines = [System.IO.File]::ReadAllLines($verbosPath)
$VERBOS = @{}
foreach ($v in $verbosLines) { if ($v.Trim() -ne '') { $VERBOS[$v.Trim().ToLower()] = 1 } }
Write-Host "  Loaded $($VERBOS.Count) infinitive verbs"

# ── Load lexicon ───────────────────────────────────────────────
Write-Host "Loading lexicon..."
$lexPath = Join-Path $BASE "data\lexico_ptbr.txt"
$lexLines = [System.IO.File]::ReadAllLines($lexPath)
Write-Host "  Total lexicon entries: $($lexLines.Count)"

# ── Compute flags for a word ───────────────────────────────────
function Compute-Flags([string]$wordUpper, [string]$wordLower, [double]$sv) {
  $flags = @()
  
  # ICF flag
  $icfKey = $wordLower
  $icfScore = $null
  if ($ICF.ContainsKey($icfKey)) { $icfScore = $ICF[$icfKey] }
  else {
    # Try without accents? No — ICF uses accented lowercase
    $flags += "sem_icf"
  }
  if ($null -ne $icfScore) {
    if ($icfScore -le 8.0)      { $flags += "icf_muito_comum" }
    elseif ($icfScore -le 9.5)  { $flags += "icf_comum" }
    elseif ($icfScore -le 11.0) { $flags += "icf_moderado" }
    elseif ($icfScore -le 12.5) { $flags += "icf_pouco_comum" }
    else                        { $flags += "icf_raro" }
  }
  
  # Verb infinitive flag
  if ($VERBOS.ContainsKey($wordLower)) { $flags += "verbo_infinitivo" }
  
  # SV flag
  $svFlag = Get-SvFlag $sv
  if ($svFlag) { $flags += $svFlag }
  
  # Suspicious verb forms (suffix-based)
  if ($wordUpper -match '(NDO|ANDO|ENDO|INDO)$') { $flags += "suspeita_gerundio" }
  if ($wordUpper -match '(EI|EU|OU)$')            { $flags += "suspeita_preterito_perf" }
  if ($wordUpper -match '(ARA|ERA|IRA)$')          { $flags += "suspeita_futuro_subj" }
  
  return $flags
}

# ── Compute confidence from flags ─────────────────────────────
function Compute-Conf([string[]]$flags) {
  $score = 50   # base score
  foreach ($f in $flags) {
    switch ($f) {
      "icf_muito_comum"       { $score += 18 }
      "icf_comum"             { $score += 14 }
      "icf_moderado"          { $score += 8  }
      "icf_pouco_comum"       { $score += 2  }
      "icf_raro"              { $score -= 8  }
      "sem_icf"               { $score -= 5  }
      "sv_alto"               { $score += 8  }
      "sv_medio"              { $score += 4  }
      "sv_baixo"              { $score -= 5  }
      "suspeita_gerundio"     { $score -= 25 }
      "suspeita_preterito_perf"{ $score -= 20 }
      "suspeita_futuro_subj"  { $score -= 8  }
    }
  }
  return [Math]::Max(0, [Math]::Min(100, $score))
}

# ── Process lexicon words ──────────────────────────────────────
Write-Host "`nProcessing new candidates..."

$newWords = @()
$skipped = 0
$added = 0

foreach ($lw in $lexLines) {
  $lw = $lw.Trim().ToLower()
  if ($lw -eq '') { $skipped++; continue }
  
  # Length filter: 4-7 chars
  $len = $lw.Length
  if ($len -lt 4 -or $len -gt 7) { $skipped++; continue }
  
  # Uppercase normalize (for dedup)
  $wu = Simple-Normalize $lw
  
  # Must consist of only letters A-Z after normalization
  if ($wu -notmatch '^[A-Z]{4,7}$') { $skipped++; continue }
  
  # Must match length (no change in length from normalization)
  if ($wu.Length -ne $len) { $skipped++; continue }
  
  # Skip if already in BANCO
  if ($existingWords.ContainsKey($wu)) { $skipped++; continue }
  
  # Compute SV
  $sv = Compute-SV $wu
  
  # Compute flags + conf
  $flags = Compute-Flags $wu $lw $sv
  $conf = Compute-Conf $flags

  # Filter: require minimum confidence (icf_moderado baseline with no penalty = 58)
  if ($conf -lt 58) { $skipped++; continue }
  
  # Assign nivel by length
  $nivel = switch ($len) {
    4 { "facil" }
    5 { "medio" }
    6 { "dificil" }
    7 { "muito_dificil" }
  }
  
  $newWords += [PSCustomObject]@{
    w = $wu
    sv = $sv
    conf = $conf
    flags = $flags
    nivel = $nivel
    len = $len
  }
  $added++
}

Write-Host "  Candidates added: $added, skipped: $skipped"

# ── Group by nivel ─────────────────────────────────────────────
$byNivel = @{ facil=@(); medio=@(); dificil=@(); muito_dificil=@() }
foreach ($w in $newWords) { $byNivel[$w.nivel] += $w }
Write-Host "  New candidates per level:"
foreach ($n in @("facil","medio","dificil","muito_dificil")) {
  Write-Host ("    {0,-15} {1}" -f $n, $byNivel[$n].Count)
}

# ── Recompute SV for EXISTING BANCO entries ────────────────────
Write-Host "`nRecomputing SV for existing BANCO entries..."
# Parse existing BANCO JSON
$bancoJsonMatch = [regex]::Match($curFile, 'const BANCO = (\{[\s\S]*?\});[\r\n]*')
$bancoJson = $null
# Try to get the BANCO JSON by line extraction
$lines = [System.IO.File]::ReadAllLines($curadoriaPath)
$scriptStart = -1
for ($i=0; $i -lt $lines.Count; $i++) {
  if ($lines[$i] -match '^const BANCO\s*=') { $scriptStart = $i; break }
}

if ($scriptStart -ge 0) {
  # BANCO is on one or more lines starting at scriptStart
  $bancoText = $lines[$scriptStart]
  # Check if it ends with ; on same line
  $bracketCount = 0
  $inStr = $false
  $bancoObj = $null
  try {
    # Add dummy JS context and eval via PowerShell JSON parse
    # Extract just the JSON object
    $startBrace = $bancoText.IndexOf('{')
    if ($startBrace -ge 0) {
      $jsonStr = $bancoText.Substring($startBrace)
      # Remove trailing '; if present
      $jsonStr = $jsonStr -replace ';\s*$',''
      $bancoObj = $jsonStr | ConvertFrom-Json
    }
  } catch {}
  
  if ($bancoObj) {
    Write-Host "  Successfully parsed existing BANCO JSON"
    # Recompute SV for each word and rebuild
    $updatedBanco = @{ facil=@(); medio=@(); dificil=@(); muito_dificil=@() }
    foreach ($nivel in @("facil","medio","dificil","muito_dificil")) {
      $entries = $bancoObj.$nivel
      foreach ($entry in $entries) {
        $newSv = Compute-SV $entry.w
        $updatedEntry = [PSCustomObject]@{
          w = $entry.w
          sv = $newSv
          conf = $entry.conf
          flags = @($entry.flags)
        }
        # Update SV flag — @() wrapper prevents scalar unboxing when only 1 element remains
        $oldFlags = @(@($entry.flags) | Where-Object { $_ -notmatch '^sv_' })
        $svFlag = Get-SvFlag $newSv
        if ($svFlag) { $oldFlags = $oldFlags + $svFlag }
        $updatedEntry.flags = $oldFlags
        $updatedBanco[$nivel] += $updatedEntry
      }
    }
    Write-Host "  Done recomputing existing entries"
  } else {
    Write-Host "  WARNING: Could not parse existing BANCO, keeping originals"
    $updatedBanco = $null
  }
}

# ── Combine: existing (recomputed) + new candidates ───────────
Write-Host "`nBuilding final BANCO..."

# Sort new candidates by conf desc within each level
foreach ($n in @("facil","medio","dificil","muito_dificil")) {
  $byNivel[$n] = @($byNivel[$n] | Sort-Object conf -Desc)
}

# Build combined BANCO
$finalBanco = @{}
foreach ($nivel in @("facil","medio","dificil","muito_dificil")) {
  $existing = if ($updatedBanco -and $updatedBanco[$nivel]) { @($updatedBanco[$nivel]) } else { @() }
  $new = @($byNivel[$nivel])
  $combined = @($existing) + @($new)
  $finalBanco[$nivel] = $combined
  Write-Host ("  {0,-15} existing={1} new={2} total={3}" -f $nivel, $existing.Count, $new.Count, $combined.Count)
}

# ── Serialize to JSON ──────────────────────────────────────────
Write-Host "`nSerializing BANCO to JSON..."

function To-JsonEntry([PSCustomObject]$e) {
  $flagsStr = ($e.flags | ForEach-Object { '"'+$_+'"' }) -join ","
  return '{"w":"'+$e.w+'","sv":'+$e.sv+',"conf":'+$e.conf+',"flags":['+$flagsStr+']}'
}

$bancoLines = @()
foreach ($nivel in @("facil","medio","dificil","muito_dificil")) {
  $entries = $finalBanco[$nivel] | ForEach-Object { To-JsonEntry $_ }
  $bancoLines += '"'+$nivel+'":[' + ($entries -join ',') + ']'
}
$bancoJson = '{' + ($bancoLines -join ',') + '}'

$outPath = Join-Path $BASE "data\banco_novo.json"
[System.IO.File]::WriteAllText($outPath, $bancoJson, [System.Text.Encoding]::UTF8)
Write-Host "Saved final BANCO to data\banco_novo.json"
Write-Host "Total new candidates: $($newWords.Count)"

# ── Also output the JS similarity matrix for embedding in curadoria.html ──
Write-Host "`nGenerating JS letter similarity matrix..."
$jsSim = "const LETTER_SIM = {"
foreach ($a in $lkeys) {
  $row = @()
  foreach ($b in $lkeys) { $row += $b+":[Math]::Round($($SIM[$a][$b]),3)" }
  # Actually output as plain object
  $rowStr = ($lkeys | ForEach-Object { $_+":"+[Math]::Round($SIM[$a][$_],3) }) -join ","
  $jsSim += "`n  $a"+":{"+$rowStr+"},"
}
$jsSim += "`n};"
$jsSimPath = Join-Path $BASE "data\letter_sim.js"
[System.IO.File]::WriteAllText($jsSimPath, $jsSim, [System.Text.Encoding]::UTF8)
Write-Host "Saved JS similarity matrix to data\letter_sim.js"
Write-Host "`nDone!"
