// pages/[id].js

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function RedirectPage() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    // সার্ভার সাইড রিডাইরেকশন হ্যান্ডেল করা উচিত
    // এখানে শুধুমাত্র একটি লোডিং বার্তা দেখানো হচ্ছে
  }, [id]);

  return <p>Redirecting...</p>;
}
