import { Sidebar } from '@/components/dashboard/tutor/Sidebar';
import { TopNav } from '@/components/dashboard/tutor/TopNav';
import { Upload, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { GenerateAnimatedVideo } from '@/components/dashboard/tutor/GenerateAnimatedVideo';
import { UploadTutorial } from '@/components/dashboard/tutor/UploadTutorial';

export default function UploadContentPage() {
  return (
    <main className="flex-1 overflow-auto p-8">
      <div className="mx-auto max-w-4xl">
        {/* Page Heading */}
        <div className="flex flex-wrap justify-between gap-3 mb-8">
          <h1 className="text-gray-900 dark:text-gray-300 text-4xl font-black leading-tight tracking-tight">
            Upload New Content
          </h1>
        </div>

        {/* Main content card */}
        <Card>
          <CardContent className="p-0">
            {/* Tabs */}
            <Tabs defaultValue="assignments" className="w-full">
              <CardHeader className="pb-0">
                <TabsList className="grid w-full grid-cols-3 m-6 mb-0">
                  <TabsTrigger value="assignments">Assignments</TabsTrigger>
                  <TabsTrigger value="videos">Animated Videos</TabsTrigger>
                  <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
                </TabsList>
              </CardHeader>

              {/* Tab Content */}
              <div className="p-6">
                <TabsContent value="assignments" className="mt-0 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Assignment Title */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="title"
                        className="text-gray-900 dark:text-gray-300"
                      >
                        Assignment Title
                      </Label>
                      <Input
                        id="title"
                        placeholder="e.g., Chapter 5: Algebra Basics"
                        className="h-14"
                      />
                    </div>
                    <div className="hidden md:block"></div>

                    {/* Description */}
                    <div className="space-y-2 md:col-span-2">
                      <Label
                        htmlFor="description"
                        className="text-gray-900 dark:text-gray-300"
                      >
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Enter a brief description of the assignment"
                        className="min-h-36"
                      />
                    </div>

                    {/* Due Date & Total Marks */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="due-date"
                        className="text-gray-900 dark:text-gray-300"
                      >
                        Due Date
                      </Label>
                      <Input id="due-date" type="date" className="h-14" />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="marks"
                        className="text-gray-900 dark:text-gray-300"
                      >
                        Total Marks
                      </Label>
                      <Input
                        id="marks"
                        placeholder="e.g., 100"
                        type="number"
                        className="h-14"
                      />
                    </div>
                  </div>

                  {/* File Upload Area */}
                  <div className="mt-8 space-y-2">
                    <Label className="text-gray-900 dark:text-gray-300">
                      Assignment File
                    </Label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-50/10 hover:bg-gray-100 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="text-5xl text-gray-400 mb-3" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold text-secondary">
                              Click to upload
                            </span>{' '}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PDF, DOCX, or ZIP (MAX. 50MB)
                          </p>
                        </div>
                        <input className="hidden" type="file" />
                      </label>
                    </div>
                  </div>

                  {/* Uploaded File State */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-4">
                        <CheckCircle className="text-secondary h-5 w-5" />
                        <div className="flex flex-col">
                          <p className="text-gray-900 dark:text-gray-300 font-medium text-sm">
                            chapter-5-final.pdf
                          </p>
                          <Badge
                            variant="outline"
                            className="text-secondary border-secondary/30 bg-green-50 text-xs w-fit"
                          >
                            Upload complete
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Upload Button */}
                  <div className="flex justify-end">
                    <Button
                      disabled
                      size="lg"
                      className="px-8 py-3.5 text-base font-bold bg-primary"
                    >
                      Upload Content
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="videos" className="mt-0">
                  <GenerateAnimatedVideo />
                </TabsContent>

                <TabsContent value="tutorials" className="mt-0">
                  <UploadTutorial />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
