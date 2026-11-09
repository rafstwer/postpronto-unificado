import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { SiteHeader } from "@/components/SiteHeader";
import { Artwork, ART_W, SIZES } from "@/components/Templates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES, ALL_ACCESS_ID, defaultValues, fieldsOf, getKit, type DesignData } from "@/lib/kits";

export const Route = createFileRoute("/_authenticated/editor/$kitId")({
  head: () => ({
    meta: [
      { title: "Editor de artes — PostPronto" },
      { name: "description", content: "Edite suas artes online." },
      { property: "og:title", content: "Editor de artes — PostPronto" },
      { property: "og:description", content: "Edite suas artes online." },
    ],
  }),
  beforeLoad: ({ params }) => {
    if (!getKit(params.kitId)) throw notFound();
  },
  component: Editor,
});

function resizeImage(file: File, max = 1200): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const s = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = img.width * s;
      c.height = img.height * s;
      c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
      resolve(c.toDataURL(file.type === "image/png" ? "image/png" : "image/jpeg", 0.85));
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

function Editor() {
  const { kitId } = Route.useParams();
  const { user } = Route.useRouteContext();
  const kit = getKit(kitId)!;
  const [active, setActive] = useState(kit.templates[0]!.id);
  const [cat, setCat] = useState<string>(CATEGORIES[0]!);
  const [design, setDesign] = useState<DesignData | null>(null);
  const [saving, setSaving] = useState(false);
  const [showCaption, setShowCaption] = useState(false);
  const artRef = useRef<HTMLDivElement>(null);

  const { data: purchases = [] } = useQuery({
    queryKey: ["purchases", user.id],
    queryFn: async () => (await supabase.from("kit_purchases").select("kit_id,status").eq("user_id", user.id)).data ?? [],
  });
  const unlocked = purchases.some((p: { kit_id: string; status: string }) => (p.kit_id === kitId || p.kit_id === ALL_ACCESS_ID) && p.status === "approved");
  const hasAllAccess = purchases.some((p: { kit_id: string; status: string }) => p.kit_id === ALL_ACCESS_ID && p.status === "approved");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("designs").select("data").eq("user_id", user.id).eq("kit_id", kitId).maybeSingle();
      const saved = (data?.data ?? {}) as Partial<DesignData>;
      const values: DesignData["values"] = {};
      kit.templates.forEach((t) => (values[t.id] = { ...defaultValues(t), ...(saved.values?.[t.id] ?? {}) }));
      setDesign({ brand: { ...kit.brand, ...(saved.brand ?? {}) }, values });
    })();
  }, [kitId, user.id, kit]);

  if (!design) return <div className="min-h-screen"><SiteHeader /><p className="p-10 text-center">Carregando…</p></div>;

  const tpl = kit.templates.find((t) => t.id === active)!;
  const { fields, photos } = fieldsOf(tpl);
  const artH = SIZES[tpl.format];
  const inCat = kit.templates.filter((t) => t.category === cat);
  const v = design.values[active]!;
  const setV = (k: string, val: string) => setDesign({ ...design, values: { ...design.values, [active]: { ...v, [k]: val } } });
  const setB = (k: keyof DesignData["brand"], val: string | null) => setDesign({ ...design, brand: { ...design.brand, [k]: val } });

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("designs").upsert(
      { user_id: user.id, kit_id: kitId, data: design as unknown as Json, updated_at: new Date().toISOString() },
      { onConflict: "user_id,kit_id" },
    );
    setSaving(false);
    if (error) toast.error("Erro ao salvar"); else toast.success("Salvo!");
  };

  const download = async () => {
    if (!unlocked || !artRef.current) return;
    try {
      const url = await toPng(artRef.current, { width: ART_W, height: artH, pixelRatio: 1, style: { transform: "none" } });
      const a = document.createElement("a");
      a.href = url;
      a.download = `${kit.id}-${tpl.category}-${tpl.group ?? ""}-${tpl.name}.png`.replace(/[^\w.-]+/g, "_");
      a.click();
    } catch {
      toast.error("Falha ao baixar");
    }
  };

  const downloadCarouselPngs = async () => {
    if (!unlocked) return;
    const group = tpl.group;
    if (!group) {
      toast.message("Selecione uma arte de carrossel para baixar todas as páginas");
      return;
    }
    const slides = kit.templates.filter((t) => t.group === group);
    toast.message(`Baixando ${slides.length} PNGs do carrossel…`);
    for (let i = 0; i < slides.length; i++) {
      setActive(slides[i]!.id);
      await new Promise((r) => setTimeout(r, 500));
      const node = artRef.current;
      if (!node) continue;
      const s = slides[i]!;
      const url = await toPng(node, { width: ART_W, height: SIZES[s.format], pixelRatio: 1, style: { transform: "none" } });
      const a = document.createElement("a");
      a.href = url;
      a.download = `${kit.id}-${group}-${i + 1}-${s.name}.png`.replace(/[^\w.-]+/g, "_");
      a.click();
      await new Promise((r) => setTimeout(r, 400));
    }
    setActive(slides[0]!.id);
  };

  const legenda = (() => {
    const parts: string[] = [];
    if (v.title) parts.push(v.title.replace(/\n/g, " "));
    if (v.text) parts.push(v.text.replace(/\n/g, " "));
    if (v.items) parts.push(v.items.split("\n").filter(Boolean).join(" · "));
    if (v.cta) parts.push(v.cta);
    const base = parts.filter(Boolean).join("\n") || tpl.name;
    const tags = `#${kit.nickname.toLowerCase().replace(/\s+/g, "")} #beleza #estetica #skincare #salao #postpronto`;
    return `${base}\n\n${design.brand.studioName} — ${design.brand.tagline}\n\n${tags}`;
  })();

  const pick = async (cb: (d: string) => void, e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) cb(await resizeImage(f));
  };

  const scale = tpl.format === "story" ? 0.3 : 0.4;

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl italic text-primary">{kit.name}</h1>
            <p className="text-sm text-muted-foreground">{hasAllAccess ? "Acesso total ativo — todos os kits liberados" : `${kit.templates.length} templates · ${kit.audience}`}</p>
          </div>
          <div className="flex gap-2">
            {tpl.group && unlocked && <Button variant="outline" size="sm" className="rounded-full" onClick={downloadCarouselPngs}>Baixar Carrossel (PNGs)</Button>}
            <Button variant="outline" size="sm" className="rounded-full" onClick={() => setShowCaption(!showCaption)}>{showCaption ? "Ocultar legenda" : "Ver legenda"}</Button>
          </div>
        </div>

        {showCaption && (
          <section className="mt-4 rounded-2xl border bg-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg italic text-primary">Legenda sugerida</h2>
              <Button variant="outline" size="sm" className="rounded-full" onClick={() => { navigator.clipboard.writeText(legenda).then(() => toast.success("Legenda copiada")); }}>Copiar legenda</Button>
            </div>
            <Textarea readOnly value={legenda} rows={6} className="mt-3" />
            <p className="mt-2 text-xs text-muted-foreground">Dica: cole no Instagram, Facebook, TikTok e Pinterest. 5 hashtags otimizadas por arte.</p>
          </section>
        )}

        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => { setCat(c); setActive(kit.templates.find((t) => t.category === c)!.id); }}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${c === cat ? "bg-gold text-gold-foreground" : "bg-secondary text-secondary-foreground"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-2">
          {inCat.map((t) => (
            <button key={t.id} onClick={() => setActive(t.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm ${t.id === active ? "bg-primary text-primary-foreground" : "bg-card"}`}>
              {t.group ? `${t.group} · ${t.name}` : t.name}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-8 md:grid-cols-[auto_1fr]">
          <div className="mx-auto">
            <div className="overflow-hidden rounded-2xl shadow-soft" style={{ width: ART_W * scale, height: artH * scale }}>
              <div style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
                <div ref={artRef}>
                  <Artwork layout={tpl.layout} format={tpl.format} brand={design.brand} values={v} watermark={!unlocked} />
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button variant="outline" className="rounded-full" onClick={save} disabled={saving}>{saving ? "Salvando…" : "Salvar"}</Button>
              {unlocked ? (
                <>
                  <Button className="rounded-full" onClick={download}>Baixar PNG</Button>
                  <Button variant="ghost" className="rounded-full" onClick={() => toast.success("Escolha feed ou story no topo — a arte se ajusta sozinha")}>Ajustar formato</Button>
                </>
              ) : (
                <Button asChild className="rounded-full"><Link to="/kits">Liberar download</Link></Button>
              )}
            </div>
            {!unlocked && <p className="mt-2 text-center text-xs text-muted-foreground">Prévia com marca d'água — pague via Pix para baixar em alta qualidade.</p>}
          </div>

          <div className="space-y-6">
            <section className="rounded-2xl border bg-card p-5">
              <h2 className="text-xl italic text-primary">Textos desta arte</h2>
              <div className="mt-4 space-y-3">
                {fields.map((f) => (
                  <div key={f.key}>
                    <Label>{f.label}</Label>
                    {f.multiline ? (
                      <Textarea rows={3} value={v[f.key]} onChange={(e) => setV(f.key, e.target.value)} />
                    ) : (
                      <Input value={v[f.key]} onChange={(e) => setV(f.key, e.target.value)} />
                    )}
                  </div>
                ))}
                {photos.map((p) => (
                  <div key={p.key}>
                    <Label>{p.label}</Label>
                    <div className="flex items-center gap-3">
                      {v[p.key] && <img src={v[p.key]} alt="" className="h-14 w-14 rounded-lg object-cover" />}
                      <Input type="file" accept="image/*" onChange={(e) => pick((d) => setV(p.key, d), e)} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border bg-card p-5">
              <h2 className="text-xl italic text-primary">Sua marca (todas as artes)</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div><Label>Nome do estúdio</Label><Input value={design.brand.studioName} onChange={(e) => setB("studioName", e.target.value)} /></div>
                <div><Label>Frase abaixo do nome</Label><Input value={design.brand.tagline} onChange={(e) => setB("tagline", e.target.value)} /></div>
                <div className="sm:col-span-2">
                  <Label>Logo (opcional, substitui o nome)</Label>
                  <div className="flex items-center gap-2">
                    <Input type="file" accept="image/*" onChange={(e) => pick((d) => setB("logo", d), e)} />
                    {design.brand.logo && <Button variant="ghost" size="sm" onClick={() => setB("logo", null)}>Remover</Button>}
                  </div>
                </div>
                {([["primary", "Cor principal"], ["gold", "Cor de destaque"], ["cream", "Cor de fundo"]] as const).map(([k, l]) => (
                  <div key={k}>
                    <Label>{l}</Label>
                    <Input type="color" className="h-11 p-1" value={design.brand[k]} onChange={(e) => setB(k, e.target.value)} />
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">A arte se ajusta ao formato: escolheu feed, stories/reels ou carrossel e o layout se reorganiza sozinho. Backup automático no navegador (studioStorage).</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
