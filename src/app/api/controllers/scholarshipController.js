import {ScholarShip} from '../models/ScholarShipModel.js';
import { NextResponse } from 'next/server.js';
import bcrypt from 'bcryptjs'
import { connectDB } from '../config/db.js';

export async function applyForScholarship(req) {
    try {
        // Ensure database connection
        await connectDB();

        // Parse JSON with error handling
        let body;
        try {
            body = await req.json();
        } catch (parseError) {
            console.error('JSON Parsing Error:', parseError);
            return NextResponse.json(
                { error: 'Invalid request body', details: parseError.message },
                { status: 400 }
            );
        }

        const { name, primary_email, contect_number, resume_url, college_name, degree } = body;

        // Validate input
        if (!name || !primary_email || !contect_number || !college_name || !degree) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(primary_email)) {
            return NextResponse.json(
                { error: 'Please provide a valid email address' },
                { status: 400 }
            );
        }

        // Check if scholarship application already exists
        const applicationAlreadyExist = await ScholarShip.findOne({ primary_email });
        if (applicationAlreadyExist) {
            return NextResponse.json(
                { error: 'Application with this email already exists' },
                { status: 400 }
            );
        }

        // Create new scholarship application
        const newApplication = new ScholarShip({
            name,
            primary_email,
            contect_number,
            resume_url,
            college_name,
            degree
        });

        await newApplication.save();

        return NextResponse.json(
            { message: 'Scholarship application submitted successfully' },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error applying for scholarship:', error);
        return NextResponse.json(
            { error: 'Server error', details: error.message },
            { status: 500 }
        );
    }
}