'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  PlayCircle,
  CheckCircle,
  Megaphone,
  Bell,
  NotepadText,
  MessageSquareWarning,
} from 'lucide-react';
import { useState } from 'react';

const notifications = [
  {
    title: 'New Tutorial Available',
    description:
      "A new video, 'Solving Quadratic Equations', is available in 'Algebra 101'.",
    time: '5 minutes ago',
    icon: PlayCircle,
    iconStyle: 'bg-secondary/20 text-secondary',
    type: 'video',
    unread: true,
    action: 'Watch Video',
  },
  {
    title: 'New Assignment Posted',
    description: "in 'Advanced Mathematics' by Dr. Alan Turing",
    time: '2 hours ago',
    icon: NotepadText,
    iconStyle: 'bg-secondary/20 text-secondary',
    type: 'assignment',
    unread: true,
    action: 'View Assignment',
  },
  {
    title: 'Assignment Graded',
    description: "Your submission for 'Quantum Physics Essay' has been graded.",
    time: 'Yesterday',
    icon: CheckCircle,
    iconStyle: 'bg-primary/20 text-orange-800',
    type: 'grade',
    unread: false,
    action: 'View Grade',
  },
  {
    title: 'New Feedback Received',
    description: "You've received new feedback on 'Literature Review'.",
    time: '3 days ago',
    icon: MessageSquareWarning,
    iconStyle: 'bg-primary/20 text-orange-800',
    type: 'feedback',
    unread: false,
    action: 'View Feedback',
  },
  {
    title: 'Important Announcement',
    description: 'The final exam schedule has been updated.',
    time: 'October 25, 2023',
    icon: Megaphone,
    iconStyle: 'bg-primary/20 text-orange-800',
    type: 'announcement',
    unread: false,
    action: 'Read More',
  },
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Heading */}
      <div className="flex items-center justify-between border-b pb-6">
        <h1 className="text-4xl font-bold">Notifications</h1>
        <Button variant="ghost" className="text-primary">
          Mark all as read
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto">
        <Button
          variant={filter === 'all' ? 'secondary' : 'outline'}
          onClick={() => setFilter('all')}
          className="bg-accent/10 text-accent"
        >
          All
        </Button>
        <Button
          variant={filter === 'unread' ? 'secondary' : 'outline'}
          onClick={() => setFilter('unread')}
        >
          Unread
        </Button>
        <Button
          variant={filter === 'assignments' ? 'secondary' : 'outline'}
          onClick={() => setFilter('assignments')}
        >
          Assignments
        </Button>
        <Button
          variant={filter === 'grades' ? 'secondary' : 'outline'}
          onClick={() => setFilter('grades')}
        >
          Grades
        </Button>
        <Button
          variant={filter === 'videos' ? 'secondary' : 'outline'}
          onClick={() => setFilter('videos')}
        >
          Videos
        </Button>
      </div>

      {/* Notification List */}
      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <Card
            key={index}
            className="group hover:border-primary/50 transition-colors"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="relative">
                    <div
                      className={`p-3 rounded-full ${notification.iconStyle}`}
                    >
                      <notification.icon className="h-6 w-6" />
                    </div>
                    {notification.unread && (
                      <div className="absolute top-0 right-0 size-2.5 rounded-full bg-secondary border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{notification.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.time}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointers"
                >
                  {notification.action}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
