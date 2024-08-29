import { NextResponse } from 'next/server';
import { plaidClient } from '@/lib/plaid';
import { CountryCode, Products } from 'plaid';

export async function POST(request: Request) {
  try {
    const { client_user_id } = await request.json();

    const tokenResponse = await plaidClient.linkTokenCreate({
      user: { client_user_id },
      client_name: "Plaid's Tiny Quickstart",
      language: 'en',
      products: [Products.Auth, Products.Transactions], // Use the enum for products
      country_codes: [CountryCode.Us], // Use the enum for country code
      redirect_uri: process.env.PLAID_SANDBOX_REDIRECT_URI,
    });

    return NextResponse.json(tokenResponse.data);
  } catch (error) {
    console.error('Plaid token creation error:', error);
    return NextResponse.json(
      {
        message: 'Internal Server Error',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
