'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';

export function GenerateAnimatedVideo() {
  const [videoTitle, setVideoTitle] = useState('');
  const [description, setDescription] = useState('');
  const [script, setScript] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([
    'Mathematics',
  ]);

  const subjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'History',
  ];

  const handleSubjectSelect = (value: string) => {
    if (!selectedSubjects.includes(value)) {
      setSelectedSubjects([...selectedSubjects, value]);
    }
  };

  const removeSubject = (subjectToRemove: string) => {
    setSelectedSubjects(
      selectedSubjects.filter((subject) => subject !== subjectToRemove)
    );
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-muted-foreground text-sm font-medium hover:text-primary cursor-pointer">
          Upload New Content
        </span>
        <span className="text-muted-foreground text-sm font-medium">/</span>
        <span className="text-foreground text-sm font-medium ">
          Animated Video
        </span>
      </div>

      {/* Header */}
      <div className="flex flex-wrap justify-between gap-3 mb-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-black leading-tight tracking-tight text-foreground">
            Create an Animated Video
          </h2>
          <p className="text-muted-foreground text-base font-normal leading-normal">
            Enter your script below to generate an animated video for your
            students.
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Video Title */}
            <div className="space-y-2">
              <Label htmlFor="video-title" className="text-foreground">
                Video Title
              </Label>
              <Input
                id="video-title"
                placeholder="e.g., Introduction to Algebra"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                className="h-12"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-foreground">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Provide a detailed description of what this video covers."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-36"
              />
            </div>

            {/* Script for Animation */}
            <div className="space-y-2">
              <Label htmlFor="script" className="text-foreground">
                Script for Animation
              </Label>
              <Textarea
                id="script"
                placeholder="Enter the text to be converted into an animated video. You can describe scenes and dialogues here."
                value={script}
                onChange={(e) => setScript(e.target.value)}
                className="min-h-64"
              />
            </div>

            {/* Associate with Subjects */}
            <div className="space-y-2">
              <Label className="text-foreground">
                Associate with Subject(s)
              </Label>
              <Select onValueChange={handleSubjectSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subjects..." />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Selected Subjects Badges */}
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedSubjects.map((subject) => (
                  <Badge
                    key={subject}
                    variant="secondary"
                    className="bg-primary/20 text-foreground px-3 py-1.5 text-sm"
                  >
                    {subject}
                    <button
                      onClick={() => removeSubject(subject)}
                      className="ml-1.5 hover:bg-primary/30 rounded-full p-0.5 transition-colors"
                      type="button"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t">
              <Button variant="outline" className="min-w-20">
                Cancel
              </Button>
              <Button className="min-w-20 bg-primary hover:bg-primary/90">
                Generate Video
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
