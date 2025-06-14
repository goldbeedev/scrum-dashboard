import { Suspense } from 'react';
import HostedCheckoutClient from './HostedCheckoutClient';

export default function CheckOutPage() {
  return (
    <Suspense fallback={
      <div className="page-container">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-1/3"></div>
        </div>
      </div>
    }>
      <HostedCheckoutClient />
    </Suspense>
  );
}