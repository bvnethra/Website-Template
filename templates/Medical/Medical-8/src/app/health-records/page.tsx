import { redirect } from 'next/navigation';

export default function HealthRecordsRedirect() {
  redirect('/account/health-records');
}