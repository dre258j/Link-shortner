const urlDatabase = {}; // This will not persist between requests in production

export async function getServerSideProps({ params }) {
  const originalUrl = urlDatabase[params.id];

  if (originalUrl) {
    return {
      redirect: {
        destination: originalUrl,
        permanent: false,
      },
    };
  }

  return {
    notFound: true,
  };
}

export default function RedirectPage() {
  return null;
}
