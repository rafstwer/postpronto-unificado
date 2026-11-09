export type ProductStatus = "available" | "prelaunch";

export interface ProductPiece {
  label: string;
  qty: number;
}

export interface Product {
  id: string;
  title: string;
  shortTitle: string;
  nicheLabel: string;
  audience: string;
  description: string;
  priceCents: number;
  originalPriceCents: number;
  status: ProductStatus;
  pieces: ProductPiece[];
  bonuses: string[];
  kitId?: string;
}

export const COUPONS: Record<string, number> = {
  BEMVINDO10: 0.1,
};

const STANDARD_PIECES: ProductPiece[] = [
  { label: "Posts para feed (1:1)", qty: 20 },
  { label: "Stories e Reels (9:16)", qty: 15 },
  { label: "Carrosséis (4:5)", qty: 5 },
  { label: "Capas de Reels (9:16)", qty: 5 },
  { label: "Artes promocionais (4:5)", qty: 5 },
];

const STANDARD_BONUSES = [
  "Editor online incluso — troque textos, fotos, fundos e sua logo no navegador",
  "Espaço para a sua logo em todas as artes (envie a sua ou deixe sem logo)",
  "Legendas prontas para cada arte",
  "Calendário de publicação de 30 dias",
  "Guia rápido de edição dentro do editor",
];

const ALL_ACCESS_PIECES: ProductPiece[] = [
  { label: "Posts para feed (1:1)", qty: 140 },
  { label: "Stories e Reels (9:16)", qty: 105 },
  { label: "Carrosséis (4:5)", qty: 35 },
  { label: "Capas de Reels (9:16)", qty: 35 },
  { label: "Artes promocionais (4:5)", qty: 35 },
];

const ALL_ACCESS_BONUSES = [
  ...STANDARD_BONUSES,
  "A arte se ajusta ao formato: escolheu feed, stories/reels ou carrossel e o layout se reorganiza sozinho",
  "Criador de carrossel: transforme qualquer arte em carrossel de 3, 5 ou 7 telas no mesmo estilo",
  "Sugestão de legenda para Instagram, Facebook, TikTok e Pinterest — estilo CTA ou SEO, com 5 hashtags por arte",
  "Exporte em PNG em alta qualidade e também em PDF pronto para imprimir",
  "Backup automático dos seus projetos no navegador (studioStorage)",
];

export const ALL_ACCESS_ID = "acesso-total";

export const ALL_ACCESS: Product = {
  id: ALL_ACCESS_ID,
  title: "Acesso Completo PostPronto — Todos os Kits",
  shortTitle: "Acesso Completo",
  nicheLabel: "Todos os kits",
  audience: "Salões, manicures, barbearias, cabeleireiras, maquiadoras e qualquer negócio que publica nas redes",
  description:
    "Um único pagamento de R$ 10,00 libera TODOS os kits do editor online PostPronto — Beleza, Cabelo, Unhas, Maquiagem, Alimentação, Barbearia e Premium Beauty Studio. São 350 artes prontas: troque textos e fotos, escolha usar no feed, no carrossel ou nos stories/reels que a arte se ajusta sozinha, crie carrosséis a partir de qualquer arte, gere legendas com IA e baixe tudo em PNG.",
  priceCents: 1000,
  originalPriceCents: 2999,
  status: "available",
  pieces: ALL_ACCESS_PIECES,
  bonuses: ALL_ACCESS_BONUSES,
};

export const PRODUCTS: Product[] = [
  {
    id: "kit-cabelo-50",
    kitId: "cabelo",
    title: "Kit Redes Sociais Cabelo — 50 peças",
    shortTitle: "Kit Cabelo",
    nicheLabel: "Cabelo",
    audience: "Cabeleireiras, salões de beleza, coloristas e penteadoras",
    description: "Artes para quem vive de cabelo: transformações, cronograma capilar, agenda de coloração e pacotes de penteados. Instagram, TikTok, Facebook e WhatsApp — troque textos e fotos, coloque a sua logo (ou remova) e baixe em PNG no formato certo de cada rede. Incluído no Acesso Completo.",
    priceCents: 1000,
    originalPriceCents: 2999,
    status: "available",
    pieces: STANDARD_PIECES,
    bonuses: STANDARD_BONUSES,
  },
  {
    id: "kit-unhas-50",
    kitId: "unhas",
    title: "Kit Redes Sociais Unhas — 50 peças",
    shortTitle: "Kit Unhas",
    nicheLabel: "Unhas",
    audience: "Manicures, nail designers e estúdios de unhas em gel",
    description: "Artes para quem vive de unhas: lançamentos de cores, nail art, cuidados com gel e agenda da semana.",
    priceCents: 1000,
    originalPriceCents: 2999,
    status: "available",
    pieces: STANDARD_PIECES,
    bonuses: STANDARD_BONUSES,
  },
  {
    id: "kit-maquiagem-50",
    kitId: "maquiagem",
    title: "Kit Redes Sociais Maquiagem — 50 peças",
    shortTitle: "Kit Maquiagem",
    nicheLabel: "Maquiagem",
    audience: "Maquiadoras, designers de sobrancelhas e lash designers",
    description: "Artes para quem vive de make: makes do dia, noivas, formaturas, cursos e produtos favoritos.",
    priceCents: 1000,
    originalPriceCents: 2999,
    status: "available",
    pieces: STANDARD_PIECES,
    bonuses: STANDARD_BONUSES,
  },
  {
    id: "kit-beleza-50",
    kitId: "beleza",
    title: "Kit Redes Sociais Beleza — 50 peças",
    shortTitle: "Kit Beleza",
    nicheLabel: "Beleza",
    audience: "Salões, manicures, esteticistas e clínicas de estética",
    description: "Não são só 50 artes: é uma solução para manter suas redes sociais atualizadas — Instagram, TikTok, Facebook e WhatsApp. Troque textos e fotos, coloque a sua logo (ou remova) e baixe em PNG.",
    priceCents: 1000,
    originalPriceCents: 2999,
    status: "available",
    pieces: STANDARD_PIECES,
    bonuses: STANDARD_BONUSES,
  },
  {
    id: "kit-alimentacao-50",
    kitId: "alimentacao",
    title: "Kit Redes Sociais Alimentação — 50 peças",
    shortTitle: "Kit Alimentação",
    nicheLabel: "Alimentação",
    audience: "Restaurantes, lanchonetes, cafeterias e confeitarias",
    description: "Artes em tons quentes e apetite visual, no mesmo padrão do kit de Beleza. Troque textos e fotos e baixe em PNG.",
    priceCents: 1000,
    originalPriceCents: 2999,
    status: "available",
    pieces: STANDARD_PIECES,
    bonuses: STANDARD_BONUSES,
  },
  {
    id: "kit-barbearia-50",
    kitId: "barbearia",
    title: "Kit Redes Sociais Barbearia — 50 peças",
    shortTitle: "Kit Barbearia",
    nicheLabel: "Barbearia",
    audience: "Barbearias e profissionais autônomos",
    description: "Estilo preto e dourado, com cara premium.",
    priceCents: 1000,
    originalPriceCents: 2999,
    status: "available",
    pieces: STANDARD_PIECES,
    bonuses: STANDARD_BONUSES,
  },
  {
    id: "kit-premium-50",
    kitId: "premium",
    title: "Kit Premium Beauty Studio — 50 peças",
    shortTitle: "Kit Premium",
    nicheLabel: "Premium",
    audience: "Estúdios de beleza, esteticistas e clínicas de estética",
    description: "O nosso kit mais elegante: 50 artes em bordô e dourado, com cara de spa de luxo.",
    priceCents: 1000,
    originalPriceCents: 2999,
    status: "available",
    pieces: STANDARD_PIECES,
    bonuses: STANDARD_BONUSES,
  },
];

export function getProduct(id: string): Product | undefined {
  if (id === ALL_ACCESS_ID) return ALL_ACCESS;
  return PRODUCTS.find((p) => p.id === id || p.kitId === id);
}

export function formatBRL(cents: number): string {
  const reais = Math.floor(cents / 100);
  const resto = String(cents % 100).padStart(2, "0");
  return `R$ ${reais},${resto}`;
}
