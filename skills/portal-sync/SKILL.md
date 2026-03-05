---
name: portal-sync
description: Sincroniza o conteúdo dos roteiros em Markdown (DIA_*.md) com o Portal Next.js (Knowledge Base e Itinerary). Use esta skill para atualizar as informações do site, gerar novos itens de mapa automaticamente ou corrigir discrepâncias entre o planejamento e o app.
---

# Portal Sync Skill

Esta skill garante que o **Roteiro de Planejamento** (arquivos Markdown na pasta `Dropbox/.../Viagem`) seja a "Fonte da Verdade" (Source of Truth) para o **Portal da Viagem**.

## 🔄 Fluxo de Sincronização

1.  **Ler Fonte:** O agente lê os arquivos `DIA_X_*.md`.
2.  **Extrair Entidades:** Identifica Hotéis, Restaurantes e Atividades mencionados.
3.  **Gerar/Atualizar Item:** Cria ou atualiza o arquivo correspondente em `portal/content/items/[slug].md`.
    *   *Frontmatter:* type, locations, cost, rating, tags, map (lat/lng).
4.  **Atualizar Itinerário:** Atualiza `portal/lib/itinerary.ts` se houver mudança na logística do dia.

## 🗺️ Mapa Interativo (Requisito Novo)

Para alimentar o Mapa Interativo, todo item criado **DEVE** ter coordenadas:

```yaml
---
title: Radisson RED V&A Waterfront
type: Accommodation
locations: [Cape Town]
map:
  lat: -33.908
  lng: 18.422
---
```

## 🛠️ Comandos Úteis (Manual Trigger)

Se você precisar forçar uma sincronização de um arquivo específico:

1.  **Leia o Markdown:** `view_file DIA_16_MAR_CAPETOWN.md`
2.  **Extraia os Locais:** (Ex: Pullman, Radisson, Den Anker).
3.  **Verifique se existem:** `list_dir portal/content/items`
4.  **Crie os faltantes:** `write_to_file portal/content/items/hotel-pullman.md`
5.  **Atualize o Lat/Lng:** Use `search_web` para pegar as coordenadas exatas se não tiver.

## 📂 Estrutura de Pastas

*   **Fonte:** `../DIA_*.md`
*   **Destino (Itens):** `../portal/content/items/*.md`
*   **Destino (Itinerário):** `../portal/lib/itinerary.ts`

---
**Nota:** Em breve, implementaremos um script `sync.js` para fazer isso via CLI. Por enquanto, o agente executa o processo seguindo este guia.
