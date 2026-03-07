import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Router } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Layout from "@/layout/Layout";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
        <SpeedInsights debug />
        <Analytics />
      </Layout>
    </>
  );
}
