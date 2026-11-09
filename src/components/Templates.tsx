import type { CSSProperties, ReactNode } from "react";
import type { Brand, Format } from "@/lib/kits";

// Artwork canvas: brand colors are user-chosen content, so they are applied inline.
const W = 1080;
export const SIZES: Record<Format, number> = { feed: 1350, story: 1920 };
const serif = "'Playfair Display', Georgia, serif";
const sans = "'Jost', system-ui, sans-serif";
const ink = "#3a1a1a";

type V = Record<string, string | undefined>;
type P = { b: Brand; v: V; h: number };

function shade(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16) || 0;
  const r = Math.max(0, ((n >> 16) & 255) - 50);
  const g = Math.max(0, ((n >> 8) & 255) - 30);
  const bl = Math.max(0, (n & 255) - 30);
  return `rgb(${r},${g},${bl})`;
}
const wine = (b: Brand, deg = 165) => `linear-gradient(${deg}deg, ${b.primary}, ${shade(b.primary)})`;
const goldGrad = (b: Brand) => `linear-gradient(135deg, #f7e2a6, ${b.gold})`;
const lines = (s = "") => s.split("\n").map((l, i) => <div key={i}>{l}</div>);
const list = (s = "") => s.split("\n").map((l) => l.trim()).filter(Boolean);

function Lotus({ color, size = 110 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 100 60" fill="none" stroke={color} strokeWidth="3">
      <path d="M50 55 C40 40 40 20 50 5 C60 20 60 40 50 55Z" />
      <path d="M50 55 C35 50 25 35 25 18 C40 22 48 35 50 55Z" />
      <path d="M50 55 C65 50 75 35 75 18 C60 22 52 35 50 55Z" />
      <path d="M50 55 C30 55 12 45 5 32 C22 30 40 40 50 55Z" />
      <path d="M50 55 C70 55 88 45 95 32 C78 30 60 40 50 55Z" />
    </svg>
  );
}

function BrandMark({ b, light = true, scale = 1 }: { b: Brand; light?: boolean; scale?: number }) {
  const c = light ? b.cream : b.primary;
  if (b.logo) return <img src={b.logo} alt="" style={{ height: 140 * scale, maxWidth: 480 * scale, objectFit: "contain" }} />;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 * scale }}>
      <Lotus color={b.gold} size={100 * scale} />
      <div style={{ fontFamily: serif, fontSize: 62 * scale, color: c, lineHeight: 1 }}>{b.studioName}</div>
      <div style={{ fontFamily: sans, fontSize: 22 * scale, letterSpacing: 7 * scale, color: b.gold }}>{b.tagline}</div>
    </div>
  );
}

const Title = ({ t, color, size = 120, align = "center" }: { t?: string | undefined; color: string; size?: number; align?: "center" | "left" }) =>
  t ? (
    <div style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 700, fontSize: size, lineHeight: 1.04, color, textAlign: align }}>{lines(t)}</div>
  ) : null;

const Text = ({ t, color = ink, size = 46, align = "center" }: { t?: string | undefined; color?: string; size?: number; align?: "center" | "left" }) =>
  t ? <div style={{ fontSize: size, lineHeight: 1.25, color, textAlign: align }}>{lines(t)}</div> : null;

function Checks({ items, b, color = ink, size = 44 }: { items?: string | undefined; b: Brand; color?: string; size?: number }) {
  const it = list(items);
  if (!it.length) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {it.map((t, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 22, fontSize: size, color }}>
          <span style={{ flexShrink: 0, width: size * 1.2, height: size * 1.2, borderRadius: 99, background: b.gold, color: b.primary, display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: size * 0.8 }}>✓</span>
          <span>{t}</span>
        </div>
      ))}
    </div>
  );
}

function Btn({ t, b, gold = false, size = 50 }: { t?: string | undefined; b: Brand; gold?: boolean; size?: number }) {
  if (!t) return null;
  return (
    <div style={{ background: gold ? goldGrad(b) : wine(b, 180), color: gold ? b.primary : b.cream, border: `5px solid ${b.gold}`, borderRadius: 999, padding: "24px 64px", fontSize: size, fontWeight: 500, textAlign: "center", boxShadow: "0 18px 30px -18px rgba(0,0,0,.5)" }}>
      📅 {t}
    </div>
  );
}

function Badge({ t, b }: { t?: string | undefined; b: Brand }) {
  if (!t) return null;
  return (
    <div style={{ background: goldGrad(b), color: b.primary, fontFamily: serif, fontStyle: "italic", fontWeight: 700, fontSize: 60, padding: "14px 50px", borderRadius: 24, transform: "rotate(-3deg)", textAlign: "center" }}>
      {lines(t)}
    </div>
  );
}

function Price({ v, b }: { v: V; b: Brand }) {
  if (!v["price"]) return null;
  return (
    <div style={{ background: "#fffaf3", border: `5px solid ${b.gold}`, borderRadius: 36, padding: "18px 60px", textAlign: "center" }}>
      {v["from"] && <div style={{ fontSize: 42, color: ink }}>{v["from"]}</div>}
      <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 120, lineHeight: 1, color: b.primary }}>{v["price"]}</div>
    </div>
  );
}

function Base({ b, h, children, bg }: { b: Brand; h: number; children: ReactNode; bg?: string }) {
  return (
    <div style={{ width: W, height: h, position: "relative", overflow: "hidden", background: bg ?? `radial-gradient(circle at 70% 20%, #fffaf2, ${b.cream})`, fontFamily: sans, color: b.primary }}>
      {children}
    </div>
  );
}

function BottomWave({ b }: { b: Brand }) {
  return <div style={{ position: "absolute", left: -40, right: -40, bottom: -30, height: 110, background: b.primary, borderTop: `8px solid ${b.gold}`, borderRadius: "50% 50% 0 0" }} />;
}

const col = (extra: CSSProperties = {}): CSSProperties => ({ position: "relative", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", ...extra });

/* ---------- generic layouts ---------- */

function Hero({ b, v, h }: P) {
  const ph = h * (h > 1500 ? 0.42 : 0.4);
  return (
    <Base b={b} h={h}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: ph, borderBottomLeftRadius: "50% 140px", borderBottomRightRadius: "50% 140px", overflow: "hidden", borderBottom: `10px solid ${b.gold}` }}>
        <img src={v["photo"]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${b.primary}cc, transparent 45%)` }} />
      </div>
      <div style={{ ...col({ justifyContent: "space-between", padding: `40px 80px 150px` }) }}>
        <BrandMark b={b} scale={0.75} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 34 }}>
          <Title t={v["title"]} color={b.primary} size={h > 1500 ? 120 : 100} />
          <Text t={v["text"]} />
          <Checks items={v["items"]} b={b} />
          <Btn t={v["cta"]} b={b} />
        </div>
      </div>
      <BottomWave b={b} />
    </Base>
  );
}

function Split({ b, v, h }: P) {
  return (
    <Base b={b} h={h}>
      <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "46%", borderTopLeftRadius: 400, overflow: "hidden", borderLeft: `10px solid ${b.gold}` }}>
        <img src={v["photo"]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "58%", padding: "80px 50px 80px 70px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 40, background: `linear-gradient(90deg, ${b.cream} 80%, transparent)` }}>
        <div style={{ alignSelf: "flex-start" }}><BrandMark b={b} light={false} scale={0.7} /></div>
        <Title t={v["title"]} color={b.primary} size={100} align="left" />
        <Text t={v["text"]} align="left" size={42} />
        <Checks items={v["items"]} b={b} size={40} />
        <div style={{ alignSelf: "flex-start" }}><Btn t={v["cta"]} b={b} size={44} /></div>
      </div>
    </Base>
  );
}

function ListL({ b, v, h, bullet = "✿" }: P & { bullet?: string }) {
  const it = list(v["items"]);
  const story = h > 1500;
  return (
    <Base b={b} h={h}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: story ? 360 : 250, background: wine(b), borderBottom: `10px solid ${b.gold}`, borderBottomLeftRadius: "50% 120px", borderBottomRightRadius: "50% 40px" }} />
      <div style={col({ padding: `${story ? 50 : 30}px 80px 150px`, gap: story ? 44 : 30 })}>
        <BrandMark b={b} scale={story ? 0.8 : 0.55} />
        <div style={{ height: story ? 110 : 80 }} />
        <Title t={v["title"]} color={b.primary} size={story ? 120 : 96} />
        <Text t={v["text"]} />
        <div style={{ display: "flex", flexDirection: "column", gap: story ? 24 : 18, width: "100%" }}>
          {it.map((t, i) => {
            const [name, price] = t.split("|").map((x) => x.trim());
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 24, background: "#fffaf3", border: `3px solid ${b.gold}`, borderRadius: 999, padding: story ? "20px 30px" : "14px 26px", fontSize: story ? 46 : 40, color: ink }}>
                <span style={{ flexShrink: 0, width: 64, height: 64, borderRadius: 99, background: wine(b), color: b.gold, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 34 }}>{bullet}</span>
                <span style={{ flex: 1 }}>{name}</span>
                {price && <span style={{ fontFamily: serif, fontWeight: 700, color: b.primary }}>{price}</span>}
              </div>
            );
          })}
        </div>
        <Price v={v} b={b} />
        <Badge t={v["badge"]} b={b} />
        <Btn t={v["cta"]} b={b} />
      </div>
      <BottomWave b={b} />
    </Base>
  );
}

function Statement({ b, v, h }: P) {
  const story = h > 1500;
  return (
    <Base b={b} h={h} bg={wine(b)}>
      <div style={{ position: "absolute", inset: 30, border: `4px solid ${b.gold}`, borderRadius: 40 }} />
      <div style={col({ justifyContent: "center", gap: story ? 50 : 34, padding: "80px 100px" })}>
        <BrandMark b={b} scale={story ? 0.9 : 0.7} />
        <Title t={v["title"]} color={b.cream} size={story ? 140 : 110} />
        <Badge t={v["badge"]} b={b} />
        <Text t={v["text"]} color={b.cream} size={story ? 52 : 46} />
        <Checks items={v["items"]} b={b} color={b.cream} />
        {v["photo"] && <img src={v["photo"]} alt="" style={{ width: story ? 560 : 400, height: story ? 560 : 400, borderRadius: 999, objectFit: "cover", border: `10px solid ${b.gold}` }} />}
        <Btn t={v["cta"]} b={b} gold />
      </div>
    </Base>
  );
}

function Quote({ b, v, h }: P) {
  const story = h > 1500;
  return (
    <Base b={b} h={h} bg={wine(b)}>
      <div style={col({ justifyContent: "center", gap: 44, padding: "80px" })}>
        <BrandMark b={b} scale={0.7} />
        <Title t={v["title"]} color={b.cream} size={story ? 110 : 90} />
        <div style={{ background: "#fffaf3", border: `6px solid ${b.gold}`, borderRadius: 50, padding: "60px 60px 50px", marginTop: story ? 160 : 110, display: "flex", flexDirection: "column", alignItems: "center", gap: 28, width: "100%" }}>
          <img src={v["photo"]} alt="" style={{ width: story ? 340 : 260, height: story ? 340 : 260, borderRadius: 999, objectFit: "cover", border: `8px solid ${b.gold}`, marginTop: story ? -200 : -150 }} />
          <div style={{ fontSize: 70, color: b.gold, letterSpacing: 8 }}>★★★★★</div>
          <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: story ? 66 : 56, textAlign: "center", color: b.primary, lineHeight: 1.2 }}>{lines(v["text"])}</div>
          <div style={{ fontSize: 42, color: ink }}>{v["name"]}</div>
        </div>
      </div>
    </Base>
  );
}

function Versus({ b, v, h }: P) {
  const story = h > 1500;
  const Card = ({ head, items, ok }: { head?: string | undefined; items?: string | undefined; ok: boolean }) => (
    <div style={{ flex: 1, background: "#fffaf3", border: `5px solid ${b.gold}`, borderRadius: 40, padding: 40, display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 700, fontSize: 60, color: ok ? b.primary : "#a12828", textAlign: "center", lineHeight: 1.1 }}>{lines(head)}</div>
      <Checks items={items} b={b} size={38} />
    </div>
  );
  return (
    <Base b={b} h={h}>
      <div style={col({ justifyContent: "center", gap: 50, padding: "80px 70px 150px" })}>
        <BrandMark b={b} light={false} scale={0.65} />
        <Title t={v["title"]} color={b.primary} size={story ? 120 : 100} />
        <div style={{ display: "flex", flexDirection: story ? "column" : "row", gap: 30, width: "100%" }}>
          <Card head={v["a"]} items={v["items"]} ok={false} />
          <Card head={v["b"]} items={v["items2"]} ok />
        </div>
        <Btn t={v["cta"]} b={b} size={42} />
      </div>
      <BottomWave b={b} />
    </Base>
  );
}

function Step({ b, v, h }: P) {
  return (
    <Base b={b} h={h}>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: h * 0.42, borderTopLeftRadius: "50% 140px", borderTopRightRadius: "50% 140px", overflow: "hidden", borderTop: `10px solid ${b.gold}` }}>
        <img src={v["photo"]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ position: "relative", padding: "90px 90px", display: "flex", flexDirection: "column", gap: 34 }}>
        {v["num"] && <div style={{ width: 140, height: 140, borderRadius: 99, background: wine(b), border: `6px solid ${b.gold}`, color: b.gold, fontFamily: serif, fontWeight: 700, fontSize: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>{v["num"]}</div>}
        <Title t={v["title"]} color={b.primary} size={110} align="left" />
        <Text t={v["text"]} align="left" size={48} />
        <Checks items={v["items"]} b={b} />
      </div>
      <div style={{ position: "absolute", right: 50, top: 60, width: 100, height: 100, borderRadius: 99, background: b.primary, color: b.gold, fontSize: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>➜</div>
    </Base>
  );
}

function Cover({ b, v, h }: P) {
  return (
    <Base b={b} h={h}>
      <img src={v["photo"]} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "70%", objectFit: "cover" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: h * 0.17, background: wine(b), borderBottom: `10px solid ${b.gold}`, borderBottomLeftRadius: "50% 90px", borderBottomRightRadius: "50% 90px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <BrandMark b={b} scale={0.8} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: h * 0.45, background: `linear-gradient(180deg, transparent, ${b.cream} 30%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40, padding: "120px 70px 140px" }}>
        <Title t={v["title"]} color={b.primary} size={150} />
        {v["text"] && <div style={{ background: wine(b, 90), color: b.cream, fontFamily: serif, fontStyle: "italic", fontSize: 64, padding: "16px 60px", borderRadius: 999, transform: "rotate(-3deg)", textAlign: "center" }}>{lines(v["text"])}</div>}
        <div style={{ width: 130, height: 130, borderRadius: 99, background: b.primary, border: `6px solid ${b.gold}`, color: b.cream, fontSize: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>▶</div>
      </div>
      <BottomWave b={b} />
    </Base>
  );
}

/* ---------- original promo stories ---------- */

function PromoFrame({ b, children, wineTop }: { b: Brand; children: ReactNode; wineTop: number }) {
  return (
    <Base b={b} h={1920}>
      <div style={{ position: "absolute", inset: 0, height: wineTop, background: wine(b, 170), borderBottomLeftRadius: "50% 120px", borderBottomRightRadius: "50% 40px", borderBottom: `10px solid ${b.gold}` }} />
      <BottomWave b={b} />
      <div style={col({ paddingTop: 70 })}>{children}</div>
    </Base>
  );
}
const card = (b: Brand): CSSProperties => ({ background: "#fffaf3", border: `5px solid ${b.gold}`, borderRadius: 40, boxShadow: "0 20px 40px -20px rgba(0,0,0,.35)" });

function Promo({ b, v }: P) {
  return (
    <PromoFrame b={b} wineTop={760}>
      <BrandMark b={b} />
      <div style={{ marginTop: 50 }}><Title t={v["title"]} color={b.cream} size={120} /></div>
      <img src={v["photo"]} alt="" style={{ width: 760, height: 620, objectFit: "cover", borderRadius: "50% 50% 40px 40px", border: `8px solid ${b.gold}`, marginTop: 30 }} />
      <div style={{ ...card(b), width: 820, marginTop: -40, padding: "30px 40px", fontSize: 58, textAlign: "center", lineHeight: 1.15, color: ink }}>{lines(v["service"])}</div>
      <div style={{ ...card(b), width: 820, marginTop: 24, padding: "24px 40px", textAlign: "center" }}>
        <div style={{ fontSize: 46, color: ink }}>{v["from"]}</div>
        <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 140, lineHeight: 1 }}>{v["price"]}</div>
      </div>
      <div style={{ marginTop: 40 }}><Btn t={v["cta"]} b={b} size={54} /></div>
    </PromoFrame>
  );
}

function Combo({ b, v }: P) {
  const items = [1, 2, 3].map((i) => ({ t: v[`item${i}`], p: v[`photo${i}`] }));
  return (
    <PromoFrame b={b} wineTop={420}>
      <BrandMark b={b} />
      <div style={{ marginTop: 160 }}><Title t={v["title"]} color={b.primary} size={140} /></div>
      <Title t={v["subtitle"]} color={b.primary} size={90} />
      <div style={{ display: "flex", flexDirection: "column", gap: 28, marginTop: 40 }}>
        {items.map((it, i) => (
          <div key={i} style={{ ...card(b), width: 860, height: 210, display: "flex", alignItems: "center", gap: 40, overflow: "hidden" }}>
            <img src={it.p} alt="" style={{ width: 300, height: "100%", objectFit: "cover" }} />
            <div style={{ fontFamily: serif, fontSize: 56, lineHeight: 1.1, color: ink }}>{lines(it.t)}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 52, marginTop: 40, color: ink }}>{v["lead"]}</div>
      <div style={{ background: wine(b, 180), color: b.cream, border: `5px solid ${b.gold}`, borderRadius: 999, fontFamily: serif, fontWeight: 700, fontSize: 120, padding: "10px 80px", marginTop: 16 }}>{v["price"]}</div>
      <div style={{ marginTop: 30 }}><Badge t={v["save"]} b={b} /></div>
    </PromoFrame>
  );
}

function Fidelidade({ b, v }: P) {
  return (
    <PromoFrame b={b} wineTop={420}>
      <BrandMark b={b} />
      <div style={{ fontSize: 110, marginTop: 70 }}>👑</div>
      <Title t={v["title"]} color={b.primary} size={140} />
      <div style={{ marginTop: 30 }}><Text t={v["text"]} size={58} /></div>
      <div style={{ background: wine(b), border: `6px solid ${b.gold}`, borderRadius: 40, width: 820, padding: "50px 60px", marginTop: 50, transform: "rotate(-3deg)", color: b.cream }}>
        <div style={{ fontFamily: serif, fontSize: 60, textAlign: "center", marginBottom: 20 }}>{b.studioName}</div>
        <Checks items={[v["b1"], v["b2"], v["b3"]].join("\n")} b={b} color={b.cream} size={46} />
      </div>
      <div style={{ marginTop: 70 }}><Btn t={v["cta"]} b={b} size={54} /></div>
    </PromoFrame>
  );
}

function Aniversario({ b, v }: P) {
  return (
    <PromoFrame b={b} wineTop={420}>
      <BrandMark b={b} />
      <div style={{ fontSize: 130, marginTop: 60 }}>🎁</div>
      <Title t={v["title"]} color={b.primary} size={120} />
      <div style={{ marginTop: 30 }}><Text t={v["text"]} size={60} /></div>
      <div style={{ width: 560, height: 560, borderRadius: 999, background: wine(b), border: `12px solid ${b.gold}`, marginTop: 60, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: b.cream, textAlign: "center" }}>
        <div style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 700, fontSize: 210, color: b.gold, lineHeight: 1 }}>{v["big"]}</div>
        <div style={{ fontSize: 50, lineHeight: 1.15 }}>{lines(v["sub"])}</div>
      </div>
      <div style={{ marginTop: 70 }}><Btn t={v["cta"]} b={b} size={54} /></div>
    </PromoFrame>
  );
}

function Indique({ b, v }: P) {
  return (
    <PromoFrame b={b} wineTop={420}>
      <BrandMark b={b} />
      <div style={{ marginTop: 170 }}><Title t={v["title"]} color={b.primary} size={150} /></div>
      <div style={{ marginTop: 30 }}><Text t={v["text"]} size={60} /></div>
      {[v["b1"], v["b2"]].map((t, i) => (
        <div key={i} style={{ ...card(b), width: 860, marginTop: 50, display: "flex", alignItems: "center", gap: 40, padding: "40px 50px" }}>
          <div style={{ width: 150, height: 150, borderRadius: 30, background: b.primary, border: `5px solid ${b.gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80 }}>🎁</div>
          <div style={{ fontFamily: serif, fontSize: 62, lineHeight: 1.15, fontWeight: 700 }}>{lines(t)}</div>
        </div>
      ))}
      <div style={{ marginTop: 80 }}><Btn t={v["cta"]} b={b} size={54} /></div>
    </PromoFrame>
  );
}

const MAP: Record<string, (p: P) => ReactNode> = {
  hero: Hero,
  split: Split,
  list: ListL,
  faq: (p) => <ListL {...p} bullet="+" />,
  statement: Statement,
  quote: Quote,
  versus: Versus,
  step: Step,
  cover: Cover,
  promo: Promo,
  combo: Combo,
  fidelidade: Fidelidade,
  aniversario: Aniversario,
  indique: Indique,
};

export function Artwork({ layout, format, brand, values, watermark }: { layout: string; format: Format; brand: Brand; values: Record<string, string>; watermark?: boolean }) {
  const C = MAP[layout] ?? Hero;
  const h = SIZES[format];
  return (
    <div style={{ position: "relative", width: W, height: h }}>
      <C b={brand} v={values} h={h} />
      {watermark && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <div style={{ transform: "rotate(-30deg)", fontSize: 130, fontWeight: 700, color: "rgba(0,0,0,.18)", fontFamily: sans, whiteSpace: "nowrap" }}>PRÉVIA · PRÉVIA</div>
        </div>
      )}
    </div>
  );
}

export const ART_W = W;
