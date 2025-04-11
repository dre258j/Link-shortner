import { useEffect } from 'react';
import { useRouter } from 'next/router';

let urlDatabase = {}; // Same database from api/shorten.js (in memory for demo)

export default function RedirectPage() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    // Try fetching from localStorage
    const storedData = localStorage.getItem('shortUrls');
    if (storedData) {
      const parsed = JSON.parse(storedData);
      if (parsed[id]) {
        // Redirect to original URL
        window.location.href = parsed[id].original;
      }
    }
  }, [id]);

  return <p>Redirecting...</p>;
}
