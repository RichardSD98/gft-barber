'use client';

import Button from '@/src/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/Dialog';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function PolicyModal({ isOpen, onClose }: PolicyModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => (!open ? onClose() : undefined)}>
      <DialogContent showCloseButton className="w-full max-w-xl">
        <DialogHeader className="pr-8">
          <DialogTitle>Full Booking Policy</DialogTitle>
          <DialogDescription>
            Please review the terms below before confirming your appointment.
          </DialogDescription>
        </DialogHeader>

        <ul className="space-y-3 text-sm leading-6 text-brand-navy">
          <li>
            <span className="font-semibold">Late arrival:</span> arriving more than 15 minutes late incurs a N$30 fee.
          </li>
          <li>
            <span className="font-semibold">No-show:</span> failing to arrive without notice is charged N$70 on the next booking.
          </li>
          <li>
            <span className="font-semibold">Cancellation:</span> clients must cancel or reschedule in advance.
          </li>
          <li>
            <span className="font-semibold">Payment:</span> full payment required at time of service.
          </li>
        </ul>

        <DialogFooter className="mt-6">
          <Button type="button" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PolicyModal;
