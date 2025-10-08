import "../style/globals.css";
import "leaflet/dist/leaflet.css";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const noLayoutPaths = ["/", "/cadastro"];
  const path = router.pathname;

  if (noLayoutPaths.includes(path)) {
    return <Component {...pageProps} />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
