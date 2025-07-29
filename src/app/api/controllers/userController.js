import { Candidate } from '../models/CandidateModel';
import { Recruiter } from '../models/RecruiterModel';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { connectDB } from '../config/db';

// Register user
export async function registerUser (req) {
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

        const { name, email, password, role } = body;
        
        // Validate input
        if (!name || !email || !password || !role) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Please provide a valid email address' },
                { status: 400 }
            );
        }

        // Validate role
        if (!['candidate', 'recruiter'].includes(role)) {
            return NextResponse.json(
                { error: 'Invalid role' },
                { status: 400 }
            );
        }

        // Choose model based on role
        const Model = role === 'candidate' ? Candidate : Recruiter;

        // Check if user already exists
        const userAlreadyExist = await Model.findOne({ email });
        if (userAlreadyExist) {
            return NextResponse.json(
                { error: 'User  already exists' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new user
        const newUser  = new Model({
            name, 
            email, 
            password: hashedPassword,
            role // Include role in the user object
        });
        
        // Save user with detailed error handling
        try {
            const savedUser  = await newUser .save();
            
            return NextResponse.json(
                { 
                    message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully!`,
                    ok: true,
                    token: 'fake-token-or-real-jwt', // replace with real JWT if needed
                    user: {
                        _id: savedUser ._id,
                        name: savedUser .name,
                        email: savedUser .email,
                        role: savedUser .role // Include role in the response
                    }    
                },
                { status: 200 }
            );
        } catch (saveError) {
            console.error('Save error details:', saveError);

            // More user-friendly error message
            let errorMessage = 'Failed to save user';
            if (saveError.errors) {
                // Extract specific validation errors
                const errorFields = Object.keys(saveError.errors);
                if (errorFields.length > 0) {
                    const firstError = saveError.errors[errorFields[0]];
                    errorMessage = firstError.message || errorMessage;
                }
            }

            return NextResponse.json(
                { 
                    error: errorMessage,
                    details: saveError.message
                },
                { status: 400 } // Using 400 instead of 500 for validation errors
            );
        }
    } catch(err) {
        console.error('Unexpected registration error:', err);
        return NextResponse.json(
            { 
                error: 'Unexpected server error', 
                details: err.message 
            },
            { status: 500 }
        );
    }
}

// Login user
export async function loginUser (req) {
    try {
        await connectDB();

        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Check if user exists or not
        let isUserExist = await Candidate.findOne({ email });
        let userRole = 'candidate';
        if (!isUserExist) {
            isUserExist = await Recruiter.findOne({ email });
            userRole = 'recruiter';
        }

        if (!isUserExist) {
            return NextResponse.json(
                { error: 'User  not found' },
                { status: 400 }
            );
        }

        // Check if password is correct
        const isPasswordMatch = await bcrypt.compare(password, isUserExist.password);
        if (!isPasswordMatch) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 400 }
            );
        }
      
        // Return response with token and user data
        return NextResponse.json({
            message: 'Login successful',
            ok: true,
            token: 'your-jwt-token-here', // Replace with actual JWT token generation
            user: {
                _id: isUserExist._id,
                name: isUserExist.name,
                email: isUserExist.email,
                role: userRole // Include role in the response
            }
        });
    } catch(err) {
        console.error('Unexpected login error:', err);
        return NextResponse.json(
            { 
                error: 'Unexpected server error', 
                details: err.message 
            },
            { status: 500 }
        );
    }
}

// Logout user
export async function logoutUser () {
    try {
        const response = NextResponse.json({ message: 'Logout successful' });
        response.cookies.set('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            expires: new Date(0) // Set to past date to clear the cookie
        });
        return response;
    } catch (err) {
        console.error('Logout error:', err);
        return NextResponse.json(
            { error: 'Failed to logout', details: err.message },
            { status: 500 }
        );
    }
}