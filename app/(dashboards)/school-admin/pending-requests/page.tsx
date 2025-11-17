// app/pending-requests/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RejectReasonDialog } from '@/components/dashboard/school-admin/RejectReasonDialog';

const initialRequests = [
  {
    id: 1,
    name: 'Olivia Martinez',
    email: 'olivia.m@example.com',
    specialization: 'Mathematics',
    date: '2023-10-26',
    avatar: '/avatars/olivia-m.jpg',
    selected: false,
  },
  {
    id: 2,
    name: 'Benjamin Carter',
    email: 'ben.carter@example.com',
    specialization: 'Physics',
    date: '2023-10-25',
    avatar: '/avatars/benjamin.jpg',
    selected: false,
  },
  {
    id: 3,
    name: 'Sophia Williams',
    email: 'sophia.w@example.com',
    specialization: 'English Literature',
    date: '2023-10-25',
    avatar: '/avatars/sophia.jpg',
    selected: false,
  },
  {
    id: 4,
    name: 'Liam Johnson',
    email: 'liam.j@example.com',
    specialization: 'History',
    date: '2023-10-24',
    avatar: '/avatars/liam-j.jpg',
    selected: false,
  },
];

export default function PendingRequests() {
  const [requests, setRequests] = useState(initialRequests);
  const [selectAll, setSelectAll] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [selectedRejectRequest, setSelectedRejectRequest] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [isBulkReject, setIsBulkReject] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle individual checkbox selection
  const handleIndividualCheckbox = (id: number) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id
          ? { ...request, selected: !request.selected }
          : request
      )
    );
  };

  // Handle "Select All" checkbox
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setRequests((prev) =>
      prev.map((request) => ({ ...request, selected: checked }))
    );
  };

  // Handle bulk actions
  const handleBulkApprove = () => {
    const selectedRequests = requests.filter((req) => req.selected);
    if (selectedRequests.length === 0) {
      alert('Please select at least one request to approve.');
      return;
    }
    alert(
      `Approving ${selectedRequests.length} request(s): ${selectedRequests
        .map((req) => req.name)
        .join(', ')}`
    );
    // Here you would typically make an API call
  };

  const handleBulkReject = () => {
    const selectedRequests = requests.filter((req) => req.selected);
    if (selectedRequests.length === 0) {
      alert('Please select at least one request to reject.');
      return;
    }

    // For bulk reject, we'll show the dialog with the first selected user's name
    const firstSelected = selectedRequests[0];
    setSelectedRejectRequest({
      id: firstSelected.id,
      name: firstSelected.name,
    });
    setIsBulkReject(true);
    setIsRejectDialogOpen(true);
  };

  // Handle individual approve/reject
  const handleIndividualApprove = (id: number, name: string) => {
    alert(`Approving request from ${name}`);
    // Here you would typically make an API call
  };

  const handleIndividualReject = (id: number, name: string) => {
    setSelectedRejectRequest({ id, name });
    setIsBulkReject(false);
    setIsRejectDialogOpen(true);
  };

  // Handle the actual rejection with reason
  const handleRejectWithReason = async (reason: string) => {
    setIsLoading(true);

    try {
      if (isBulkReject) {
        // Handle bulk rejection
        const selectedRequests = requests.filter((req) => req.selected);
        console.log(
          `Rejecting ${selectedRequests.length} requests with reason:`,
          reason
        );

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        alert(
          `Rejected ${selectedRequests.length} request(s) with reason: ${reason}`
        );

        // Remove rejected requests from the list
        setRequests((prev) => prev.filter((req) => !req.selected));
      } else {
        // Handle individual rejection
        console.log(
          `Rejecting request from ${selectedRejectRequest?.name} with reason:`,
          reason
        );

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        alert(
          `Rejected request from ${selectedRejectRequest?.name} with reason: ${reason}`
        );

        // Remove the rejected request from the list
        setRequests((prev) =>
          prev.filter((req) => req.id !== selectedRejectRequest?.id)
        );
      }

      // Close dialog and reset states
      setIsRejectDialogOpen(false);
      setSelectedRejectRequest(null);
      setIsBulkReject(false);
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert('Failed to reject request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Update selectAll state when individual checkboxes change
  const allSelected =
    requests.length > 0 && requests.every((req) => req.selected);
  const someSelected = requests.some((req) => req.selected) && !allSelected;

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-4xl font-bold">Pending Requests</h1>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="teachers" className="space-y-6">
        <TabsList>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>

        <TabsContent value="teachers" className="space-y-6">
          {/* Bulk Actions */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Checkbox
                    id="selectAll"
                    checked={allSelected}
                    onCheckedChange={handleSelectAll}
                  />
                  <label
                    htmlFor="selectAll"
                    className="text-sm text-muted-foreground"
                  >
                    Select all ({requests.filter((req) => req.selected).length}{' '}
                    selected)
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    onClick={handleBulkApprove}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Approve Selected
                  </Button>
                  <Button onClick={handleBulkReject} variant="destructive">
                    Reject Selected
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="py-3.5 pl-4 pr-3 text-left w-12">
                        <Checkbox
                          checked={allSelected}
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      <th className="py-3.5 px-3 text-left text-sm font-semibold">
                        Teacher Name & Email
                      </th>
                      <th className="py-3.5 px-3 text-left text-sm font-semibold">
                        Specialization
                      </th>
                      <th className="py-3.5 px-3 text-left text-sm font-semibold">
                        Date Applied
                      </th>
                      <th className="py-3.5 px-3 text-left text-sm font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {requests.map((request) => (
                      <tr key={request.id} className="hover:bg-muted/50">
                        <td className="py-4 pl-4 pr-3 text-sm">
                          <Checkbox
                            checked={request.selected}
                            onCheckedChange={() =>
                              handleIndividualCheckbox(request.id)
                            }
                          />
                        </td>
                        <td className="whitespace-nowrap py-4 px-3 text-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium">
                                {request.name
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium">{request.name}</div>
                              <div className="text-muted-foreground">
                                {request.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                          {request.specialization}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                          {request.date}
                        </td>
                        <td className="whitespace-nowrap py-4 px-3 text-sm font-medium">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() =>
                                handleIndividualApprove(
                                  request.id,
                                  request.name
                                )
                              }
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() =>
                                handleIndividualReject(request.id, request.name)
                              }
                            >
                              Reject
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-1">
            <Button variant="outline" size="sm">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="default" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <span className="px-2 text-sm text-muted-foreground">...</span>
            <Button variant="outline" size="sm">
              10
            </Button>
            <Button variant="outline" size="sm">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </TabsContent>

        {/* Students Tab (similar functionality) */}
        <TabsContent value="students" className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Checkbox
                    id="selectAllStudents"
                    checked={allSelected}
                    onCheckedChange={handleSelectAll}
                  />
                  <label
                    htmlFor="selectAllStudents"
                    className="text-sm text-muted-foreground"
                  >
                    Select all ({requests.filter((req) => req.selected).length}{' '}
                    selected)
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Approve Selected
                  </Button>
                  <Button variant="destructive">Reject Selected</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground">
                <p>No pending student requests at this time.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Reject Reason Dialog */}
      <RejectReasonDialog
        open={isRejectDialogOpen}
        onOpenChange={setIsRejectDialogOpen}
        onReject={handleRejectWithReason}
        userName={selectedRejectRequest?.name}
        isLoading={isLoading}
      />
    </div>
  );
}
