import { NextResponse } from 'next/server';
import { plaidClient, sessionOptions } from '@/lib/plaid';
import { withIronSessionApiRoute } from 'iron-session/next';

async function exchangeTokenHandler(request: Request) {
  try {
    const { public_token } = await request.json();

    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token,
    });

    // Assuming you have a way to handle session in this context:
    const session = await getSession(request);  // You may need to implement this function
    session.access_token = exchangeResponse.data.access_token;
    await session.save();

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Internal Server Error',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// Export the POST method correctly
export const POST = exchangeTokenHandler;
