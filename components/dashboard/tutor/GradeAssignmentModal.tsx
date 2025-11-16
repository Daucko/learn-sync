'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';

interface GradeAssignmentProps {
  isOpen: boolean;
  onClose: () => void;
  studentName?: string;
  assignmentTitle?: string;
}

export function GradeAssignment({
  isOpen,
  onClose,
  studentName = 'Jane Doe',
  assignmentTitle = 'Introduction to Algebra',
}: GradeAssignmentProps) {
  const [marksObtained, setMarksObtained] = useState('');
  const [feedback, setFeedback] = useState('');
  const [requestResubmission, setRequestResubmission] = useState(false);
  const [resubmissionReason, setResubmissionReason] = useState('');

  const handleSave = () => {
    // Handle save logic here
    console.log({
      marksObtained,
      feedback,
      requestResubmission,
      resubmissionReason,
    });
    onClose();
  };

  const buttonText = requestResubmission ? 'Send Request' : 'Save Grade';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        {/* Header */}
        <DialogHeader className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <DialogTitle className="text-2xl font-bold leading-tight">
                Grade Submission
              </DialogTitle>
              <p className="text-muted-foreground text-sm font-normal leading-normal mt-1">
                Grading {studentName}'s submission for {assignmentTitle}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        {/* Main Content */}
        <div className="flex-1 p-8 space-y-6">
          {/* Marks Obtained */}
          <div className="space-y-2">
            <Label htmlFor="marks-obtained">Marks Obtained</Label>
            <Input
              id="marks-obtained"
              placeholder="85 / 100"
              value={marksObtained}
              onChange={(e) => setMarksObtained(e.target.value)}
              className="h-12"
            />
          </div>

          {/* Feedback Comments */}
          <div className="space-y-2">
            <Label htmlFor="feedback-comments">Feedback Comments</Label>
            <Textarea
              id="feedback-comments"
              placeholder="Provide constructive feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-40"
            />
          </div>

          {/* Request Resubmission */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="resubmission"
                checked={requestResubmission}
                onCheckedChange={(checked) =>
                  setRequestResubmission(checked as boolean)
                }
              />
              <Label
                htmlFor="resubmission"
                className="text-base font-normal leading-normal cursor-pointer"
              >
                Request Resubmission
              </Label>
            </div>

            {/* Resubmission Reason - Conditionally shown */}
            {requestResubmission && (
              <div className="space-y-2">
                <Label htmlFor="resubmission-reason">
                  Reason for Resubmission
                </Label>
                <Input
                  id="resubmission-reason"
                  placeholder="Explain why a resubmission is needed..."
                  value={resubmissionReason}
                  onChange={(e) => setResubmissionReason(e.target.value)}
                  className="h-12"
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-end gap-4 p-6 bg-muted/50 border-t rounded-b-lg">
          <Button variant="outline" onClick={onClose} className="px-5 py-2.5">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600"
          >
            {buttonText}
          </Button>
        </footer>
      </DialogContent>
    </Dialog>
  );
}
