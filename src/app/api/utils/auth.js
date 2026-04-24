import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret && process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET must be set in production');
  }
  return secret || 'dev_jwt_secret';
}

export function generateToken(payload) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: '7d' });
}

export function verifyTokenFromHeader(req) {
  try {
    // Try Authorization header first
    const authHeader = (req.headers && (req.headers.get && req.headers.get('authorization'))) || (req.headers && req.headers.authorization) || null;
    let token = null;
    if (authHeader) {
      const headerVal = typeof authHeader === 'string' ? authHeader : authHeader.value || '';
      if (headerVal.startsWith('Bearer ')) token = headerVal.split(' ')[1];
    }

    // If no header token, try cookie header
    if (!token && req.cookies?.get) {
      token = req.cookies.get('token')?.value || null;
    }

    if (!token) {
      const cookieHeader = (req.headers && (req.headers.get && req.headers.get('cookie'))) || (req.headers && req.headers.cookie) || null;
      if (cookieHeader) {
        const match = cookieHeader.match(/token=([^;]+)/);
        if (match) token = match[1];
      }
    }

    if (!token) {
      return { error: 'Authorization token missing' };
    }

    const decoded = jwt.verify(token, getJwtSecret());
    return { decoded };
  } catch (err) {
    return { error: err.message || 'Invalid token' };
  }
}

export function unauthorizedResponse(message = 'Unauthorized') {
  return NextResponse.json({ error: message }, { status: 401 });
}
