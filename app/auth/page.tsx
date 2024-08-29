import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const PlaidAuth = dynamic(() => import('@/components/PlaidAuth'), { ssr: false });

export default function AuthPage() {
  const [linkToken, setLinkToken] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the linkToken from an API or use a context/store
    async function fetchLinkToken() {
      const response = await fetch('/api/get-link-token');
      const data = await response.json();
      setLinkToken(data.linkToken);
    }
    fetchLinkToken();
  }, []);

  if (!linkToken) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Connecting to Plaid...</h1>
      <p>Please wait while we connect your account.</p>
      <PlaidAuth linkToken={linkToken} />
    </div>
  );
}
