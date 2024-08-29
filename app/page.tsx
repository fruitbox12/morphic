import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'; // Use cookies to manage session data in the App Directory
import { getIronSession } from 'iron-session/edge';
import { sessionOptions } from '@/lib/plaid';
import { Chat } from '@/components/chat';
import { generateId } from 'ai';
import { AI } from './actions';

export const dynamic = 'force-dynamic';

export default async function Page() {
  // Access cookies to get session token
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('session-token')?.value; // Get the token value

  // Mock request and response objects as Iron Session expects them
  const req = { headers: { cookie: sessionToken ? `session-token=${sessionToken}` : '' } };
  const res = {}; // Mock response object if needed

  // Fetch session based on the token
  const session = await getIronSession(req, res, sessionOptions);

  // If not authenticated, redirect to the auth page
  if (!session || !session.access_token) {
    return redirect('/auth');
  }

  const id = generateId();

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat id={id} />
    </AI>
  );
}
