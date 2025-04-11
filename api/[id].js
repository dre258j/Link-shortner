let urlDatabase = {};
let clickDatabase = {};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const originalUrl = urlDatabase[id];

  if (originalUrl) {
    clickDatabase[id] = (clickDatabase[id] || 0) + 1;

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
