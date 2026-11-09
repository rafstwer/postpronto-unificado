import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [email, setEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const qc = useQueryClient();

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser();
      setEmail(data.user?.email ?? null);
      if (data.user) {
        const { data: a } = await supabase.rpc("has_role", { _user_id: data.user.id, _role: "admin" });
        setIsAdmin(!!a);
      } else setIsAdmin(false);
    };
    load();
    const { data: sub } = supabase.auth.onAuthStateChange(() => load());
    return () => sub.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <header className="bg-wine text-primary-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4">
        <Link to="/" className="font-display text-2xl italic">PostPronto</Link>
        <nav className="flex items-center gap-2 text-sm">
          {email ? (
            <>
              <Link to="/kits" className="px-2 hover:text-gold">Meus kits</Link>
              {isAdmin && <Link to="/admin" className="px-2 hover:text-gold">Admin</Link>}
              <Button size="sm" variant="secondary" onClick={signOut}>Sair</Button>
            </>
          ) : (
            <Button size="sm" variant="secondary" asChild><Link to="/auth">Entrar</Link></Button>
          )}
        </nav>
      </div>
    </header>
  );
}
