import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'; // Use cookies to manage session data in the App Directory
import { getIronSession } from 'iron-session/edge';
import { sessionOptions } from '@/lib/plaid';
import { Chat } from '@/components/chat';
import { generateId } from 'ai';
import { AI } from './actions'

export const dynamic = 'force-dynamic';

export default async function Page() {
  // Access cookies to get session token
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('session-token'); // Adjust the cookie key as necessary

  // Fetch session based on the token
  const session = await getIronSession(
    { cookies: cookieStore },
    sessionOptions
  );

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
