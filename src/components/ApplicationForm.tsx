"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

interface ApplicationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApplicationForm({ open, onOpenChange }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    revenue: "",
    challenges: "",
    goals: "",
    timeline: "",
    budget: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.company || !formData.revenue || !formData.challenges || !formData.goals || !formData.timeline || !formData.budget) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application');
      }

      toast.success("Application submitted successfully! We'll review it within 24 hours.");
      
      // Reset form and close dialog
      setFormData({
        name: "",
        email: "",
        company: "",
        revenue: "",
        challenges: "",
        goals: "",
        timeline: "",
        budget: ""
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-slate-900">Apply to Brand Lift Co</DialogTitle>
          <DialogDescription>
            Fill out the form below and we'll review your application within 24 hours.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="John Doe"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="john@example.com"
              required
            />
          </div>

          {/* Company */}
          <div className="space-y-2">
            <Label htmlFor="company">Company Name *</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              placeholder="Your Company Inc."
              required
            />
          </div>

          {/* Current Revenue */}
          <div className="space-y-2">
            <Label htmlFor="revenue">Current Monthly Revenue *</Label>
            <Select
              value={formData.revenue}
              onValueChange={(value) => setFormData(prev => ({ ...prev, revenue: value }))}
            >
              <SelectTrigger id="revenue">
                <SelectValue placeholder="Select current revenue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Under $10K/month">Under $10K/month</SelectItem>
                <SelectItem value="$10K-50K/month">$10K-50K/month</SelectItem>
                <SelectItem value="$50K-100K/month">$50K-100K/month</SelectItem>
                <SelectItem value="$100K-500K/month">$100K-500K/month</SelectItem>
                <SelectItem value="$500K-1M/month">$500K-1M/month</SelectItem>
                <SelectItem value="Over $1M/month">Over $1M/month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <Label htmlFor="budget">Marketing Budget *</Label>
            <Select
              value={formData.budget}
              onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}
            >
              <SelectTrigger id="budget">
                <SelectValue placeholder="Select marketing budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Under $5K/month">Under $5K/month</SelectItem>
                <SelectItem value="$5K-15K/month">$5K-15K/month</SelectItem>
                <SelectItem value="$15K-30K/month">$15K-30K/month</SelectItem>
                <SelectItem value="$30K-50K/month">$30K-50K/month</SelectItem>
                <SelectItem value="Over $50K/month">Over $50K/month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Timeline */}
          <div className="space-y-2">
            <Label htmlFor="timeline">Project Timeline *</Label>
            <Select
              value={formData.timeline}
              onValueChange={(value) => setFormData(prev => ({ ...prev, timeline: value }))}
            >
              <SelectTrigger id="timeline">
                <SelectValue placeholder="When do you want to start?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ASAP (Within 30 days)">ASAP (Within 30 days)</SelectItem>
                <SelectItem value="1-3 months">1-3 months</SelectItem>
                <SelectItem value="3-6 months">3-6 months</SelectItem>
                <SelectItem value="6+ months">6+ months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Challenges */}
          <div className="space-y-2">
            <Label htmlFor="challenges">What are your biggest challenges? *</Label>
            <Textarea
              id="challenges"
              value={formData.challenges}
              onChange={(e) => setFormData(prev => ({ ...prev, challenges: e.target.value }))}
              placeholder="e.g., High customer acquisition costs, low conversion rates, scaling issues..."
              rows={4}
              required
            />
          </div>

          {/* Goals */}
          <div className="space-y-2">
            <Label htmlFor="goals">What are your main goals? *</Label>
            <Textarea
              id="goals"
              value={formData.goals}
              onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
              placeholder="e.g., Decrease CAC by 25%, scale to $500K/month, launch 2 new product lines..."
              rows={4}
              required
            />
          </div>

          {/* Submit Button */}
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-600/30 transition-all hover:shadow-xl hover:shadow-blue-600/40 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
