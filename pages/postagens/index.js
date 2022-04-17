export default function PostagensIndex() {}

export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: '/',
      permanent: false
    }
  }
}
