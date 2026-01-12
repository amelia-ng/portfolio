export const getStaticProps = async () => {
  return {
    redirect: {
      destination: '/blog',
      permanent: true,
    },
  };
};

export default function PostsRedirect() {
  return null;
}
