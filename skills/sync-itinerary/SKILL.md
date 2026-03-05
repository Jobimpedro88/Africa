---
name: sync-itinerary
description: Automates the synchronization between the master markdown itinerary, the portal's code (itinerary.ts), and the content library. Ensures all items have files and coordinates.
---

# Sync Itinerary Skill

This skill is designed to keep the `portal` application in sync with the high-level planning documents. Use it whenever the user updates `Roteiro_Viagem_Africa_2026.md` or asks to "sync" the itinerary.

## Workflow

### 1. Parse Master Itinerary
- **Source**: `c:/Users/jober/Dropbox/Projetos Antigravity/Viagem/Roteiro_Viagem_Africa_2026.md`
- **Action**: Read the file and extract the day-by-day plan.
- **Identify**:
  - Day Number
  - Date
  - Location
  - Summary
  - Main Activities (Selected Items)
  - Alternative Options

### 2. Update Codebase
- **Target**: `c:/Users/jober/Dropbox/Projetos Antigravity/Viagem/portal/lib/itinerary.ts`
- **Action**: Update the `masterItinerary` array with the parsed data.
- **Rule**: Ensure item slugs are consistent (kebab-case).

### 3. Content Audit & Creation
- **Target Dir**: `c:/Users/jober/Dropbox/Projetos Antigravity/Viagem/portal/content/items`
- **Action**: 
  - For every slug in `itinerary.ts`, check if a corresponding `.md` file exists.
  - **If Missing**: Create a new `.md` file with basic frontmatter.
    ```markdown
    ---
    title: "Title from Itinerary"
    type: "Activity" # Infer from context if possible
    locations: ["Inferred Location"]
    coordinates: null
    tags: ["New"]
    checklist: false
    ---
    *Auto-generated item.*
    ```

### 4. Data Enrichment (The "Magic" Step)
- **Action**: Scan all files in `content/items` where `coordinates` are null.
- **For Each Missing Coordinate**:
  - Use `search_web` to find the latitude/longitude.
  - Update the `.md` file with the found coordinates.
  - **Format**:
    ```yaml
    coordinates:
      lat: -26.12345
      lng: 28.12345
    ```

## Example Commands
- "Sync the itinerary please"
- "I updated the markdown, refresh the portal"
- "Check for missing coordinates"
