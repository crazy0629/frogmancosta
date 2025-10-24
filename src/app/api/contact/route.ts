import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Application from "@/models/Application";

// Helper functions to map form values to MongoDB schema
function mapRevenueToSchema(monthlyRevenue: string): string {
  const revenueMap: Record<string, string> = {
    'prefer-not-to-say': 'Under $10K/month',
    'less-than-10k': 'Under $10K/month',
    '10k-50k': '$10K-50K/month',
    '50k-200k': '$50K-100K/month',
    '200k-plus': '$100K-500K/month'
  };
  return revenueMap[monthlyRevenue] || 'Under $10K/month';
}

function mapBudgetToSchema(monthlyBudget: string): string {
  const budgetMap: Record<string, string> = {
    '1k-2.5k': 'Under $5K/month',
    '2.5k-5k': '$5K-15K/month',
    '5k-10k': '$15K-30K/month',
    '10k-plus': '$30K-50K/month'
  };
  return budgetMap[monthlyBudget] || 'Under $5K/month';
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { 
      fullName, 
      email, 
      phone,
      instagram,
      tiktok,
      website,
      monthlyRevenue, 
      monthlyBudget,
      helpNeeded,
      goals
    } = body;

    // Basic validation
    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if application with this email already exists
    const existingApplication = await Application.findOne({ email });
    if (existingApplication) {
      return NextResponse.json(
        { error: "An application with this email already exists" },
        { status: 409 }
      );
    }

    // Map original form fields to MongoDB schema
    const mappedData = {
      name: fullName,
      email,
      company: website || `${fullName}'s Business`, // Use website domain or create company name
      revenue: mapRevenueToSchema(monthlyRevenue),
      challenges: helpNeeded?.length > 0 ? `Help needed with: ${helpNeeded.join(', ')}` : 'General business growth',
      goals: goals || 'Growth and scaling objectives',
      timeline: '1-3 months', // Default timeline since not collected in original form
      budget: mapBudgetToSchema(monthlyBudget),
      status: 'pending',
      submittedAt: new Date()
    };

    // Create new application
    const application = new Application(mappedData);

    await application.save();

    console.log("New application submitted:", application._id);

    return NextResponse.json(
      { 
        message: "Application submitted successfully",
        applicationId: application._id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}