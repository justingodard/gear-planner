import { Accordion } from '@base-ui/react/accordion';
import type { GearCategory } from '../lib/gear';

interface CategoryAccordionProps {
  categories: GearCategory[];
  expandedNames: string[];
  onExpandedChange: (names: string[]) => void;
  onToggleItem: (key: string) => void;
}

export function CategoryAccordion({
  categories,
  expandedNames,
  onExpandedChange,
  onToggleItem,
}: CategoryAccordionProps) {
  return (
    <div className="categories">
      <Accordion.Root
        multiple
        keepMounted
        value={expandedNames}
        onValueChange={(value) => onExpandedChange(value as string[])}
      >
        {categories.map((cat) => (
          <Accordion.Item key={cat.name} value={cat.name} className="cat">
            <Accordion.Header>
              <Accordion.Trigger className="cathead">
                <span>{cat.name}</span>
                <span className="right">
                  {cat.checkedCount}/{cat.count}
                  <span className="chev" aria-hidden>
                    ▾
                  </span>
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel className="items">
              {cat.items.map((item) => (
                <label key={item.key} className={`item${item.checked ? ' done' : ''}`}>
                  <input type="checkbox" checked={item.checked} onChange={() => onToggleItem(item.key)} />
                  <span>{item.text}</span>
                </label>
              ))}
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}
