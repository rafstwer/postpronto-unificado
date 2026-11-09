const STEPS = [
  {
    number: "1",
    title: "Pague o valor único",
    text: "R$ 10,00 uma única vez — não é por kit: o pagamento libera TODOS os kits do editor de uma vez, sem assinatura.",
  },
  {
    number: "2",
    title: "Crie seu usuário e senha",
    text: "Assim que o pagamento é confirmado, você cria seu login na hora. É ele que dá acesso a todos os produtos, de qualquer navegador.",
  },
  {
    number: "3",
    title: "Edite online e publique",
    text: "Abra a peça, troque textos, fotos e logo, escolha usar no feed ou nos stories/reels (a arte se ajusta ao formato), gere a legenda e baixe em PNG ou PDF. Funciona no celular e no computador, sem instalar nada.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-20 pb-14 md:pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Simples assim</p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Do pagamento ao feed pronto em 3 passos</h2>
        </div>

        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map(({ number, title, text }) => (
            <li key={number} className="relative rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-primary font-display text-base font-semibold text-primary-foreground" aria-hidden>{number}</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-8 max-w-2xl rounded-2xl border border-primary/30 bg-primary/10 px-5 py-4 text-center text-sm text-secondary-foreground">
          Com as 350 peças + calendário de publicação de 30 dias + criador de carrossel + sugestão de legendas, o seu feed fica pronto em <strong>menos de 10 minutos</strong> por semana.
        </p>
      </div>
    </section>
  );
}
