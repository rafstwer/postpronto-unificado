import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Artwork } from "@/components/Templates";
import { getKit, defaultBrand, defaultValues } from "@/lib/kits";
import { ALL_ACCESS, PRODUCTS, formatBRL } from "@/lib/catalog";

export default function NicheGrid() {
  return (
    <section id="kits" className="scroll-mt-20 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Catálogo</p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Escolha o seu nicho</h2>
          <p className="mt-3 text-muted-foreground">
            Sete kits em um só lugar — Beleza, Cabelo, Unhas, Maquiagem, Alimentação, Barbearia e Premium Beauty Studio. O valor é único: um pagamento de {formatBRL(ALL_ACCESS.priceCents)} libera <strong className="text-foreground">todos os kits</strong> para editar no navegador e baixar em PNG.
          </p>
        </div>

        <div className="mx-auto mt-8 flex w-full max-w-3xl flex-col items-center gap-3 rounded-3xl border border-primary/40 bg-primary/10 px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-display text-lg font-semibold">Acesso Completo — todos os kits de uma vez</p>
            <p className="mt-1 text-sm text-muted-foreground">{ALL_ACCESS.pieces.reduce((acc, p) => acc + p.qty, 0)} peças · sem assinatura · acesso vitalício pela sua conta</p>
          </div>
          <div className="flex flex-col items-center gap-2 sm:items-end">
            <p className="font-display text-2xl font-semibold text-primary">
              <span className="mr-1.5 text-sm font-normal text-muted-foreground line-through">{formatBRL(ALL_ACCESS.originalPriceCents)}</span>
              {formatBRL(ALL_ACCESS.priceCents)}
            </p>
            <Button asChild size="lg" className="rounded-full px-6">
              <Link to="/kits">Quero o acesso total</Link>
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => {
            const kit = product.kitId ? getKit(product.kitId) : undefined;
            const templates = kit?.templates ?? [];
            const preview = [templates[0], templates[11], templates[4], templates[17]].filter(Boolean);
            return (
              <div key={product.id} className="overflow-hidden rounded-2xl border border-border bg-card pt-0 transition-shadow hover:shadow-md">
                <div className="grid aspect-square grid-cols-2 grid-rows-2 gap-1 border-b border-border/60 bg-secondary/60 p-0">
                  {preview.map((t, i) => (
                    <div key={`${product.id}-${i}`} className="relative overflow-hidden">
                      <div style={{ transform: "scale(0.42)", transformOrigin: "top left", width: 1080, height: 1350 }}>
                        {t ? <Artwork layout={t.layout} format={t.format} brand={kit?.brand ?? defaultBrand} values={defaultValues(t)} /> : null}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 p-5">
                  <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">Incluído no Acesso Completo</span>
                  <h3 className="font-display text-xl font-semibold">{product.nicheLabel}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{product.audience}</p>
                  <p className="text-sm font-medium text-muted-foreground">
                    {product.pieces.reduce((acc, p) => acc + p.qty, 0)} peças · valor único de {formatBRL(ALL_ACCESS.priceCents)} para todos os kits
                  </p>
                </div>
                <div className="flex gap-2 p-5 pt-0">
                  <Button asChild className="flex-1 rounded-full">
                    <Link to="/kits">Comprar acesso total</Link>
                  </Button>
                  {product.kitId ? (
                    <Button asChild variant="outline" className="rounded-full">
                      <Link to="/editor/$kitId" params={{ kitId: product.kitId }}>Ver peças</Link>
                    </Button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
