import face from "@/assets/face.jpg";
import nails from "@/assets/nails.jpg";
import brow from "@/assets/brow.jpg";
import lashes from "@/assets/lashes.jpg";
import mask from "@/assets/mask.jpg";
import studio from "@/assets/studio.jpg";
import pro from "@/assets/pro.jpg";
import products from "@/assets/products.jpg";
import client from "@/assets/client.jpg";
import heart from "@/assets/heart.jpg";
import cream from "@/assets/cream.jpg";

export const KIT_PRICE = "R$ 10,00";
export const ALL_ACCESS_PRICE = "R$ 10,00";
export const ALL_ACCESS_ORIGINAL = "R$ 29,99";
export const ALL_ACCESS_ID = "acesso-total";
// TODO: replace with the owner's real Pix key
export const PIX_KEY = "sua-chave-pix@exemplo.com";

export type KitId = "beleza" | "cabelo" | "unhas" | "maquiagem" | "alimentacao" | "barbearia" | "premium";

export type Format = "feed" | "story";
export type Category = "Feed" | "Stories" | "Carrosséis" | "Capas de Reels" | "Promos";
export const CATEGORIES: Category[] = ["Feed", "Stories", "Carrosséis", "Capas de Reels", "Promos"];

export type TemplateDef = {
  id: string;
  name: string;
  category: Category;
  group?: string | undefined;
  format: Format;
  layout: string;
  defaults: Record<string, string>;
};

export type Brand = { studioName: string; tagline: string; logo: string | null; primary: string; gold: string; cream: string };
export type DesignData = { brand: Brand; values: Record<string, Record<string, string>> };
export type KitDef = { id: KitId; name: string; nickname: string; description: string; audience: string; brand: Brand; templates: TemplateDef[] };

export const defaultBrand: Brand = {
  studioName: "Beauty Studio",
  tagline: "ESTÉTICA E BELEZA",
  logo: null,
  primary: "#7a1531",
  gold: "#d4a94e",
  cream: "#f8ecdc",
};

export const KIT_BRANDS: Record<KitId, Brand> = {
  beleza: defaultBrand,
  cabelo: { studioName: "Hair Atelier", tagline: "CABELOS & SALÃO", logo: null, primary: "#8a5fc9", gold: "#d4a94e", cream: "#f5f0ff" },
  unhas: { studioName: "Nail Boutique", tagline: "UNHAS & MANICURE", logo: null, primary: "#a9741f", gold: "#d4a94e", cream: "#f8ecdc" },
  maquiagem: { studioName: "Beauty Essentials", tagline: "MAQUIAGEM & COSMÉTICOS", logo: null, primary: "#c2266e", gold: "#f0b429", cream: "#fff5f8" },
  alimentacao: { studioName: "Sabor & Arte", tagline: "ALIMENTAÇÃO", logo: null, primary: "#1a120b", gold: "#c77b29", cream: "#fff7e8" },
  barbearia: { studioName: "Barber House", tagline: "BARBEARIA", logo: null, primary: "#0f0f0f", gold: "#d4af37", cream: "#f5f0e6" },
  premium: { studioName: "Premium Beauty Studio", tagline: "BELEZA PREMIUM", logo: null, primary: "#5a0f1f", gold: "#d4a94e", cream: "#f8ecdc" },
};

export const NICHES: { id: KitId; label: string; audience: string; tagline: string }[] = [
  { id: "beleza", label: "Beleza", audience: "Salões, manicures, esteticistas e clínicas de estética", tagline: "ESTÉTICA E BELEZA" },
  { id: "cabelo", label: "Cabelo", audience: "Cabeleireiras, salões de beleza e coloristas", tagline: "CABELOS & SALÃO" },
  { id: "unhas", label: "Unhas", audience: "Manicures e nail designers", tagline: "UNHAS & MANICURE" },
  { id: "maquiagem", label: "Maquiagem", audience: "Maquiadoras, designers de sobrancelhas e lash designers", tagline: "MAQUIAGEM & COSMÉTICOS" },
  { id: "alimentacao", label: "Alimentação", audience: "Restaurantes, lanchonetes e cafeterias", tagline: "ALIMENTAÇÃO" },
  { id: "barbearia", label: "Barbearia", audience: "Barbearias e profissionais autônomos", tagline: "BARBEARIA" },
  { id: "premium", label: "Premium Beauty Studio", audience: "Estúdios de beleza e clínicas de estética", tagline: "BELEZA PREMIUM" },
];

const LABELS: Record<string, string> = {
  title: "Título", subtitle: "Subtítulo", text: "Texto", items: "Lista (um item por linha)", items2: "Lista 2 (um por linha)",
  cta: "Botão", badge: "Selo de destaque", from: "Preço antigo", price: "Preço", name: "Nome", num: "Número",
  a: "Título do bloco 1", b: "Título do bloco 2", service: "Serviço", lead: "Chamada do preço", save: "Economia",
  big: "Destaque", sub: "Detalhe", b1: "Bloco 1", b2: "Bloco 2", b3: "Bloco 3",
  item1: "Item 1", item2: "Item 2", item3: "Item 3",
  photo: "Foto", photo1: "Foto item 1", photo2: "Foto item 2", photo3: "Foto item 3",
};
const SINGLE = new Set(["cta", "from", "price", "name", "num", "lead", "save", "big", "subtitle"]);

export function fieldsOf(t: TemplateDef) {
  const keys = Object.keys(t.defaults);
  return {
    fields: keys.filter((k) => !k.startsWith("photo")).map((k) => ({ key: k, label: LABELS[k] ?? k, multiline: !SINGLE.has(k) })),
    photos: keys.filter((k) => k.startsWith("photo")).map((k) => ({ key: k, label: LABELS[k] ?? k })),
  };
}

const AG = "Agende seu horário";
let n = 0;
const T = (category: Category, format: Format, layout: string, name: string, defaults: Record<string, string>, prefix: string, group?: string): TemplateDef => ({
  id: `${prefix}-${category}-${++n}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  name, category, format, layout, defaults, group,
});
const mk = (prefix: string) => ({
  F: (layout: string, name: string, d: Record<string, string>) => T("Feed", "feed", layout, name, d, prefix),
  S: (layout: string, name: string, d: Record<string, string>) => T("Stories", "story", layout, name, d, prefix),
  C: (group: string, layout: string, name: string, d: Record<string, string>) => T("Carrosséis", "feed", layout, name, d, prefix, group),
  R: (name: string, d: Record<string, string>) => T("Capas de Reels", "story", "cover", name, d, prefix),
  P: (id: string, name: string, defaults: Record<string, string>): TemplateDef => ({ id: `${prefix}-${id}`, name, category: "Promos", format: "story", layout: id, defaults }),
});

// ---------- BELEZA (original completo, 50 peças) ----------
const b = mk("beleza");
const bellezaFeed = [
  b.F("split", "01 · Bem-vinda", { title: "Bem-vinda ao\nnosso Estúdio", text: "Um espaço pensado para\ncuidar da sua beleza,\nbem-estar e autoestima!", photo: studio }),
  b.F("split", "02 · A Profissional", { title: "Conheça a\nProfissional", text: "Olá! Sou Camila Souza,\nespecialista em estética\ne beleza, com foco em\nrealçar a sua beleza natural.", photo: pro }),
  b.F("list", "03 · Nossos Valores", { title: "Nossos Valores", items: "Cuidado com você\nQualidade nos serviços\nBem-estar e autoestima" }),
  b.F("hero", "04 · Autoestima", { title: "Beleza também\né Autoestima", text: "Reserve um tempo para você,\ncuide-se e sinta-se ainda mais incrível!", photo: face }),
  b.F("list", "05 · Nossos Serviços", { title: "Nossos Serviços", items: "Manicure e Pedicure\nDesign de Sobrancelhas\nExtensão de Cílios\nLimpeza de Pele\nTratamentos Estéticos" }),
  b.F("statement", "06 · Diferenciais", { title: "Diferenciais do\nnosso Atendimento", items: "Profissionais qualificadas\nAmbiente acolhedor\nMateriais de alta qualidade\nHigiene e segurança" }),
  b.F("hero", "07 · Tour pelo Espaço", { title: "Tour pelo\nnosso Espaço", text: "Conforto, modernidade e um ambiente\nfeito para você se sentir bem!", photo: studio }),
  b.F("hero", "08 · Produtos de Qualidade", { title: "Equipamentos e\nProdutos de Qualidade", text: "Tecnologia, higiene e os melhores\nprodutos para o seu cuidado!", photo: products }),
  b.F("hero", "09 · Bastidores", { title: "Bastidores\nda Rotina", text: "Um pouco do nosso dia a dia cuidando\nda sua beleza com perfeição!", photo: mask }),
  b.F("statement", "10 · Venha nos Conhecer", { title: "Venha nos\nConhecer!", text: "Agende sua visita e descubra um espaço\ncompleto para o seu autocuidado.", cta: "Agende agora!" }),
  b.F("list", "11 · Tabela de Serviços", { title: "Tabela de Serviços", items: "Manicure e Pedicure | R$ 59,90\nDesign de Sobrancelhas | R$ 69,90\nExtensão de Cílios | R$ 159,90\nLimpeza de Pele | R$ 149,90\nTratamento Facial | R$ 199,90" }),
  b.F("hero", "12 · Manicure e Pedicure", { title: "Manicure e Pedicure", items: "Unhas lindas e bem cuidadas\nCutículas hidratadas\nAcabamento perfeito", cta: AG, photo: nails }),
  b.F("hero", "13 · Extensão de Cílios", { title: "Extensão de Cílios", items: "Mais volume e definição\nOlhar marcante\nResultado natural", cta: AG, photo: lashes }),
  b.F("hero", "14 · Design de Sobrancelhas", { title: "Design de Sobrancelhas", items: "Formato ideal para o seu rosto\nMais harmonia no olhar\nValorização da sua beleza", cta: AG, photo: brow }),
  b.F("hero", "15 · Limpeza de Pele", { title: "Limpeza de Pele", items: "Remove impurezas\nControla a oleosidade\nDeixa a pele mais saudável", cta: AG, photo: mask }),
  b.F("hero", "16 · Tratamentos Estéticos", { title: "Tratamentos Estéticos", items: "Hidratação profunda\nRejuvenescimento\nControle da oleosidade", cta: AG, photo: face }),
  b.F("list", "17 · Pacote de Cuidados", { title: "Pacote de Cuidados", text: "Beleza completa em um só pacote!", items: "Manicure e Pedicure\nDesign de Sobrancelhas\nLimpeza de Pele", badge: "Condições especiais!" }),
  b.F("split", "18 · Serviço Premium", { title: "Serviço\nPremium", text: "Tratamento facial personalizado\ncom resultado visível e duradouro!", cta: "Agende agora", photo: face }),
  b.F("versus", "19 · Qual escolher?", { title: "Qual escolher?", a: "Limpeza de Pele", items: "Higienização\nRemove impurezas\nControla a oleosidade", b: "Hidratação Facial", items2: "Nutre a pele\nRestaura a maciez\nPrevine o ressecamento", cta: "Converse conosco e escolha o ideal!" }),
  b.F("faq", "20 · Perguntas Frequentes", { title: "Perguntas Frequentes", items: "Com que frequência devo fazer?\nOs procedimentos são seguros?\nQuanto tempo dura o resultado?\nPreciso de algum cuidado após?", cta: "Tire suas dúvidas pelo WhatsApp!" }),
];
const bellezaStories = [
  b.S("statement", "01 · Agenda Aberta", { title: "Agenda", badge: "ABERTA", text: "Garanta seu horário\ne cuide da sua beleza!", photo: face, cta: "Agende pelo WhatsApp" }),
  b.S("hero", "02 · Manicure e Pedicure", { title: "Manicure e\nPedicure", items: "Unhas impecáveis\nCutículas hidratadas\nAcabamento perfeito", cta: AG, photo: nails }),
  b.S("hero", "03 · Design de Sobrancelhas", { title: "Design de\nSobrancelhas", items: "Sobrancelhas definidas\nFormato ideal\nMais harmonia", cta: "Agende agora", photo: brow }),
  b.S("hero", "04 · Limpeza de Pele", { title: "Limpeza de Pele", items: "Remove impurezas\nControla a oleosidade\nRenova a pele", cta: AG, photo: mask }),
  b.S("hero", "05 · Extensão de Cílios", { title: "Extensão de Cílios", items: "Mais volume\nOlhar marcante\nResultado natural", cta: "Agende agora", photo: lashes }),
  b.S("list", "06 · Nossos Serviços", { title: "Nossos Serviços", items: "Manicure e Pedicure\nDesign de Sobrancelhas\nExtensão de Cílios\nLimpeza de Pele\nTratamentos Estéticos" }),
  b.S("quote", "07 · Depoimento", { title: "Depoimento\nde Cliente ♡", text: "“Atendimento maravilhoso!\nMeu resultado\nficou incrível!”", name: "Camila Souza", photo: client }),
  b.S("list", "08 · Oferta Especial", { title: "Oferta Especial", text: "Pacote de Beleza", items: "Manicure e Pedicure\nDesign de Sobrancelhas\nLimpeza de Pele", from: "De R$ 199,90 por", price: "R$ 149,90", badge: "Economize R$ 50,00" }),
  b.S("hero", "09 · Rotina de Skincare", { title: "Rotina de\nSkincare", items: "Limpeza\nHidratação\nTratamento\nProteção Solar", cta: "Cuide da sua pele todos os dias!", photo: face }),
  b.S("hero", "10 · Tratamentos Estéticos", { title: "Tratamentos\nEstéticos", items: "Hidratação profunda\nRejuvenescimento\nControle da oleosidade\nMelhora da textura da pele", cta: AG, photo: mask }),
  b.S("list", "11 · Pacote de Cuidados", { title: "Pacote de Cuidados", text: "Beleza completa\nem um só pacote!", items: "Manicure e Pedicure\nDesign de Sobrancelhas\nLimpeza de Pele", badge: "Condições especiais!" }),
  b.S("hero", "12 · Dica de Beleza", { title: "Dica de Beleza", text: "Mantenha a hidratação da sua\npele todos os dias!", photo: cream }),
  b.S("versus", "13 · Mitos e Verdades", { title: "Mitos e\nVerdades", a: "É verdade que a limpeza\nde pele afina a pele?", items: "", b: "Mito!", items2: "A limpeza remove impurezas\ne deixa a pele mais saudável" }),
  b.S("list", "14 · Vagas da Semana", { title: "Vagas da Semana", items: "Segunda | 2 vagas\nTerça | 3 vagas\nQuarta | 2 vagas\nQuinta | 4 vagas\nSexta | 2 vagas", cta: "Reserve seu horário!" }),
  b.S("statement", "15 · Agradecimento", { title: "Agradecimento ♡", photo: heart, text: "Obrigada por confiar\nem nosso trabalho!" }),
];
const belezaFinal = (title: string, text: string, cta: string) => ({ title, text, cta });
const bellezaCarousels = [
  b.C("Rotina de Skincare", "split", "Capa", { title: "Rotina de\nSkincare\nem 4 Passos", text: "Cuidados simples para uma\npele mais saudável e radiante!", photo: face }),
  b.C("Rotina de Skincare", "step", "Passo 1", { num: "1", title: "Limpeza", text: "Remove impurezas, oleosidade\ne prepara a pele para os\npróximos cuidados.", photo: mask }),
  b.C("Rotina de Skincare", "step", "Passo 2", { num: "2", title: "Hidratação", text: "Mantém a pele macia,\nsaudável e com viço natural.", photo: cream }),
  b.C("Rotina de Skincare", "step", "Passo 3", { num: "3", title: "Proteção Solar", text: "Previne o envelhecimento\nprecoce e manchas.", photo: products }),
  b.C("Rotina de Skincare", "step", "Passo 4", { num: "4", title: "Tratamento", text: "Escolha o cuidado ideal para\nas necessidades da sua pele.", photo: face }),
  b.C("Rotina de Skincare", "statement", "Final", belezaFinal("Cuide da sua pele com\norientação profissional!", "", "Agende sua avaliação!")),
  b.C("Design de Sobrancelhas", "split", "Capa", { title: "Design de\nSobrancelhas", text: "Do início ao resultado.\nVeja como o design\nvaloriza o seu olhar!", photo: brow }),
  b.C("Design de Sobrancelhas", "step", "Avaliação", { num: "1", title: "Avaliação", text: "Analisamos o seu formato\nde rosto e o estilo ideal.", photo: brow }),
  b.C("Design de Sobrancelhas", "step", "Design", { num: "2", title: "Design", text: "Definimos o formato,\nrespeitando a sua beleza natural.", photo: brow }),
  b.C("Design de Sobrancelhas", "step", "Correção", { num: "3", title: "Correção", text: "Removemos os fios em excesso,\ncom técnica e segurança.", photo: lashes }),
  b.C("Design de Sobrancelhas", "step", "Resultado", { num: "4", title: "Resultado", text: "Sobrancelhas definidas,\nharmoniosas e com um\nolhar mais marcante!", photo: brow }),
  b.C("Design de Sobrancelhas", "statement", "Final", belezaFinal("Realce a sua\nbeleza natural!", "Agende seu Design de Sobrancelhas.", AG)),
  b.C("Limpeza de Pele", "split", "Capa", { title: "Limpeza\nde Pele", text: "Renovação, saúde e viço\npara a sua pele!", photo: mask }),
  b.C("Limpeza de Pele", "step", "Por que fazer?", { title: "Por que fazer?", items: "Remove impurezas\nControla a oleosidade\nDesobstrui os poros\nPrevine a acne", photo: mask }),
  b.C("Limpeza de Pele", "step", "Como é o processo?", { title: "Como é o processo?", items: "Higienização\nEsfoliação\nExtração (se necessário)\nMáscara calmante\nHidratação final", photo: products }),
  b.C("Limpeza de Pele", "step", "Benefícios", { title: "Principais benefícios", items: "Pele mais limpa e saudável\nRedução de cravos e espinhas\nMais luminosidade\nTextura mais uniforme", photo: face }),
  b.C("Limpeza de Pele", "statement", "Final", belezaFinal("Sinta a diferença de uma\npele bem cuidada!", "", "Agende sua Limpeza de Pele!")),
  b.C("Manicure e Pedicure", "split", "Capa", { title: "Manicure e\nPedicure", text: "Unhas bonitas, saudáveis\ne bem cuidadas!", photo: nails }),
  b.C("Manicure e Pedicure", "step", "Benefícios", { title: "Benefícios", items: "Unhas mais fortes\nSaúde e higiene\nBem-estar e autoestima\nVisual sempre bonito", photo: nails }),
  b.C("Manicure e Pedicure", "step", "Dicas de cuidado", { title: "Dicas de cuidado", items: "Hidrate as mãos e pés\nEvite roer as unhas\nUse produtos de qualidade\nMantenha a manutenção em dia", photo: cream }),
  b.C("Manicure e Pedicure", "step", "Tendências", { title: "Tendências", items: "Nude Elegante\nFrancesinha Moderna\nColorido Fashion", photo: nails }),
  b.C("Manicure e Pedicure", "statement", "Final", belezaFinal("Mantenha suas unhas\nsempre lindas!", "", AG)),
  b.C("Tratamentos Estéticos", "split", "Capa", { title: "Tratamentos\nEstéticos", text: "Cuidado completo para\nrealçar a sua beleza natural!", photo: face }),
  b.C("Tratamentos Estéticos", "step", "Nossos Tratamentos", { title: "Nossos Tratamentos", items: "Limpeza de Pele\nHidratação Facial\nRejuvenescimento\nControle de Oleosidade", photo: mask }),
  b.C("Tratamentos Estéticos", "step", "Para quem é indicado?", { title: "Para quem é indicado?", items: "Quem busca pele mais saudável\nQuem quer prevenir o envelhecimento\nQuem deseja mais viço e firmeza", photo: client }),
  b.C("Tratamentos Estéticos", "step", "Resultados", { title: "Resultados que você sente", items: "Pele mais limpa e equilibrada\nMais hidratação e luminosidade\nRedução de linhas de expressão\nSensação de bem-estar", photo: face }),
  b.C("Tratamentos Estéticos", "statement", "Final", belezaFinal("Escolha o tratamento\nideal para você!", "", "Agende uma avaliação!")),
];
const bellezaReels = [
  b.R("01 · Rotina de Skincare", { title: "Rotina de\nSkincare", text: "Passo a Passo", photo: face }),
  b.R("02 · Design de Sobrancelhas", { title: "Design de\nSobrancelhas", text: "Do formato ideal\nao resultado perfeito", photo: brow }),
  b.R("03 · Manicure e Pedicure", { title: "Manicure\ne Pedicure", text: "Cuidados e Dicas", photo: nails }),
  b.R("04 · Limpeza de Pele", { title: "Limpeza\nde Pele", text: "Benefícios e Resultados", photo: mask }),
  b.R("05 · Extensão de Cílios", { title: "Extensão\nde Cílios", text: "Mais volume, beleza\ne praticidade!", photo: lashes }),
];
const bellezaPromos = [
  b.P("promo", "Promoção da Semana", { title: "Promoção\nda Semana", service: "Limpeza de Pele\n+\nHidratação Facial", from: "De R$ 199,90 por", price: "R$ 149,90", cta: "Agende agora!", photo: face }),
  b.P("combo", "Combo Beleza", { title: "Combo", subtitle: "Beleza Completa", item1: "Design de\nSobrancelhas", item2: "Manicure\ne Pedicure", item3: "Limpeza\nde Pele", lead: "Tudo isso por apenas", price: "R$ 199,90", save: "Economize R$ 80,00", photo1: brow, photo2: nails, photo3: face }),
  b.P("fidelidade", "Cliente Fidelidade", { title: "Cliente\nFidelidade", text: "Cuide da sua beleza\ne ganhe vantagens\nexclusivas!", b1: "Descontos especiais", b2: "Promoções antecipadas", b3: "Condições exclusivas", cta: "Cadastre-se e aproveite!" }),
  b.P("aniversario", "Aniversariante do Mês", { title: "Aniversariante\ndo Mês", text: "É o seu mês!\nGanhe um presente\nespecial da nossa equipe!", big: "10%", sub: "de desconto em\nqualquer serviço", cta: "Agende seu presente" }),
  b.P("indique", "Indique e Ganhe", { title: "Indique\ne Ganhe", text: "Indique uma amiga\ne vocês duas ganham!", b1: "Você ganha\n10% de desconto", b2: "Sua amiga também\nganha 10%", cta: "Indique agora!" }),
];

// ---------- Gerador para os outros 6 nichos (mesmo esqueleto, copy do nicho) ----------
type NicheSpec = {
  id: KitId;
  name: string;
  nickname: string;
  description: string;
  audience: string;
  studio: string;
  tagline: string;
  services: [string, string, string, string, string];
  table: string;
  carrousel: string;
};

const SPECS: NicheSpec[] = [
  {
    id: "cabelo", name: "Kit Cabelo", nickname: "Cabelo", studio: "Hair Atelier", tagline: "CABELOS & SALÃO",
    description: "50 artes para cabeleireiras e salões: transformações, cronograma capilar, agenda de coloração e penteados.",
    audience: "Cabeleireiras, salões de beleza, coloristas e penteadoras",
    services: ["Corte & Escova", "Coloração & Balayage", "Hidratação Capilar", "Penteados", "Cronograma Capilar"],
    table: "Corte | R$ 79,90\nColoração | R$ 149,90\nBalayage | R$ 199,90\nHidratação | R$ 89,90\nPenteado | R$ 119,90",
    carrousel: "Cronograma Capilar",
  },
  {
    id: "unhas", name: "Kit Unhas", nickname: "Unhas", studio: "Nail Boutique", tagline: "UNHAS & MANICURE",
    description: "50 artes para manicures e nail designers: nail art, gel, lançamentos de cores e agenda da semana.",
    audience: "Manicures, nail designers e estúdios de unhas em gel",
    services: ["Manicure & Pedicure", "Nail Art", "Unhas em Gel", "Francesinha Moderna", "Manutenção"],
    table: "Manicure | R$ 59,90\nNail Art | R$ 89,90\nGel | R$ 129,90\nFrancesinha | R$ 99,90\nManutenção | R$ 79,90",
    carrousel: "Tendências de Unhas",
  },
  {
    id: "maquiagem", name: "Kit Maquiagem", nickname: "Maquiagem", studio: "Beauty Essentials", tagline: "MAQUIAGEM & COSMÉTICOS",
    description: "50 artes para maquiadoras: makes do dia, noivas, formaturas, cursos e produtos favoritos.",
    audience: "Maquiadoras, designers de sobrancelhas e lash designers",
    services: ["Make Social", "Make de Noiva", "Make Formatura", "Design de Sobrancelhas", "Extensão de Cílios"],
    table: "Make Social | R$ 119,90\nMake de Noiva | R$ 299,90\nMake Formatura | R$ 199,90\nSobrancelhas | R$ 69,90\nCílios | R$ 159,90",
    carrousel: "Rotina de Make",
  },
  {
    id: "alimentacao", name: "Kit Alimentação", nickname: "Alimentação", studio: "Sabor & Arte", tagline: "ALIMENTAÇÃO",
    description: "50 artes para restaurantes e cafeterias: cardápio, prato do dia, delivery e promoções apetitosas.",
    audience: "Restaurantes, lanchonetes, cafeterias e confeitarias",
    services: ["Prato do Dia", "Lanches & Burgers", "Cafés & Doces", "Almoço Executivo", "Delivery"],
    table: "Prato do Dia | R$ 34,90\nBurger | R$ 29,90\nCafé + Bolo | R$ 19,90\nExecutivo | R$ 39,90\nCombo | R$ 49,90",
    carrousel: "Cardápio da Semana",
  },
  {
    id: "barbearia", name: "Kit Barbearia", nickname: "Barbearia", studio: "Barber House", tagline: "BARBEARIA",
    description: "50 artes para barbearias: cortes, barba, fade, navalha e agenda de horários.",
    audience: "Barbearias e profissionais autônomos",
    services: ["Corte Masculino", "Barba & Navalha", "Fade & Degradê", "Pigmentação", "Combo Corte+Barba"],
    table: "Corte | R$ 39,90\nBarba | R$ 29,90\nFade | R$ 49,90\nPigmentação | R$ 79,90\nCombo | R$ 59,90",
    carrousel: "Guia de Estilos",
  },
  {
    id: "premium", name: "Kit Premium Beauty Studio", nickname: "Premium", studio: "Premium Beauty Studio", tagline: "BELEZA PREMIUM",
    description: "O kit mais elegante: 50 artes em bordô e dourado, com cara de spa de luxo.",
    audience: "Estúdios de beleza, esteticistas e clínicas de estética",
    services: ["Ritual Premium", "Design de Sobrancelhas", "Extensão de Cílios", "Limpeza de Pele", "Tratamentos Estéticos"],
    table: "Ritual Premium | R$ 249,90\nSobrancelhas | R$ 89,90\nCílios | R$ 199,90\nLimpeza | R$ 179,90\nTratamento | R$ 249,90",
    carrousel: "Ritual Premium",
  },
];

function buildKit(spec: NicheSpec): KitDef {
  const h = mk(spec.id);
  const [s1, s2, s3, s4, s5] = spec.services;
  const photos = [face, nails, brow, lashes, mask, studio, pro, products, client, heart, cream];
  const p = (i: number) => photos[i % photos.length];
  const fin = (title: string, text: string, cta: string) => ({ title, text, cta });
  const feed = [
    h.F("split", "01 · Bem-vinda", { title: `Bem-vinda ao\n${spec.studio}`, text: `Um espaço pensado para\ncuidar da sua ${spec.nickname.toLowerCase()}\ncom carinho e qualidade!`, photo: studio }),
    h.F("split", "02 · A Profissional", { title: "Conheça a\nProfissional", text: `Olá! Sou especialista em\n${spec.nickname.toLowerCase()}, com foco em\nrealçar a sua beleza natural.`, photo: pro }),
    h.F("list", "03 · Nossos Valores", { title: "Nossos Valores", items: "Cuidado com você\nQualidade nos serviços\nBem-estar e autoestima" }),
    h.F("hero", "04 · Autoestima", { title: "Beleza também\né Autoestima", text: "Reserve um tempo para você,\ncuide-se e sinta-se ainda mais incrível!", photo: face }),
    h.F("list", "05 · Nossos Serviços", { title: "Nossos Serviços", items: spec.services.join("\n") }),
    h.F("statement", "06 · Diferenciais", { title: "Diferenciais do\nnosso Atendimento", items: "Profissionais qualificadas\nAmbiente acolhedor\nMateriais de alta qualidade\nHigiene e segurança" }),
    h.F("hero", "07 · Tour pelo Espaço", { title: "Tour pelo\nnosso Espaço", text: "Conforto, modernidade e um ambiente\nfeito para você se sentir bem!", photo: studio }),
    h.F("hero", "08 · Qualidade", { title: "Qualidade\nem cada detalhe", text: "Tecnologia, higiene e os melhores\nprodutos para o seu cuidado!", photo: products }),
    h.F("hero", "09 · Bastidores", { title: "Bastidores\nda Rotina", text: "Um pouco do nosso dia a dia cuidando\ndo seu visual com perfeição!", photo: mask }),
    h.F("statement", "10 · Venha nos Conhecer", { title: "Venha nos\nConhecer!", text: "Agende sua visita e descubra um espaço\ncompleto para o seu autocuidado.", cta: "Agende agora!" }),
    h.F("list", "11 · Tabela de Serviços", { title: "Tabela de Serviços", items: spec.table }),
    h.F("hero", `12 · ${s1}`, { title: s1, items: "Acabamento impecável\nPadrão premium\nResultado duradouro", cta: AG, photo: p(1) }),
    h.F("hero", `13 · ${s2}`, { title: s2, items: "Mais destaque\nOlhar e estilo únicos\nResultado natural", cta: AG, photo: p(3) }),
    h.F("hero", `14 · ${s3}`, { title: s3, items: "Técnica e cuidado\nMais harmonia\nValorização da sua beleza", cta: AG, photo: p(2) }),
    h.F("hero", `15 · ${s4}`, { title: s4, items: "Cuidado completo\nQualidade garantida\nDeixa o visual impecável", cta: AG, photo: p(4) }),
    h.F("hero", `16 · ${s5}`, { title: s5, items: "Cuidado especializado\nResultado visível\nBem-estar garantido", cta: AG, photo: p(0) }),
    h.F("list", "17 · Pacote de Cuidados", { title: "Pacote de Cuidados", text: "Beleza completa em um só pacote!", items: `${s1}\n${s2}\n${s3}`, badge: "Condições especiais!" }),
    h.F("split", "18 · Serviço Premium", { title: "Serviço\nPremium", text: "Atendimento personalizado\ncom resultado visível e duradouro!", cta: "Agende agora", photo: face }),
    h.F("versus", "19 · Qual escolher?", { title: "Qual escolher?", a: s4, items: "Higienização\nQualidade\nSegurança", b: s5, items2: "Nutre e cuida\nRestaura a maciez\nPrevine danos", cta: "Converse conosco e escolha o ideal!" }),
    h.F("faq", "20 · Perguntas Frequentes", { title: "Perguntas Frequentes", items: "Com que frequência devo fazer?\nOs procedimentos são seguros?\nQuanto tempo dura o resultado?\nPreciso de algum cuidado após?", cta: "Tire suas dúvidas pelo WhatsApp!" }),
  ];
  const stories = [
    h.S("statement", "01 · Agenda Aberta", { title: "Agenda", badge: "ABERTA", text: `Garanta seu horário\nde ${spec.nickname.toLowerCase()}!`, photo: face, cta: "Agende pelo WhatsApp" }),
    h.S("hero", `02 · ${s1}`, { title: s1, items: "Acabamento perfeito\nPadrão premium", cta: AG, photo: p(1) }),
    h.S("hero", `03 · ${s2}`, { title: s2, items: "Resultado impecável\nMais destaque", cta: "Agende agora", photo: p(2) }),
    h.S("hero", `04 · ${s3}`, { title: s3, items: "Cuidado completo\nQualidade garantida", cta: AG, photo: p(4) }),
    h.S("hero", `05 · ${s4}`, { title: s4, items: "Mais brilho\nResultado natural", cta: "Agende agora", photo: p(3) }),
    h.S("list", "06 · Nossos Serviços", { title: "Nossos Serviços", items: spec.services.join("\n") }),
    h.S("quote", "07 · Depoimento", { title: "Depoimento\nde Cliente ♡", text: "“Atendimento maravilhoso!\nMeu resultado\nficou incrível!”", name: "Cliente Feliz", photo: client }),
    h.S("list", "08 · Oferta Especial", { title: "Oferta Especial", text: `Pacote ${spec.nickname}`, items: `${s1}\n${s2}\n${s3}`, from: "De R$ 199,90 por", price: "R$ 149,90", badge: "Economize R$ 50,00" }),
    h.S("hero", "09 · Rotina", { title: `Rotina de\n${spec.nickname}`, items: "Passo 1\nPasso 2\nPasso 3\nPasso 4", cta: "Cuide todos os dias!", photo: face }),
    h.S("hero", `10 · ${s5}`, { title: s5, items: "Cuidado especializado\nResultado visível", cta: AG, photo: p(4) }),
    h.S("list", "11 · Pacote de Cuidados", { title: "Pacote de Cuidados", text: "Beleza completa\nem um só pacote!", items: `${s1}\n${s2}\n${s3}`, badge: "Condições especiais!" }),
    h.S("hero", "12 · Dica", { title: "Dica", text: "Mantenha o cuidado\ntodos os dias!", photo: cream }),
    h.S("versus", "13 · Mitos e Verdades", { title: "Mitos e\nVerdades", a: "É verdade?\nDescubra!", items: "", b: "Mito!", items2: "O cuidado correto\ndeixa o visual mais saudável" }),
    h.S("list", "14 · Vagas da Semana", { title: "Vagas da Semana", items: "Segunda | 2 vagas\nTerça | 3 vagas\nQuarta | 2 vagas\nQuinta | 4 vagas\nSexta | 2 vagas", cta: "Reserve seu horário!" }),
    h.S("statement", "15 · Agradecimento", { title: "Obrigada ♡", photo: heart, text: "Obrigada por confiar\nem nosso trabalho!" }),
  ];
  const carousels = [
    h.C(spec.carrousel, "split", "Capa", { title: `${spec.carrousel}\nem 4 Passos`, text: "Cuidados simples para um\nresultado incrível!", photo: face }),
    h.C(spec.carrousel, "step", "Passo 1", { num: "1", title: "Passo 1", text: "Comece com o cuidado\nessencial para o seu visual.", photo: p(4) }),
    h.C(spec.carrousel, "step", "Passo 2", { num: "2", title: "Passo 2", text: "Aplique a técnica\ncom cuidado e atenção.", photo: cream }),
    h.C(spec.carrousel, "step", "Passo 3", { num: "3", title: "Passo 3", text: "Finalize com acabamento\nprofissional e duradouro.", photo: products }),
    h.C(spec.carrousel, "statement", "Final", fin(`Cuide do seu visual\ncom orientação profissional!`, "", "Agende sua avaliação!")),
    h.C(`Guia ${s1}`, "split", "Capa", { title: s1, text: "Do início ao resultado\nimpecável!", photo: p(1) }),
    h.C(`Guia ${s1}`, "step", "Passo 1", { num: "1", title: "Preparação", text: "Preparamos tudo\ndetalhadamente.", photo: p(1) }),
    h.C(`Guia ${s1}`, "step", "Passo 2", { num: "2", title: "Execução", text: "Técnica precisa\ncom produtos premium.", photo: p(2) }),
    h.C(`Guia ${s1}`, "step", "Passo 3", { num: "3", title: "Finalização", text: "Acabamento perfeito\ncom brilho e estilo.", photo: p(3) }),
    h.C(`Guia ${s1}`, "statement", "Final", fin("Resultado incrível!", `Agende seu ${s1}.`, AG)),
    h.C(`Guia ${s2}`, "split", "Capa", { title: s2, text: "Tudo o que você precisa\nsaber!", photo: p(2) }),
    h.C(`Guia ${s2}`, "step", "01", { num: "1", title: "Benefícios", items: "Resultado natural\nDurabilidade\nCusto-benefício", photo: p(2) }),
    h.C(`Guia ${s2}`, "step", "02", { num: "2", title: "Cuidados", items: "Higiene\nProdutos de qualidade\nManutenção", photo: cream }),
    h.C(`Guia ${s2}`, "step", "03", { num: "3", title: "Tendências", items: "Nude\nClássico\nModerno", photo: p(1) }),
    h.C(`Guia ${s2}`, "statement", "Final", fin("Mantenha seu visual\nsempre lindo!", "", AG)),
    h.C(`Guia ${s3}`, "split", "Capa", { title: s3, text: "Cuidado completo\npara você!", photo: p(0) }),
    h.C(`Guia ${s3}`, "step", "Por quê?", { title: "Por que fazer?", items: "Mais saúde\nMais beleza\nMais confiança", photo: p(0) }),
    h.C(`Guia ${s3}`, "step", "Como é?", { title: "Como é o processo?", items: "Avaliação\nProcedimento\nFinalização", photo: products }),
    h.C(`Guia ${s3}`, "step", "Benefícios", { title: "Principais benefícios", items: "Resultado duradouro\nVisual impecável\nSatisfação garantida", photo: face }),
    h.C(`Guia ${s3}`, "statement", "Final", fin("Sinta a diferença!", "", `Agende seu ${s3}!`)),
    h.C(`Guia ${s4}`, "split", "Capa", { title: s4, text: "Dicas e cuidados\npara durar mais!", photo: p(4) }),
    h.C(`Guia ${s4}`, "step", "Dicas", { title: "Dicas de cuidado", items: "Hidratação diária\nEvite excessos\nProdutos de qualidade", photo: cream }),
    h.C(`Guia ${s4}`, "step", "Manutenção", { title: "Manutenção", items: "Retoque no prazo\nCuidado em casa\nRetorno garantido", photo: p(4) }),
    h.C(`Guia ${s4}`, "statement", "Final", fin("Seu visual sempre lindo!", "", AG)),
  ];
  const reels = [
    h.R(`01 · ${s1}`, { title: s1, text: "Passo a Passo", photo: p(1) }),
    h.R(`02 · ${s2}`, { title: s2, text: "Do início ao resultado", photo: p(2) }),
    h.R(`03 · ${s3}`, { title: s3, text: "Cuidados e Dicas", photo: p(0) }),
    h.R(`04 · ${s4}`, { title: s4, text: "Benefícios", photo: p(4) }),
    h.R(`05 · ${s5}`, { title: s5, text: "Mais beleza!", photo: p(3) }),
  ];
  const promos = [
    h.P("promo", "Promoção da Semana", { title: "Promoção\nda Semana", service: `${s1}\n+\n${s2}`, from: "De R$ 199,90 por", price: "R$ 149,90", cta: "Agende agora!", photo: face }),
    h.P("combo", `Combo ${spec.nickname}`, { title: "Combo", subtitle: `Beleza ${spec.nickname}`, item1: s1, item2: s2, item3: s3, lead: "Tudo isso por apenas", price: "R$ 199,90", save: "Economize R$ 80,00", photo1: p(1), photo2: p(2), photo3: p(0) }),
    h.P("fidelidade", "Cliente Fidelidade", { title: "Cliente\nFidelidade", text: "Ganhe vantagens\nexclusivas!", b1: "Descontos especiais", b2: "Promoções antecipadas", b3: "Condições exclusivas", cta: "Cadastre-se e aproveite!" }),
    h.P("aniversario", "Aniversariante do Mês", { title: "Aniversariante\ndo Mês", text: "É o seu mês!\nGanhe um presente!", big: "10%", sub: "de desconto em\nqualquer serviço", cta: "Agende seu presente" }),
    h.P("indique", "Indique e Ganhe", { title: "Indique\ne Ganhe", text: "Indique uma amiga\ne vocês duas ganham!", b1: "Você ganha\n10% de desconto", b2: "Sua amiga também\nganha 10%", cta: "Indique agora!" }),
  ];
  return {
    id: spec.id,
    name: spec.name,
    nickname: spec.nickname,
    description: spec.description,
    audience: spec.audience,
    brand: KIT_BRANDS[spec.id],
    templates: [...feed, ...stories, ...carousels, ...reels, ...promos],
  };
}

export const KITS: KitDef[] = [
  {
    id: "beleza",
    name: "Kit Beleza",
    nickname: "Beleza",
    description: "Kit completo para estética e beleza: 20 feed, 15 stories, 5 carrosséis, 5 capas de Reels e 5 promos — tudo editável.",
    audience: "Salões, manicures, esteticistas e clínicas de estética",
    brand: defaultBrand,
    templates: [...bellezaFeed, ...bellezaStories, ...bellezaCarousels, ...bellezaReels, ...bellezaPromos],
  },
  ...SPECS.map(buildKit),
];

const ALIASES: Record<string, KitId> = {
  "beauty-promos": "beleza",
  "kit-beleza-50": "beleza",
  "kit-cabelo-50": "cabelo",
  "kit-unhas-50": "unhas",
  "kit-maquiagem-50": "maquiagem",
  "kit-alimentacao-50": "alimentacao",
  "kit-barbearia-50": "barbearia",
  "kit-premium-50": "premium",
  "beauty": "beleza",
  "hair": "cabelo",
  "nails": "unhas",
  "cosmetics": "maquiagem",
};

export function getKit(id: string) {
  const key = (ALIASES[id] ?? id) as KitId;
  return KITS.find((k) => k.id === key);
}

export function getKitBrand(id: string): Brand {
  const kit = getKit(id);
  return kit?.brand ?? defaultBrand;
}

export const defaultValues = (t: TemplateDef) => ({ ...t.defaults });
