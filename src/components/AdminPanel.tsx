"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { ArrowLeft, Search, Download, RefreshCw, Eye, Edit } from "lucide-react";
import { IApplication } from "@/models/Application";

interface ApplicationsResponse {
  applications: IApplication[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  statusStats: {
    pending: number;
    reviewed: number;
    approved: number;
    rejected: number;
  };
}

export function AdminPanel() {
  const [data, setData] = useState<ApplicationsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState<IApplication | null>(null);
  const [editingApplication, setEditingApplication] = useState<IApplication | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchApplications = useCallback(async (page = 1, status = statusFilter, search = searchQuery) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(status !== 'all' && { status }),
        ...(search && search.trim() && { search: search.trim() })
      });

      const response = await fetch(`/api/applications?${params}`);
      if (!response.ok) throw new Error('Failed to fetch applications');
      
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchQuery]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchApplications(1, statusFilter, searchQuery);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
    fetchApplications(1, status, searchQuery);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchApplications(page, statusFilter, searchQuery);
  };

  const handleUpdateApplication = async () => {
    if (!editingApplication) return;
    
    try {
      const response = await fetch('/api/applications', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingApplication._id,
          status: editStatus,
          notes: editNotes
        })
      });

      if (!response.ok) throw new Error('Failed to update application');
      
      // Refresh data
      await fetchApplications(currentPage, statusFilter, searchQuery);
      setEditingApplication(null);
      setEditNotes("");
      setEditStatus("");
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch('/api/applications?limit=1000');
      const result = await response.json();
      
      const csvContent = [
        ["Name", "Email", "Phone", "Instagram", "TikTok", "Website", "Company", "Revenue", "Budget", "Status", "Submitted At"].join(","),
        ...result.applications.map((app: IApplication) =>
          [
            app.name,
            app.email,
            app.phone,
            app.instagram || '',
            app.tiktok || '',
            app.website || '',
            app.company,
            app.revenue,
            app.budget,
            app.status,
            new Date(app.submittedAt).toLocaleDateString()
          ].join(",")
        )
      ].join("\\n");

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'applications.csv';
      a.click();
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'reviewed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'approved':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin" />
          Loading applications...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.location.href = '/'}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Site
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
                <p className="text-slate-600">Manage application submissions</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => fetchApplications(currentPage, statusFilter, searchQuery)} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button onClick={handleExport} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Applications</CardDescription>
              <CardTitle className="text-2xl text-slate-900">{data?.pagination.total || 0}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Pending Review</CardDescription>
              <CardTitle className="text-2xl text-yellow-600">{data?.statusStats.pending || 0}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Approved</CardDescription>
              <CardTitle className="text-2xl text-green-600">{data?.statusStats.approved || 0}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Rejected</CardDescription>
              <CardTitle className="text-2xl text-red-600">{data?.statusStats.rejected || 0}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by name, email, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={handleStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="reviewed">Reviewed</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleSearch}>
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-slate-900">Applications</CardTitle>
            <CardDescription>
              {data?.applications.length || 0} of {data?.pagination.total || 0} applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Contact Info</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.applications.map((app) => (
                    <TableRow key={app._id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-slate-900">{app.name}</div>
                          <div className="text-sm text-slate-500">{app.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm space-y-1">
                          <div className="text-slate-900">{app.phone}</div>
                          {app.instagram && (
                            <div className="text-slate-600">📷 {app.instagram}</div>
                          )}
                          {app.tiktok && (
                            <div className="text-slate-600">🎵 {app.tiktok}</div>
                          )}
                          {app.website && (
                            <div className="text-slate-600">🌐 {app.website}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-slate-900">{app.company}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                          {app.revenue}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                          {app.budget}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={getStatusColor(app.status)}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">
                        {formatDate(app.submittedAt)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedApplication(app)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingApplication(app);
                              setEditStatus(app.status);
                              setEditNotes(app.notes || "");
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {data && data.pagination.totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-slate-600">
                  Page {data.pagination.page} of {data.pagination.totalPages}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!data.pagination.hasPrev}
                    onClick={() => handlePageChange(data.pagination.page - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!data.pagination.hasNext}
                    onClick={() => handlePageChange(data.pagination.page + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detail Modal */}
        {selectedApplication && (
          <div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedApplication(null)}
          >
            <Card 
              className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <CardHeader>
                <CardTitle className="text-slate-900">Application Details</CardTitle>
                <CardDescription>{selectedApplication.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Name</div>
                    <div className="text-slate-900">{selectedApplication.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Email</div>
                    <div className="text-slate-900">{selectedApplication.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Phone</div>
                    <div className="text-slate-900">{selectedApplication.phone}</div>
                  </div>
                  {selectedApplication.instagram && (
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Instagram</div>
                      <div className="text-slate-900">{selectedApplication.instagram}</div>
                    </div>
                  )}
                  {selectedApplication.tiktok && (
                    <div>
                      <div className="text-sm text-slate-500 mb-1">TikTok</div>
                      <div className="text-slate-900">{selectedApplication.tiktok}</div>
                    </div>
                  )}
                  {selectedApplication.website && (
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Website</div>
                      <div className="text-slate-900">{selectedApplication.website}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Company</div>
                    <div className="text-slate-900">{selectedApplication.company}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Revenue</div>
                    <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                      {selectedApplication.revenue}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Budget</div>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                      {selectedApplication.budget}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Timeline</div>
                    <div className="text-slate-900">{selectedApplication.timeline}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Status</div>
                    <Badge variant="secondary" className={getStatusColor(selectedApplication.status)}>
                      {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Submitted</div>
                    <div className="text-slate-900">{formatDate(selectedApplication.submittedAt)}</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-slate-500 mb-2">Challenges</div>
                  <div className="text-slate-900 bg-slate-50 p-4 rounded-lg border border-slate-200">
                    {selectedApplication.challenges}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-slate-500 mb-2">Goals</div>
                  <div className="text-slate-900 bg-slate-50 p-4 rounded-lg border border-slate-200">
                    {selectedApplication.goals}
                  </div>
                </div>

                {selectedApplication.notes && (
                  <div>
                    <div className="text-sm text-slate-500 mb-2">Admin Notes</div>
                    <div className="text-slate-900 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      {selectedApplication.notes}
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setSelectedApplication(null)}>
                    Close
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    onClick={() => {
                      setEditingApplication(selectedApplication);
                      setEditStatus(selectedApplication.status);
                      setEditNotes(selectedApplication.notes || "");
                      setSelectedApplication(null);
                    }}
                  >
                    Edit Application
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Edit Modal */}
        {editingApplication && (
          <div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setEditingApplication(null)}
          >
            <Card 
              className="max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <CardHeader>
                <CardTitle className="text-slate-900">Edit Application</CardTitle>
                <CardDescription>{editingApplication.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Status</label>
                  <Select value={editStatus} onValueChange={setEditStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="reviewed">Reviewed</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Admin Notes</label>
                  <Textarea
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="Add notes about this application..."
                    rows={4}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setEditingApplication(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateApplication}>
                    Update Application
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}