// auth/page.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePlaidLink } from 'react-plaid-link';
import { useAppState } from '@/lib/utils/app-state';

// Since the token is generated server-side, pass it as a prop
export default function AuthPage({ linkToken }: { linkToken: string }) {
  const { setPlaidData } = useAppState();
  const router = useRouter();

  const onSuccess = (public_token: string) => {
    fetch('/api/exchange-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ public_token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          setPlaidData(data);
          router.push('/'); // Redirect to the main page
        }
      });
  };

  const { open, ready } = usePlaidLink({
    token: linkToken, // Use the link token passed from the server
    onSuccess,
  });

  useEffect(() => {
    if (ready) {
      open(); // Automatically open Plaid Link when the component loads
    }
  }, [ready, open]);

  return (
    <div>
      <h1>Connecting to Plaid...</h1>
      <p>Please wait while we connect your account.</p>
    </div>
  );
}
