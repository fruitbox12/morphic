import { redirect } from 'next/navigation';
import { getIronSession } from 'iron-session/edge';
import { sessionOptions } from '@/lib/plaid';
import { Chat } from '@/components/chat';
import { generateId } from 'ai';
import { AI } from './actions';

export const dynamic = 'force-dynamic';

export default async function Page(req: Request) {
  const session = await getIronSession(req, NextResponse.next(), sessionOptions);

  // If not authenticated, redirect to the auth page
  if (!session.access_token) {
    return redirect('/auth');
  }

  const id = generateId();

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat id={id} />
    </AI>
  );
}
