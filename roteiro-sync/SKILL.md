---
name: roteiro-sync
description: Syncs ROTEIRO_V5_FINAL.md with the portal's itinerary.ts. Automatically extracts events, creates synthetic library items, finds missing links (Google Maps, Hoteis.com, Official Sites, YouTube), and marks items as Confirmado (✅/🥇/Pago) or Previsto (⏳/❌/Pesquisar), updating both the Homepage map and the Library. Use when the user modifies ROTEIRO_V5_FINAL.md and wants the website updated.
---

# Roteiro Sync Skill

This skill automates the synchronization between the user's master Markdown file (`ROTEIRO_V5_FINAL.md`) and the Next.js Portal's data source (`portal/lib/itinerary.ts`). 

## Context
The user modifies `ROTEIRO_V5_FINAL.md` as their primary planning document. The Next.js application imports its data from `portal/lib/itinerary.ts`. This skill bridges the gap, ensuring the website (Homepage Accordion and the Acervo/Library) perfectly reflects the Markdown document.

## Workflow

When the user asks to sync the roteiro, follow these exact steps:

### 1. Analyze the Markdown Document
Use the `view_file` tool to read `ROTEIRO_V5_FINAL.md`.
Pay close attention to every day's schedule.
For every item, identify its **Status**:
- `Confirmado`: If the item has ✅, 🥇, "Confirmado", "Pago", or mentions specific confirmation codes/receipts.
- `Previsto`: If the item has ⏳, ❌, "Pesquisar", "Pendente", or is just an idea.

### 2. Find Missing Links (Enrichment)
For any place (Accommodation, Dining, Activity) that lacks explicit links in the Markdown:
1. Use the **search_web** tool to find Official Website and Hoteis.com links (or Booking.com if Hoteis.com is unavailable).
2. Use the **Google Maps MCP** tool to find the exact Google Maps URL.
3. Use the **search_web** tool to find a relevant YouTube video link (e.g., "[Place Name] tour 4k").

### 3. Update the Itinerary Data
Read the current `portal/lib/itinerary.ts` file.
Update the `masterItinerary` array with the new information.
Because `itinerary.ts` is a large file, use the `replace_file_content` or `multi_replace_file_content` tools to surgically update specific days or items. Do not attempt to replace the entire 800+ line file in one go unless absolutely necessary.
Ensure every `ScheduleEvent` object has the `status` field populated appropriately.

```typescript
export interface ScheduleEvent {
    time: string;
    title: string;
    description?: string;
    type: 'Accommodation' | 'Activity' | 'Dining' | 'Transport' | 'Tip' | 'Transit';
    slug?: string;
    youtubeLink?: string;
    bookingLink?: string;
    mapsLink?: string;
    officialLink?: string;
    price?: string;
    status?: 'Confirmado' | 'Previsto'; // The new synced field
}
```

### 4. Build and Verify
Run `npm run build` in the `portal` folder to ensure the TypeScript syntax in `itinerary.ts` is perfectly intact.
If the build fails, fix the syntax errors immediately before notifying the user.
