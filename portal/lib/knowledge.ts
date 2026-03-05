import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const ITEMS_DIR = path.join(process.cwd(), 'content/items');

export type ItemType = 'Accommodation' | 'Activity' | 'Transport' | 'Dining' | 'Tip' | 'Destination';

export interface KnowledgeItem {
  slug: string;
  title: string;
  type: ItemType;
  locations: string[];
  tags: string[];
  cost?: string;
  checklist: boolean;
  rating?: number;
  coordinates?: { lat: number; lng: number };

  // Portal 2.0 Fields
  time?: string; // e.g. "19:00" or "3h Duration"
  status?: 'Confirmado' | 'Previsto'; // Added for roteiro-sync tracking
  links?: {
    googleMaps?: string;
    booking?: string;
    menu?: string;
    official?: string;
  };
  pricing?: {
    estimated?: string; // e.g. "$50 USD"
    currency?: string;  // e.g. "USD"
  };
  details?: {
    history?: string;
    pros?: string[];
    cons?: string[];
    tips?: string;
  };
  flightInfo?: {
    status: 'booked' | 'pending';
    fileLink?: string;
  };
  visuals?: {
    youtubeUrl?: string;
  };
  connectivity?: {
    status: 'wifi' | '4g' | 'none';
    speed?: 'fast' | 'medium' | 'slow';
    description?: string;
  };

  content: string;
}

export function getAllItems(): KnowledgeItem[] {
  if (!fs.existsSync(ITEMS_DIR)) return [];

  const files = fs.readdirSync(ITEMS_DIR);
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const filePath = path.join(ITEMS_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);

      return {
        slug: file.replace('.md', ''),
        title: data.title || file.replace('.md', ''),
        type: data.type || 'Tip',
        locations: data.locations || [],
        tags: data.tags || [],
        cost: data.cost,
        checklist: data.checklist || false,
        rating: data.rating,

        coordinates: data.coordinates || null,

        // Portal 2.0 Migrations (Fallbacks)
        time: data.time || null,
        status: data.status || null,
        links: data.links || {},
        pricing: data.pricing || {},
        details: data.details || {},
        flightInfo: data.flightInfo || null,
        visuals: data.visuals || {},
        connectivity: data.connectivity || {},

        content
      };
    });
}

export function getItemsByType(type: ItemType): KnowledgeItem[] {
  return getAllItems().filter(item => item.type === type);
}

export function getItemsByLocation(location: string): KnowledgeItem[] {
  const normalizedSearch = location.toLowerCase().replace(/-/g, ' ');
  return getAllItems().filter(item =>
    item.locations.some(loc =>
      loc.toLowerCase() === location.toLowerCase() ||
      loc.toLowerCase() === normalizedSearch
    )
  );
}

export function getItemsByTag(tag: string): KnowledgeItem[] {
  return getAllItems().filter(item => item.tags.includes(tag));
}
