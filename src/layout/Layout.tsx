import Footer from "@/components/Footer";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    // <div className="absolute inset-0 ">
    //   <Header />
    //   <div>{children}</div>
    //   <Footer />
    // </div>
    <div className="relative min-h-screen text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(6,182,212,0.25),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.18),transparent_45%),linear-gradient(180deg,#020617_0%,#020617_45%,#0b1120_100%)]" />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
