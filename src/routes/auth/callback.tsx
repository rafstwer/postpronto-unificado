import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/auth/callback")({
  head: () => ({ title: "Voltando… — PostPronto" }),
  component: CallbackPage,
});

function CallbackPage() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("Confirmando login…");

  useEffect(() => {
    (async () => {
      const url = new URL(window.location.href);
      // 1) Lovable/Supabase pode voltar com tokens no hash ou query
      const hash = new URLSearchParams(url.hash.replace(/^#/, ""));
      const access_token = hash.get("access_token") ?? url.searchParams.get("access_token");
      const refresh_token = hash.get("refresh_token") ?? url.searchParams.get("refresh_token");
      if (access_token && refresh_token) {
        const { error } = await supabase.auth.setSession({ access_token, refresh_token });
        if (error) {
          setMsg("Erro ao confirmar. Voltando para o login…");
          setTimeout(() => navigate({ to: "/auth" }), 1200);
          return;
        }
        navigate({ to: "/kits" });
        return;
      }
      // 2) Fluxo PKCE (?code=)
      const code = url.searchParams.get("code");
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          setMsg("Erro ao confirmar. Voltando para o login…");
          setTimeout(() => navigate({ to: "/auth" }), 1200);
          return;
        }
        navigate({ to: "/kits" });
        return;
      }
      // 3) Fallback: sessão já gravada pelo broker
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate({ to: "/kits" });
      } else {
        setMsg("Sessão não encontrada. Voltando para o login…");
        setTimeout(() => navigate({ to: "/auth" }), 1200);
      }
    })();
  }, [navigate]);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <p className="p-10 text-center">{msg}</p>
    </div>
  );
}
