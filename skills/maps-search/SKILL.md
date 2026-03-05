---
name: maps-search
description: Search for a location on Google Maps and return the correct URL and coordinates.
---

# Maps Search Skill

This skill allows you to find the correct Google Maps URL and coordinates (lat/lng) for a specific place. It is useful for verifying location data in travel itineraries.

## Usage

You can use this skill to:
1.  **Find a Google Maps Link:** Get the shareable `https://www.google.com/maps/place/...` link.
2.  **Get Coordinates:** Retrieve the latitude and longitude for the map component.

## How to use

Since I don't have direct access to the Google Maps API, this skill uses a **Browser Search Strategy**.

1.  **Search Query:** Use the `search_web` tool with the query `google maps [Place Name] [City]`.
2.  **Extract:** Look for the URL in the search results or snippet.
    *   *Pattern:* `google.com/maps/place/...`
3.  **Coordinate Extraction (if needed):**
    *   If you open the URL with the browser tool, you can extract coordinates from the URL structure `@-33.918,18.423`.

## Example Workflow (Manual)

To find "Radisson RED Cape Town":
1.  `search_web(query="google maps Radisson RED V&A Waterfront Cape Town")`
2.  Result might contain: `https://www.google.com/maps/place/Radisson+RED+V%26A+Waterfront,+Cape+Town/@-33.9070808,18.4208756,17z/...`
3.  **Extracted Link:** `https://www.google.com/maps/place/Radisson+RED+V%26A+Waterfront,+Cape+Town`
4.  **Extracted Coords:** `-33.9070808`, `18.4208756`

## Automation (Planned)

In the future, we can write a script `maps_lookup.py` using `selenium` or `playwright` to automate this extraction if we have thousands of items. For now, use the agentic tool workflow described above.
