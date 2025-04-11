import urlDatabase from '../lib/db';

export async function getServerSideProps(context) {
  const { id } = context.params;
  const data = urlDatabase[id];

  if (data) {
    data.clicks++;
    return {
      redirect: {
        destination: data.originalUrl,
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
