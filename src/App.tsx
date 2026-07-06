import { useMemo, useState } from 'react';
import './App.css';
import { useGearRows } from './lib/useGearRows';
import { buildCategories, isColdActive } from './lib/gear';
import { ControlsCard, type Conditions } from './components/ControlsCard';
import { CategoryAccordion } from './components/CategoryAccordion';
import { InfoDialog } from './components/InfoDialog';

export default function App() {
  const { rows, loaded } = useGearRows();

  const [len, setLen] = useState<1 | 2 | 3>(2);
  const [minTemp, setMinTemp] = useState(14);
  const [maxTemp, setMaxTemp] = useState(26);
  const [conditions, setConditions] = useState<Conditions>({
    bugs: false,
    night: false,
    wind: false,
    rain: false,
  });
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const cold = isColdActive(minTemp, conditions.rain);
  const categories = useMemo(() => {
    const flags = { cold, wind: conditions.wind, bugs: conditions.bugs, night: conditions.night };
    return buildCategories(rows, len, flags, checked);
  }, [rows, len, cold, conditions.wind, conditions.bugs, conditions.night, checked]);

  const total = categories.reduce((a, c) => a + c.count, 0);
  const checkedCount = categories.reduce((a, c) => a + c.checkedCount, 0);
  const expandedNames = categories.map((c) => c.name).filter((name) => !collapsed.has(name));

  function handleToggleItem(key: string) {
    setChecked((s) => ({ ...s, [key]: !s[key] }));
  }

  function handleExpandedChange(names: string[]) {
    const allNames = categories.map((c) => c.name);
    setCollapsed(new Set(allNames.filter((name) => !names.includes(name))));
  }

  return (
    <div className="app">
      <div className="topbar frow">
        <h1>Gear Planner</h1>
        <InfoDialog />
      </div>

      {loaded ? (
        <>
          <ControlsCard
            len={len}
            onLenChange={setLen}
            minTemp={minTemp}
            maxTemp={maxTemp}
            onTempChange={(newMin, newMax) => {
              setMinTemp(newMin);
              setMaxTemp(newMax);
            }}
            conditions={conditions}
            onConditionsChange={setConditions}
            checkedCount={checkedCount}
            total={total}
          />
          <CategoryAccordion
            categories={categories}
            expandedNames={expandedNames}
            onExpandedChange={handleExpandedChange}
            onToggleItem={handleToggleItem}
          />
        </>
      ) : (
        <div className="skel">Loading gear list…</div>
      )}
    </div>
  );
}
