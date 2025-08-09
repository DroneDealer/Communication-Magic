export default function Home({ serverTime }) {
  return (
    <main style={{ fontFamily: "sans-serif", padding: "1rem" }}>
      <h1>Dynamic Next.js + JavaScript Site</h1>
      <p>Server Time: {serverTime}</p>
    </main>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      serverTime: new Date().toLocaleString(),
    },
  };
}
