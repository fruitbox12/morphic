import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the PlaidAuth component to ensure it's only loaded on the client
const PlaidAuth = dynamic(() => import('@/components/PlaidAuth'), { ssr: false });

export default function AuthPage({ linkToken }: { linkToken: string }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      <h1>Connecting to Plaid...</h1>
      <p>Please wait while we connect your account.</p>
      {isClient && <PlaidAuth linkToken={linkToken} />}
    </div>
  );
}
