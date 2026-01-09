'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CloudUpload, File, X } from 'lucide-react';

export function UploadTutorial() {
  const [tutorialTitle, setTutorialTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [classGrade, setClassGrade] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const subjects = [
    'Select a subject',
    'Mathematics',
    'Algebra',
    'Physics',
    'Chemistry',
    'Biology',
    'History',
    'English',
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-muted-foreground text-sm font-medium hover:text-primary cursor-pointer">
          Upload New Content
        </span>
        <span className="text-muted-foreground text-sm font-medium">/</span>
        <span className="text-foreground text-sm font-medium">Tutorial</span>
      </div>

      {/* Header */}
      <div className="flex flex-wrap justify-between gap-3 mb-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-black leading-tight tracking-tight text-foreground">
            Upload New Tutorial
          </h2>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tutorial Title */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="tutorial-title" className="text-foreground">
                Tutorial Title
              </Label>
              <Input
                id="tutorial-title"
                placeholder="e.g., Introduction to Algebra"
                value={tutorialTitle}
                onChange={(e) => setTutorialTitle(e.target.value)}
                className="h-12"
              />
            </div>

            {/* Description */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description" className="text-foreground">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="A brief overview of key algebraic concepts..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-36"
              />
            </div>

            {/* Subjects */}
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-foreground">
                Subjects
              </Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Class */}
            <div className="space-y-2">
              <Label htmlFor="class" className="text-foreground">
                Class
              </Label>
              <Input
                id="class"
                placeholder="e.g., Grade 9"
                value={classGrade}
                onChange={(e) => setClassGrade(e.target.value)}
                className="h-12"
              />
            </div>

            {/* File Uploader */}
            <div className="space-y-2 md:col-span-2">
              <Label className="text-foreground">Tutorial File</Label>
              <div className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-border rounded-xl bg-muted/50">
                <label className="flex flex-col items-center justify-center w-full cursor-pointer">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                    <CloudUpload className="text-4xl text-muted-foreground mb-3" />
                    <p className="my-2 text-sm text-muted-foreground">
                      <span className="font-semibold text-secondary">
                        Click to upload
                      </span>{' '}
                      or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports: PDF, DOCX, PPTX
                    </p>
                  </div>
                  <input
                    className="hidden"
                    type="file"
                    accept=".pdf,.docx,.pptx"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>

              {/* Uploaded file state */}
              {uploadedFile && (
                <div className="mt-4 flex items-center justify-between w-full p-3 border border-border rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <File className="text-green-600 h-5 w-5" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">
                        {uploadedFile.name}
                      </p>
                      <p className="text-muted-foreground">
                        {(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={removeFile}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="md:col-span-2 flex justify-end items-center gap-4 mt-8">
              <Button variant="outline" className="px-6 py-3">
                Cancel
              </Button>
              <Button className="px-6 py-3 bg-orange-500 hover:bg-orange-600">
                Publish Tutorial
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
