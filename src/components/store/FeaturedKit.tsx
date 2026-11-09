import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Artwork } from "@/components/Templates";
import { getKit, defaultBrand, defaultValues } from "@/lib/kits";
import { ALL_ACCESS, formatBRL } from "@/lib/catalog";

const PREVIEW: Array<{ kit: string; index: number }> = [
  { kit: "beleza", index: 0 },
  { kit: "cabelo", index: 0 },
  { kit: "unhas", index: 11 },
  { kit: "beleza", index: 8 },
];

export default function FeaturedKit() {
  const product = ALL_ACCESS;
  return (
    <section id="acesso" className="scroll-mt-20 pb-14 md:pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              {PREVIEW.map((p, i) => {
                const kit = getKit(p.kit);
                const t = kit?.templates[p.index];
                if (!kit || !t) return null;
                return (
                  <div key={`feat-${i}`} className="overflow-hidden rounded-xl border border-border/70 bg-secondary/40 shadow-sm">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <div style={{ transform: "scale(0.42)", transformOrigin: "top left", width: 1080, height: 1350 }}>
                        <Artwork layout={t.layout} format={t.format} brand={kit.brand ?? defaultBrand} values={defaultValues(t)} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-center text-xs text-muted-foreground">Amostra real dos kits — peças renderizadas pelo próprio editor PostPronto.</p>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">Valor único · Todos os kits</span>
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">Entrega digital e automática</span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">{product.title}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{product.description}</p>

            <div className="mt-6 overflow-hidden rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary/60">
                    <th className="px-4 py-3 text-left font-semibold">Material</th>
                    <th className="px-4 py-3 text-right font-semibold">Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  {product.pieces.map((piece) => (
                    <tr key={piece.label} className="border-t border-border/60">
                      <td className="px-4 py-2.5">{piece.label}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums">{piece.qty}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 font-semibold">Total</td>
                    <td className="px-4 py-3 text-right font-semibold tabular-nums">{product.pieces.reduce((acc, p) => acc + p.qty, 0)} peças</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <h3 className="mt-6 font-display text-lg font-semibold">E ainda inclui</h3>
            <ul className="mt-3 space-y-2">
              {product.bonuses.map((bonus) => (
                <li key={bonus} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  <span className="text-secondary-foreground">{bonus}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-end justify-between gap-4 rounded-2xl bg-secondary/60 p-5">
              <div>
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-base text-muted-foreground line-through">{formatBRL(product.originalPriceCents)}</span>
                  <span className="font-display text-4xl font-semibold text-primary">{formatBRL(product.priceCents)}</span>
                  <span className="text-sm text-muted-foreground">pagamento único</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">De {formatBRL(product.originalPriceCents)} por {formatBRL(product.priceCents)} · acesso vitalício ao editor online na sua conta</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button asChild size="lg" className="rounded-full px-7">
                  <Link to="/kits">Comprar acesso total</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <Link to="/kits">Ver as artes</Link>
                </Button>
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">Após a confirmação, você cria seu usuário e senha — o acesso ao editor online fica salvo na sua conta e funciona no navegador do computador e do celular, sem instalar nada.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
