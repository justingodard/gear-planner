export type Tier = 'wear' | 'always' | 'pack' | 'cold' | 'long' | 'wind' | 'bugs' | 'night';

export interface GearRow {
  category: string;
  item: string;
  tier: Tier;
  notes: string;
}

export interface GearItem {
  key: string;
  text: string;
  notes: string;
  checked: boolean;
}

export interface GearCategory {
  name: string;
  items: GearItem[];
  count: number;
  checkedCount: number;
}

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQuotes) {
      if (c === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      result.push(cur);
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur);
  return result;
}

export function parseGearCsv(text: string): GearRow[] {
  const lines = text.split(/\r?\n/).filter((l) => l.length);
  const header = parseCsvLine(lines[0]).map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const vals = parseCsvLine(line);
    const obj: Record<string, string> = {};
    header.forEach((h, i) => {
      obj[h] = vals[i] !== undefined ? vals[i].trim() : '';
    });
    return {
      category: obj.category.replace(/^\+/, ''),
      item: obj.item,
      tier: obj.tier as Tier,
      notes: obj.notes ?? '',
    };
  });
}

export function itemKey(category: string, item: string): string {
  return `${category}|${item}`;
}

export function isColdActive(minTemp: number, rain: boolean): boolean {
  return minTemp <= 7 || rain;
}

export interface GearFlags {
  cold: boolean;
  wind: boolean;
  bugs: boolean;
  night: boolean;
}

export function isTierVisible(tier: Tier, len: 1 | 2 | 3, flags: GearFlags): boolean {
  switch (tier) {
    case 'wear':
    case 'always':
      return true;
    case 'pack':
      return len >= 2;
    case 'cold':
      return flags.cold;
    case 'long':
      return len >= 3;
    case 'wind':
      return flags.wind;
    case 'bugs':
      return flags.bugs;
    case 'night':
      return flags.night;
    default:
      return false;
  }
}

export function buildCategories(
  rows: GearRow[],
  len: 1 | 2 | 3,
  flags: GearFlags,
  checked: Record<string, boolean>,
): GearCategory[] {
  const byCategory = new Map<string, GearRow[]>();
  rows.forEach((row) => {
    const list = byCategory.get(row.category);
    if (list) list.push(row);
    else byCategory.set(row.category, [row]);
  });

  const categories: GearCategory[] = [];
  byCategory.forEach((categoryRows, name) => {
    const byItem = new Map<string, GearRow[]>();
    categoryRows.forEach((row) => {
      const list = byItem.get(row.item);
      if (list) list.push(row);
      else byItem.set(row.item, [row]);
    });

    const items: GearItem[] = [];
    byItem.forEach((itemRows, itemName) => {
      const qty = itemRows.filter((row) => isTierVisible(row.tier, len, flags)).length;
      if (qty === 0) return;
      const key = itemKey(name, itemName);
      const text = qty > 1 ? `${itemName} (${qty})` : itemName;
      const notes = itemRows.find((row) => row.notes)?.notes ?? '';
      items.push({ key, text, notes, checked: !!checked[key] });
    });

    if (items.length) {
      categories.push({
        name,
        items,
        count: items.length,
        checkedCount: items.filter((i) => i.checked).length,
      });
    }
  });
  return categories;
}
