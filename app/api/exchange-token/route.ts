import { withIronSessionApiRoute } from 'iron-session/next';
import { plaidClient, sessionOptions } from '@/lib/plaid';

async function exchangeTokenHandler(req, res) {
  try {
    const { public_token } = req.body; // Use req.body in API routes

    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token,
    });

    // Set session data
    req.session.access_token = exchangeResponse.data.access_token;
    await req.session.save();

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Error exchanging public token:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

// Correctly export the API handler wrapped with session handling
export default withIronSessionApiRoute(exchangeTokenHandler, sessionOptions);
