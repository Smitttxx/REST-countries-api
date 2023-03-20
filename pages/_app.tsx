import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import English from "../content/compiled-locales/en.json";
import German from "../content/compiled-locales/de.json";
import { Router, useRouter } from "next/router";
import React, { useMemo } from "react";
import { IntlProvider } from "react-intl";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  const [shortLocale] = locale ? locale.split("-") : ["en"];

  const messages = useMemo(() => {
    switch (shortLocale) {
      case "de":
        return German;
      case "en":
        return English;
      default:
        return English;
    }
  }, [shortLocale]);

  return (
    <IntlProvider locale={shortLocale} messages={messages}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </IntlProvider>
  );
}

export default MyApp;
