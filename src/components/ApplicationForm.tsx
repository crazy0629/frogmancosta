"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

interface ApplicationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApplicationForm({ open, onOpenChange }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    instagram: "",
    tiktok: "",
    website: "",
    monthlyRevenue: "prefer-not-to-say",
    monthlyBudget: "",
    helpNeeded: [] as string[],
    goals: "",
    agreeToEmails: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const helpOptions = [
    "Paid Ads",
    "Content System",
    "UGC / Creators",
    "CRO / Funnels"
  ];

  const handleCheckboxChange = (option: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        helpNeeded: [...prev.helpNeeded, option]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        helpNeeded: prev.helpNeeded.filter(item => item !== option)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!formData.agreeToEmails) {
      toast.error("Please agree to receive emails to continue");
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
        fullName: "",
        email: "",
        phone: "",
        instagram: "",
        tiktok: "",
        website: "",
        monthlyRevenue: "prefer-not-to-say",
        monthlyBudget: "",
        helpNeeded: [],
        goals: "",
        agreeToEmails: false
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
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
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

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+1 (555) 123-4567"
              required
            />
          </div>

          {/* Instagram */}
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              id="instagram"
              value={formData.instagram}
              onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
              placeholder="@yourbrand"
            />
          </div>

          {/* TikTok */}
          <div className="space-y-2">
            <Label htmlFor="tiktok">TikTok</Label>
            <Input
              id="tiktok"
              value={formData.tiktok}
              onChange={(e) => setFormData(prev => ({ ...prev, tiktok: e.target.value }))}
              placeholder="@yourbrand"
            />
          </div>

          {/* Website */}
          <div className="space-y-2">
            <Label htmlFor="website">Website (if any)</Label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
              placeholder="https://yourbrand.com"
            />
          </div>

          {/* Monthly Revenue */}
          <div className="space-y-2">
            <Label htmlFor="monthlyRevenue">Monthly Revenue</Label>
            <Select
              value={formData.monthlyRevenue}
              onValueChange={(value) => setFormData(prev => ({ ...prev, monthlyRevenue: value }))}
            >
              <SelectTrigger id="monthlyRevenue">
                <SelectValue placeholder="Prefer not to say" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                <SelectItem value="less-than-10k">&lt; $10k</SelectItem>
                <SelectItem value="10k-50k">$10k - $50k</SelectItem>
                <SelectItem value="50k-200k">$50k - $200k</SelectItem>
                <SelectItem value="200k-plus">$200k +</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Monthly Budget */}
          <div className="space-y-2">
            <Label htmlFor="monthlyBudget">Monthly Budget</Label>
            <Select
              value={formData.monthlyBudget}
              onValueChange={(value) => setFormData(prev => ({ ...prev, monthlyBudget: value }))}
            >
              <SelectTrigger id="monthlyBudget">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1k-2.5k">$1k ~ $2.5k</SelectItem>
                <SelectItem value="2.5k-5k">$2.5k ~ $5k</SelectItem>
                <SelectItem value="5k-10k">$5k ~ $10k</SelectItem>
                <SelectItem value="10k-plus">$10k+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* What do you need help with? */}
          <div className="space-y-3">
            <Label>What do you need help with?</Label>
            <div className="space-y-3">
              {helpOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={option}
                    checked={formData.helpNeeded.includes(option)}
                    onCheckedChange={(checked) => handleCheckboxChange(option, checked as boolean)}
                  />
                  <label
                    htmlFor={option}
                    className="text-slate-700 cursor-pointer select-none"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Goals */}
          <div className="space-y-2">
            <Label htmlFor="goals">Goals (next 90 days)</Label>
            <Textarea
              id="goals"
              value={formData.goals}
              onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
              placeholder="e.g., decrease CAC by 20%, add 2 new offers, 100 qualified leads/mo"
              rows={4}
            />
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start space-x-2 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <Checkbox
              id="agreeToEmails"
              checked={formData.agreeToEmails}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeToEmails: checked as boolean }))}
            />
            <label
              htmlFor="agreeToEmails"
              className="text-sm text-slate-700 cursor-pointer select-none leading-relaxed"
            >
              I agree to receive emails about my application and growth audit.
            </label>
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
