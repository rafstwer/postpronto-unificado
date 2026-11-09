import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Artwork } from "@/components/Templates";
import { KITS, defaultBrand, defaultValues, getKit } from "@/lib/kits";
import { ALL_ACCESS, formatBRL } from "@/lib/catalog";

const TRUST = [
  "Edição 100% online — sem Canva",
  "Conta com e-mail e senha após a compra",
  "Artes modernas + sua logo em todas",
];

function Collage() {
  const picks: Array<{ kit: string; index: number; label: string }> = [
    { kit: "beleza", index: 0, label: "Kit Beleza" },
    { kit: "cabelo", index: 0, label: "Kit Cabelo" },
    { kit: "unhas", index: 11, label: "Kit Unhas" },
    { kit: "maquiagem", index: 0, label: "Kit Maquiagem" },
    { kit: "alimentacao", index: 4, label: "Kit Alimentação" },
  ];
  const spans = ["col-span-3 translate-y-4", "col-span-3 -translate-y-2", "col-span-2 translate-y-2", "col-span-2 -translate-y-3", "col-span-2 translate-y-1"];
  return (
    <div className="grid grid-cols-6 gap-3 sm:gap-4">
      {picks.map((p, i) => {
        const kit = getKit(p.kit) ?? KITS[0];
        if (!kit) return null;
        const t = kit.templates[p.index] ?? kit.templates[0];
        if (!t) return null;
        return (
          <div key={`${p.kit}-${p.index}`} className={`overflow-hidden rounded-xl border border-border bg-card shadow-md ${spans[i]}`}>
            <div className="relative aspect-[4/5] overflow-hidden">
              <div style={{ transform: "scale(0.33)", transformOrigin: "top left", width: 1080, height: 1350 }}>
                <Artwork layout={t.layout} format={t.format} brand={kit.brand ?? defaultBrand} values={defaultValues(t)} />
              </div>
            </div>
            <p className="truncate border-t border-border/70 px-2.5 py-2 text-[10px] font-medium uppercase tracking-wide text-muted-foreground sm:text-[11px]">
              {p.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default function Hero() {
  return (
    <section id="topo" className="scroll-mt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-12 pt-10 sm:px-6 md:grid-cols-2 md:pb-20 md:pt-16">
        <div>
          <span className="mb-5 inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            7 kits · valor único de {formatBRL(ALL_ACCESS.priceCents)} para acessar tudo
          </span>
          <h1 className="font-display text-4xl font-semibold leading-[1.1] sm:text-5xl">
            Cansado de usar Canva? <span className="italic text-primary">Aqui a edição é online.</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Artes prontas para Instagram, TikTok, Facebook e WhatsApp — você paga {formatBRL(ALL_ACCESS.priceCents)} uma única vez, cria seu usuário e senha e edita TODOS os kits no navegador: troque textos e fotos, escolha usar no feed ou nos stories (a arte se ajusta ao formato) e baixe em PNG.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full px-6">
              <a href="#kits">Acesso completo · {formatBRL(ALL_ACCESS.priceCents)}</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-6">
              <Link to="/kits">Ver as artes</Link>
            </Button>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Diferenciais">
            {TRUST.map((label) => (
              <li key={label} className="flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-medium text-secondary-foreground sm:text-sm">
                <span className="size-1.5 rounded-full bg-primary" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative" aria-hidden>
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-secondary/70 via-background to-secondary/40" />
          <Collage />
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-2xl border border-border bg-card px-5 py-3.5 text-center shadow-lg">
            <p className="whitespace-nowrap font-display text-sm font-semibold">
              350 peças editáveis · <span className="text-muted-foreground line-through">R$ 29,99</span> <span className="text-primary">R$ 10,00</span>
            </p>
            <p className="text-[11px] text-muted-foreground">Um só valor libera todos os kits</p>
          </div>
        </div>
      </div>
    </section>
  );
}
