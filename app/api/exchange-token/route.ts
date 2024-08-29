import { NextResponse } from 'next/server';
import { withIronSessionApiRoute } from 'iron-session/next';
import { plaidClient, sessionOptions } from '@/lib/plaid';
import { NextApiRequest, NextApiResponse } from 'next';

// Wrap the POST function with iron-session in the handler
async function exchangeTokenHandler(request: NextApiRequest, response: NextApiResponse) {
  try {
    const { public_token } = request.body;

    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token,
    });

    // Set session data
    request.session.access_token = exchangeResponse.data.access_token;
    await request.session.save();

    return response.json({ ok: true });
  } catch (error) {
    console.error('Error exchanging public token:', error);
    return response.status(500).json({
      message: 'Internal Server Error',
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

// Export POST directly (no default export)
export const POST = withIronSessionApiRoute(exchangeTokenHandler, sessionOptions);
