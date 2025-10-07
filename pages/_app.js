import "../style/globals.css";
import "leaflet/dist/leaflet.css";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }) {
  const noLayoutPaths = ["/", "/cadastro"];
  const path = typeof window !== "undefined" ? window.location.pathname : "";

  if (noLayoutPaths.includes(path)) {
    return <Component {...pageProps} />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
