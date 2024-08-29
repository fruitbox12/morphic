import dynamic from 'next/dynamic';

// Dynamically import the component that uses client-side hooks
const PlaidAuth = dynamic(() => import('@/components/PlaidAuth'), { ssr: false });

export default function AuthPage({ linkToken }: { linkToken: string }) {
  return (
    <div>
      <h1>Connecting to Plaid...</h1>
      <p>Please wait while we connect your account.</p>
      {/* Only render the PlaidAuth component on the client-side */}
      <PlaidAuth linkToken={linkToken} />
    </div>
  );
}
