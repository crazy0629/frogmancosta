import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Application from "@/models/Application";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { 
      name, 
      email, 
      company, 
      revenue, 
      challenges, 
      goals, 
      timeline, 
      budget 
    } = body;

    // Basic validation
    if (!name || !email || !company || !revenue || !challenges || !goals || !timeline || !budget) {
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

    // Create new application
    const application = new Application({
      name,
      email,
      company,
      revenue,
      challenges,
      goals,
      timeline,
      budget,
      status: 'pending',
      submittedAt: new Date()
    });

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