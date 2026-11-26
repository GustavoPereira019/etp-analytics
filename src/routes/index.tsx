import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent, type PointerEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/")({head:()=>({meta:[{title:"Elite Tech Pro — Inteligência de Dados, BI & Automação"},{name:"description",content:"Inteligência de dados, dashboards Power BI e automações sob medida com Gustavo Pereira."},{property:"og:title",content:"Elite Tech Pro — Inteligência de Dados"},{property:"og:description",content:"Power BI, SQL, Python e n8n para decisões precisas na sua empresa."},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}]}),component:Index});

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.12) {
            setVisible(true);
          } else if (!entry.isIntersecting) {
            setVisible(false);
          }
        }
      },
      { threshold: [0, 0.12], rootMargin: "0px 0px -24px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isFlex = className.includes("flex");

  return (
    <div ref={ref} className={className}>
      <div
        style={visible && delay ? { transitionDelay: `${delay}ms` } : undefined}
        className={`h-full w-full transition-all duration-700 ease-out will-change-transform ${
          isFlex ? "flex" : ""
        } ${
          visible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-[0.97]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  duration = 1200,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId = 0;
    let active = false;

    const startAnimation = () => {
      if (active) return;
      active = true;
      if (
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
      ) {
        setValue(target);
        return;
      }
      const startTime = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        }
      };
      rafId = requestAnimationFrame(tick);
    };

    const resetAnimation = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      active = false;
      setValue(0);
    };

    if (typeof IntersectionObserver === "undefined") {
      startAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            startAnimation();
          } else if (!entry.isIntersecting) {
            resetAnimation();
          }
        }
      },
      { threshold: [0, 0.2] },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

function DashboardCard({ children }: { children: ReactNode }) {
  const cardRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
            setInView(true);
          } else if (!entry.isIntersecting) {
            setInView(false);
          }
        }
      },
      { threshold: [0, 0.15] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (
      typeof window === "undefined" ||
      !window.matchMedia?.("(pointer: fine)").matches ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateY = Math.max(-4, Math.min(4, x * 8));
    const rotateX = Math.max(-4, Math.min(4, -y * 8));
    el.style.transition = "transform 100ms ease-out, border-color 0.2s ease, background-color 0.2s ease";
    el.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
  };

  const handleMouseLeave = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.transition = "transform 450ms cubic-bezier(0.22, 1, 0.36, 1), border-color 0.2s ease, background-color 0.2s ease";
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <article
      ref={cardRef}
      data-in-view={inView ? "true" : "false"}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="etp-card etp-dash-card group flex w-full flex-col overflow-hidden rounded-2xl text-left will-change-transform"
    >
      {children}
    </article>
  );
}

function handleSpotlightMove(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

function SpotlightOverlay() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
      style={{
        background:
          "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(163, 230, 53, 0.085), transparent 65%)",
      }}
    />
  );
}

function BeforeAfterComparator() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (!rect.width) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(6, Math.min(94, pct)));
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPos((p) => Math.max(6, p - 4));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPos((p) => Math.min(94, p + 4));
    }
  };

  const beforeRows: readonly [string, string, string, string, string][] = [
    ["A1", "Faturamento_Bruto", "R$ 2.140.000", "#REF!", "revisar c/ financeiro"],
    ["A2", "Despesas_Fixas (antigo)", "R$ 892.410", "DESATUALIZADO", "copiar aba 3"],
    ["A3", "Margem_Real_v2", "#DIV/0!", "R$ ???", "planilha travando"],
    ["A4", "Vendas_Outubro_FINAL", "1.420.890,5", "1420890", "duplicado!!"],
    ["A5", "Comissao_Equipe", "#VALOR!", "pendente", "aguardando CSV"],
    ["A6", "Caixa_Projetado_30d", "R$ 418.200", "R$ 502.900", "qual tá certo?"],
    ["A7", "Custo_Operacao_Total", "R$ 612.000", "#REF!", "quebrou PROCV"],
  ];

  const afterBars = [48, 56, 61, 68, 74, 82, 88, 96];

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseMove={handleSpotlightMove}
      className="group/spot relative mt-10 cursor-ew-resize touch-none select-none overflow-hidden rounded-2xl border border-[#1E2733] bg-[#0D1218] shadow-2xl"
    >
      <SpotlightOverlay />

      {/* BASE LAYER: DEPOIS • Dashboard Elite Tech Pro (lado direito visível à direita do divisor) */}
      <div className="relative flex min-h-[430px] flex-col justify-between bg-[#0B1016] p-5 sm:min-h-[450px] sm:p-7">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#19222D] pb-4">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#A3E635]" />
              <span className="font-mono-data text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A3E635]">
                {"DEPOIS • Dashboard Elite Tech Pro"}
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#263822] bg-[#101912] px-3 py-1 font-mono-data text-[10px] text-[#A3E635]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A3E635]" />
              {"Atualizado automaticamente via SQL"}
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-[#1A2430] bg-[#10161E] p-4">
              <p className="font-mono-data text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Margem Líquida"}</p>
              <p className="font-mono-data mt-1.5 text-2xl font-semibold text-[#F0F4F8]">{"24,8%"}</p>
              <p className="mt-1 text-[11px] font-medium text-[#A3E635]">{"↗ +4,2 pp vs mês ant."}</p>
            </div>
            <div className="rounded-xl border border-[#1A2430] bg-[#10161E] p-4">
              <p className="font-mono-data text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Faturamento"}</p>
              <p className="font-mono-data mt-1.5 text-2xl font-semibold text-[#F0F4F8]">{"R$ 2,84M"}</p>
              <p className="mt-1 text-[11px] font-medium text-[#A3E635]">{"↗ +18,4% no trimestre"}</p>
            </div>
            <div className="rounded-xl border border-[#1A2430] bg-[#10161E] p-4">
              <p className="font-mono-data text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Eficiência"}</p>
              <p className="font-mono-data mt-1.5 text-2xl font-semibold text-[#F0F4F8]">{"96,4%"}</p>
              <p className="mt-1 text-[11px] font-medium text-[#A3E635]">{"↗ +11,2% operacional"}</p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-12">
            <div className="rounded-xl border border-[#1A2430] bg-[#0E141B] p-4 sm:col-span-7">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono-data text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Evolução Mensal • Receita × Meta"}</span>
                <span className="font-mono-data text-[10px] font-semibold text-[#A3E635]">{"+22,6% YoY"}</span>
              </div>
              <div className="flex h-28 items-end justify-between gap-2">
                {afterBars.map((h, idx) => (
                  <div key={idx} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                    <div
                      className={`w-full rounded-t-sm ${idx >= 6 ? "bg-[#A3E635]" : "bg-[#A3E635]/40"}`}
                      style={{ height: `${h}%` }}
                    />
                    <span className="font-mono-data text-[9px] text-[#64748B]">
                      {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago"][idx]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-xl border border-[#1A2430] bg-[#0E141B] p-4 sm:col-span-5">
              <div className="flex items-center justify-between">
                <span className="font-mono-data text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Tendência EBITDA"}</span>
                <span className="font-mono-data text-[10px] text-[#A3E635]">{"Em tempo real"}</span>
              </div>
              <svg viewBox="0 0 220 76" className="my-2 h-20 w-full overflow-visible">
                <defs>
                  <linearGradient id="afterTrendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A3E635" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#A3E635" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon
                  points="0,76 0,58 36,52 72,46 108,38 144,31 180,22 220,12 220,76"
                  fill="url(#afterTrendGrad)"
                />
                <polyline
                  fill="none"
                  stroke="#A3E635"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="0,58 36,52 72,46 108,38 144,31 180,22 220,12"
                />
              </svg>
              <p className="text-[11px] text-[#94A3B8]">{"Consolidação automática sem retrabalho manual."}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#18212C] pt-3 text-[11px] text-[#8B9BB0]">
          <span>{"✓ Fonte única validada • Power BI + SQL + n8n"}</span>
          <span className="font-mono-data text-[#A3E635]">{"Decisão em segundos"}</span>
        </div>
      </div>

      {/* OVERLAY LAYER: ANTES • Planilhas Manuais (recortado pela esquerda conforme pos%) */}
      <div
        aria-hidden
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        className="pointer-events-none absolute inset-0 flex flex-col justify-between bg-[#101317] p-5 sm:p-7"
      >
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#252A33] pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded border border-red-500/35 bg-red-500/10 px-2.5 py-0.5 font-mono-data text-[10px] font-semibold uppercase tracking-[0.14em] text-red-400">
                {"ANTES • Planilhas Manuais"}
              </span>
              <span className="font-mono-data rounded border border-[#2A313C] bg-[#161B22] px-2 py-0.5 text-[10px] text-[#94A3B8]">
                {"Versão_Final_v4.xlsx"}
              </span>
            </div>
            <span className="rounded-full border border-amber-500/35 bg-amber-500/10 px-3 py-1 font-mono-data text-[10px] text-amber-300">
              {"⚠ Dados desatualizados"}
            </span>
          </div>

          <div className="mt-4 overflow-hidden rounded-lg border border-[#262C36] bg-[#0C0F13] font-mono-data text-[11px]">
            <div className="grid grid-cols-12 border-b border-[#262C36] bg-[#161B22] text-[10px] text-[#6E7E91]">
              <div className="col-span-1 border-r border-[#262C36] px-2 py-1.5">{"#"}</div>
              <div className="col-span-4 border-r border-[#262C36] px-2 py-1.5">{"Indicador_Aba2"}</div>
              <div className="col-span-2 border-r border-[#262C36] px-2 py-1.5">{"Plan_Out"}</div>
              <div className="col-span-2 border-r border-[#262C36] px-2 py-1.5">{"Plan_Nov"}</div>
              <div className="col-span-3 px-2 py-1.5">{"Obs_Manual"}</div>
            </div>
            {beforeRows.map((row, idx) => (
              <div
                key={row[0]}
                className={`grid grid-cols-12 border-b border-[#1D232C] last:border-b-0 ${
                  idx % 2 === 1 ? "bg-[#12161D]/70" : ""
                }`}
              >
                <div className="col-span-1 border-r border-[#1D232C] px-2 py-2 text-[#526071]">{row[0]}</div>
                <div className={`col-span-4 truncate border-r border-[#1D232C] px-2 py-2 text-[#94A3B8] ${idx === 1 ? "pl-5" : idx === 4 ? "pl-1" : ""}`}>
                  {row[1]}
                </div>
                <div className={`col-span-2 truncate border-r border-[#1D232C] px-2 py-2 ${row[2].startsWith("#") ? "bg-red-500/15 font-bold text-red-400" : "text-[#CBD5E1]"}`}>
                  {row[2]}
                </div>
                <div className={`col-span-2 truncate border-r border-[#1D232C] px-2 py-2 ${row[3].startsWith("#") ? "bg-red-500/15 font-bold text-red-400" : row[3] === "DESATUALIZADO" ? "bg-amber-500/15 text-amber-300" : "text-[#8B9BB0]"}`}>
                  {row[3]}
                </div>
                <div className="col-span-3 truncate px-2 py-2 italic text-amber-300/80">{row[4]}</div>
              </div>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-2 font-mono-data text-[10px]">
            <span className="rounded border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-red-400">{"#REF! (3 células quebradas)"}</span>
            <span className="rounded border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-amber-300">{"Versão_Final_v4.xlsx • cópia local"}</span>
            <span className="rounded border border-[#262D38] bg-[#151A22] px-2.5 py-1 text-[#7D8C9F]">{"12 abas manuais • sem histórico"}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#232933] pt-3 text-[11px] text-[#7D8C9F]">
          <span>{"✕ Horas perdidas copiando e colando dados toda semana"}</span>
          <span className="font-mono-data text-red-400/90">{"Alto risco de erro"}</span>
        </div>
      </div>

      {/* DIVISOR VERTICAL VERDE-LIMA + BOTÃO CENTRAL ARRASTÁVEL */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="Comparar antes e depois"
        aria-valuemin={6}
        aria-valuemax={94}
        aria-valuenow={Math.round(pos)}
        onKeyDown={handleKeyDown}
        style={{ left: `${pos}%` }}
        className="absolute inset-y-0 z-20 -ml-px w-[2px] bg-[#A3E635] shadow-[0_0_18px_rgba(163,230,53,0.75)] focus:outline-none"
      >
        <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#A3E635] bg-[#090C10] text-sm font-bold text-[#A3E635] shadow-[0_0_24px_rgba(163,230,53,0.35)] transition-transform duration-150 hover:scale-110">
          {"‹ ›"}
        </div>
      </div>
    </div>
  );
}

function RoiCalculator({ onCtaClick }: { onCtaClick: () => void }) {
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [hourlyCost, setHourlyCost] = useState(60);

  const recoveredHoursPerYear = Math.round(hoursPerWeek * 52 * 0.8);
  const annualSavings = Math.round(hoursPerWeek * 52 * 0.8 * hourlyCost);
  const monthlySavings = Math.round(annualSavings / 12);
  const workdaysSaved = Math.round(recoveredHoursPerYear / 8);

  const formatBRL = (val: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(val);

  const hoursPct = ((hoursPerWeek - 2) / (40 - 2)) * 100;
  const costPct = ((hourlyCost - 25) / (200 - 25)) * 100;

  return (
    <div
      onMouseMove={handleSpotlightMove}
      className="group/spot relative mt-12 overflow-hidden rounded-2xl border border-[#1E2733] bg-[#0E1319] p-6 transition-all duration-300 hover:border-[#2A3747] sm:p-8 lg:p-10"
    >
      <SpotlightOverlay />
      <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
        {/* COLUNA ESQUERDA: CONTROLES */}
        <div className="space-y-8 lg:col-span-6">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="roi-hours" className="text-sm font-medium text-[#E2E8F0]">
                {"Horas gastas por semana montando relatórios/planilhas"}
              </label>
              <span className="font-mono-data shrink-0 rounded-lg border border-[#263822] bg-[#101912] px-3 py-1 text-sm font-semibold text-[#A3E635]">
                {`${hoursPerWeek}h / sem`}
              </span>
            </div>
            <input
              id="roi-hours"
              type="range"
              min={2}
              max={40}
              step={1}
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              className="etp-range mt-4"
              style={{
                background: `linear-gradient(to right, #A3E635 0%, #A3E635 ${hoursPct}%, #1C2530 ${hoursPct}%, #1C2530 100%)`,
              }}
            />
            <div className="mt-2 flex justify-between font-mono-data text-[10px] text-[#6E7E91]">
              <span>{"2h / sem"}</span>
              <span>{"20h / sem"}</span>
              <span>{"40h / sem"}</span>
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="roi-cost" className="text-sm font-medium text-[#E2E8F0]">
                {"Custo médio por hora da equipe envolvida (R$)"}
              </label>
              <span className="font-mono-data shrink-0 rounded-lg border border-[#263822] bg-[#101912] px-3 py-1 text-sm font-semibold text-[#A3E635]">
                {`R$ ${hourlyCost} / h`}
              </span>
            </div>
            <input
              id="roi-cost"
              type="range"
              min={25}
              max={200}
              step={5}
              value={hourlyCost}
              onChange={(e) => setHourlyCost(Number(e.target.value))}
              className="etp-range mt-4"
              style={{
                background: `linear-gradient(to right, #A3E635 0%, #A3E635 ${costPct}%, #1C2530 ${costPct}%, #1C2530 100%)`,
              }}
            />
            <div className="mt-2 flex justify-between font-mono-data text-[10px] text-[#6E7E91]">
              <span>{"R$ 25 / h"}</span>
              <span>{"R$ 110 / h"}</span>
              <span>{"R$ 200 / h"}</span>
            </div>
          </div>

          <p className="rounded-xl border border-[#1A2430] bg-[#0B1016] px-4 py-3 text-xs leading-relaxed text-[#8B9BB0]">
            {"Cálculo conservador considerando "}
            <strong className="font-semibold text-[#E2E8F0]">{"80% de automação"}</strong>
            {" sobre 52 semanas/ano — eliminando extração manual, consolidação de planilhas e conferências repetitivas."}
          </p>
        </div>

        {/* COLUNA DIREITA: RESULTADOS EM TEMPO REAL */}
        <div className="flex flex-col justify-between gap-5 rounded-2xl border border-[#233224] bg-[#0B1016] p-6 sm:p-7 lg:col-span-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[#1A2430] bg-[#10161E] p-5">
              <p className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#7D8C9F]">
                {"Horas recuperadas por ano"}
              </p>
              <p className="font-editorial mt-2 text-4xl leading-none text-[#F0F4F8] sm:text-5xl">
                {`${recoveredHoursPerYear}h`}
              </p>
              <p className="mt-2 text-[11px] text-[#8B9BB0]">
                {`≈ ${workdaysSaved} dias úteis liberados`}
              </p>
            </div>

            <div className="rounded-xl border border-[#263822] bg-[#101912] p-5">
              <p className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#A3E635]">
                {"Economia anual estimada"}
              </p>
              <p className="font-editorial mt-2 text-3xl leading-none text-[#A3E635] sm:text-4xl">
                {formatBRL(annualSavings)}
              </p>
              <p className="mt-2 text-[11px] text-[#CBD5E1]">
                {`≈ ${formatBRL(monthlySavings)} / mês recuperados`}
              </p>
            </div>
          </div>

          <Button
            type="button"
            className="etp-cta-shimmer mt-1 w-full cursor-pointer rounded-full bg-[#A3E635] px-6 py-3.5 text-xs font-semibold text-[#090C10] transition-colors hover:bg-[#BEF264] sm:text-sm"
            variant="imported"
            size="imported"
            onClick={onCtaClick}
          >
            {"Quero automatizar minha operação →"}
          </Button>
        </div>
      </div>
    </div>
  );
}

const NAV_ITEMS = [
  { id: "solucoes", label: "Soluções" },
  { id: "dashboards", label: "Dashboards" },
  { id: "propostas", label: "Propostas" },
  { id: "processo", label: "Processo" },
  { id: "sobre", label: "Fundador" },
  { id: "contato", label: "Contato" },
] as const;

function Index(){
const [activeHero,setHero]=useState("financeiro"); const [activeCat,setCat]=useState("Todos");
const [scrolled, setScrolled] = useState(false);
const [scrollProgress, setScrollProgress] = useState(0);
const [activeSection, setActiveSection] = useState<string>("");
const [methodLineVisible, setMethodLineVisible] = useState(false);
const heroGlowRef = useRef<HTMLDivElement | null>(null);
const heroGridRef = useRef<HTMLDivElement | null>(null);
const founderContainerRef = useRef<HTMLDivElement | null>(null);
const founderImgRef = useRef<HTMLImageElement | null>(null);
const methodRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  let rafId = 0;
  const reducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const updateScroll = () => {
    rafId = 0;
    const y = window.scrollY;
    setScrolled(y > 20);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(maxScroll > 0 ? Math.min(Math.max((y / maxScroll) * 100, 0), 100) : 0);

    if (!reducedMotion()) {
      if (heroGlowRef.current) {
        const glowOffset = Math.min(y * 0.16, 120);
        heroGlowRef.current.style.transform = `translate3d(0, ${glowOffset.toFixed(1)}px, 0)`;
      }
      if (heroGridRef.current) {
        const gridOffset = Math.min(y * 0.09, 80);
        heroGridRef.current.style.transform = `translate3d(0, ${gridOffset.toFixed(1)}px, 0)`;
      }
      if (founderContainerRef.current && founderImgRef.current) {
        const rect = founderContainerRef.current.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        if (rect.bottom >= 0 && rect.top <= vh) {
          const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
          const imgOffset = Math.max(-18, Math.min(18, progress * -28));
          founderImgRef.current.style.transform = `translate3d(0, ${imgOffset.toFixed(1)}px, 0) scale(1.06)`;
        }
      }
    }
  };
  const onScroll = () => {
    if (!rafId) rafId = requestAnimationFrame(updateScroll);
  };
  updateScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    if (rafId) cancelAnimationFrame(rafId);
  };
}, []);

useEffect(() => {
  if (typeof IntersectionObserver === "undefined") return;
  const ids = ["inicio", ...NAV_ITEMS.map((item) => item.id)];
  const elements = ids
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => Boolean(el));
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id === "inicio" ? "" : entry.target.id);
        }
      }
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
  );
  elements.forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}, []);

useEffect(() => {
  const el = methodRef.current;
  if (!el) return;
  if (typeof IntersectionObserver === "undefined") {
    setMethodLineVisible(true);
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
          setMethodLineVisible(true);
        } else if (!entry.isIntersecting) {
          setMethodLineVisible(false);
        }
      }
    },
    { threshold: [0, 0.2] },
  );
  observer.observe(el);
  return () => observer.disconnect();
}, []);
function selectProposalAndScroll(_id?:string){document.getElementById("contato")?.scrollIntoView({behavior:"smooth"});}
const heroButtons = ({"financeiro":(<> <Button type="button" className="cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors bg-[#A3E635] text-[#090C10] font-semibold" variant="imported" size="imported" onClick={(e) => { setHero('financeiro'); }}>{"Financeiro"}</Button><Button type="button" className="cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors text-[#8B9BB0] hover:text-[#E2E8F0]" variant="imported" size="imported" onClick={(e) => { setHero('comercial'); }}>{"Comercial"}</Button><Button type="button" className="cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors text-[#8B9BB0] hover:text-[#E2E8F0]" variant="imported" size="imported" onClick={(e) => { setHero('operacoes'); }}>{"Operações"}</Button> </>),"comercial":(<> <Button type="button" className="cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors text-[#8B9BB0] hover:text-[#E2E8F0]" variant="imported" size="imported" onClick={(e) => { setHero('financeiro'); }}>{"Financeiro"}</Button><Button type="button" className="cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors bg-[#A3E635] text-[#090C10] font-semibold" variant="imported" size="imported" onClick={(e) => { setHero('comercial'); }}>{"Comercial"}</Button><Button type="button" className="cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors text-[#8B9BB0] hover:text-[#E2E8F0]" variant="imported" size="imported" onClick={(e) => { setHero('operacoes'); }}>{"Operações"}</Button> </>),"operacoes":(<> <Button type="button" className="cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors text-[#8B9BB0] hover:text-[#E2E8F0]" variant="imported" size="imported" onClick={(e) => { setHero('financeiro'); }}>{"Financeiro"}</Button><Button type="button" className="cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors text-[#8B9BB0] hover:text-[#E2E8F0]" variant="imported" size="imported" onClick={(e) => { setHero('comercial'); }}>{"Comercial"}</Button><Button type="button" className="cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors bg-[#A3E635] text-[#090C10] font-semibold" variant="imported" size="imported" onClick={(e) => { setHero('operacoes'); }}>{"Operações"}</Button> </>)})[activeHero];
const heroKpis = ({"financeiro":(<> <div className="rounded-xl border border-[#1A232F] bg-[#111720] px-3 py-2.5"><p className="text-[10px] font-medium uppercase tracking-wider text-[#7D8C9F]">{"Receita Líquida"}</p><p className="font-mono-data mt-1 text-base font-semibold text-[#F0F4F8]">{"R$ 2,84M"}</p><p className="mt-0.5 text-[11px] font-medium text-[#A3E635]">{"↗ +18,4%"}</p></div><div className="rounded-xl border border-[#1A232F] bg-[#111720] px-3 py-2.5"><p className="text-[10px] font-medium uppercase tracking-wider text-[#7D8C9F]">{"Margem EBITDA"}</p><p className="font-mono-data mt-1 text-base font-semibold text-[#F0F4F8]">{"27,6%"}</p><p className="mt-0.5 text-[11px] font-medium text-[#A3E635]">{"↗ +3,2 pp"}</p></div><div className="rounded-xl border border-[#1A232F] bg-[#111720] px-3 py-2.5"><p className="text-[10px] font-medium uppercase tracking-wider text-[#7D8C9F]">{"Inadimplência"}</p><p className="font-mono-data mt-1 text-base font-semibold text-[#F0F4F8]">{"1,9%"}</p><p className="mt-0.5 text-[11px] font-medium text-[#A3E635]">{"↗ -0,8 pp"}</p></div> </>),"comercial":(<> <div className="rounded-xl border border-[#1A232F] bg-[#111720] px-3 py-2.5"><p className="text-[10px] font-medium uppercase tracking-wider text-[#7D8C9F]">{"Meta Atingida"}</p><p className="font-mono-data mt-1 text-base font-semibold text-[#F0F4F8]">{"114,2%"}</p><p className="mt-0.5 text-[11px] font-medium text-[#A3E635]">{"↗ +14,2%"}</p></div><div className="rounded-xl border border-[#1A232F] bg-[#111720] px-3 py-2.5"><p className="text-[10px] font-medium uppercase tracking-wider text-[#7D8C9F]">{"Ticket Médio"}</p><p className="font-mono-data mt-1 text-base font-semibold text-[#F0F4F8]">{"R$ 18,9k"}</p><p className="mt-0.5 text-[11px] font-medium text-[#A3E635]">{"↗ +9,6%"}</p></div><div className="rounded-xl border border-[#1A232F] bg-[#111720] px-3 py-2.5"><p className="text-[10px] font-medium uppercase tracking-wider text-[#7D8C9F]">{"Conversão"}</p><p className="font-mono-data mt-1 text-base font-semibold text-[#F0F4F8]">{"31,4%"}</p><p className="mt-0.5 text-[11px] font-medium text-[#A3E635]">{"↗ +4,1 pp"}</p></div> </>),"operacoes":(<> <div className="rounded-xl border border-[#1A232F] bg-[#111720] px-3 py-2.5"><p className="text-[10px] font-medium uppercase tracking-wider text-[#7D8C9F]">{"Entregas OTIF"}</p><p className="font-mono-data mt-1 text-base font-semibold text-[#F0F4F8]">{"96,8%"}</p><p className="mt-0.5 text-[11px] font-medium text-[#A3E635]">{"↗ +5,4 pp"}</p></div><div className="rounded-xl border border-[#1A232F] bg-[#111720] px-3 py-2.5"><p className="text-[10px] font-medium uppercase tracking-wider text-[#7D8C9F]">{"OEE Médio"}</p><p className="font-mono-data mt-1 text-base font-semibold text-[#F0F4F8]">{"84,5%"}</p><p className="mt-0.5 text-[11px] font-medium text-[#A3E635]">{"↗ +6,1 pp"}</p></div><div className="rounded-xl border border-[#1A232F] bg-[#111720] px-3 py-2.5"><p className="text-[10px] font-medium uppercase tracking-wider text-[#7D8C9F]">{"Horas Manuais"}</p><p className="font-mono-data mt-1 text-base font-semibold text-[#F0F4F8]">{"-72%"}</p><p className="mt-0.5 text-[11px] font-medium text-[#A3E635]">{"↗ Automação"}</p></div> </>)})[activeHero];
const heroBars = ({"financeiro":(<> <div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "54%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Jan"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "61%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Fev"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "58%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Mar"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "72%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Abr"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "69%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Mai"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "84%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Jun"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "79%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Jul"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "92%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Ago"}</span></div> </>),"comercial":(<> <div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "48%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Jan"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "52%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Fev"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "66%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Mar"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "63%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Abr"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "77%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Mai"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "81%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Jun"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "88%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Jul"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "95%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Ago"}</span></div> </>),"operacoes":(<> <div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "62%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Jan"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "68%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Fev"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "71%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Mar"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "74%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Abr"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "82%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Mai"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "86%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Jun"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "91%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Jul"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "94%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Ago"}</span></div> </>)})[activeHero];
const heroTrend = ({"financeiro":(<> <defs ><linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#A3E635" stopOpacity="0.32"></stop><stop offset="100%" stopColor="#A3E635" stopOpacity="0"></stop></linearGradient></defs><polygon points="0,74 0.0,52.1 37.1,47.0 74.3,48.2 111.4,39.3 148.6,36.7 185.7,27.8 222.9,25.2 260.0,15.0 260,74" fill="url(#hg)"></polygon><polyline fill="none" stroke="#A3E635" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points="0.0,52.1 37.1,47.0 74.3,48.2 111.4,39.3 148.6,36.7 185.7,27.8 222.9,25.2 260.0,15.0"></polyline> </>),"comercial":(<> <defs ><linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#A3E635" stopOpacity="0.32"></stop><stop offset="100%" stopColor="#A3E635" stopOpacity="0"></stop></linearGradient></defs><polygon points="0,74 0.0,55.9 37.1,50.2 74.3,41.2 111.4,38.6 148.6,31.0 185.7,26.5 222.9,19.4 260.0,11.8 260,74" fill="url(#hg)"></polygon><polyline fill="none" stroke="#A3E635" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points="0.0,55.9 37.1,50.2 74.3,41.2 111.4,38.6 148.6,31.0 185.7,26.5 222.9,19.4 260.0,11.8"></polyline> </>),"operacoes":(<> <defs ><linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#A3E635" stopOpacity="0.32"></stop><stop offset="100%" stopColor="#A3E635" stopOpacity="0"></stop></linearGradient></defs><polygon points="0,74 0.0,44.4 37.1,41.8 74.3,37.4 111.4,34.2 148.6,27.1 185.7,23.3 222.9,17.5 260.0,13.0 260,74" fill="url(#hg)"></polygon><polyline fill="none" stroke="#A3E635" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points="0.0,44.4 37.1,41.8 74.3,37.4 111.4,34.2 148.6,27.1 185.7,23.3 222.9,17.5 260.0,13.0"></polyline> </>)})[activeHero];
const heroSubtitle = {"financeiro": "DRE Gerencial & Margem EBITDA", "comercial": "Funil de Vendas & Metas por Canal", "operacoes": "SLA Logístico, Frota & Eficiência"}[activeHero];
const heroUpdated = {"financeiro": "Atualizado via SQL • 08:00", "comercial": "Sincronizado com CRM • Tempo Real", "operacoes": "Pipeline Python + Power BI"}[activeHero];
const heroInsight = {"financeiro": "Fechamento gerencial automatizado reduziu em 14h/mês a consolidação de planilhas.", "comercial": "Alertas diários no WhatsApp via n8n aumentaram a cadência de follow-up da equipe.", "operacoes": "Monitoramento por rota identificou gargalos de descarga com economia mensal de 11%."}[activeHero];
const solutions = (<> <Reveal delay={0} className="flex h-full"><article onMouseMove={handleSpotlightMove} className="group/spot relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#0D1218] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[#111821]"><SpotlightOverlay /><div ><div className="flex items-center justify-between"><div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#223026] bg-[#131C16] font-mono-data text-xs font-bold text-[#A3E635]">{"01"}</div><span className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#A3E635]/90">{"Business Intelligence"}</span></div><h3 className="mt-5 text-lg font-semibold text-[#F0F4F8]">{"Power BI Enterprise"}</h3><p className="mt-2.5 text-sm leading-relaxed text-[#94A3B8]">{"Dashboards executivos e operacionais com modelagem Star Schema, DAX avançado e atualização automática em nuvem."}</p></div><div className="mt-6 border-t border-[#18212C] pt-4"><p className="text-xs font-medium text-[#CBD5E1]">{"Painéis prontos para diretoria, TVs e mobile"}</p></div></article></Reveal><Reveal delay={70} className="flex h-full"><article onMouseMove={handleSpotlightMove} className="group/spot relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#0D1218] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[#111821]"><SpotlightOverlay /><div ><div className="flex items-center justify-between"><div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#223026] bg-[#131C16] font-mono-data text-xs font-bold text-[#A3E635]">{"02"}</div><span className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#A3E635]/90">{"Integração & Base Única"}</span></div><h3 className="mt-5 text-lg font-semibold text-[#F0F4F8]">{"SQL & Engenharia de Dados"}</h3><p className="mt-2.5 text-sm leading-relaxed text-[#94A3B8]">{"Conexão direta com ERPs, bancos relacionais e planilhas corporativas. Views otimizadas prontas para escalar seu BI."}</p></div><div className="mt-6 border-t border-[#18212C] pt-4"><p className="text-xs font-medium text-[#CBD5E1]">{"Fonte única da verdade sem divergências"}</p></div></article></Reveal><Reveal delay={140} className="flex h-full"><article onMouseMove={handleSpotlightMove} className="group/spot relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#0D1218] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[#111821]"><SpotlightOverlay /><div ><div className="flex items-center justify-between"><div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#223026] bg-[#131C16] font-mono-data text-xs font-bold text-[#A3E635]">{"03"}</div><span className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#A3E635]/90">{"ETL & Inteligência"}</span></div><h3 className="mt-5 text-lg font-semibold text-[#F0F4F8]">{"Python & Analytics"}</h3><p className="mt-2.5 text-sm leading-relaxed text-[#94A3B8]">{"Rotinas automatizadas de extração, tratamento de grandes volumes e consolidação de múltiplos arquivos."}</p></div><div className="mt-6 border-t border-[#18212C] pt-4"><p className="text-xs font-medium text-[#CBD5E1]">{"Processamento rápido e auditável"}</p></div></article></Reveal><Reveal delay={210} className="flex h-full"><article onMouseMove={handleSpotlightMove} className="group/spot relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#0D1218] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[#111821]"><SpotlightOverlay /><div ><div className="flex items-center justify-between"><div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#223026] bg-[#131C16] font-mono-data text-xs font-bold text-[#A3E635]">{"04"}</div><span className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#A3E635]/90">{"Eficiência Operacional"}</span></div><h3 className="mt-5 text-lg font-semibold text-[#F0F4F8]">{"n8n & Automação de Fluxos"}</h3><p className="mt-2.5 text-sm leading-relaxed text-[#94A3B8]">{"Orquestração de integrações entre CRM, ERP, APIs, e-mail e WhatsApp eliminando tarefas manuais repetitivas."}</p></div><div className="mt-6 border-t border-[#18212C] pt-4"><p className="text-xs font-medium text-[#CBD5E1]">{"Menos retrabalho e alertas em tempo real"}</p></div></article></Reveal><Reveal delay={280} className="flex h-full"><article onMouseMove={handleSpotlightMove} className="group/spot relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#0D1218] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[#111821]"><SpotlightOverlay /><div ><div className="flex items-center justify-between"><div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#223026] bg-[#131C16] font-mono-data text-xs font-bold text-[#A3E635]">{"05"}</div><span className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#A3E635]/90">{"Modernização"}</span></div><h3 className="mt-5 text-lg font-semibold text-[#F0F4F8]">{"Excel Corporativo & Migração"}</h3><p className="mt-2.5 text-sm leading-relaxed text-[#94A3B8]">{"Reestruturação de planilhas críticas, padronização de controles financeiros e migração segura para BI."}</p></div><div className="mt-6 border-t border-[#18212C] pt-4"><p className="text-xs font-medium text-[#CBD5E1]">{"Fim das planilhas quebradas e duplicadas"}</p></div></article></Reveal><Reveal delay={350} className="flex h-full"><article onMouseMove={handleSpotlightMove} className="group/spot relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#0D1218] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[#111821]"><SpotlightOverlay /><div ><div className="flex items-center justify-between"><div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#223026] bg-[#131C16] font-mono-data text-xs font-bold text-[#A3E635]">{"06"}</div><span className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#A3E635]/90">{"Design Executivo"}</span></div><h3 className="mt-5 text-lg font-semibold text-[#F0F4F8]">{"UI/UX de Dados no Figma"}</h3><p className="mt-2.5 text-sm leading-relaxed text-[#94A3B8]">{"Prototipação visual orientada à hierarquia de leitura. Dashboards que qualquer gestor entende em segundos."}</p></div><div className="mt-6 border-t border-[#18212C] pt-4"><p className="text-xs font-medium text-[#CBD5E1]">{"Identidade visual da sua marca aplicada ao BI"}</p></div></article></Reveal> </>);
const filterButtons = (<> <Button type="button" className={activeCat === "Todos" ? "cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium transition-colors border-[#A3E635] bg-[#A3E635] text-[#090C10] font-semibold" : "cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium transition-colors border-[#1E2733] bg-[#0D1218] text-[#94A3B8] hover:border-[#304054] hover:text-white"} variant="imported" size="imported" onClick={(e) => { setCat('Todos'); }}>{"Todos"}</Button><Button type="button" className={activeCat === "Gestão & Finanças" ? "cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium transition-colors border-[#A3E635] bg-[#A3E635] text-[#090C10] font-semibold" : "cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium transition-colors border-[#1E2733] bg-[#0D1218] text-[#94A3B8] hover:border-[#304054] hover:text-white"} variant="imported" size="imported" onClick={(e) => { setCat('Gestão & Finanças'); }}>{"Gestão & Finanças"}</Button><Button type="button" className={activeCat === "Operações & Indústria" ? "cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium transition-colors border-[#A3E635] bg-[#A3E635] text-[#090C10] font-semibold" : "cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium transition-colors border-[#1E2733] bg-[#0D1218] text-[#94A3B8] hover:border-[#304054] hover:text-white"} variant="imported" size="imported" onClick={(e) => { setCat('Operações & Indústria'); }}>{"Operações & Indústria"}</Button><Button type="button" className={activeCat === "Comercial & Pessoas" ? "cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium transition-colors border-[#A3E635] bg-[#A3E635] text-[#090C10] font-semibold" : "cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium transition-colors border-[#1E2733] bg-[#0D1218] text-[#94A3B8] hover:border-[#304054] hover:text-white"} variant="imported" size="imported" onClick={(e) => { setCat('Comercial & Pessoas'); }}>{"Comercial & Pessoas"}</Button><Button type="button" className={activeCat === "Saúde" ? "cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium transition-colors border-[#A3E635] bg-[#A3E635] text-[#090C10] font-semibold" : "cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium transition-colors border-[#1E2733] bg-[#0D1218] text-[#94A3B8] hover:border-[#304054] hover:text-white"} variant="imported" size="imported" onClick={(e) => { setCat('Saúde'); }}>{"Saúde"}</Button> </>);
const dashboardCards = (<> {(activeCat === "Todos" || activeCat === "Operações & Indústria") && (<Reveal delay={0} className="flex"><DashboardCard>
<div className="border-b border-[#19222D] bg-[#0A0E13] p-4">
<div className="grid grid-cols-3 gap-2"><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"OTIF"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"96,4%"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Custo/Km"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"R$ 3,42"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Entregas"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"4.820"}</p></div></div>
<div className="mt-2.5 grid grid-cols-12 gap-2">
<div className="col-span-7 flex h-16 items-end justify-between gap-1 rounded-lg border border-[#17202B] bg-[#0D1218] px-2.5 py-2"><span style={{"height": "55%", "--bar-i": 0} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "72%", "--bar-i": 1} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "91%", "--bar-i": 2} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "100%", "--bar-i": 3} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "77%", "--bar-i": 4} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "51%", "--bar-i": 5} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "64%", "--bar-i": 6} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "79%", "--bar-i": 7} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span></div>
<div className="col-span-5 flex h-16 items-end rounded-lg border border-[#17202B] bg-[#0D1218] px-2 py-1.5"><svg viewBox="0 0 110 44" className="h-11 w-full overflow-visible"><polygon points="0,44 0.0,35.5 22.0,31.2 44.0,26.2 66.0,28.3 88.0,19.7 110.0,15.4 110,44" fill="#A3E635" fillOpacity="0.18"></polygon><polyline fill="none" stroke="#A3E635" strokeWidth="1.8" strokeLinecap="round" points="0.0,35.5 22.0,31.2 44.0,26.2 66.0,28.3 88.0,19.7 110.0,15.4"></polyline></svg></div>
</div>
</div>
<div className="flex flex-1 flex-col justify-between p-5">
<div >
<div className="flex items-center justify-between gap-2"><span className="font-mono-data text-[10px] uppercase tracking-[0.16em] text-[#7D8C9F]">{"LOGÍSTICA"}</span><span className="font-mono-data rounded border border-[#233322] bg-[#111B13] px-2 py-0.5 text-[9px] font-medium text-[#A3E635]">{"Power BI"}</span></div>
<h3 className="mt-2 text-lg font-semibold text-[#F0F4F8]">{"Logística"}</h3>
<p className="mt-1.5 text-xs leading-relaxed text-[#94A3B8]">{"Frota, entregas no prazo (OTIF), SLA e custo operacional por rota."}</p>
</div>
<div className="mt-4 flex items-center border-t border-[#18212C] pt-3.5">
<a href="https://app.powerbi.com/reportEmbed?reportId=7af30bbf-9e2a-4329-854b-b0880e4baabb&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A3E635] transition-colors hover:text-[#BEF264] hover:underline">{"Abrir no Power BI "}<span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">{"↗"}</span></a>
</div>
</div>
</DashboardCard></Reveal>)}{(activeCat === "Todos" || activeCat === "Comercial & Pessoas") && (<Reveal delay={60} className="flex"><DashboardCard>
<div className="border-b border-[#19222D] bg-[#0A0E13] p-4">
<div className="grid grid-cols-3 gap-2"><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Headcount"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"412"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Turnover"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"2,4%"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Absenteísmo"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"1,8%"}</p></div></div>
<div className="mt-2.5 grid grid-cols-12 gap-2">
<div className="col-span-7 flex h-16 items-end justify-between gap-1 rounded-lg border border-[#17202B] bg-[#0D1218] px-2.5 py-2"><span style={{"height": "89%", "--bar-i": 0} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "48%", "--bar-i": 1} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "75%", "--bar-i": 2} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "61%", "--bar-i": 3} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "100%", "--bar-i": 4} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "69%", "--bar-i": 5} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "80%", "--bar-i": 6} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "66%", "--bar-i": 7} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span></div>
<div className="col-span-5 flex h-16 items-end rounded-lg border border-[#17202B] bg-[#0D1218] px-2 py-1.5"><svg viewBox="0 0 110 44" className="h-11 w-full overflow-visible"><polygon points="0,44 0.0,33.4 22.0,31.9 44.0,29.0 66.0,23.3 88.0,25.4 110.0,17.5 110,44" fill="#A3E635" fillOpacity="0.18"></polygon><polyline fill="none" stroke="#A3E635" strokeWidth="1.8" strokeLinecap="round" points="0.0,33.4 22.0,31.9 44.0,29.0 66.0,23.3 88.0,25.4 110.0,17.5"></polyline></svg></div>
</div>
</div>
<div className="flex flex-1 flex-col justify-between p-5">
<div >
<div className="flex items-center justify-between gap-2"><span className="font-mono-data text-[10px] uppercase tracking-[0.16em] text-[#7D8C9F]">{"GENTE & GESTÃO"}</span><span className="font-mono-data rounded border border-[#233322] bg-[#111B13] px-2 py-0.5 text-[9px] font-medium text-[#A3E635]">{"Power BI"}</span></div>
<h3 className="mt-2 text-lg font-semibold text-[#F0F4F8]">{"Recursos Humanos"}</h3>
<p className="mt-1.5 text-xs leading-relaxed text-[#94A3B8]">{"Turnover, headcount, absenteísmo, folha salarial e retenção."}</p>
</div>
<div className="mt-4 flex items-center border-t border-[#18212C] pt-3.5">
<a href="https://app.powerbi.com/reportEmbed?reportId=03354214-1b1c-4ebe-aa2f-2583c2151eb4&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A3E635] transition-colors hover:text-[#BEF264] hover:underline">{"Abrir no Power BI "}<span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">{"↗"}</span></a>
</div>
</div>
</DashboardCard></Reveal>)}{(activeCat === "Todos" || activeCat === "Saúde") && (<Reveal delay={120} className="flex"><DashboardCard>
<div className="border-b border-[#19222D] bg-[#0A0E13] p-4">
<div className="grid grid-cols-3 gap-2"><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Ocupação"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"87,2%"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Média Perm."}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"4,1 d"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"SLA Triagem"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"94%"}</p></div></div>
<div className="mt-2.5 grid grid-cols-12 gap-2">
<div className="col-span-7 flex h-16 items-end justify-between gap-1 rounded-lg border border-[#17202B] bg-[#0D1218] px-2.5 py-2"><span style={{"height": "51%", "--bar-i": 0} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "78%", "--bar-i": 1} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "91%", "--bar-i": 2} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "71%", "--bar-i": 3} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "100%", "--bar-i": 4} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "84%", "--bar-i": 5} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "93%", "--bar-i": 6} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "76%", "--bar-i": 7} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span></div>
<div className="col-span-5 flex h-16 items-end rounded-lg border border-[#17202B] bg-[#0D1218] px-2 py-1.5"><svg viewBox="0 0 110 44" className="h-11 w-full overflow-visible"><polygon points="0,44 0.0,30.5 22.0,25.4 44.0,24.0 66.0,19.7 88.0,21.1 110.0,14.6 110,44" fill="#A3E635" fillOpacity="0.18"></polygon><polyline fill="none" stroke="#A3E635" strokeWidth="1.8" strokeLinecap="round" points="0.0,30.5 22.0,25.4 44.0,24.0 66.0,19.7 88.0,21.1 110.0,14.6"></polyline></svg></div>
</div>
</div>
<div className="flex flex-1 flex-col justify-between p-5">
<div >
<div className="flex items-center justify-between gap-2"><span className="font-mono-data text-[10px] uppercase tracking-[0.16em] text-[#7D8C9F]">{"SAÚDE"}</span><span className="font-mono-data rounded border border-[#233322] bg-[#111B13] px-2 py-0.5 text-[9px] font-medium text-[#A3E635]">{"Power BI"}</span></div>
<h3 className="mt-2 text-lg font-semibold text-[#F0F4F8]">{"Hospitalar"}</h3>
<p className="mt-1.5 text-xs leading-relaxed text-[#94A3B8]">{"Ocupação de leitos, giro hospitalar, glosas e indicadores clínicos."}</p>
</div>
<div className="mt-4 flex items-center border-t border-[#18212C] pt-3.5">
<a href="https://app.powerbi.com/reportEmbed?reportId=f3c9dc29-80ac-46ba-a457-1038e4fec79e&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A3E635] transition-colors hover:text-[#BEF264] hover:underline">{"Abrir no Power BI "}<span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">{"↗"}</span></a>
</div>
</div>
</DashboardCard></Reveal>)}{(activeCat === "Todos" || activeCat === "Operações & Indústria") && (<Reveal delay={180} className="flex"><DashboardCard>
<div className="border-b border-[#19222D] bg-[#0A0E13] p-4">
<div className="grid grid-cols-3 gap-2"><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"OEE Global"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"84,6%"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Refugo"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"1,3%"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Disponib."}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"92,1%"}</p></div></div>
<div className="mt-2.5 grid grid-cols-12 gap-2">
<div className="col-span-7 flex h-16 items-end justify-between gap-1 rounded-lg border border-[#17202B] bg-[#0D1218] px-2.5 py-2"><span style={{"height": "70%", "--bar-i": 0} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "64%", "--bar-i": 1} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "79%", "--bar-i": 2} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "53%", "--bar-i": 3} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "92%", "--bar-i": 4} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "73%", "--bar-i": 5} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "100%", "--bar-i": 6} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "86%", "--bar-i": 7} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span></div>
<div className="col-span-5 flex h-16 items-end rounded-lg border border-[#17202B] bg-[#0D1218] px-2 py-1.5"><svg viewBox="0 0 110 44" className="h-11 w-full overflow-visible"><polygon points="0,44 0.0,34.1 22.0,29.8 44.0,24.7 66.0,22.6 88.0,17.5 110.0,16.1 110,44" fill="#A3E635" fillOpacity="0.18"></polygon><polyline fill="none" stroke="#A3E635" strokeWidth="1.8" strokeLinecap="round" points="0.0,34.1 22.0,29.8 44.0,24.7 66.0,22.6 88.0,17.5 110.0,16.1"></polyline></svg></div>
</div>
</div>
<div className="flex flex-1 flex-col justify-between p-5">
<div >
<div className="flex items-center justify-between gap-2"><span className="font-mono-data text-[10px] uppercase tracking-[0.16em] text-[#7D8C9F]">{"INDÚSTRIA"}</span><span className="font-mono-data rounded border border-[#233322] bg-[#111B13] px-2 py-0.5 text-[9px] font-medium text-[#A3E635]">{"Power BI"}</span></div>
<h3 className="mt-2 text-lg font-semibold text-[#F0F4F8]">{"Produção"}</h3>
<p className="mt-1.5 text-xs leading-relaxed text-[#94A3B8]">{"OEE global, refugos, paradas de máquina e eficiência por turno."}</p>
</div>
<div className="mt-4 flex items-center border-t border-[#18212C] pt-3.5">
<a href="https://app.powerbi.com/reportEmbed?reportId=40849204-011c-49b7-9a58-7af3e7dc1501&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A3E635] transition-colors hover:text-[#BEF264] hover:underline">{"Abrir no Power BI "}<span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">{"↗"}</span></a>
</div>
</div>
</DashboardCard></Reveal>)}{(activeCat === "Todos" || activeCat === "Comercial & Pessoas") && (<Reveal delay={240} className="flex"><DashboardCard>
<div className="border-b border-[#19222D] bg-[#0A0E13] p-4">
<div className="grid grid-cols-3 gap-2"><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Faturamento"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"R$ 1,92M"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Meta"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"112%"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Conversão"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"29,8%"}</p></div></div>
<div className="mt-2.5 grid grid-cols-12 gap-2">
<div className="col-span-7 flex h-16 items-end justify-between gap-1 rounded-lg border border-[#17202B] bg-[#0D1218] px-2.5 py-2"><span style={{"height": "96%", "--bar-i": 0} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "67%", "--bar-i": 1} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "59%", "--bar-i": 2} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "100%", "--bar-i": 3} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "74%", "--bar-i": 4} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "91%", "--bar-i": 5} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "61%", "--bar-i": 6} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "48%", "--bar-i": 7} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span></div>
<div className="col-span-5 flex h-16 items-end rounded-lg border border-[#17202B] bg-[#0D1218] px-2 py-1.5"><svg viewBox="0 0 110 44" className="h-11 w-full overflow-visible"><polygon points="0,44 0.0,34.8 22.0,28.3 44.0,25.4 66.0,19.7 88.0,15.4 110.0,10.3 110,44" fill="#A3E635" fillOpacity="0.18"></polygon><polyline fill="none" stroke="#A3E635" strokeWidth="1.8" strokeLinecap="round" points="0.0,34.8 22.0,28.3 44.0,25.4 66.0,19.7 88.0,15.4 110.0,10.3"></polyline></svg></div>
</div>
</div>
<div className="flex flex-1 flex-col justify-between p-5">
<div >
<div className="flex items-center justify-between gap-2"><span className="font-mono-data text-[10px] uppercase tracking-[0.16em] text-[#7D8C9F]">{"COMERCIAL"}</span><span className="font-mono-data rounded border border-[#233322] bg-[#111B13] px-2 py-0.5 text-[9px] font-medium text-[#A3E635]">{"Power BI"}</span></div>
<h3 className="mt-2 text-lg font-semibold text-[#F0F4F8]">{"Vendas"}</h3>
<p className="mt-1.5 text-xs leading-relaxed text-[#94A3B8]">{"Funil comercial, metas, ticket médio, curva ABC e vendedores."}</p>
</div>
<div className="mt-4 flex items-center border-t border-[#18212C] pt-3.5">
<a href="https://app.powerbi.com/reportEmbed?reportId=e3b8491b-9d8c-4de5-b39b-f0ba9855d0a6&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A3E635] transition-colors hover:text-[#BEF264] hover:underline">{"Abrir no Power BI "}<span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">{"↗"}</span></a>
</div>
</div>
</DashboardCard></Reveal>)}{(activeCat === "Todos" || activeCat === "Comercial & Pessoas") && (<Reveal delay={300} className="flex"><DashboardCard>
<div className="border-b border-[#19222D] bg-[#0A0E13] p-4">
<div className="grid grid-cols-3 gap-2"><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"TMA"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"3m 42s"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Nível Serv."}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"91,5%"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Conversão"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"18,4%"}</p></div></div>
<div className="mt-2.5 grid grid-cols-12 gap-2">
<div className="col-span-7 flex h-16 items-end justify-between gap-1 rounded-lg border border-[#17202B] bg-[#0D1218] px-2.5 py-2"><span style={{"height": "54%", "--bar-i": 0} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "83%", "--bar-i": 1} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "91%", "--bar-i": 2} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "67%", "--bar-i": 3} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "100%", "--bar-i": 4} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "87%", "--bar-i": 5} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "78%", "--bar-i": 6} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "70%", "--bar-i": 7} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span></div>
<div className="col-span-5 flex h-16 items-end rounded-lg border border-[#17202B] bg-[#0D1218] px-2 py-1.5"><svg viewBox="0 0 110 44" className="h-11 w-full overflow-visible"><polygon points="0,44 0.0,29.8 22.0,26.9 44.0,28.3 66.0,21.8 88.0,19.0 110.0,13.9 110,44" fill="#A3E635" fillOpacity="0.18"></polygon><polyline fill="none" stroke="#A3E635" strokeWidth="1.8" strokeLinecap="round" points="0.0,29.8 22.0,26.9 44.0,28.3 66.0,21.8 88.0,19.0 110.0,13.9"></polyline></svg></div>
</div>
</div>
<div className="flex flex-1 flex-col justify-between p-5">
<div >
<div className="flex items-center justify-between gap-2"><span className="font-mono-data text-[10px] uppercase tracking-[0.16em] text-[#7D8C9F]">{"CONTACT CENTER"}</span><span className="font-mono-data rounded border border-[#233322] bg-[#111B13] px-2 py-0.5 text-[9px] font-medium text-[#A3E635]">{"Power BI"}</span></div>
<h3 className="mt-2 text-lg font-semibold text-[#F0F4F8]">{"Telemarketing"}</h3>
<p className="mt-1.5 text-xs leading-relaxed text-[#94A3B8]">{"TMA, taxa de conversão, nível de serviço e produtividade."}</p>
</div>
<div className="mt-4 flex items-center border-t border-[#18212C] pt-3.5">
<a href="https://app.powerbi.com/reportEmbed?reportId=6db77ebf-cd48-4903-94fc-e87710b5e195&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A3E635] transition-colors hover:text-[#BEF264] hover:underline">{"Abrir no Power BI "}<span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">{"↗"}</span></a>
</div>
</div>
</DashboardCard></Reveal>)}{(activeCat === "Todos" || activeCat === "Gestão & Finanças") && (<Reveal delay={360} className="flex"><DashboardCard>
<div className="border-b border-[#19222D] bg-[#0A0E13] p-4">
<div className="grid grid-cols-3 gap-2"><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Avanço Fís."}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"68,5%"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Desvio Orç."}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"-1,4%"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Medições"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"R$ 4,6M"}</p></div></div>
<div className="mt-2.5 grid grid-cols-12 gap-2">
<div className="col-span-7 flex h-16 items-end justify-between gap-1 rounded-lg border border-[#17202B] bg-[#0D1218] px-2.5 py-2"><span style={{"height": "93%", "--bar-i": 0} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "84%", "--bar-i": 1} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "77%", "--bar-i": 2} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "68%", "--bar-i": 3} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "59%", "--bar-i": 4} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "50%", "--bar-i": 5} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "100%", "--bar-i": 6} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "89%", "--bar-i": 7} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]"></span></div>
<div className="col-span-5 flex h-16 items-end rounded-lg border border-[#17202B] bg-[#0D1218] px-2 py-1.5"><svg viewBox="0 0 110 44" className="h-11 w-full overflow-visible"><polygon points="0,44 0.0,36.2 22.0,31.9 44.0,26.9 66.0,21.8 88.0,19.0 110.0,16.8 110,44" fill="#A3E635" fillOpacity="0.18"></polygon><polyline fill="none" stroke="#A3E635" strokeWidth="1.8" strokeLinecap="round" points="0.0,36.2 22.0,31.9 44.0,26.9 66.0,21.8 88.0,19.0 110.0,16.8"></polyline></svg></div>
</div>
</div>
<div className="flex flex-1 flex-col justify-between p-5">
<div >
<div className="flex items-center justify-between gap-2"><span className="font-mono-data text-[10px] uppercase tracking-[0.16em] text-[#7D8C9F]">{"ENGENHARIA"}</span><span className="font-mono-data rounded border border-[#233322] bg-[#111B13] px-2 py-0.5 text-[9px] font-medium text-[#A3E635]">{"Power BI"}</span></div>
<h3 className="mt-2 text-lg font-semibold text-[#F0F4F8]">{"Evolução de Obra & Finanças"}</h3>
<p className="mt-1.5 text-xs leading-relaxed text-[#94A3B8]">{"Cronograma físico-financeiro, previsto × realizado e desvios."}</p>
</div>
<div className="mt-4 flex items-center border-t border-[#18212C] pt-3.5">
<a href="https://app.powerbi.com/reportEmbed?reportId=aff9e01d-61ed-4064-99a9-9cc088eb8129&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A3E635] transition-colors hover:text-[#BEF264] hover:underline">{"Abrir no Power BI "}<span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">{"↗"}</span></a>
</div>
</div>
</DashboardCard></Reveal>)}{(activeCat === "Todos" || activeCat === "Operações & Indústria") && (<Reveal delay={420} className="flex"><DashboardCard>
<div className="border-b border-[#19222D] bg-[#0A0E13] p-4">
<div className="grid grid-cols-3 gap-2"><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"SLA Interno"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"95,2%"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Backlog"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"34"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Eficiência"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"89%"}</p></div></div>
<div className="mt-2.5 grid grid-cols-12 gap-2">
<div className="col-span-7 flex h-16 items-end justify-between gap-1 rounded-lg border border-[#17202B] bg-[#0D1218] px-2.5 py-2"><span style={{"height": "54%", "--bar-i": 0} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "63%", "--bar-i": 1} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "71%", "--bar-i": 2} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "76%", "--bar-i": 3} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "80%", "--bar-i": 4} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "85%", "--bar-i": 5} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "90%", "--bar-i": 6} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "100%", "--bar-i": 7} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]"></span></div>
<div className="col-span-5 flex h-16 items-end rounded-lg border border-[#17202B] bg-[#0D1218] px-2 py-1.5"><svg viewBox="0 0 110 44" className="h-11 w-full overflow-visible"><polygon points="0,44 0.0,33.4 22.0,29.8 44.0,26.2 66.0,23.3 88.0,18.2 110.0,13.2 110,44" fill="#A3E635" fillOpacity="0.18"></polygon><polyline fill="none" stroke="#A3E635" strokeWidth="1.8" strokeLinecap="round" points="0.0,33.4 22.0,29.8 44.0,26.2 66.0,23.3 88.0,18.2 110.0,13.2"></polyline></svg></div>
</div>
</div>
<div className="flex flex-1 flex-col justify-between p-5">
<div >
<div className="flex items-center justify-between gap-2"><span className="font-mono-data text-[10px] uppercase tracking-[0.16em] text-[#7D8C9F]">{"GESTÃO"}</span><span className="font-mono-data rounded border border-[#233322] bg-[#111B13] px-2 py-0.5 text-[9px] font-medium text-[#A3E635]">{"Power BI"}</span></div>
<h3 className="mt-2 text-lg font-semibold text-[#F0F4F8]">{"Operacional"}</h3>
<p className="mt-1.5 text-xs leading-relaxed text-[#94A3B8]">{"Indicadores de rotina, produtividade de equipes, SLAs e metas."}</p>
</div>
<div className="mt-4 flex items-center border-t border-[#18212C] pt-3.5">
<a href="https://app.powerbi.com/reportEmbed?reportId=573585de-6b23-4e8c-999c-e6d83f0c3915&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A3E635] transition-colors hover:text-[#BEF264] hover:underline">{"Abrir no Power BI "}<span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">{"↗"}</span></a>
</div>
</div>
</DashboardCard></Reveal>)}{(activeCat === "Todos" || activeCat === "Gestão & Finanças") && (<Reveal delay={480} className="flex"><DashboardCard>
<div className="border-b border-[#19222D] bg-[#0A0E13] p-4">
<div className="grid grid-cols-3 gap-2"><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"EBITDA"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"26,8%"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Caixa Proj."}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"R$ 890k"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Margem Líq."}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"19,4%"}</p></div></div>
<div className="mt-2.5 grid grid-cols-12 gap-2">
<div className="col-span-7 flex h-16 items-end justify-between gap-1 rounded-lg border border-[#17202B] bg-[#0D1218] px-2.5 py-2"><span style={{"height": "70%", "--bar-i": 0} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "78%", "--bar-i": 1} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "100%", "--bar-i": 2} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "59%", "--bar-i": 3} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "67%", "--bar-i": 4} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "83%", "--bar-i": 5} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "87%", "--bar-i": 6} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "76%", "--bar-i": 7} as CSSProperties} className="etp-mini-bar w-full rounded-t-[2px] bg-[#A3E635]/35"></span></div>
<div className="col-span-5 flex h-16 items-end rounded-lg border border-[#17202B] bg-[#0D1218] px-2 py-1.5"><svg viewBox="0 0 110 44" className="h-11 w-full overflow-visible"><polygon points="0,44 0.0,32.6 22.0,27.6 44.0,24.7 66.0,20.4 88.0,17.5 110.0,11.8 110,44" fill="#A3E635" fillOpacity="0.18"></polygon><polyline fill="none" stroke="#A3E635" strokeWidth="1.8" strokeLinecap="round" points="0.0,32.6 22.0,27.6 44.0,24.7 66.0,20.4 88.0,17.5 110.0,11.8"></polyline></svg></div>
</div>
</div>
<div className="flex flex-1 flex-col justify-between p-5">
<div >
<div className="flex items-center justify-between gap-2"><span className="font-mono-data text-[10px] uppercase tracking-[0.16em] text-[#7D8C9F]">{"FINANÇAS"}</span><span className="font-mono-data rounded border border-[#233322] bg-[#111B13] px-2 py-0.5 text-[9px] font-medium text-[#A3E635]">{"Power BI"}</span></div>
<h3 className="mt-2 text-lg font-semibold text-[#F0F4F8]">{"Financeiro"}</h3>
<p className="mt-1.5 text-xs leading-relaxed text-[#94A3B8]">{"DRE gerencial, fluxo de caixa projetado, margens e EBITDA."}</p>
</div>
<div className="mt-4 flex items-center border-t border-[#18212C] pt-3.5">
<a href="https://app.powerbi.com/reportEmbed?reportId=fe422572-a98f-401d-91d3-2f5feff3e8d9&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A3E635] transition-colors hover:text-[#BEF264] hover:underline">{"Abrir no Power BI "}<span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">{"↗"}</span></a>
</div>
</div>
</DashboardCard></Reveal>)} </>);
const proposals = (<> 
<Reveal delay={0} className="flex">
<article onMouseMove={handleSpotlightMove} className="group/spot relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border p-6 sm:p-7 border-[#1E2733] bg-[#0E1319] transition-all duration-300 hover:-translate-y-1">
<SpotlightOverlay />
<div >
<div className="flex items-center justify-between"><span className="font-mono-data text-[10px] uppercase tracking-[0.18em] text-[#8B9BB0]">{"PROPOSTA 01"}</span></div>
<h3 className="mt-3 text-xl font-semibold text-[#F0F4F8]">{"Dashboards em Power BI"}</h3>
<p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">{"Painéis gerenciais sob medida, do tratamento dos dados à publicação."}</p>
<ul className="mt-5 space-y-2.5"><li className="flex items-start gap-2 text-xs text-[#CBD5E1]"><span className="text-[#A3E635]">{"✓"}</span><span >{"Layout executivo personalizado no Figma"}</span></li><li className="flex items-start gap-2 text-xs text-[#CBD5E1]"><span className="text-[#A3E635]">{"✓"}</span><span >{"Conexão com SQL, Excel, Google Sheets ou ERP"}</span></li><li className="flex items-start gap-2 text-xs text-[#CBD5E1]"><span className="text-[#A3E635]">{"✓"}</span><span >{"Modelagem de dados, Power Query e DAX avançado"}</span></li><li className="flex items-start gap-2 text-xs text-[#CBD5E1]"><span className="text-[#A3E635]">{"✓"}</span><span >{"Publicação em nuvem e treinamento de uso"}</span></li></ul>
</div>
<Button type="button" className="mt-7 w-full cursor-pointer rounded-full px-5 py-3 text-xs font-semibold transition-colors border border-[#2A3747] bg-[#131B24] text-[#F0F4F8] hover:border-[#A3E635]/60 hover:text-[#A3E635]" variant="imported" size="imported" onClick={(e) => { selectProposalAndScroll('projeto-pontual'); }}>{"Solicitar Orçamento →"}</Button>
</article>
</Reveal>
<Reveal delay={100} className="flex">
<article onMouseMove={handleSpotlightMove} className="group/spot relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border p-6 sm:p-7 border-[#A3E635]/55 bg-[#101715] transition-all duration-300 hover:-translate-y-1">
<SpotlightOverlay />
<div >
<div className="flex items-center justify-between"><span className="font-mono-data text-[10px] uppercase tracking-[0.18em] text-[#8B9BB0]">{"PROPOSTA 02"}</span><span className="rounded-full bg-[#A3E635] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#090C10]">{"Mais Escolhido"}</span></div>
<h3 className="mt-3 text-xl font-semibold text-[#F0F4F8]">{"Consultoria & BI Recorrente"}</h3>
<p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">{"Evolução contínua dos seus indicadores e bases de dados mês a mês."}</p>
<ul className="mt-5 space-y-2.5"><li className="flex items-start gap-2 text-xs text-[#CBD5E1]"><span className="text-[#A3E635]">{"✓"}</span><span >{"Criação e atualização contínua de dashboards"}</span></li><li className="flex items-start gap-2 text-xs text-[#CBD5E1]"><span className="text-[#A3E635]">{"✓"}</span><span >{"Manutenção de rotinas ETL e bancos SQL / PostgreSQL"}</span></li><li className="flex items-start gap-2 text-xs text-[#CBD5E1]"><span className="text-[#A3E635]">{"✓"}</span><span >{"Criação de novos KPIs e ajustes sob demanda"}</span></li><li className="flex items-start gap-2 text-xs text-[#CBD5E1]"><span className="text-[#A3E635]">{"✓"}</span><span >{"Suporte direto e acompanhamento periódico"}</span></li></ul>
</div>
<Button type="button" className="etp-cta-shimmer mt-7 w-full cursor-pointer rounded-full px-5 py-3 text-xs font-semibold transition-colors bg-[#A3E635] text-[#090C10] hover:bg-[#BEF264]" variant="imported" size="imported" onClick={(e) => { selectProposalAndScroll('consultoria-recorrente'); }}>{"Falar sobre Recorrência →"}</Button>
</article>
</Reveal>
<Reveal delay={200} className="flex">
<article onMouseMove={handleSpotlightMove} className="group/spot relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border p-6 sm:p-7 border-[#1E2733] bg-[#0E1319] transition-all duration-300 hover:-translate-y-1">
<SpotlightOverlay />
<div >
<div className="flex items-center justify-between"><span className="font-mono-data text-[10px] uppercase tracking-[0.18em] text-[#8B9BB0]">{"PROPOSTA 03"}</span></div>
<h3 className="mt-3 text-xl font-semibold text-[#F0F4F8]">{"Automações & Soluções Web"}</h3>
<p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">{"Elimine tarefas manuais e centralize processos da sua operação."}</p>
<ul className="mt-5 space-y-2.5"><li className="flex items-start gap-2 text-xs text-[#CBD5E1]"><span className="text-[#A3E635]">{"✓"}</span><span >{"Fluxos automatizados com n8n, Power Automate e Python"}</span></li><li className="flex items-start gap-2 text-xs text-[#CBD5E1]"><span className="text-[#A3E635]">{"✓"}</span><span >{"Integração de dados entre sistemas e planilhas"}</span></li><li className="flex items-start gap-2 text-xs text-[#CBD5E1]"><span className="text-[#A3E635]">{"✓"}</span><span >{"Alertas e relatórios automáticos por WhatsApp ou e-mail"}</span></li><li className="flex items-start gap-2 text-xs text-[#CBD5E1]"><span className="text-[#A3E635]">{"✓"}</span><span >{"Aplicações internas com Power Apps ou portais web"}</span></li></ul>
</div>
<Button type="button" className="mt-7 w-full cursor-pointer rounded-full px-5 py-3 text-xs font-semibold transition-colors border border-[#2A3747] bg-[#131B24] text-[#F0F4F8] hover:border-[#A3E635]/60 hover:text-[#A3E635]" variant="imported" size="imported" onClick={(e) => { selectProposalAndScroll('automacao-integracoes'); }}>{"Solicitar Automação →"}</Button>
</article>
</Reveal>
 </>);
return (<>

<div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] bg-transparent">
<div className="h-full w-full origin-left bg-[#A3E635] transition-transform duration-75 ease-out" style={{ transform: `scaleX(${scrollProgress / 100})` }} />
</div>

<header className={`sticky top-0 z-40 border-b transition-all duration-300 ${scrolled ? "border-[#1A222C]/90 bg-[#090C10]/85 backdrop-blur-md" : "border-transparent bg-transparent"}`}>
<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
<a href="#inicio" className="flex items-center gap-3">
<span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0F4F8] p-1"><img src="https://i.ibb.co/mVhKs04M/Design-sem-nome-1.png" alt="Elite Tech Pro" className="h-full w-full object-contain" /></span>
<div className="leading-tight">
<span className="block text-sm font-semibold tracking-tight text-[#F0F4F8]">{"Elite Tech Pro"}</span>
<span className="hidden text-[11px] text-[#7D8C9F] sm:block">{"Inteligência de Dados, BI & Automação"}</span>
</div>
</a>
<nav className="hidden items-center gap-7 md:flex">
{NAV_ITEMS.map((item) => {
  const isActive = activeSection === item.id;
  return (
    <a
      key={item.id}
      href={`#${item.id}`}
      className={`relative py-1 text-xs font-medium transition-colors ${
        isActive ? "text-[#A3E635]" : "text-[#94A3B8] hover:text-[#F0F4F8]"
      }`}
    >
      {item.label}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-[#A3E635] transition-all duration-300 ${
          isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
        }`}
      />
    </a>
  );
})}
</nav>
<Button type="button" className="etp-cta-shimmer inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#A3E635] px-4 py-2 text-xs font-semibold text-[#090C10] transition-colors hover:bg-[#BEF264]" variant="imported" size="imported" onClick={(e) => { selectProposalAndScroll('diagnostico-gratuito'); }}>{"\n        Diagnóstico Gratuito ↗\n      "}</Button>
</div>
</header>
<main >

<section id="inicio" className="relative overflow-hidden border-b border-[#161E28] bg-[#090C10]">
<div
  ref={heroGlowRef}
  aria-hidden
  className="pointer-events-none absolute -inset-x-0 -top-16 -bottom-16 will-change-transform"
  style={{
    background:
      "radial-gradient(62% 52% at 14% 16%, rgba(132, 204, 22, 0.085) 0%, rgba(77, 124, 15, 0.025) 42%, rgba(9, 12, 16, 0) 76%), radial-gradient(45% 40% at 88% 24%, rgba(163, 230, 53, 0.035) 0%, rgba(9, 12, 16, 0) 70%), linear-gradient(180deg, var(--background) 0%, var(--site-0b0f14) 100%)",
  }}
/>
<div
  ref={heroGridRef}
  aria-hidden
  className="etp-dot-grid pointer-events-none absolute -inset-x-0 -top-16 -bottom-16 will-change-transform"
/>
<div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
<Reveal>
<div className="mx-auto max-w-4xl text-center">
<p className="font-mono-data mb-5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#94A3B8]">{"\n              INTELIGÊNCIA DE DADOS, BI & AUTOMAÇÃO • TODOS OS SEGMENTOS\n            "}</p>
<h1 className="font-editorial text-5xl leading-[1.05] text-[#F0F4F8] sm:text-6xl">{"\n              Inteligência de dados para "}<span className="italic text-[#A3E635]">{"decisões precisas"}</span>{" na sua empresa.\n            "}</h1>
<p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-[#94A3B8] sm:text-base">{"\n              A "}<strong className="font-semibold text-[#E2E8F0]">{"Elite Tech Pro"}</strong>{" estrutura dashboards executivos em Power BI, pipelines em SQL e Python e automações com n8n — entregando clareza de margem, caixa e operação para quem decide o rumo do negócio.\n            "}</p>
</div>
</Reveal>

<Reveal delay={100}>
<div className="mt-14 grid grid-cols-2 divide-y divide-[#1A232F] rounded-xl border border-[#1A232F] bg-[#0D1218]/90 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
<div className="px-5 py-4"><p className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#64748B]">{"ARQUITETURA"}</p><p className="mt-1 text-sm font-semibold text-[#F0F4F8]">{"BI, Engenharia de Dados & IA"}</p></div>
<div className="px-5 py-4"><p className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#64748B]">{"ECOSSISTEMA"}</p><p className="mt-1 text-sm font-semibold text-[#F0F4F8]">{"Power BI • SQL • Python • n8n"}</p></div>
<div className="px-5 py-4"><p className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#64748B]">{"INTEGRAÇÕES"}</p><p className="mt-1 text-sm font-semibold text-[#F0F4F8]">{"ERPs, CRMs & Bancos de Dados"}</p></div>
<div className="px-5 py-4"><p className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#64748B]">{"ATUAÇÃO"}</p><p className="mt-1 text-sm font-semibold text-[#F0F4F8]">{"Projetos Sob Medida • Brasil"}</p></div>
</div>
</Reveal>

<Reveal delay={180}>
<div className="mt-12 grid grid-cols-2 gap-8 border-t border-[#161E28] pt-10 sm:grid-cols-4">
<div ><p className="font-editorial text-4xl leading-none text-[#A3E635] sm:text-5xl"><AnimatedCounter target={20} prefix="+" /></p><p className="mt-2 text-xs font-medium text-[#8B9BB0]">{"Dashboards em produção"}</p></div>
<div ><p className="font-editorial text-4xl leading-none text-[#A3E635] sm:text-5xl"><AnimatedCounter target={20} prefix="+" /></p><p className="mt-2 text-xs font-medium text-[#8B9BB0]">{"Clientes & operações atendidas"}</p></div>
<div ><p className="font-editorial text-4xl leading-none text-[#A3E635] sm:text-5xl"><AnimatedCounter target={9} suffix="+" /></p><p className="mt-2 text-xs font-medium text-[#8B9BB0]">{"Segmentos estruturados"}</p></div>
<div ><p className="font-editorial text-4xl leading-none text-[#A3E635] sm:text-5xl"><AnimatedCounter target={3} suffix="+" /></p><p className="mt-2 text-xs font-medium text-[#8B9BB0]">{"Anos em análise de dados"}</p></div>
</div>
</Reveal>
</div>
</section>

<section id="solucoes" className="border-b border-[#161E28] py-20 md:py-24">
<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
<Reveal>
<div className="grid gap-6 md:grid-cols-12 md:items-end">
<div className="md:col-span-7">
<p className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-[#7D8C9F]">{"01 / Soluções & Stack Tecnológica"}</p>
<h2 className="font-editorial mt-3 text-4xl leading-[1.08] text-[#F0F4F8] sm:text-5xl">{"Arquitetura de dados sob medida para o dia a dia da sua operação."}</h2>
</div>
<div className="md:col-span-5">
<p className="text-sm leading-relaxed text-[#94A3B8]">{"Combinamos engenharia de dados, visualização executiva e automação de processos para eliminar retrabalho manual e colocar indicadores confiáveis nas mãos da liderança."}</p>
</div>
</div>
</Reveal>
<div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[#1D2631] bg-[#1D2631] sm:grid-cols-2 lg:grid-cols-3" id="solutions-grid">{solutions}</div>
</div>
</section>

<section id="dashboards" className="border-b border-[#161E28] py-20 md:py-24">
<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
<Reveal>
<div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
<div >
<p className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-[#7D8C9F]">{"02 / Portfólio de Projetos Reais"}</p>
<h2 className="font-editorial mt-3 text-4xl leading-[1.08] text-[#F0F4F8] sm:text-5xl">{"Dashboards por segmento"}</h2>
</div>
<p className="text-xs font-medium text-[#7D8C9F]">{"Abra o painel interativo no Power BI pelo link de cada card"}</p>
</div>
<div className="mt-8 flex flex-wrap gap-2" id="category-filters">{filterButtons}</div>
</Reveal>
<div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" id="dashboards-grid">{dashboardCards}</div>
</div>
</section>

<section id="antes-depois" className="border-b border-[#161E28] bg-[#0B0F14] py-20 md:py-24">
<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
<Reveal>
<div className="max-w-3xl">
<p className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-[#A3E635]">{"TRANSFORMAÇÃO NA PRÁTICA"}</p>
<h2 className="font-editorial mt-3 text-4xl leading-[1.08] text-[#F0F4F8] sm:text-5xl">{"Saia do caos das planilhas para a clareza executiva."}</h2>
<p className="mt-3 text-sm leading-relaxed text-[#94A3B8]">{"Arraste a barra abaixo para comparar a rotina manual com um painel automatizado da Elite Tech Pro."}</p>
</div>
</Reveal>
<Reveal delay={100}>
<BeforeAfterComparator />
</Reveal>
</div>
</section>

<section id="calculadora-roi" className="border-b border-[#161E28] py-20 md:py-24">
<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
<Reveal>
<div className="max-w-3xl">
<p className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-[#A3E635]">{"QUANTO CUSTA A OPERAÇÃO MANUAL?"}</p>
<h2 className="font-editorial mt-3 text-4xl leading-[1.08] text-[#F0F4F8] sm:text-5xl">{"Descubra quanto tempo e dinheiro sua empresa recupera com BI e automação."}</h2>
</div>
</Reveal>
<Reveal delay={100}>
<RoiCalculator onCtaClick={() => selectProposalAndScroll("automacao-integracoes")} />
</Reveal>
</div>
</section>

<section id="propostas" className="border-b border-[#161E28] bg-[#0B0F14] py-20 md:py-24">
<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
<Reveal>
<div className="grid gap-6 md:grid-cols-12 md:items-end">
<div className="md:col-span-7">
<p className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-[#A3E635]">{"03 / Modelos de Proposta Comercial"}</p>
<h2 className="font-editorial mt-3 text-4xl leading-[1.08] text-[#F0F4F8] sm:text-5xl">{"Formatos transparentes para cada estágio de maturidade em dados."}</h2>
</div>
<div className="md:col-span-5">
<p className="text-sm leading-relaxed text-[#94A3B8]">{"Analise qual modelo faz mais sentido para sua empresa hoje. Todos os projetos começam com um "}<strong className="text-[#E2E8F0]">{"diagnóstico gratuito"}</strong>{" e entregam proposta com escopo, prazo e investimento fechados."}</p>
</div>
</div>
</Reveal>
<div className="mt-12 grid gap-6 lg:grid-cols-3" id="proposals-grid">{proposals}</div>
</div>
</section>

<section id="processo" className="border-b border-[#161E28] py-20 md:py-24">
<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
<Reveal>
<div className="max-w-2xl">
<p className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-[#7D8C9F]">{"04 / Metodologia de Entrega"}</p>
<h2 className="font-editorial mt-3 text-4xl leading-[1.08] text-[#F0F4F8] sm:text-5xl">{"Do dado bruto à decisão estratégica em quatro etapas."}</h2>
</div>
</Reveal>
<div ref={methodRef} className="relative mt-12">
<div aria-hidden className="pointer-events-none absolute left-[12%] right-[12%] top-11 z-0 hidden h-[2px] overflow-hidden rounded-full bg-[#1C2530] lg:block">
<div className={`h-full w-full origin-left bg-gradient-to-r from-[#A3E635]/40 via-[#A3E635] to-[#A3E635] transition-transform duration-1000 ease-out ${methodLineVisible ? "scale-x-100" : "scale-x-0"}`} />
</div>
<div className="relative z-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
<Reveal delay={0} className="flex"><div onMouseMove={handleSpotlightMove} className="group/spot relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-[#1C2530] bg-[#0D1218] p-6 transition-all duration-300 hover:-translate-y-1"><SpotlightOverlay /><div ><div className="flex items-center justify-between"><span className="font-editorial text-3xl text-[#A3E635]">{"01"}</span></div><h3 className="mt-4 text-base font-semibold text-[#F0F4F8]">{"Diagnóstico & Mapeamento"}</h3><p className="mt-2.5 text-xs leading-relaxed text-[#94A3B8]">{"Entendemos a rotina da operação, definimos os indicadores essenciais e mapeamos as fontes de dados (ERP, SQL, CRM ou planilhas)."}</p></div><div className="mt-6 h-0.5 w-10 rounded-full bg-[#A3E635]/40"></div></div></Reveal>
<Reveal delay={90} className="flex"><div onMouseMove={handleSpotlightMove} className="group/spot relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-[#1C2530] bg-[#0D1218] p-6 transition-all duration-300 hover:-translate-y-1"><SpotlightOverlay /><div ><div className="flex items-center justify-between"><span className="font-editorial text-3xl text-[#A3E635]">{"02"}</span></div><h3 className="mt-4 text-base font-semibold text-[#F0F4F8]">{"Arquitetura & Protótipo"}</h3><p className="mt-2.5 text-xs leading-relaxed text-[#94A3B8]">{"Estruturamos a modelagem de dados e apresentamos o layout no Figma para aprovação antes do desenvolvimento — zero surpresas."}</p></div><div className="mt-6 h-0.5 w-10 rounded-full bg-[#A3E635]/40"></div></div></Reveal>
<Reveal delay={180} className="flex"><div onMouseMove={handleSpotlightMove} className="group/spot relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-[#1C2530] bg-[#0D1218] p-6 transition-all duration-300 hover:-translate-y-1"><SpotlightOverlay /><div ><div className="flex items-center justify-between"><span className="font-editorial text-3xl text-[#A3E635]">{"03"}</span></div><h3 className="mt-4 text-base font-semibold text-[#F0F4F8]">{"Desenvolvimento & Automação"}</h3><p className="mt-2.5 text-xs leading-relaxed text-[#94A3B8]">{"Construímos os painéis em Power BI com métricas DAX validadas e rotinas automáticas em SQL, Python, n8n ou Power Automate."}</p></div><div className="mt-6 h-0.5 w-10 rounded-full bg-[#A3E635]/40"></div></div></Reveal>
<Reveal delay={270} className="flex"><div onMouseMove={handleSpotlightMove} className="group/spot relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-[#1C2530] bg-[#0D1218] p-6 transition-all duration-300 hover:-translate-y-1"><SpotlightOverlay /><div ><div className="flex items-center justify-between"><span className="font-editorial text-3xl text-[#A3E635]">{"04"}</span></div><h3 className="mt-4 text-base font-semibold text-[#F0F4F8]">{"Validação & Entrega"}</h3><p className="mt-2.5 text-xs leading-relaxed text-[#94A3B8]">{"Validamos os números junto à sua equipe, publicamos em nuvem e fazemos o treinamento prático para o uso no dia a dia."}</p></div><div className="mt-6 h-0.5 w-10 rounded-full bg-[#A3E635]/40"></div></div></Reveal>
</div>
</div>
</div>
</section>

<section id="sobre" className="border-b border-[#161E28] bg-[#0B0F14] py-20 md:py-24">
<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
<Reveal>
<div className="mb-10 flex flex-wrap items-center justify-between gap-4">
<div >
<p className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-[#A3E635]">{"05 / Quem Lidera Cada Projeto • Para Donos de Empresa"}</p>
<h2 className="font-editorial mt-2 text-4xl leading-[1.06] text-[#F0F4F8] sm:text-5xl">{"Atendimento direto com o fundador da Elite Tech Pro."}</h2>
</div>
<span className="font-mono-data rounded-full border border-[#263822] bg-[#101912] px-3.5 py-1.5 text-[10px] uppercase tracking-[0.16em] text-[#A3E635]">{"\n            Só para quem é dono da empresa & diretoria\n          "}</span>
</div>
<div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">

<div className="lg:col-span-5">
<div ref={founderContainerRef} className="relative h-full min-h-[460px] overflow-hidden rounded-2xl border border-[#222D3A] bg-[#0A0D12]">
<img ref={founderImgRef} src="https://i.ibb.co/ycQ0dWr9/gustavo.jpg" alt="Gustavo Pereira — Fundador da Elite Tech Pro" className="absolute inset-0 h-full min-h-[460px] w-full scale-[1.06] object-cover object-top will-change-transform" />
<div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
<div className="absolute inset-x-0 bottom-0 p-6">
<p className="font-mono-data text-[10px] uppercase tracking-[0.18em] text-[#A3E635]">{"Fundador • Elite Tech Pro"}</p>
<p className="font-editorial mt-1.5 text-4xl leading-none text-[#F0F4F8]">
<span className="text-[#A3E635]">{"Gustavo"}</span>{" "}
<span className="italic">{"Pereira"}</span>
</p>
<p className="mt-3 text-xs text-[#CBD5E1]">{"Especialista em BI, Dados & Automação"}</p>
</div>
</div>
</div>

<div className="flex flex-col justify-between gap-6 lg:col-span-7">
<div className="rounded-2xl border border-[#1E2733] bg-[#0E1319] p-6 sm:p-8">
<div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#1A232F] pb-5">
<p className="font-mono-data text-[10px] uppercase tracking-[0.16em] text-[#7D8C9F]">{"Perfil Profissional"}</p>
<span className="rounded-lg border border-[#233224] bg-[#111B13] px-3 py-1 text-xs font-medium text-[#D9F99D]">{"3+ anos em Dados & BI"}</span>
</div>
<div className="mt-5 space-y-4 text-sm leading-relaxed text-[#94A3B8]">
<p className="text-[15px] text-[#E2E8F0]">{"Especialista em Business Intelligence e Análise de Dados, graduado em "}<strong className="font-semibold text-white">{"Sistemas de Informação"}</strong>{" e fundador da "}<strong className="font-semibold text-white">{"Elite Tech Pro"}</strong>{". Transformo bases complexas em painéis claros e decisões seguras — traduzindo números técnicos para a realidade do negócio."}</p>
<p >{"Com experiência prática em operações de alta exigência (incluindo o setor de saúde pública) e mais de 20 dashboards entregues em segmentos como logística, finanças, vendas, indústria e RH, conduzo cada projeto de ponta a ponta: da arquitetura em SQL e Python ao design final em Power BI e automações."}</p>
</div>
<div className="mt-6 grid grid-cols-2 gap-4 border-t border-[#1A232F] pt-6">
<div className="border-l-2 border-[#A3E635] pl-3.5"><p className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#6E7E91]">{"Formação"}</p><p className="mt-1 text-xs font-semibold text-[#E2E8F0] sm:text-sm">{"Sistemas de Informação • Pós em Dados"}</p></div>
<div className="border-l-2 border-[#A3E635] pl-3.5"><p className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#6E7E91]">{"Especialidade"}</p><p className="mt-1 text-xs font-semibold text-[#E2E8F0] sm:text-sm">{"Power BI, SQL, Python & Automação"}</p></div>
<div className="border-l-2 border-[#A3E635] pl-3.5"><p className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#6E7E91]">{"Experiência"}</p><p className="mt-1 text-xs font-semibold text-[#E2E8F0] sm:text-sm">{"+20 Dashboards • 9+ Segmentos"}</p></div>
<div className="border-l-2 border-[#A3E635] pl-3.5"><p className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#6E7E91]">{"Atendimento"}</p><p className="mt-1 text-xs font-semibold text-[#E2E8F0] sm:text-sm">{"Direto com o fundador"}</p></div>
</div>
</div>
<div className="rounded-2xl border border-[#1E2733] bg-[#0E1319] p-6">
<div className="flex flex-wrap items-center justify-between gap-3">
<p className="font-mono-data text-[10px] uppercase tracking-[0.18em] text-[#A3E635]">{"Como atuamos no seu projeto"}</p>
<Button type="button" className="cursor-pointer text-xs font-semibold text-[#A3E635] hover:text-[#BEF264]" variant="imported" size="imported" onClick={(e) => { selectProposalAndScroll('diagnostico-gratuito'); }}>{"\n                  Conversar com Gustavo Pereira ↗\n                "}</Button>
</div>
<ul className="mt-4 grid gap-2.5 sm:grid-cols-2 text-xs text-[#CBD5E1]">
<li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Análise de dados sob medida para o seu setor"}</span></li>
<li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Dashboards executivos e gerenciais em Power BI"}</span></li>
<li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Modelagem e consolidação de bases SQL e ERPs"}</span></li>
<li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Automação de relatórios via n8n e Python"}</span></li>
<li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Diagnóstico de maturidade de dados e consultoria"}</span></li>
<li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Design de painéis executivos no Figma"}</span></li>
</ul>
</div>
</div>
</div>
</Reveal>
</div>
</section>

<section id="contato" className="py-20 md:py-24">
<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
<Reveal>
<div className="max-w-3xl">
<p className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-[#7D8C9F]">{"06 / Diagnóstico & Contato Comercial"}</p>
<h2 className="font-editorial mt-3 text-4xl leading-[1.06] text-[#F0F4F8] sm:text-5xl">{"\n            Vamos conversar sobre o próximo "}<span className="italic text-[#A3E635]">{"dashboard"}</span>{" da sua empresa.\n          "}</h2>
<p className="mt-3 text-sm leading-relaxed text-[#94A3B8]">{"Fale diretamente comigo pelos canais abaixo para discutirmos o projeto da sua empresa."}</p>
</div>
<div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
<a onMouseMove={handleSpotlightMove} href="https://wa.me/qr/Y7DYW352XXXZE1?s=v" target="_blank" rel="noopener noreferrer" className="etp-card group group/spot relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1">
<SpotlightOverlay />
<span aria-hidden style={{"borderColor":"rgba(163,230,53,0.45)"}} className="pointer-events-none absolute -inset-px rounded-2xl border opacity-0 transition-opacity duration-200 group-hover:opacity-100"></span>
<div className="min-w-0"><p className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#6E7E91]">{"WHATSAPP DIRETO"}</p><p className="mt-0.5 truncate text-sm font-medium text-[#F0F4F8]">{"(11) 96839-4636"}</p></div>
<span className="shrink-0 text-xs font-semibold text-[#A3E635]">{"↗"}</span>
</a>
<a onMouseMove={handleSpotlightMove} href="mailto:elitetechpro10@gmail.com" className="etp-card group group/spot relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1">
<SpotlightOverlay />
<div className="min-w-0"><p className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#6E7E91]">{"E-MAIL COMERCIAL"}</p><p className="mt-0.5 truncate text-sm font-medium text-[#F0F4F8]">{"elitetechpro10@gmail.com"}</p></div>
<span className="shrink-0 text-xs font-semibold text-[#A3E635]">{"↗"}</span>
</a>
<a onMouseMove={handleSpotlightMove} href="https://www.linkedin.com/in/gustavo-pereira-587017154/" target="_blank" rel="noopener noreferrer" className="etp-card group group/spot relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1">
<SpotlightOverlay />
<div className="min-w-0"><p className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#6E7E91]">{"LINKEDIN"}</p><p className="mt-0.5 truncate text-sm font-medium text-[#F0F4F8]">{"linkedin.com/in/gustavo-pereira-587017154"}</p></div>
<span className="shrink-0 text-xs font-semibold text-[#A3E635]">{"↗"}</span>
</a>
<a onMouseMove={handleSpotlightMove} href="https://etpportfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="etp-card group group/spot relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1">
<SpotlightOverlay />
<div className="min-w-0"><p className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#6E7E91]">{"PORTFÓLIO"}</p><p className="mt-0.5 truncate text-sm font-medium text-[#F0F4F8]">{"etpportfolio.vercel.app"}</p></div>
<span className="shrink-0 text-xs font-semibold text-[#A3E635]">{"↗"}</span>
</a>
</div>
</Reveal>
</div>
</section>
</main>
<footer className="border-t border-[#161E28] bg-[#080B0F] py-8">
<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-xs text-[#6E7E91] sm:flex-row sm:px-6 lg:px-8">
<div className="flex items-center gap-2.5">
<span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F0F4F8] p-0.5"><img src="https://i.ibb.co/mVhKs04M/Design-sem-nome-1.png" alt="Elite Tech Pro" className="h-full w-full object-contain" /></span>
<span className="font-medium text-[#CBD5E1]">{"Elite Tech Pro • Gustavo Pereira"}</span>
<span >{"• © 2026"}</span>
</div>
<a href="#inicio" className="text-[#A3E635] hover:text-[#BEF264]">{"Voltar ao topo ↑"}</a>
</div>
</footer>
</>);}
