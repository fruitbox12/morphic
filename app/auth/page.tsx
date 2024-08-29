import dynamic from 'next/dynamic';

// Dynamically import the PlaidAuth component, disabling server-side rendering
const PlaidAuth = dynamic(() => import('@/components/PlaidAuth'), { ssr: false });

// Function to fetch the link token from the server or API
async function fetchLinkTokenFromServer() {
  // Replace with your actual API call or logic to retrieve the link token
  const response = await fetch('/api/exchange-token');
  const data = await response.json();
  return data.linkToken;
}

export default async function AuthPage() {
  // Fetch the link token directly in the component
  const linkToken = await fetchLinkTokenFromServer();

  return (
    <div>
      <h1>Connecting to Plaid...</h1>
      <p>Please wait while we connect your account.</p>
      <PlaidAuth linkToken={linkToken} />
    </div>
  );
}
