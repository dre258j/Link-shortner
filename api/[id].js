let urlDatabase = {};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const data = urlDatabase[id];

  if (data) {
    clickDatabase[id] = (clickDatabase[id] || 0) + 1;
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



