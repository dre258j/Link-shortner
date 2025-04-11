let urlDatabase = {};

export async function getServerSideProps({ params }) {
  const { id } = params;
  const destination = urlDatabase[id];

  if (destination) {
    return {
      redirect: {
        destination,
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
