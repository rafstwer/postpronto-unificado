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
      // Supabase com PKCE retorna ?code= — exchangeCodeForSession troca por sessão.
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          setMsg("Erro ao confirmar. Voltando para o login…");
          setTimeout(() => navigate({ to: "/auth" }), 1200);
          return;
        }
      } else {
        // Fluxo implícito: token vem no hash (#access_token=...) — getSession resolve.
        await supabase.auth.getSession();
      }
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
