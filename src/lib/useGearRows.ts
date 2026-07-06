import { useEffect, useState } from 'react';
import { parseGearCsv, type GearRow } from './gear';

const CSV_URL = './gear.csv';

export function useGearRows() {
  const [rows, setRows] = useState<GearRow[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(CSV_URL)
      .then((r) => r.text())
      .then((text) => {
        setRows(parseGearCsv(text));
        setLoaded(true);
      })
      .catch(() => {
        setLoaded(true);
      });
  }, []);

  return { rows, loaded };
}
