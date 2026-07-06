import { Dialog } from '@base-ui/react/dialog';
import { Info } from 'lucide-react';

export function InfoDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="infobtn" aria-label="About this app">
        <Info size={15} strokeWidth={2} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="info-backdrop" />
        <Dialog.Popup className="info-dialog">
          <Dialog.Description className="info-dialog-desc">
            Set your trip length and expected weather — the checklist below updates automatically. Check items
            off as you pack. Data is pulled from a gear CSV (swap in a published Google Sheet later).
          </Dialog.Description>
          <Dialog.Close className="info-dialog-close">Got it</Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
