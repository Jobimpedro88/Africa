import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// The portal is inside /portal, so we need to go up one level to reach the markdown files
const CONTENT_DIR = path.join(process.cwd(), '../');

export interface TripDocument {
  slug: string;
  title: string;
  content: string;
  data: { [key: string]: any };
}

export const getTripDocument = (filename: string): TripDocument | null => {
  try {
    const filePath = path.join(CONTENT_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // Extract title from the first line if not in frontmatter
    let title = filename.replace('.md', '').replace(/_/g, ' ');
    const firstLine = content.split('\n')[0];
    if (firstLine.startsWith('# ')) {
      title = firstLine.replace('# ', '');
    }

    return {
      slug: filename.replace('.md', ''),
      title,
      content,
      data,
    };
  } catch (error) {
    console.error(`Error reading file ${filename}:`, error);
    return null;
  }
};

export const getAllTripDocuments = (): string[] => {
  try {
    const files = fs.readdirSync(CONTENT_DIR);
    return files.filter((file) => file.endsWith('.md'));
  } catch (error) {
    console.error('Error listing files:', error);
    return [];
  }
};

// Parser for the Itinerary specifically
export interface ItineraryDay {
  day: string;
  location: string;
  activities: string;
  accommodation: string;
}

export const parseItineraryTable = (content: string): ItineraryDay[] => {
  const lines = content.split('\n');
  const tableLines = lines.filter(line => line.startsWith('|') && !line.includes('---'));
  // Skip header
  const dataLines = tableLines.slice(2);

  return dataLines.map(line => {
    const parts = line.split('|').map(p => p.trim()).filter(p => p !== '');
    if (parts.length < 4) return null;
    return {
      day: parts[0].replace(/\*\*/g, ''),
      location: parts[1],
      activities: parts[2],
      accommodation: parts[3]
    };
  }).filter(d => d !== null) as ItineraryDay[];
};

export interface BudgetRole {
  item: string;
  estimate: string;
  obs: string;
}

export const parseBudgetTable = (content: string): BudgetRole[] => {
  const lines = content.split('\n');
  // Find the budget table section
  const startIdx = lines.findIndex(l => l.includes('Breakdown do Budget'));
  if (startIdx === -1) return [];

  const tableLines = lines.slice(startIdx).filter(line => line.startsWith('|') && !line.includes('---') && !line.includes('Item'));

  return tableLines.map(line => {
    const parts = line.split('|').map(p => p.trim()).filter(p => p !== '');
    if (parts.length < 2) return null;
    return {
      item: parts[0].replace(/\*\*/g, ''),
      estimate: parts[1],
      obs: parts[2] || ''
    };
  }).filter(d => d !== null) as BudgetRole[];
};

export interface StrategyRole {
  stage: string;
  style: string;
  cost: string;
  strategy: string;
}

export const parseStrategyTable = (content: string): StrategyRole[] => {
  const lines = content.split('\n');
  // Find the strategy table section
  const startIdx = lines.findIndex(l => l.includes('Estratégia "High-Low"'));
  if (startIdx === -1) return [];

  const tableLines = lines.slice(startIdx).filter(line => line.startsWith('|') && !line.includes('---') && !line.includes('Etapa'));

  return tableLines.map(line => {
    const parts = line.split('|').map(p => p.trim()).filter(p => p !== '');
    if (parts.length < 4) return null;
    return {
      stage: parts[0].replace(/\*\*/g, ''),
      style: parts[1].replace(/\*\*/g, ''),
      cost: parts[2],
      strategy: parts[3]
    };
  }).filter(d => d !== null) as StrategyRole[];
};
