# Banco de Palavras glif.foo — Relatório de Curadoria

## Resultado

| Nível           | Comprimento | Quantidade | Semanas |
| --------------- | ----------- | ---------- | ------- |
| `facil`         | 4 letras    | 400        | ~57     |
| `medio`         | 5 letras    | 400        | ~57     |
| `dificil`       | 6 letras    | 371        | ~53     |
| `muito_dificil` | 7 letras    | 300        | ~43     |
| **Total**       |             | **1.471**  |         |

## Dicionário de Validação

| Tamanho   | Entradas extras |
| --------- | --------------- |
| 4L        | ~473            |
| 5L        | ~963            |
| 6L        | ~1.977          |
| 7L        | ~3.166          |
| **Total** | **~6.579**      |

## Metodologia

1. **Fonte**: Repositório [fserb/pt-br](https://github.com/fserb/pt-br)
   - `icf`: 419k palavras com score de frequência (ICF baixo = mais comum)
   - `lexico`: 145k palavras do léxico PT-BR
   - `listas/negativas`: 673 palavras ofensivas excluídas

2. **Filtros aplicados**:
   - 4–7 letras apenas
   - Sem acentos (normalizado NFKD)
   - Apenas letras A–Z
   - Sem K, W, Y (indicadores de estrangeirismo)
   - ICF thresholds: facil≤11.5, medio≤11.0, dificil≤12.0, muito_dificil≤12.5
   - Lista extensa de exclusões: funcionais, anglicismos, nomes próprios, formas verbais

3. **Classificação**:
   - **Nível = comprimento da palavra** (principal)
   - ICF baixo = palavras mais comuns = entram primeiro no banco
   - scoreVisual como desempate (glifos mais complexos preferidos)

4. **Seed manual**: 263 palavras do xlsx curado (`glyph_palavras_ptbr_v2.xlsx`) como base de qualidade

## Arquivos Gerados

- `word_bank_final.json` — banco completo com palavras + dicionário
- `words_ptbr_year.json` — 365 dias (2026-03-07 a 2027-03-06), seed determinístico
- `palavras_js.txt` — bloco JS para `index.html` (PALAVRAS + DICIONARIO)
- `palavras_ts.txt` — bloco TS para Edge Function `index.ts`

## Próximos Passos

1. Substituir banco no `index.html` (seção `const PALAVRAS = {`)
2. Substituir banco no `index.ts` (Edge Function Supabase)
3. Ambos devem usar **exatamente o mesmo banco** (sincronizados)
4. Dicionário: `dicionarioValido(word)` deve usar DICIONARIO para **todos os tamanhos** (hoje só 5L)
5. Hospedar `words_ptbr_year.json` no Supabase para consulta pela Edge Function
