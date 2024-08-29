import { NextResponse } from 'next/server';
import { withIronSessionApiRoute } from 'iron-session/next';
import { plaidClient, sessionOptions } from '@/lib/plaid';

export async function POST(request: Request) {
  try {
    const { public_token } = await request.json();

    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token,
    });

    request.session.access_token = exchangeResponse.data.access_token;
    await request.session.save();

    // Here you could fetch additional Plaid data if needed

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

export default withIronSessionApiRoute(POST, sessionOptions);
