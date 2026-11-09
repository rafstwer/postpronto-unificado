import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { getKit } from "@/lib/kits";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — PostPronto" },
      { name: "description", content: "Liberação de pagamentos Pix." },
      { property: "og:title", content: "Admin — PostPronto" },
      { property: "og:description", content: "Liberação de pagamentos Pix." },
    ],
  }),
  component: Admin,
});

function Admin() {
  const { user } = Route.useRouteContext();
  const qc = useQueryClient();
  const { data: isAdmin } = useQuery({
    queryKey: ["isAdmin", user.id],
    queryFn: async () => !!(await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" })).data,
  });
  const { data: rows = [] } = useQuery({
    queryKey: ["allPurchases"],
    enabled: !!isAdmin,
    queryFn: async () => (await supabase.from("kit_purchases").select("*").order("created_at", { ascending: false })).data ?? [],
  });

  const approve = async (id: string) => {
    const { error } = await supabase.from("kit_purchases").update({ status: "approved", approved_at: new Date().toISOString() }).eq("id", id);
    if (error) { toast.error("Erro ao liberar"); return; }
    toast.success("Kit liberado");
    qc.invalidateQueries({ queryKey: ["allPurchases"] });
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-4xl italic text-primary">Pagamentos Pix</h1>
        {isAdmin === false && <p className="mt-4">Acesso restrito.</p>}
        <div className="mt-6 space-y-3">
          {rows.map((r) => (
            <div key={r.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-card p-4">
              <div className="text-sm">
                <div className="font-medium">{r.user_email}</div>
                <div className="text-muted-foreground">Pix de: {r.payer_name} · {getKit(r.kit_id)?.name} · {new Date(r.created_at).toLocaleString("pt-BR")}</div>
              </div>
              {r.status === "pending" ? <Button size="sm" onClick={() => approve(r.id)}>Liberar</Button> : <span className="text-sm text-primary">✓ Liberado</span>}
            </div>
          ))}
          {isAdmin && rows.length === 0 && <p className="text-muted-foreground">Nenhum pedido ainda.</p>}
        </div>
      </div>
    </div>
  );
}
