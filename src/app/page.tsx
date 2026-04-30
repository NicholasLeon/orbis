import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Features from "./components/features";
import Footer from "./components/footer";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#000000] text-[#8ffcff] font-sans antialiased selection:bg-[#00f9ff] selection:text-black">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}