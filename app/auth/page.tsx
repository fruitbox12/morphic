import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';

// Dynamically import the PlaidAuth component, disabling server-side rendering
const PlaidAuth = dynamic(() => import('@/components/PlaidAuth'), { ssr: false });

// Function to fetch the link token from the server or API
async function fetchLinkTokenFromServer() {
  // Replace with your actual API call or logic to retrieve the link token
  const response = await fetch('/api/exchange-token');
  const data = await response.json();
  return data.linkToken;
}

// Server-side function to fetch props
export const getServerSideProps: GetServerSideProps = async () => {
  const linkToken = await fetchLinkTokenFromServer();
  return { props: { linkToken } };
};

// The AuthPage component
function AuthPage({ linkToken }: { linkToken: string }) {
  return (
    <div>
      <h1>Connecting to Plaid...</h1>
      <p>Please wait while we connect your account.</p>
      <PlaidAuth linkToken={linkToken} />
    </div>
  );
}

export default AuthPage;
