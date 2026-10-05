import React, { Suspense } from 'react';
import BookingFormClient from '@/components/booking/BookingFormClient';

export default function GeneralBookingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading booking form...</div>}>
      <BookingFormClient />
    </Suspense>
  );
}
