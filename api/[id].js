let urlDatabase = {};

export async function getServerSideProps(context) {
  const { id } = context.params;

  const url = urlDatabase[id];
  if (url) {
    return {
      redirect: {
        destination: url,
        permanent: false,
      },
    };
  }

  return { notFound: true };
}

export default function RedirectPage() {
  return null;
}
