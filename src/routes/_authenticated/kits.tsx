import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KITS, KIT_PRICE, PIX_KEY, ALL_ACCESS_ID, ALL_ACCESS_PRICE, ALL_ACCESS_ORIGINAL } from "@/lib/kits";
import { ALL_ACCESS, formatBRL } from "@/lib/catalog";

export const Route = createFileRoute("/_authenticated/kits")({
  head: () => ({
    meta: [
      { title: "Meus kits — PostPronto" },
      { name: "description", content: "Seus kits de artes editáveis." },
      { property: "og:title", content: "Meus kits — PostPronto" },
      { property: "og:description", content: "Seus kits de artes editáveis." },
    ],
  }),
  component: KitsPage,
});

function KitsPage() {
  const { user } = Route.useRouteContext();
  const qc = useQueryClient();
  const { data: purchases = [] } = useQuery({
    queryKey: ["purchases", user.id],
    queryFn: async () => (await supabase.from("kit_purchases").select("*").eq("user_id", user.id)).data ?? [],
  });
  const [payer, setPayer] = useState("");
  const hasAllAccess = purchases.some((p: { kit_id: string; status: string }) => p.kit_id === ALL_ACCESS_ID && p.status === "approved");
  const allAccessPurchase = purchases.find((p: { kit_id: string }) => p.kit_id === ALL_ACCESS_ID);

  const markPaid = async (kitId: string) => {
    if (!payer.trim()) { toast.error("Informe o nome de quem fez o Pix"); return; }
    const { error } = await supabase.from("kit_purchases").insert({ user_id: user.id, user_email: user.email ?? null, kit_id: kitId, payer_name: payer.trim() });
    if (error) { toast.error("Não foi possível registrar"); return; }
    toast.success("Recebemos! Seu kit será liberado após a confirmação do Pix.");
    qc.invalidateQueries({ queryKey: ["purchases", user.id] });
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-4xl italic text-primary">Meus kits</h1>

        <div className="mt-6 rounded-3xl border border-primary/40 bg-primary/10 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">Recomendado</span>
              <h2 className="mt-2 text-2xl italic text-primary">{ALL_ACCESS.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{ALL_ACCESS.description}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground line-through">{ALL_ACCESS_ORIGINAL}</p>
              <p className="font-display text-3xl font-semibold text-primary">{ALL_ACCESS_PRICE}</p>
              <p className="text-xs text-muted-foreground">350 peças · todos os nichos</p>
            </div>
          </div>
          {hasAllAccess ? (
            <p className="mt-4 text-sm text-primary">✓ Acesso total liberado — todos os kits abaixo estão desbloqueados.</p>
          ) : !allAccessPurchase ? (
            <div className="mt-4 rounded-xl bg-secondary p-4 text-sm">
              <p className="font-medium">Para liberar TODOS os downloads, pague {ALL_ACCESS_PRICE} via Pix:</p>
              <p className="mt-1">Chave Pix: <b className="select-all">{PIX_KEY}</b></p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <Input placeholder="Nome de quem fez o Pix" value={payer} onChange={(e) => setPayer(e.target.value)} />
                <Button onClick={() => markPaid(ALL_ACCESS_ID)}>Já paguei — liberar tudo</Button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Ou compre um kit individual abaixo por {KIT_PRICE}.</p>
            </div>
          ) : (allAccessPurchase as { status: string })?.status === "pending" ? (
            <p className="mt-4 text-sm text-muted-foreground">⏳ Pagamento em análise. Você pode editar enquanto isso.</p>
          ) : null}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {KITS.map((k) => {
            const p = purchases.find((x: { kit_id: string }) => x.kit_id === k.id);
            const unlocked = hasAllAccess || p?.status === "approved";
            return (
              <div key={k.id} className="rounded-2xl border bg-card p-6 shadow-soft">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl italic text-primary">{k.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{k.description}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{k.templates.length} templates · {k.audience}</p>
                  </div>
                  <span className="rounded-full bg-gold px-3 py-1 text-sm font-medium text-gold-foreground">{unlocked ? "Liberado" : KIT_PRICE}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button asChild className="rounded-full">
                    <Link to="/editor/$kitId" params={{ kitId: k.id }}>{unlocked ? "Editar e baixar" : "Editar (prévia)"}</Link>
                  </Button>
                </div>
                {!unlocked && !p && (
                  <div className="mt-4 rounded-xl bg-secondary p-3 text-sm">
                    <p className="font-medium">Liberar só este kit — {KIT_PRICE} via Pix:</p>
                    <p className="mt-1 text-xs">Chave Pix: <b className="select-all">{PIX_KEY}</b></p>
                    <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                      <Input placeholder="Nome de quem fez o Pix" value={payer} onChange={(e) => setPayer(e.target.value)} />
                      <Button variant="outline" onClick={() => markPaid(k.id)}>Já paguei</Button>
                    </div>
                  </div>
                )}
                {p?.status === "pending" && <p className="mt-3 text-sm text-muted-foreground">⏳ Pagamento em análise. Você pode editar enquanto isso.</p>}
                {unlocked && <p className="mt-3 text-sm text-primary">✓ Kit liberado</p>}
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">Total: {KITS.length} kits · {KITS.reduce((a, k) => a + k.templates.length, 0)} templates editáveis · {formatBRL(ALL_ACCESS.priceCents)} libera todos via Acesso Completo.</p>
      </div>
    </div>
  );
}
