import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session/edge';
import { plaidClient, sessionOptions } from '@/lib/plaid';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { public_token } = body;

    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token,
    });

    const res = NextResponse.next();
    const session = await getIronSession(req, res, sessionOptions);

    // Set session data
    session.access_token = exchangeResponse.data.access_token;
    await session.save();

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
