import { Link } from "@tanstack/react-router";

export default function SiteFooter() {
  return (
    <footer className="mt-auto bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-2xl font-semibold">PostPronto<span className="text-primary">.</span></p>
            <p className="mt-3 text-sm leading-relaxed opacity-80">Kits de templates digitais para pequenos negócios — artes prontas com editor online: pague uma vez, crie seu usuário e senha e edite no navegador. Entrega 100% digital.</p>
          </div>
          <nav className="grid gap-2 text-sm" aria-label="Links do rodapé">
            <Link to="/kits" className="opacity-80 transition-opacity hover:opacity-100">Editor online</Link>
            <Link to="/kits" className="opacity-80 transition-opacity hover:opacity-100">Meus produtos</Link>
            <Link to="/auth" className="opacity-80 transition-opacity hover:opacity-100">Entrar</Link>
            <a href="#kits" className="opacity-80 transition-opacity hover:opacity-100">Kits por nicho</a>
            <a href="#como-funciona" className="opacity-80 transition-opacity hover:opacity-100">Como funciona</a>
            <a href="#newsletter" className="opacity-80 transition-opacity hover:opacity-100">Cupom de 10% off</a>
          </nav>
          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2 opacity-80">@postpronto</p>
            <p className="flex items-center gap-2 opacity-80">Suporte por e-mail após a compra</p>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-background/20 pt-6 text-xs opacity-70 md:flex-row md:items-center md:justify-between">
          <p>© 2026 PostPronto · Templates editáveis online, direto no navegador</p>
          <p>Ambiente de demonstração — pagamentos via Pix com confirmação manual.</p>
        </div>
      </div>
    </footer>
  );
}
