import React from 'react';
import { OrderTrackingClient } from './OrderTrackingClient';

export async function generateStaticParams() {
  return [{ id: 'MN682490' }, { id: '1' }];
}

export default function OrderTrackingPage() {
  return <OrderTrackingClient />;
}
