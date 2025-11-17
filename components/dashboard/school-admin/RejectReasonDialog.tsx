// components/reject-reason-dialog.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface RejectReasonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReject: (reason: string) => void;
  userName?: string;
  isLoading?: boolean;
}

export function RejectReasonDialog({
  open,
  onOpenChange,
  onReject,
  userName,
  isLoading = false,
}: RejectReasonDialogProps) {
  const [reason, setReason] = useState('');
  const maxLength = 500;

  const handleReasonChange = (value: string) => {
    if (value.length <= maxLength) {
      setReason(value);
    }
  };

  const handleConfirm = () => {
    if (reason.trim()) {
      onReject(reason.trim());
      setReason('');
    }
  };

  const handleCancel = () => {
    setReason('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
              <span className="text-2xl text-green-600 dark:text-green-400">
                ⚠️
              </span>
            </div>
          </div>
          <DialogTitle className="text-center text-xl">
            Provide Rejection Reason
          </DialogTitle>
          <DialogDescription className="text-center">
            {userName
              ? `The user ${userName} will be notified with the reason you provide.`
              : 'The user will be notified with the reason you provide.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rejection-reason">Rejection Reason</Label>
            <Textarea
              id="rejection-reason"
              placeholder="Enter reason for rejection here... (e.g., Incomplete application, incorrect school ID)."
              value={reason}
              onChange={(e) => handleReasonChange(e.target.value)}
              className="min-h-32 resize-none"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Required</span>
              <span>
                {reason.length}/{maxLength}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!reason.trim() || isLoading}
            className="flex-1 bg-orange-500 hover:bg-orange-600"
          >
            {isLoading ? 'Rejecting...' : 'Confirm Rejection'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
