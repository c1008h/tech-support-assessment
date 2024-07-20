"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {WrapperLayout} from '@/components';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [result, setResult] = useState<string>('Cancel Subscription');
  const router = useRouter();

  const handleCancelSubscription = async () => {
    setLoading(true);
    setMessage('');

    const customerId = process.env.NEXT_PUBLIC_CUSTOMER_ID // demo customer in the test Stripe account

    console.log("CUSTOMER ID:", customerId)
    try {
      const res = await fetch('/api/churnkey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerId })
      });

      if (!res.ok) {
        console.error("Failed to fetch user_hash!");
        return;
      }

      const { userHash } = await res.json();
      window.churnkey.init('show', {
        customerId,
        authHash: userHash, // need to be calculated
        appId: process.env.NEXT_PUBLIC_APP_ID, // found on settings | organization
        mode: 'test',
        provider:'stripe',
        preview: true, // set to true so that no billing actions are actually taken
        record: false, // disable session recording
        report: false, // disable session reporting (used for analytics)
        onPause: () => {
          setResult('Unpause Subscription');
          setMessage('Subscription paused successfully.');
          setLoading(false);
        },
        onCancel: () => {
          setResult('Subscription Cancelled');
          setMessage('Subscription cancelled successfully.');
          router.push('/success');
          setLoading(false);
        }
      })
    } catch (error) {
      console.log("Error on cancel:", error)
      setMessage('Failed to cancel the subscription. Please try again in a few minutes.');
      setLoading(false);
    } 
  };

  return (
    <WrapperLayout>
      <div className='m-10'>
        <h1 className="text-3xl font-bold mb-6">Your Plan</h1>
        <p>Manage your credit card information and manage your clincal licenses.</p>
        <div className="mt-2 bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Account Details</h2>
          <p><strong>Name:</strong> Chris Hong</p>
          <p><strong>Email:</strong> chrishong@example.com</p>
          <p><strong>Subscription:</strong> Premium Plan</p>
          <p><strong>Renewal Date:</strong> 2024-8-8</p>
        </div>
        <button 
          type="button" 
          id='cancel-button'
          className={`bg-red-500 text-white py-2 px-4 rounded mt-6 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
          onClick={handleCancelSubscription} 
          disabled={loading}
        >
          {loading ? 'Processing...' : result}
        </button>
        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </div>
    </WrapperLayout>
  );
}
