import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Entrar — PostPronto" },
      { name: "description", content: "Entre ou crie sua conta para editar seus kits de artes." },
      { property: "og:title", content: "Entrar — PostPronto" },
      { property: "og:description", content: "Acesse sua conta PostPronto." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) { toast.error("E-mail ou senha inválidos"); return; }
      navigate({ to: "/kits" });
    } else {
      const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + "/kits" } });
      setLoading(false);
      if (error) { toast.error(error.message); return; }
      toast.success("Conta criada! Confira seu e-mail para confirmar.");
    }
  };

  const google = async () => {
    setLoading(true);
    const host = window.location.hostname;
    const isLovable = host.endsWith(".lovable.app") || host === "localhost" || host === "127.0.0.1";
    if (isLovable) {
      try {
        const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
        if (r.error) {
          toast.error("Não foi possível entrar com Google. Tente e-mail/senha.");
          setLoading(false);
          return;
        }
        if (r.redirected) {
          setLoading(false);
          return;
        }
        setLoading(false);
        navigate({ to: "/kits" });
      } catch {
        toast.error("Erro no Google. Tente e-mail/senha.");
        setLoading(false);
      }
      return;
    }
    // Cloudflare (workers.dev): broker Lovable rejeita redirect_uri externo
    // ("redirect_uri is not allowed" em oauth.lovable.app), então usamos Supabase.
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/auth/callback" },
    });
    setLoading(false);
    if (error) {
      // validation_failed / missing OAuth secret = provider Google desligado ou sem Client ID/Secret no Supabase
      const msg = error.message ?? "";
      if (msg.toLowerCase().includes("unsupported provider") || msg.toLowerCase().includes("oauth secret")) {
        toast.error("Google ainda não configurado no Supabase (Authentication → Providers → Google). Tente e-mail/senha por enquanto.", { duration: 6000 });
      } else {
        toast.error(msg || "Erro no login com Google. Tente e-mail/senha.");
      }
    }
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-sm px-4 py-12">
        <h1 className="text-center text-4xl italic text-primary">{mode === "in" ? "Entrar" : "Criar conta"}</h1>
        <button
          type="button"
          onClick={google}
          disabled={loading}
          className="mt-8 flex w-full items-center justify-center gap-[10px] rounded-full border border-[#747775] bg-[#FFFFFF] px-3 py-2.5 text-sm font-medium text-[#1F1F1F] disabled:opacity-60"
        >
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>
          Continue with Google
        </button>
        <div className="my-6 text-center text-xs text-muted-foreground">ou com e-mail</div>
        <form onSubmit={submit} className="space-y-4">
          <div><Label>E-mail</Label><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div><Label>Senha</Label><Input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} /></div>
          <Button className="w-full rounded-full" disabled={loading}>{mode === "in" ? "Entrar" : "Criar conta"}</Button>
        </form>
        <button className="mt-4 w-full text-sm text-primary underline" onClick={() => setMode(mode === "in" ? "up" : "in")}>
          {mode === "in" ? "Não tem conta? Criar agora" : "Já tenho conta"}
        </button>
      </div>
    </div>
  );
}
