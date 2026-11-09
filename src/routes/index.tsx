import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import Hero from "@/components/store/Hero";
import NicheGrid from "@/components/store/NicheGrid";
import FeaturedKit from "@/components/store/FeaturedKit";
import HowItWorks from "@/components/store/HowItWorks";
import Newsletter from "@/components/store/Newsletter";
import SiteFooter from "@/components/store/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PostPronto — Artes editáveis para redes sociais" },
      { name: "description", content: "Edite artes prontas para Instagram online, sem Canva. 7 kits com 350 peças por R$ 10,00." },
      { property: "og:title", content: "PostPronto — Artes editáveis sem Canva" },
      { property: "og:description", content: "7 kits de artes para redes sociais editáveis online. R$ 10,00 libera todos." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <NicheGrid />
        <FeaturedKit />
        <HowItWorks />
        <Newsletter />
      </main>
      <SiteFooter />
    </div>
  );
}
