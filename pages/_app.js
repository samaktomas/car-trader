import { SWRConfig } from "swr";
import Header from "../components/Header";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <SWRConfig value={{ fetcher: (url) => fetch(url).then((r) => r.json()) }}>
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}
