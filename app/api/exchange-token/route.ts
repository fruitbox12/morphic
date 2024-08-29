import { NextResponse } from 'next/server';
import { plaidClient, sessionOptions } from '@/lib/plaid';
import { withIronSessionApiRoute } from 'iron-session/next';

async function exchangeTokenHandler(req, res) {
  try {
    const { public_token } = await req.json();

    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token,
    });

    // Set session data
    req.session.access_token = exchangeResponse.data.access_token;
    await req.session.save();

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error exchanging public token:', error);
    return NextResponse.json(
      {
        message: 'Internal Server Error',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// Correctly export the POST method with session handling
export const POST = withIronSessionApiRoute(exchangeTokenHandler, sessionOptions);
