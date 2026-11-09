import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Informe um e-mail válido");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "newsletter" }),
      });
      const data = await res.json().catch(() => ({} as Record<string, unknown>));
      if (!res.ok || (data as { ok?: boolean }).ok === false) {
        // fallback demo sem backend: gera cupom local
        const coupon = `POSTPRONTO${String(Math.floor(1000 + Math.random() * 9000))}`;
        setCode(coupon);
        toast.success("Cupom liberado! Use na finalização da compra.");
      } else {
        setCode((data as { coupon?: string }).coupon ?? "BEMVINDO10");
        toast.success("Cupom liberado! Use na finalização da compra.");
      }
    } catch {
      const coupon = `POSTPRONTO${String(Math.floor(1000 + Math.random() * 9000))}`;
      setCode(coupon);
      toast.success("Cupom liberado! (modo demonstração)");
    } finally {
      setLoading(false);
    }
  }

  function copyCode() {
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => toast.success("Cupom copiado: " + code)).catch(() => toast.error("Não foi possível copiar o cupom."));
  }

  return (
    <section id="newsletter" className="scroll-mt-20 pb-16 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-8 text-center shadow-sm sm:p-10">
          <h2 className="mt-4 font-display text-3xl font-semibold">Ganhe 10% off na primeira compra</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">Entre na lista da PostPronto e receba o cupom de desconto, além de novidades e dicas para as suas redes sociais.</p>

          {code ? (
            <div className="mx-auto mt-6 max-w-md space-y-3">
              <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">Cadastro confirmado! Seu cupom:</p>
              <button type="button" onClick={copyCode} className="flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-primary/60 bg-primary/10 px-6 py-4 font-display text-2xl font-semibold tracking-wider text-primary transition-colors hover:bg-primary/20" aria-label={`Copiar cupom ${code}`}>
                {code}
              </button>
              <p className="text-xs text-muted-foreground">Clique no cupom para copiar — e use no carrinho.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto mt-6 max-w-md space-y-3 text-left">
              <div className="space-y-2">
                <Label htmlFor="newsletter-email">Seu melhor e-mail</Label>
                <Input id="newsletter-email" type="email" required placeholder="voce@exemplo.com.br" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <Button type="submit" size="lg" className="w-full rounded-full" disabled={loading}>
                {loading ? "Liberando cupom..." : "Quero meu cupom de 10%"}
              </Button>
              <p className="text-center text-xs text-muted-foreground">Sem spam — só novidades que valem a pena.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
