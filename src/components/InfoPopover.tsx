import { Popover } from '@base-ui/react/popover';
import { Info } from 'lucide-react';

export function InfoPopover() {
  return (
    <Popover.Root>
      <Popover.Trigger className="infobtn" aria-label="About this app">
        <Info size={15} strokeWidth={2} />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner className="info-positioner" side="bottom" align="end" sideOffset={8}>
          <Popover.Popup className="infopopup">
            <Popover.Arrow className="infopopup-arrow" />
            Set your trip length and expected weather — the checklist below updates automatically. Check items
            off as you pack. Data is pulled from a gear CSV (swap in a published Google Sheet later).
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
