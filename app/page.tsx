import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppState } from '@/lib/utils/app-state';
import { Chat } from '@/components/chat';
import { generateId } from 'ai';
import { AI } from './actions';

export const maxDuration = 60;

export default function Page() {
  const id = generateId();
  const { plaidData } = useAppState(); // Access the Plaid data from the state
  const router = useRouter();

  useEffect(() => {
    if (!plaidData) {
      // If no Plaid data is present, redirect to the authentication page
      router.push('/auth');
    }
  }, [plaidData, router]);

  // Render the chat component only if the user is authenticated with Plaid
  if (!plaidData) {
    return null; // or a loading indicator
  }

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat id={id} />
    </AI>
  );
}
