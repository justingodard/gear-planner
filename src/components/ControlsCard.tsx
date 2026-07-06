import { Slider } from '@base-ui/react/slider';
import { Tabs } from '@base-ui/react/tabs';
import { Toggle } from '@base-ui/react/toggle';
import { ToggleGroup } from '@base-ui/react/toggle-group';

const LENGTH_OPTIONS: { value: 1 | 2 | 3; label: string }[] = [
  { value: 1, label: 'Day' },
  { value: 2, label: 'Overnight' },
  { value: 3, label: 'Multi-night' },
];

export interface Conditions {
  bugs: boolean;
  night: boolean;
  wind: boolean;
  rain: boolean;
}

const CONDITION_CHIPS: { key: keyof Conditions; label: string }[] = [
  { key: 'bugs', label: 'Bugs' },
  { key: 'night', label: 'Night' },
  { key: 'wind', label: 'Wind' },
  { key: 'rain', label: 'Rain' },
];

interface ControlsCardProps {
  len: 1 | 2 | 3;
  onLenChange: (len: 1 | 2 | 3) => void;
  minTemp: number;
  maxTemp: number;
  onTempChange: (minTemp: number, maxTemp: number) => void;
  conditions: Conditions;
  onConditionsChange: (conditions: Conditions) => void;
  checkedCount: number;
  total: number;
}

export function ControlsCard({
  len,
  onLenChange,
  minTemp,
  maxTemp,
  onTempChange,
  conditions,
  onConditionsChange,
  checkedCount,
  total,
}: ControlsCardProps) {
  const pct = total ? Math.round((checkedCount / total) * 100) : 0;
  const activeConditionValues = CONDITION_CHIPS.filter((c) => conditions[c.key]).map((c) => c.key);

  return (
    <div className="card">
      <div className="field">
        <div className="flabel">Length</div>
        <Tabs.Root value={len} onValueChange={(value) => onLenChange(value as 1 | 2 | 3)}>
          <Tabs.List className="lentabs">
            {LENGTH_OPTIONS.map(({ value, label }) => (
              <Tabs.Tab key={value} value={value} className="lentab">
                {label}
              </Tabs.Tab>
            ))}
            <Tabs.Indicator className="lentab-indicator" />
          </Tabs.List>
        </Tabs.Root>
      </div>

      <div className="field">
        <div className="frow">
          <div className="flabel" style={{ margin: 0 }}>
            Temperature
          </div>
          <span className="tempval">
            {minTemp}°C-{maxTemp}°C
          </span>
        </div>
        <Slider.Root
          className="dualslider"
          min={10}
          max={40}
          step={1}
          value={[minTemp, maxTemp]}
          onValueChange={(value) => {
            const [newMin, newMax] = value as number[];
            onTempChange(newMin, newMax);
          }}
        >
          <Slider.Control className="slider-control">
            <Slider.Track className="slider-track dual-track">
              <Slider.Indicator className="slider-indicator dual-indicator" />
              <Slider.Thumb index={0} className="slider-thumb dual-thumb" aria-label="Minimum temperature" />
              <Slider.Thumb index={1} className="slider-thumb dual-thumb" aria-label="Maximum temperature" />
            </Slider.Track>
          </Slider.Control>
        </Slider.Root>
        <div className="ticks">
          <span>10°C</span>
          <span>40°C</span>
        </div>
      </div>

      <div className="field">
        <div className="flabel">Conditions</div>
        <ToggleGroup
          className="chiprow"
          multiple
          value={activeConditionValues}
          onValueChange={(value) => {
            const next: Conditions = { bugs: false, night: false, wind: false, rain: false };
            value.forEach((v) => {
              next[v as keyof Conditions] = true;
            });
            onConditionsChange(next);
          }}
        >
          {CONDITION_CHIPS.map((chip) => (
            <Toggle key={chip.key} className="chip" value={chip.key}>
              {chip.label}
            </Toggle>
          ))}
        </ToggleGroup>
      </div>

      <div className="progressrow">
        <div className="pbartrack">
          <div className="pbarfill" style={{ width: `${pct}%` }} />
        </div>
        <span className="ptext">
          {checkedCount}/{total} packed
        </span>
      </div>
    </div>
  );
}
