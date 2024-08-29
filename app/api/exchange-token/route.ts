import { NextResponse } from 'next/server';
import { withIronSessionApiRoute } from 'iron-session/next';
import { plaidClient, sessionOptions } from '@/lib/plaid';
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(request: NextApiRequest, response: NextApiResponse) {
  try {
    const { public_token } = request.body;

    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token,
    });

    // Set session data
    request.session.access_token = exchangeResponse.data.access_token;
    await request.session.save();

    // Here you could fetch additional Plaid data if needed

    return response.json({ ok: true });
  } catch (error) {
    console.error('Error exchanging public token:', error);
    return response.status(500).json({
      message: 'Internal Server Error',
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

// Wrap the handler with iron-session
export default withIronSessionApiRoute(POST, sessionOptions);
