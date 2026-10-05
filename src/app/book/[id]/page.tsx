'use client';

import React, { Suspense } from 'react';
import { useParams } from 'next/navigation';
import BookingFormClient from '@/components/booking/BookingFormClient';

function SpecificBookingContent() {
  const params = useParams();
  const providerId = (params?.id as string) || '';

  return <BookingFormClient initialProviderId={providerId} />;
}

export default function SpecificBookingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading booking form...</div>}>
      <SpecificBookingContent />
    </Suspense>
  );
}
