import { NextResponse } from 'next/server';
import { plaidClient } from 'lib/plaid';
import { withSessionRoute } from 'iron-session/next/route';
import { sessionOptions } from '@/lib/session';

async function exchangeTokenHandler(request: Request) {
  try {
    const { public_token } = await request.json();

    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token,
    });

    // Assuming you have a way to handle session in this context:
    const session = await getSession(request);  // You may need to implement this function to manage sessions
    session.access_token = exchangeResponse.data.access_token;
    await session.save();

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Internal Server Error',
        error: error.message || 'An unknown error occurred',
      },
      { status: 500 }
    );
  }
}

// Correctly export the POST method with session handling
export const POST = withSessionRoute(exchangeTokenHandler, sessionOptions);
