"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ArrowLeft, Search, Download } from "lucide-react";

interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  instagram: string;
  tiktok: string;
  website: string;
  monthlyRevenue: string;
  monthlyBudget: string;
  helpNeeded: string[];
  goals: string;
  submittedAt: string;
}

// Mock data for applications
const mockApplications: Application[] = [
  {
    id: "1",
    fullName: "Sarah Johnson",
    email: "sarah.j@beautybrand.com",
    phone: "+1 (555) 234-5678",
    instagram: "@beautybrand",
    tiktok: "@beautybrand",
    website: "https://beautybrand.com",
    monthlyRevenue: "50k-200k",
    monthlyBudget: "5k-10k",
    helpNeeded: ["Paid Ads", "Content System"],
    goals: "Decrease CAC by 25%, scale to $300k/mo, launch 2 new product lines",
    submittedAt: "2025-10-22T14:30:00"
  },
  {
    id: "2",
    fullName: "Mike Chen",
    email: "mike@fitgear.io",
    phone: "+1 (555) 876-5432",
    instagram: "@fitgearofficial",
    tiktok: "@fitgear",
    website: "https://fitgear.io",
    monthlyRevenue: "10k-50k",
    monthlyBudget: "2.5k-5k",
    helpNeeded: ["UGC / Creators", "CRO / Funnels"],
    goals: "100 qualified leads/mo, improve conversion rate by 15%",
    submittedAt: "2025-10-21T09:15:00"
  },
  {
    id: "3",
    fullName: "Emily Rodriguez",
    email: "emily@localcafe.com",
    phone: "+1 (555) 345-6789",
    instagram: "@thecozycafe",
    tiktok: "@cozycafe",
    website: "https://thecozycafe.com",
    monthlyRevenue: "less-than-10k",
    monthlyBudget: "1k-2.5k",
    helpNeeded: ["Content System", "Paid Ads"],
    goals: "Increase foot traffic by 30%, build email list to 5k subscribers",
    submittedAt: "2025-10-20T16:45:00"
  },
  {
    id: "4",
    fullName: "David Park",
    email: "david@techgadgets.co",
    phone: "+1 (555) 789-0123",
    instagram: "@techgadgets",
    tiktok: "@techgadgets_co",
    website: "https://techgadgets.co",
    monthlyRevenue: "more-than-200k",
    monthlyBudget: "10k-plus",
    helpNeeded: ["Paid Ads", "UGC / Creators", "CRO / Funnels"],
    goals: "Scale to $500k/mo, decrease CAC by 20%, add 3 new offers",
    submittedAt: "2025-10-19T11:20:00"
  },
  {
    id: "5",
    fullName: "Jessica Martinez",
    email: "jess@organicskincare.com",
    phone: "+1 (555) 456-7890",
    instagram: "@organicskin",
    tiktok: "@organicskincare",
    website: "https://organicskincare.com",
    monthlyRevenue: "50k-200k",
    monthlyBudget: "5k-10k",
    helpNeeded: ["Content System", "UGC / Creators"],
    goals: "Launch subscription model, 200 qualified leads/mo, expand to new markets",
    submittedAt: "2025-10-18T13:00:00"
  }
];

const revenueLabels: Record<string, string> = {
  "prefer-not-to-say": "Prefer not to say",
  "less-than-10k": "<$10k",
  "10k-50k": "$10k ~ $50k",
  "50k-200k": "$50k ~ $200k",
  "more-than-200k": "+$200k"
};

const budgetLabels: Record<string, string> = {
  "1k-2.5k": "$1k ~ $2.5k",
  "2.5k-5k": "$2.5k ~ $5k",
  "5k-10k": "$5k ~ $10k",
  "10k-plus": "$10k +"
};

export function AdminPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const filteredApplications = mockApplications.filter(app =>
    app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.phone.includes(searchQuery)
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleExport = () => {
    // Mock export functionality
    const csvContent = [
      ["Name", "Email", "Phone", "Revenue", "Budget", "Help Needed", "Submitted At"].join(","),
      ...mockApplications.map(app =>
        [
          app.fullName,
          app.email,
          app.phone,
          revenueLabels[app.monthlyRevenue],
          budgetLabels[app.monthlyBudget],
          app.helpNeeded.join("; "),
          formatDate(app.submittedAt)
        ].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'applications.csv';
    a.click();
  };

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
                <h1 className="text-slate-900">Admin Dashboard</h1>
                <p className="text-slate-600 text-sm">Manage application submissions</p>
              </div>
            </div>
            <Button onClick={handleExport} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Applications</CardDescription>
              <CardTitle className="text-slate-900">{mockApplications.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>This Week</CardDescription>
              <CardTitle className="text-slate-900">3</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Avg. Revenue</CardDescription>
              <CardTitle className="text-slate-900">$50k-200k</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>High Value Leads</CardDescription>
              <CardTitle className="text-slate-900">2</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-slate-900">Applications</CardTitle>
            <CardDescription>
              {filteredApplications.length} application{filteredApplications.length !== 1 ? 's' : ''} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Help Needed</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell>
                        <div>
                          <div className="text-slate-900">{app.fullName}</div>
                          <div className="text-xs text-slate-500">{app.website || 'No website'}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="text-slate-700">{app.email}</div>
                          <div className="text-slate-500">{app.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                          {revenueLabels[app.monthlyRevenue]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                          {budgetLabels[app.monthlyBudget]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {app.helpNeeded.slice(0, 2).map((item, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                          {app.helpNeeded.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{app.helpNeeded.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">
                        {formatDate(app.submittedAt)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedApplication(app)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
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
                <CardDescription>{selectedApplication.fullName}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Email</div>
                    <div className="text-slate-900">{selectedApplication.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Phone</div>
                    <div className="text-slate-900">{selectedApplication.phone}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Instagram</div>
                    <div className="text-slate-900">{selectedApplication.instagram || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">TikTok</div>
                    <div className="text-slate-900">{selectedApplication.tiktok || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Website</div>
                    <div className="text-slate-900">{selectedApplication.website || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Submitted</div>
                    <div className="text-slate-900">{formatDate(selectedApplication.submittedAt)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Monthly Revenue</div>
                    <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                      {revenueLabels[selectedApplication.monthlyRevenue]}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Monthly Budget</div>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                      {budgetLabels[selectedApplication.monthlyBudget]}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-slate-500 mb-2">Help Needed</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedApplication.helpNeeded.map((item, idx) => (
                      <Badge key={idx} variant="outline">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-slate-500 mb-2">Goals (Next 90 days)</div>
                  <div className="text-slate-900 bg-slate-50 p-4 rounded-lg border border-slate-200">
                    {selectedApplication.goals}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setSelectedApplication(null)}>
                    Close
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                    Contact Applicant
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
