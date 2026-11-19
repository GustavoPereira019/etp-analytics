import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/")({head:()=>({meta:[{title:"ETP Analytics — Gustavo Pereira | BI & Automação"},{name:"description",content:"Inteligência de dados, dashboards Power BI e automações sob medida com Gustavo Pereira."},{property:"og:title",content:"ETP Analytics — Inteligência de Dados"},{property:"og:description",content:"Power BI, SQL, Python e n8n para decisões precisas na sua empresa."},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}]}),component:Index});
function Index(){
const [activeHero,setHero]=useState("financeiro"); const [activeCat,setCat]=useState("Todos");
const [modal,setModal]=useState<string|null>(null); const [modalTab,switchModalTab]=useState("overview");
const [proposal,setProposal]=useState("consultoria-recorrente");const [segment,setSegment]=useState("Financeiro");
const [briefing,setBriefing]=useState("");const [copied,setCopied]=useState(false);const previousFocus=useRef<HTMLElement|null>(null);
function closeModal(){setModal(null);previousFocus.current?.focus();}
function openModal(id:string){previousFocus.current=document.activeElement instanceof HTMLElement?document.activeElement:null;switchModalTab("overview");setModal(id);}
useEffect(()=>{if(!modal)return;const old=document.body.style.overflow;document.body.style.overflow="hidden";const dialog=document.querySelector<HTMLElement>('[role="dialog"]');dialog?.querySelector<HTMLElement>('button')?.focus();function key(e:KeyboardEvent){if(e.key==="Escape")closeModal();if(e.key==="Tab"){const items=Array.from(dialog?.querySelectorAll<HTMLElement>('button,a[href],iframe')??[]).filter(el=>el.getClientRects().length);const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}}document.addEventListener("keydown",key);return()=>{document.body.style.overflow=old;document.removeEventListener("keydown",key);};},[modal]);
function selectProposalAndScroll(id:string){setProposal(id);document.getElementById("contato")?.scrollIntoView({behavior:"smooth"});}
function selectSegmentAndScroll(title:string){setSegment(title);selectProposalAndScroll("projeto-pontual");}
function submitBriefing(e:FormEvent<HTMLFormElement>){e.preventDefault();const f=e.currentTarget;const value=(id:string)=>(f.querySelector<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>("#"+id)?.value??"");const sel=f.querySelector<HTMLSelectElement>("#f-proposal");setBriefing(["Olá, Gustavo / ETP Analytics! Gostaria de solicitar um diagnóstico / proposta:",`• Nome: ${value("f-name")}`,`• Empresa: ${value("f-company")}`,`• Contato: ${value("f-contact")}`,`• Modelo de interesse: ${sel?.selectedOptions[0]?.text??""}`,`• Área / Segmento principal: ${segment}`,value("f-challenge").trim()?`• Desafio atual: ${value("f-challenge").trim()}`:""].filter(Boolean).join("\n"));}
async function copyBriefing(){try{await navigator.clipboard.writeText(briefing);setCopied(true);setTimeout(()=>setCopied(false),2000);}catch{setCopied(false);}}
function resetBriefing(){setBriefing("");}
const heroButtons = ({"financeiro":(<> <Button type="button" className="cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors bg-[#A3E635] text-[#090C10] font-semibold" variant="imported" size="imported" onClick={(e) => { setHero('financeiro'); }}>{"Financeiro"}</Button><Button type="button" className="cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors text-[#8B9BB0] hover:text-[#E2E8F0]" variant="imported" size="imported" onClick={(e) => { setHero('comercial'); }}>{"Comercial"}</Button><Button type="button" className="cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors text-[#8B9BB0] hover:text-[#E2E8F0]" variant="imported" size="imported" onClick={(e) => { setHero('operacoes'); }}>{"Operações"}</Button> </>),"comercial":(<> <Button type="button" className="cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors text-[#8B9BB0] hover:text-[#E2E8F0]" variant="imported" size="imported" onClick={(e) => { setHero('financeiro'); }}>{"Financeiro"}</Button><Button type="button" className="cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors bg-[#A3E635] text-[#090C10] font-semibold" variant="imported" size="imported" onClick={(e) => { setHero('comercial'); }}>{"Comercial"}</Button><Button type="button" className="cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors text-[#8B9BB0] hover:text-[#E2E8F0]" variant="imported" size="imported" onClick={(e) => { setHero('operacoes'); }}>{"Operações"}</Button> </>),"operacoes":(<> <Button type="button" className="cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors text-[#8B9BB0] hover:text-[#E2E8F0]" variant="imported" size="imported" onClick={(e) => { setHero('financeiro'); }}>{"Financeiro"}</Button><Button type="button" className="cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors text-[#8B9BB0] hover:text-[#E2E8F0]" variant="imported" size="imported" onClick={(e) => { setHero('comercial'); }}>{"Comercial"}</Button><Button type="button" className="cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors bg-[#A3E635] text-[#090C10] font-semibold" variant="imported" size="imported" onClick={(e) => { setHero('operacoes'); }}>{"Operações"}</Button> </>)})[activeHero];
const heroKpis = ({"financeiro":(<> <div className="rounded-xl border border-[#1A232F] bg-[#111720] px-3 py-2.5"><p className="text-[10px] font-medium uppercase tracking-wider text-[#7D8C9F]">{"Receita Líquida"}</p><p className="font-mono-data mt-1 text-base font-semibold text-[#F0F4F8]">{"R$ 2,84M"}</p><p className="mt-0.5 text-[11px] font-medium text-[#A3E635]">{"↗ +18,4%"}</p></div><div className="rounded-xl border border-[#1A232F] bg-[#111720] px-3 py-2.5"><p className="text-[10px] font-medium uppercase tracking-wider text-[#7D8C9F]">{"Margem EBITDA"}</p><p className="font-mono-data mt-1 text-base font-semibold text-[#F0F4F8]">{"27,6%"}</p><p className="mt-0.5 text-[11px] font-medium text-[#A3E635]">{"↗ +3,2 pp"}</p></div><div className="rounded-xl border border-[#1A232F] bg-[#111720] px-3 py-2.5"><p className="text-[10px] font-medium uppercase tracking-wider text-[#7D8C9F]">{"Inadimplência"}</p><p className="font-mono-data mt-1 text-base font-semibold text-[#F0F4F8]">{"1,9%"}</p><p className="mt-0.5 text-[11px] font-medium text-[#A3E635]">{"↗ -0,8 pp"}</p></div> </>),"comercial":(<> <div className="rounded-xl border border-[#1A232F] bg-[#111720] px-3 py-2.5"><p className="text-[10px] font-medium uppercase tracking-wider text-[#7D8C9F]">{"Meta Atingida"}</p><p className="font-mono-data mt-1 text-base font-semibold text-[#F0F4F8]">{"114,2%"}</p><p className="mt-0.5 text-[11px] font-medium text-[#A3E635]">{"↗ +14,2%"}</p></div><div className="rounded-xl border border-[#1A232F] bg-[#111720] px-3 py-2.5"><p className="text-[10px] font-medium uppercase tracking-wider text-[#7D8C9F]">{"Ticket Médio"}</p><p className="font-mono-data mt-1 text-base font-semibold text-[#F0F4F8]">{"R$ 18,9k"}</p><p className="mt-0.5 text-[11px] font-medium text-[#A3E635]">{"↗ +9,6%"}</p></div><div className="rounded-xl border border-[#1A232F] bg-[#111720] px-3 py-2.5"><p className="text-[10px] font-medium uppercase tracking-wider text-[#7D8C9F]">{"Conversão"}</p><p className="font-mono-data mt-1 text-base font-semibold text-[#F0F4F8]">{"31,4%"}</p><p className="mt-0.5 text-[11px] font-medium text-[#A3E635]">{"↗ +4,1 pp"}</p></div> </>),"operacoes":(<> <div className="rounded-xl border border-[#1A232F] bg-[#111720] px-3 py-2.5"><p className="text-[10px] font-medium uppercase tracking-wider text-[#7D8C9F]">{"Entregas OTIF"}</p><p className="font-mono-data mt-1 text-base font-semibold text-[#F0F4F8]">{"96,8%"}</p><p className="mt-0.5 text-[11px] font-medium text-[#A3E635]">{"↗ +5,4 pp"}</p></div><div className="rounded-xl border border-[#1A232F] bg-[#111720] px-3 py-2.5"><p className="text-[10px] font-medium uppercase tracking-wider text-[#7D8C9F]">{"OEE Médio"}</p><p className="font-mono-data mt-1 text-base font-semibold text-[#F0F4F8]">{"84,5%"}</p><p className="mt-0.5 text-[11px] font-medium text-[#A3E635]">{"↗ +6,1 pp"}</p></div><div className="rounded-xl border border-[#1A232F] bg-[#111720] px-3 py-2.5"><p className="text-[10px] font-medium uppercase tracking-wider text-[#7D8C9F]">{"Horas Manuais"}</p><p className="font-mono-data mt-1 text-base font-semibold text-[#F0F4F8]">{"-72%"}</p><p className="mt-0.5 text-[11px] font-medium text-[#A3E635]">{"↗ Automação"}</p></div> </>)})[activeHero];
const heroBars = ({"financeiro":(<> <div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "54%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Jan"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "61%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Fev"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "58%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Mar"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "72%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Abr"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "69%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Mai"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "84%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Jun"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "79%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Jul"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "92%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Ago"}</span></div> </>),"comercial":(<> <div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "48%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Jan"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "52%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Fev"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "66%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Mar"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "63%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Abr"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "77%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Mai"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "81%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Jun"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "88%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Jul"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "95%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Ago"}</span></div> </>),"operacoes":(<> <div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "62%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Jan"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "68%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Fev"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "71%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Mar"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "74%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Abr"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "82%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Mai"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "86%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]/35"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Jun"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "91%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Jul"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-20 w-full items-end"><div style={{"height": "94%"}} className="bar-anim w-full rounded-t-sm bg-[#A3E635]"></div></div><span className="font-mono-data text-[9px] text-[#64748B]">{"Ago"}</span></div> </>)})[activeHero];
const heroTrend = ({"financeiro":(<> <defs ><linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#A3E635" stopOpacity="0.32"></stop><stop offset="100%" stopColor="#A3E635" stopOpacity="0"></stop></linearGradient></defs><polygon points="0,74 0.0,52.1 37.1,47.0 74.3,48.2 111.4,39.3 148.6,36.7 185.7,27.8 222.9,25.2 260.0,15.0 260,74" fill="url(#hg)"></polygon><polyline fill="none" stroke="#A3E635" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points="0.0,52.1 37.1,47.0 74.3,48.2 111.4,39.3 148.6,36.7 185.7,27.8 222.9,25.2 260.0,15.0"></polyline> </>),"comercial":(<> <defs ><linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#A3E635" stopOpacity="0.32"></stop><stop offset="100%" stopColor="#A3E635" stopOpacity="0"></stop></linearGradient></defs><polygon points="0,74 0.0,55.9 37.1,50.2 74.3,41.2 111.4,38.6 148.6,31.0 185.7,26.5 222.9,19.4 260.0,11.8 260,74" fill="url(#hg)"></polygon><polyline fill="none" stroke="#A3E635" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points="0.0,55.9 37.1,50.2 74.3,41.2 111.4,38.6 148.6,31.0 185.7,26.5 222.9,19.4 260.0,11.8"></polyline> </>),"operacoes":(<> <defs ><linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#A3E635" stopOpacity="0.32"></stop><stop offset="100%" stopColor="#A3E635" stopOpacity="0"></stop></linearGradient></defs><polygon points="0,74 0.0,44.4 37.1,41.8 74.3,37.4 111.4,34.2 148.6,27.1 185.7,23.3 222.9,17.5 260.0,13.0 260,74" fill="url(#hg)"></polygon><polyline fill="none" stroke="#A3E635" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points="0.0,44.4 37.1,41.8 74.3,37.4 111.4,34.2 148.6,27.1 185.7,23.3 222.9,17.5 260.0,13.0"></polyline> </>)})[activeHero];
const heroSubtitle = {"financeiro": "DRE Gerencial & Margem EBITDA", "comercial": "Funil de Vendas & Metas por Canal", "operacoes": "SLA Logístico, Frota & Eficiência"}[activeHero];
const heroUpdated = {"financeiro": "Atualizado via SQL • 08:00", "comercial": "Sincronizado com CRM • Tempo Real", "operacoes": "Pipeline Python + Power BI"}[activeHero];
const heroInsight = {"financeiro": "Fechamento gerencial automatizado reduziu em 14h/mês a consolidação de planilhas.", "comercial": "Alertas diários no WhatsApp via n8n aumentaram a cadência de follow-up da equipe.", "operacoes": "Monitoramento por rota identificou gargalos de descarga com economia mensal de 11%."}[activeHero];
const solutions = (<> <article className="flex flex-col justify-between bg-[#0D1218] p-6 transition-colors hover:bg-[#111821]"><div ><div className="flex items-center justify-between"><div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#223026] bg-[#131C16] font-mono-data text-xs font-bold text-[#A3E635]">{"01"}</div><span className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#A3E635]/90">{"Business Intelligence"}</span></div><h3 className="mt-5 text-lg font-semibold text-[#F0F4F8]">{"Power BI Enterprise"}</h3><p className="mt-2.5 text-sm leading-relaxed text-[#94A3B8]">{"Dashboards executivos e operacionais com modelagem Star Schema, DAX avançado e atualização automática em nuvem."}</p></div><div className="mt-6 border-t border-[#18212C] pt-4"><p className="text-xs font-medium text-[#CBD5E1]">{"Painéis prontos para diretoria, TVs e mobile"}</p></div></article><article className="flex flex-col justify-between bg-[#0D1218] p-6 transition-colors hover:bg-[#111821]"><div ><div className="flex items-center justify-between"><div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#223026] bg-[#131C16] font-mono-data text-xs font-bold text-[#A3E635]">{"02"}</div><span className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#A3E635]/90">{"Integração & Base Única"}</span></div><h3 className="mt-5 text-lg font-semibold text-[#F0F4F8]">{"SQL & Engenharia de Dados"}</h3><p className="mt-2.5 text-sm leading-relaxed text-[#94A3B8]">{"Conexão direta com ERPs, bancos relacionais e planilhas corporativas. Views otimizadas prontas para escalar seu BI."}</p></div><div className="mt-6 border-t border-[#18212C] pt-4"><p className="text-xs font-medium text-[#CBD5E1]">{"Fonte única da verdade sem divergências"}</p></div></article><article className="flex flex-col justify-between bg-[#0D1218] p-6 transition-colors hover:bg-[#111821]"><div ><div className="flex items-center justify-between"><div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#223026] bg-[#131C16] font-mono-data text-xs font-bold text-[#A3E635]">{"03"}</div><span className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#A3E635]/90">{"ETL & Inteligência"}</span></div><h3 className="mt-5 text-lg font-semibold text-[#F0F4F8]">{"Python & Analytics"}</h3><p className="mt-2.5 text-sm leading-relaxed text-[#94A3B8]">{"Rotinas automatizadas de extração, tratamento de grandes volumes e consolidação de múltiplos arquivos."}</p></div><div className="mt-6 border-t border-[#18212C] pt-4"><p className="text-xs font-medium text-[#CBD5E1]">{"Processamento rápido e auditável"}</p></div></article><article className="flex flex-col justify-between bg-[#0D1218] p-6 transition-colors hover:bg-[#111821]"><div ><div className="flex items-center justify-between"><div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#223026] bg-[#131C16] font-mono-data text-xs font-bold text-[#A3E635]">{"04"}</div><span className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#A3E635]/90">{"Eficiência Operacional"}</span></div><h3 className="mt-5 text-lg font-semibold text-[#F0F4F8]">{"n8n & Automação de Fluxos"}</h3><p className="mt-2.5 text-sm leading-relaxed text-[#94A3B8]">{"Orquestração de integrações entre CRM, ERP, APIs, e-mail e WhatsApp eliminando tarefas manuais repetitivas."}</p></div><div className="mt-6 border-t border-[#18212C] pt-4"><p className="text-xs font-medium text-[#CBD5E1]">{"Menos retrabalho e alertas em tempo real"}</p></div></article><article className="flex flex-col justify-between bg-[#0D1218] p-6 transition-colors hover:bg-[#111821]"><div ><div className="flex items-center justify-between"><div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#223026] bg-[#131C16] font-mono-data text-xs font-bold text-[#A3E635]">{"05"}</div><span className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#A3E635]/90">{"Modernização"}</span></div><h3 className="mt-5 text-lg font-semibold text-[#F0F4F8]">{"Excel Corporativo & Migração"}</h3><p className="mt-2.5 text-sm leading-relaxed text-[#94A3B8]">{"Reestruturação de planilhas críticas, padronização de controles financeiros e migração segura para BI."}</p></div><div className="mt-6 border-t border-[#18212C] pt-4"><p className="text-xs font-medium text-[#CBD5E1]">{"Fim das planilhas quebradas e duplicadas"}</p></div></article><article className="flex flex-col justify-between bg-[#0D1218] p-6 transition-colors hover:bg-[#111821]"><div ><div className="flex items-center justify-between"><div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#223026] bg-[#131C16] font-mono-data text-xs font-bold text-[#A3E635]">{"06"}</div><span className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#A3E635]/90">{"Design Executivo"}</span></div><h3 className="mt-5 text-lg font-semibold text-[#F0F4F8]">{"UI/UX de Dados no Figma"}</h3><p className="mt-2.5 text-sm leading-relaxed text-[#94A3B8]">{"Prototipação visual orientada à hierarquia de leitura. Dashboards que qualquer gestor entende em segundos."}</p></div><div className="mt-6 border-t border-[#18212C] pt-4"><p className="text-xs font-medium text-[#CBD5E1]">{"Identidade visual da sua marca aplicada ao BI"}</p></div></article> </>);
const filterButtons = (<> <Button type="button" className={activeCat === "Todos" ? "cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium transition-colors border-[#A3E635] bg-[#A3E635] text-[#090C10] font-semibold" : "cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium transition-colors border-[#1E2733] bg-[#0D1218] text-[#94A3B8] hover:border-[#304054] hover:text-white"} variant="imported" size="imported" onClick={(e) => { setCat('Todos'); }}>{"Todos"}</Button><Button type="button" className={activeCat === "Gestão & Finanças" ? "cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium transition-colors border-[#A3E635] bg-[#A3E635] text-[#090C10] font-semibold" : "cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium transition-colors border-[#1E2733] bg-[#0D1218] text-[#94A3B8] hover:border-[#304054] hover:text-white"} variant="imported" size="imported" onClick={(e) => { setCat('Gestão & Finanças'); }}>{"Gestão & Finanças"}</Button><Button type="button" className={activeCat === "Operações & Indústria" ? "cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium transition-colors border-[#A3E635] bg-[#A3E635] text-[#090C10] font-semibold" : "cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium transition-colors border-[#1E2733] bg-[#0D1218] text-[#94A3B8] hover:border-[#304054] hover:text-white"} variant="imported" size="imported" onClick={(e) => { setCat('Operações & Indústria'); }}>{"Operações & Indústria"}</Button><Button type="button" className={activeCat === "Comercial & Pessoas" ? "cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium transition-colors border-[#A3E635] bg-[#A3E635] text-[#090C10] font-semibold" : "cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium transition-colors border-[#1E2733] bg-[#0D1218] text-[#94A3B8] hover:border-[#304054] hover:text-white"} variant="imported" size="imported" onClick={(e) => { setCat('Comercial & Pessoas'); }}>{"Comercial & Pessoas"}</Button><Button type="button" className={activeCat === "Saúde" ? "cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium transition-colors border-[#A3E635] bg-[#A3E635] text-[#090C10] font-semibold" : "cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium transition-colors border-[#1E2733] bg-[#0D1218] text-[#94A3B8] hover:border-[#304054] hover:text-white"} variant="imported" size="imported" onClick={(e) => { setCat('Saúde'); }}>{"Saúde"}</Button> </>);
const dashboardCards = (<> {(activeCat === "Todos" || activeCat === "Operações & Indústria") && (<article className="etp-card group flex cursor-pointer flex-col overflow-hidden rounded-2xl text-left" onClick={(e) => { openModal('logistica'); }} role="button" tabIndex={0} onKeyDown={(e)=>{if(e.key === "Enter" || e.key === " "){e.preventDefault();openModal('logistica');}}}>
<div className="border-b border-[#19222D] bg-[#0A0E13] p-4">
<div className="grid grid-cols-3 gap-2"><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"OTIF"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"96,4%"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Custo/Km"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"R$ 3,42"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Entregas"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"4.820"}</p></div></div>
<div className="mt-2.5 grid grid-cols-12 gap-2">
<div className="col-span-7 flex h-16 items-end justify-between gap-1 rounded-lg border border-[#17202B] bg-[#0D1218] px-2.5 py-2"><span style={{"height": "55%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "72%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "91%"}} className="w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "100%"}} className="w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "77%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "51%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "64%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "79%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span></div>
<div className="col-span-5 flex h-16 items-end rounded-lg border border-[#17202B] bg-[#0D1218] px-2 py-1.5"><svg viewBox="0 0 110 44" className="h-11 w-full overflow-visible"><polygon points="0,44 0.0,35.5 22.0,31.2 44.0,26.2 66.0,28.3 88.0,19.7 110.0,15.4 110,44" fill="#A3E635" fillOpacity="0.18"></polygon><polyline fill="none" stroke="#A3E635" strokeWidth="1.8" strokeLinecap="round" points="0.0,35.5 22.0,31.2 44.0,26.2 66.0,28.3 88.0,19.7 110.0,15.4"></polyline></svg></div>
</div>
</div>
<div className="flex flex-1 flex-col justify-between p-5">
<div >
<div className="flex items-center justify-between gap-2"><span className="font-mono-data text-[10px] uppercase tracking-[0.16em] text-[#7D8C9F]">{"LOGÍSTICA"}</span><span className="font-mono-data rounded border border-[#233322] bg-[#111B13] px-2 py-0.5 text-[9px] font-medium text-[#A3E635]">{"Power BI"}</span></div>
<h3 className="mt-2 text-lg font-semibold text-[#F0F4F8]">{"Logística"}</h3>
<p className="mt-1.5 text-xs leading-relaxed text-[#94A3B8]">{"Frota, entregas no prazo (OTIF), SLA e custo operacional por rota."}</p>
</div>
<div className="mt-4 flex items-center justify-between gap-2 border-t border-[#18212C] pt-3.5">
<span className="text-xs font-medium text-[#A3E635] group-hover:underline">{"Ver painel ao vivo ↗"}</span>
<a href="https://app.powerbi.com/reportEmbed?reportId=7af30bbf-9e2a-4329-854b-b0880e4baabb&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" target="_blank" rel="noreferrer" className="rounded-md border border-[#1F2A37] bg-[#111720] px-2 py-1 text-[10px] font-medium text-[#94A3B8] hover:border-[#A3E635]/50 hover:text-white" onClick={(e) => { e.stopPropagation(); }}>{"Abrir link ↗"}</a>
</div>
</div>
</article>)}{(activeCat === "Todos" || activeCat === "Comercial & Pessoas") && (<article className="etp-card group flex cursor-pointer flex-col overflow-hidden rounded-2xl text-left" onClick={(e) => { openModal('rh'); }} role="button" tabIndex={0} onKeyDown={(e)=>{if(e.key === "Enter" || e.key === " "){e.preventDefault();openModal('rh');}}}>
<div className="border-b border-[#19222D] bg-[#0A0E13] p-4">
<div className="grid grid-cols-3 gap-2"><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Headcount"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"412"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Turnover"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"2,4%"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Absenteísmo"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"1,8%"}</p></div></div>
<div className="mt-2.5 grid grid-cols-12 gap-2">
<div className="col-span-7 flex h-16 items-end justify-between gap-1 rounded-lg border border-[#17202B] bg-[#0D1218] px-2.5 py-2"><span style={{"height": "89%"}} className="w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "48%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "75%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "61%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "100%"}} className="w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "69%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "80%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "66%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span></div>
<div className="col-span-5 flex h-16 items-end rounded-lg border border-[#17202B] bg-[#0D1218] px-2 py-1.5"><svg viewBox="0 0 110 44" className="h-11 w-full overflow-visible"><polygon points="0,44 0.0,33.4 22.0,31.9 44.0,29.0 66.0,23.3 88.0,25.4 110.0,17.5 110,44" fill="#A3E635" fillOpacity="0.18"></polygon><polyline fill="none" stroke="#A3E635" strokeWidth="1.8" strokeLinecap="round" points="0.0,33.4 22.0,31.9 44.0,29.0 66.0,23.3 88.0,25.4 110.0,17.5"></polyline></svg></div>
</div>
</div>
<div className="flex flex-1 flex-col justify-between p-5">
<div >
<div className="flex items-center justify-between gap-2"><span className="font-mono-data text-[10px] uppercase tracking-[0.16em] text-[#7D8C9F]">{"GENTE & GESTÃO"}</span><span className="font-mono-data rounded border border-[#233322] bg-[#111B13] px-2 py-0.5 text-[9px] font-medium text-[#A3E635]">{"Power BI"}</span></div>
<h3 className="mt-2 text-lg font-semibold text-[#F0F4F8]">{"Recursos Humanos"}</h3>
<p className="mt-1.5 text-xs leading-relaxed text-[#94A3B8]">{"Turnover, headcount, absenteísmo, folha salarial e retenção."}</p>
</div>
<div className="mt-4 flex items-center justify-between gap-2 border-t border-[#18212C] pt-3.5">
<span className="text-xs font-medium text-[#A3E635] group-hover:underline">{"Ver painel ao vivo ↗"}</span>
<a href="https://app.powerbi.com/reportEmbed?reportId=03354214-1b1c-4ebe-aa2f-2583c2151eb4&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" target="_blank" rel="noreferrer" className="rounded-md border border-[#1F2A37] bg-[#111720] px-2 py-1 text-[10px] font-medium text-[#94A3B8] hover:border-[#A3E635]/50 hover:text-white" onClick={(e) => { e.stopPropagation(); }}>{"Abrir link ↗"}</a>
</div>
</div>
</article>)}{(activeCat === "Todos" || activeCat === "Saúde") && (<article className="etp-card group flex cursor-pointer flex-col overflow-hidden rounded-2xl text-left" onClick={(e) => { openModal('hospitalar'); }} role="button" tabIndex={0} onKeyDown={(e)=>{if(e.key === "Enter" || e.key === " "){e.preventDefault();openModal('hospitalar');}}}>
<div className="border-b border-[#19222D] bg-[#0A0E13] p-4">
<div className="grid grid-cols-3 gap-2"><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Ocupação"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"87,2%"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Média Perm."}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"4,1 d"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"SLA Triagem"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"94%"}</p></div></div>
<div className="mt-2.5 grid grid-cols-12 gap-2">
<div className="col-span-7 flex h-16 items-end justify-between gap-1 rounded-lg border border-[#17202B] bg-[#0D1218] px-2.5 py-2"><span style={{"height": "51%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "78%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "91%"}} className="w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "71%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "100%"}} className="w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "84%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "93%"}} className="w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "76%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span></div>
<div className="col-span-5 flex h-16 items-end rounded-lg border border-[#17202B] bg-[#0D1218] px-2 py-1.5"><svg viewBox="0 0 110 44" className="h-11 w-full overflow-visible"><polygon points="0,44 0.0,30.5 22.0,25.4 44.0,24.0 66.0,19.7 88.0,21.1 110.0,14.6 110,44" fill="#A3E635" fillOpacity="0.18"></polygon><polyline fill="none" stroke="#A3E635" strokeWidth="1.8" strokeLinecap="round" points="0.0,30.5 22.0,25.4 44.0,24.0 66.0,19.7 88.0,21.1 110.0,14.6"></polyline></svg></div>
</div>
</div>
<div className="flex flex-1 flex-col justify-between p-5">
<div >
<div className="flex items-center justify-between gap-2"><span className="font-mono-data text-[10px] uppercase tracking-[0.16em] text-[#7D8C9F]">{"SAÚDE"}</span><span className="font-mono-data rounded border border-[#233322] bg-[#111B13] px-2 py-0.5 text-[9px] font-medium text-[#A3E635]">{"Power BI"}</span></div>
<h3 className="mt-2 text-lg font-semibold text-[#F0F4F8]">{"Hospitalar"}</h3>
<p className="mt-1.5 text-xs leading-relaxed text-[#94A3B8]">{"Ocupação de leitos, giro hospitalar, glosas e indicadores clínicos."}</p>
</div>
<div className="mt-4 flex items-center justify-between gap-2 border-t border-[#18212C] pt-3.5">
<span className="text-xs font-medium text-[#A3E635] group-hover:underline">{"Ver painel ao vivo ↗"}</span>
<a href="https://app.powerbi.com/reportEmbed?reportId=f3c9dc29-80ac-46ba-a457-1038e4fec79e&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" target="_blank" rel="noreferrer" className="rounded-md border border-[#1F2A37] bg-[#111720] px-2 py-1 text-[10px] font-medium text-[#94A3B8] hover:border-[#A3E635]/50 hover:text-white" onClick={(e) => { e.stopPropagation(); }}>{"Abrir link ↗"}</a>
</div>
</div>
</article>)}{(activeCat === "Todos" || activeCat === "Operações & Indústria") && (<article className="etp-card group flex cursor-pointer flex-col overflow-hidden rounded-2xl text-left" onClick={(e) => { openModal('producao'); }} role="button" tabIndex={0} onKeyDown={(e)=>{if(e.key === "Enter" || e.key === " "){e.preventDefault();openModal('producao');}}}>
<div className="border-b border-[#19222D] bg-[#0A0E13] p-4">
<div className="grid grid-cols-3 gap-2"><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"OEE Global"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"84,6%"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Refugo"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"1,3%"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Disponib."}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"92,1%"}</p></div></div>
<div className="mt-2.5 grid grid-cols-12 gap-2">
<div className="col-span-7 flex h-16 items-end justify-between gap-1 rounded-lg border border-[#17202B] bg-[#0D1218] px-2.5 py-2"><span style={{"height": "70%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "64%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "79%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "53%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "92%"}} className="w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "73%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "100%"}} className="w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "86%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span></div>
<div className="col-span-5 flex h-16 items-end rounded-lg border border-[#17202B] bg-[#0D1218] px-2 py-1.5"><svg viewBox="0 0 110 44" className="h-11 w-full overflow-visible"><polygon points="0,44 0.0,34.1 22.0,29.8 44.0,24.7 66.0,22.6 88.0,17.5 110.0,16.1 110,44" fill="#A3E635" fillOpacity="0.18"></polygon><polyline fill="none" stroke="#A3E635" strokeWidth="1.8" strokeLinecap="round" points="0.0,34.1 22.0,29.8 44.0,24.7 66.0,22.6 88.0,17.5 110.0,16.1"></polyline></svg></div>
</div>
</div>
<div className="flex flex-1 flex-col justify-between p-5">
<div >
<div className="flex items-center justify-between gap-2"><span className="font-mono-data text-[10px] uppercase tracking-[0.16em] text-[#7D8C9F]">{"INDÚSTRIA"}</span><span className="font-mono-data rounded border border-[#233322] bg-[#111B13] px-2 py-0.5 text-[9px] font-medium text-[#A3E635]">{"Power BI"}</span></div>
<h3 className="mt-2 text-lg font-semibold text-[#F0F4F8]">{"Produção"}</h3>
<p className="mt-1.5 text-xs leading-relaxed text-[#94A3B8]">{"OEE global, refugos, paradas de máquina e eficiência por turno."}</p>
</div>
<div className="mt-4 flex items-center justify-between gap-2 border-t border-[#18212C] pt-3.5">
<span className="text-xs font-medium text-[#A3E635] group-hover:underline">{"Ver painel ao vivo ↗"}</span>
<a href="https://app.powerbi.com/reportEmbed?reportId=40849204-011c-49b7-9a58-7af3e7dc1501&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" target="_blank" rel="noreferrer" className="rounded-md border border-[#1F2A37] bg-[#111720] px-2 py-1 text-[10px] font-medium text-[#94A3B8] hover:border-[#A3E635]/50 hover:text-white" onClick={(e) => { e.stopPropagation(); }}>{"Abrir link ↗"}</a>
</div>
</div>
</article>)}{(activeCat === "Todos" || activeCat === "Comercial & Pessoas") && (<article className="etp-card group flex cursor-pointer flex-col overflow-hidden rounded-2xl text-left" onClick={(e) => { openModal('vendas'); }} role="button" tabIndex={0} onKeyDown={(e)=>{if(e.key === "Enter" || e.key === " "){e.preventDefault();openModal('vendas');}}}>
<div className="border-b border-[#19222D] bg-[#0A0E13] p-4">
<div className="grid grid-cols-3 gap-2"><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Faturamento"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"R$ 1,92M"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Meta"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"112%"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Conversão"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"29,8%"}</p></div></div>
<div className="mt-2.5 grid grid-cols-12 gap-2">
<div className="col-span-7 flex h-16 items-end justify-between gap-1 rounded-lg border border-[#17202B] bg-[#0D1218] px-2.5 py-2"><span style={{"height": "96%"}} className="w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "67%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "59%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "100%"}} className="w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "74%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "91%"}} className="w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "61%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "48%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span></div>
<div className="col-span-5 flex h-16 items-end rounded-lg border border-[#17202B] bg-[#0D1218] px-2 py-1.5"><svg viewBox="0 0 110 44" className="h-11 w-full overflow-visible"><polygon points="0,44 0.0,34.8 22.0,28.3 44.0,25.4 66.0,19.7 88.0,15.4 110.0,10.3 110,44" fill="#A3E635" fillOpacity="0.18"></polygon><polyline fill="none" stroke="#A3E635" strokeWidth="1.8" strokeLinecap="round" points="0.0,34.8 22.0,28.3 44.0,25.4 66.0,19.7 88.0,15.4 110.0,10.3"></polyline></svg></div>
</div>
</div>
<div className="flex flex-1 flex-col justify-between p-5">
<div >
<div className="flex items-center justify-between gap-2"><span className="font-mono-data text-[10px] uppercase tracking-[0.16em] text-[#7D8C9F]">{"COMERCIAL"}</span><span className="font-mono-data rounded border border-[#233322] bg-[#111B13] px-2 py-0.5 text-[9px] font-medium text-[#A3E635]">{"Power BI"}</span></div>
<h3 className="mt-2 text-lg font-semibold text-[#F0F4F8]">{"Vendas"}</h3>
<p className="mt-1.5 text-xs leading-relaxed text-[#94A3B8]">{"Funil comercial, metas, ticket médio, curva ABC e vendedores."}</p>
</div>
<div className="mt-4 flex items-center justify-between gap-2 border-t border-[#18212C] pt-3.5">
<span className="text-xs font-medium text-[#A3E635] group-hover:underline">{"Ver painel ao vivo ↗"}</span>
<a href="https://app.powerbi.com/reportEmbed?reportId=e3b8491b-9d8c-4de5-b39b-f0ba9855d0a6&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" target="_blank" rel="noreferrer" className="rounded-md border border-[#1F2A37] bg-[#111720] px-2 py-1 text-[10px] font-medium text-[#94A3B8] hover:border-[#A3E635]/50 hover:text-white" onClick={(e) => { e.stopPropagation(); }}>{"Abrir link ↗"}</a>
</div>
</div>
</article>)}{(activeCat === "Todos" || activeCat === "Comercial & Pessoas") && (<article className="etp-card group flex cursor-pointer flex-col overflow-hidden rounded-2xl text-left" onClick={(e) => { openModal('telemarketing'); }} role="button" tabIndex={0} onKeyDown={(e)=>{if(e.key === "Enter" || e.key === " "){e.preventDefault();openModal('telemarketing');}}}>
<div className="border-b border-[#19222D] bg-[#0A0E13] p-4">
<div className="grid grid-cols-3 gap-2"><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"TMA"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"3m 42s"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Nível Serv."}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"91,5%"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Conversão"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"18,4%"}</p></div></div>
<div className="mt-2.5 grid grid-cols-12 gap-2">
<div className="col-span-7 flex h-16 items-end justify-between gap-1 rounded-lg border border-[#17202B] bg-[#0D1218] px-2.5 py-2"><span style={{"height": "54%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "83%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "91%"}} className="w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "67%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "100%"}} className="w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "87%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "78%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "70%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span></div>
<div className="col-span-5 flex h-16 items-end rounded-lg border border-[#17202B] bg-[#0D1218] px-2 py-1.5"><svg viewBox="0 0 110 44" className="h-11 w-full overflow-visible"><polygon points="0,44 0.0,29.8 22.0,26.9 44.0,28.3 66.0,21.8 88.0,19.0 110.0,13.9 110,44" fill="#A3E635" fillOpacity="0.18"></polygon><polyline fill="none" stroke="#A3E635" strokeWidth="1.8" strokeLinecap="round" points="0.0,29.8 22.0,26.9 44.0,28.3 66.0,21.8 88.0,19.0 110.0,13.9"></polyline></svg></div>
</div>
</div>
<div className="flex flex-1 flex-col justify-between p-5">
<div >
<div className="flex items-center justify-between gap-2"><span className="font-mono-data text-[10px] uppercase tracking-[0.16em] text-[#7D8C9F]">{"CONTACT CENTER"}</span><span className="font-mono-data rounded border border-[#233322] bg-[#111B13] px-2 py-0.5 text-[9px] font-medium text-[#A3E635]">{"Power BI"}</span></div>
<h3 className="mt-2 text-lg font-semibold text-[#F0F4F8]">{"Telemarketing"}</h3>
<p className="mt-1.5 text-xs leading-relaxed text-[#94A3B8]">{"TMA, taxa de conversão, nível de serviço e produtividade."}</p>
</div>
<div className="mt-4 flex items-center justify-between gap-2 border-t border-[#18212C] pt-3.5">
<span className="text-xs font-medium text-[#A3E635] group-hover:underline">{"Ver painel ao vivo ↗"}</span>
<a href="https://app.powerbi.com/reportEmbed?reportId=6db77ebf-cd48-4903-94fc-e87710b5e195&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" target="_blank" rel="noreferrer" className="rounded-md border border-[#1F2A37] bg-[#111720] px-2 py-1 text-[10px] font-medium text-[#94A3B8] hover:border-[#A3E635]/50 hover:text-white" onClick={(e) => { e.stopPropagation(); }}>{"Abrir link ↗"}</a>
</div>
</div>
</article>)}{(activeCat === "Todos" || activeCat === "Gestão & Finanças") && (<article className="etp-card group flex cursor-pointer flex-col overflow-hidden rounded-2xl text-left" onClick={(e) => { openModal('obra-financas'); }} role="button" tabIndex={0} onKeyDown={(e)=>{if(e.key === "Enter" || e.key === " "){e.preventDefault();openModal('obra-financas');}}}>
<div className="border-b border-[#19222D] bg-[#0A0E13] p-4">
<div className="grid grid-cols-3 gap-2"><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Avanço Fís."}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"68,5%"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Desvio Orç."}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"-1,4%"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Medições"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"R$ 4,6M"}</p></div></div>
<div className="mt-2.5 grid grid-cols-12 gap-2">
<div className="col-span-7 flex h-16 items-end justify-between gap-1 rounded-lg border border-[#17202B] bg-[#0D1218] px-2.5 py-2"><span style={{"height": "93%"}} className="w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "84%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "77%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "68%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "59%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "50%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "100%"}} className="w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "89%"}} className="w-full rounded-t-[2px] bg-[#A3E635]"></span></div>
<div className="col-span-5 flex h-16 items-end rounded-lg border border-[#17202B] bg-[#0D1218] px-2 py-1.5"><svg viewBox="0 0 110 44" className="h-11 w-full overflow-visible"><polygon points="0,44 0.0,36.2 22.0,31.9 44.0,26.9 66.0,21.8 88.0,19.0 110.0,16.8 110,44" fill="#A3E635" fillOpacity="0.18"></polygon><polyline fill="none" stroke="#A3E635" strokeWidth="1.8" strokeLinecap="round" points="0.0,36.2 22.0,31.9 44.0,26.9 66.0,21.8 88.0,19.0 110.0,16.8"></polyline></svg></div>
</div>
</div>
<div className="flex flex-1 flex-col justify-between p-5">
<div >
<div className="flex items-center justify-between gap-2"><span className="font-mono-data text-[10px] uppercase tracking-[0.16em] text-[#7D8C9F]">{"ENGENHARIA"}</span><span className="font-mono-data rounded border border-[#233322] bg-[#111B13] px-2 py-0.5 text-[9px] font-medium text-[#A3E635]">{"Power BI"}</span></div>
<h3 className="mt-2 text-lg font-semibold text-[#F0F4F8]">{"Evolução de Obra & Finanças"}</h3>
<p className="mt-1.5 text-xs leading-relaxed text-[#94A3B8]">{"Cronograma físico-financeiro, previsto × realizado e desvios."}</p>
</div>
<div className="mt-4 flex items-center justify-between gap-2 border-t border-[#18212C] pt-3.5">
<span className="text-xs font-medium text-[#A3E635] group-hover:underline">{"Ver painel ao vivo ↗"}</span>
<a href="https://app.powerbi.com/reportEmbed?reportId=aff9e01d-61ed-4064-99a9-9cc088eb8129&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" target="_blank" rel="noreferrer" className="rounded-md border border-[#1F2A37] bg-[#111720] px-2 py-1 text-[10px] font-medium text-[#94A3B8] hover:border-[#A3E635]/50 hover:text-white" onClick={(e) => { e.stopPropagation(); }}>{"Abrir link ↗"}</a>
</div>
</div>
</article>)}{(activeCat === "Todos" || activeCat === "Operações & Indústria") && (<article className="etp-card group flex cursor-pointer flex-col overflow-hidden rounded-2xl text-left" onClick={(e) => { openModal('operacional'); }} role="button" tabIndex={0} onKeyDown={(e)=>{if(e.key === "Enter" || e.key === " "){e.preventDefault();openModal('operacional');}}}>
<div className="border-b border-[#19222D] bg-[#0A0E13] p-4">
<div className="grid grid-cols-3 gap-2"><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"SLA Interno"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"95,2%"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Backlog"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"34"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Eficiência"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"89%"}</p></div></div>
<div className="mt-2.5 grid grid-cols-12 gap-2">
<div className="col-span-7 flex h-16 items-end justify-between gap-1 rounded-lg border border-[#17202B] bg-[#0D1218] px-2.5 py-2"><span style={{"height": "54%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "63%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "71%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "76%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "80%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "85%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "90%"}} className="w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "100%"}} className="w-full rounded-t-[2px] bg-[#A3E635]"></span></div>
<div className="col-span-5 flex h-16 items-end rounded-lg border border-[#17202B] bg-[#0D1218] px-2 py-1.5"><svg viewBox="0 0 110 44" className="h-11 w-full overflow-visible"><polygon points="0,44 0.0,33.4 22.0,29.8 44.0,26.2 66.0,23.3 88.0,18.2 110.0,13.2 110,44" fill="#A3E635" fillOpacity="0.18"></polygon><polyline fill="none" stroke="#A3E635" strokeWidth="1.8" strokeLinecap="round" points="0.0,33.4 22.0,29.8 44.0,26.2 66.0,23.3 88.0,18.2 110.0,13.2"></polyline></svg></div>
</div>
</div>
<div className="flex flex-1 flex-col justify-between p-5">
<div >
<div className="flex items-center justify-between gap-2"><span className="font-mono-data text-[10px] uppercase tracking-[0.16em] text-[#7D8C9F]">{"GESTÃO"}</span><span className="font-mono-data rounded border border-[#233322] bg-[#111B13] px-2 py-0.5 text-[9px] font-medium text-[#A3E635]">{"Power BI"}</span></div>
<h3 className="mt-2 text-lg font-semibold text-[#F0F4F8]">{"Operacional"}</h3>
<p className="mt-1.5 text-xs leading-relaxed text-[#94A3B8]">{"Indicadores de rotina, produtividade de equipes, SLAs e metas."}</p>
</div>
<div className="mt-4 flex items-center justify-between gap-2 border-t border-[#18212C] pt-3.5">
<span className="text-xs font-medium text-[#A3E635] group-hover:underline">{"Ver painel ao vivo ↗"}</span>
<a href="https://app.powerbi.com/reportEmbed?reportId=573585de-6b23-4e8c-999c-e6d83f0c3915&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" target="_blank" rel="noreferrer" className="rounded-md border border-[#1F2A37] bg-[#111720] px-2 py-1 text-[10px] font-medium text-[#94A3B8] hover:border-[#A3E635]/50 hover:text-white" onClick={(e) => { e.stopPropagation(); }}>{"Abrir link ↗"}</a>
</div>
</div>
</article>)}{(activeCat === "Todos" || activeCat === "Gestão & Finanças") && (<article className="etp-card group flex cursor-pointer flex-col overflow-hidden rounded-2xl text-left" onClick={(e) => { openModal('financeiro'); }} role="button" tabIndex={0} onKeyDown={(e)=>{if(e.key === "Enter" || e.key === " "){e.preventDefault();openModal('financeiro');}}}>
<div className="border-b border-[#19222D] bg-[#0A0E13] p-4">
<div className="grid grid-cols-3 gap-2"><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"EBITDA"}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"26,8%"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Caixa Proj."}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"R$ 890k"}</p></div><div className="rounded-lg border border-[#17202B] bg-[#0F151C] px-2.5 py-2"><p className="truncate text-[9px] uppercase tracking-wider text-[#6E7E91]">{"Margem Líq."}</p><p className="font-mono-data mt-0.5 truncate text-xs font-semibold text-[#E2E8F0]">{"19,4%"}</p></div></div>
<div className="mt-2.5 grid grid-cols-12 gap-2">
<div className="col-span-7 flex h-16 items-end justify-between gap-1 rounded-lg border border-[#17202B] bg-[#0D1218] px-2.5 py-2"><span style={{"height": "70%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "78%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "100%"}} className="w-full rounded-t-[2px] bg-[#A3E635]"></span><span style={{"height": "59%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "67%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "83%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "87%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span><span style={{"height": "76%"}} className="w-full rounded-t-[2px] bg-[#A3E635]/35"></span></div>
<div className="col-span-5 flex h-16 items-end rounded-lg border border-[#17202B] bg-[#0D1218] px-2 py-1.5"><svg viewBox="0 0 110 44" className="h-11 w-full overflow-visible"><polygon points="0,44 0.0,32.6 22.0,27.6 44.0,24.7 66.0,20.4 88.0,17.5 110.0,11.8 110,44" fill="#A3E635" fillOpacity="0.18"></polygon><polyline fill="none" stroke="#A3E635" strokeWidth="1.8" strokeLinecap="round" points="0.0,32.6 22.0,27.6 44.0,24.7 66.0,20.4 88.0,17.5 110.0,11.8"></polyline></svg></div>
</div>
</div>
<div className="flex flex-1 flex-col justify-between p-5">
<div >
<div className="flex items-center justify-between gap-2"><span className="font-mono-data text-[10px] uppercase tracking-[0.16em] text-[#7D8C9F]">{"FINANÇAS"}</span><span className="font-mono-data rounded border border-[#233322] bg-[#111B13] px-2 py-0.5 text-[9px] font-medium text-[#A3E635]">{"Power BI"}</span></div>
<h3 className="mt-2 text-lg font-semibold text-[#F0F4F8]">{"Financeiro"}</h3>
<p className="mt-1.5 text-xs leading-relaxed text-[#94A3B8]">{"DRE gerencial, fluxo de caixa projetado, margens e EBITDA."}</p>
</div>
<div className="mt-4 flex items-center justify-between gap-2 border-t border-[#18212C] pt-3.5">
<span className="text-xs font-medium text-[#A3E635] group-hover:underline">{"Ver painel ao vivo ↗"}</span>
<a href="https://app.powerbi.com/reportEmbed?reportId=fe422572-a98f-401d-91d3-2f5feff3e8d9&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" target="_blank" rel="noreferrer" className="rounded-md border border-[#1F2A37] bg-[#111720] px-2 py-1 text-[10px] font-medium text-[#94A3B8] hover:border-[#A3E635]/50 hover:text-white" onClick={(e) => { e.stopPropagation(); }}>{"Abrir link ↗"}</a>
</div>
</div>
</article>)} </>);
const proposals = (<> 
<article className="flex flex-col justify-between rounded-2xl border p-6 sm:p-7 border-[#1E2733] bg-[#0E1319]">
<div >
<div className="flex items-center justify-between"><span className="font-mono-data text-[10px] uppercase tracking-[0.18em] text-[#8B9BB0]">{"PROPOSTA 01"}</span></div>
<h3 className="mt-3 text-xl font-semibold text-[#F0F4F8]">{"Projeto Pontual de BI"}</h3>
<p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">{"Dashboard sob medida do zero até a publicação em nuvem."}</p>
<div className="mt-5 space-y-1 border-y border-[#1C2530] py-4"><p className="text-xs font-semibold text-[#E2E8F0]"><span className="text-[#A3E635]">{"◷"}</span>{" Entrega em 2 a 4 semanas"}</p><p className="text-xs text-[#7D8C9F]">{"Escopo fechado • Pagamento por entrega"}</p></div>
<p className="mt-4 text-xs leading-relaxed text-[#94A3B8]"><strong className="text-[#CBD5E1]">{"Ideal para: "}</strong>{"Empresas que precisam resolver uma área crítica rapidamente (ex: Financeiro, Vendas ou Logística)."}</p>
<ul className="mt-5 space-y-2.5"><li className="flex items-start gap-2 text-xs text-[#CBD5E1]"><span className="text-[#A3E635]">{"✓"}</span><span >{"Diagnóstico e mapeamento de KPIs estratégicos"}</span></li><li className="flex items-start gap-2 text-xs text-[#CBD5E1]"><span className="text-[#A3E635]">{"✓"}</span><span >{"Conexão com ERP, SQL ou Excel"}</span></li><li className="flex items-start gap-2 text-xs text-[#CBD5E1]"><span className="text-[#A3E635]">{"✓"}</span><span >{"Protótipo visual exclusivo no Figma"}</span></li><li className="flex items-start gap-2 text-xs text-[#CBD5E1]"><span className="text-[#A3E635]">{"✓"}</span><span >{"Desenvolvimento completo em Power BI em nuvem"}</span></li><li className="flex items-start gap-2 text-xs text-[#CBD5E1]"><span className="text-[#A3E635]">{"✓"}</span><span >{"Treinamento da equipe + documentação técnica"}</span></li></ul>
</div>
<Button type="button" className="mt-7 w-full cursor-pointer rounded-full px-5 py-3 text-xs font-semibold transition-colors border border-[#2A3747] bg-[#131B24] text-[#F0F4F8] hover:border-[#A3E635]/60 hover:text-[#A3E635]" variant="imported" size="imported" onClick={(e) => { selectProposalAndScroll('projeto-pontual'); }}>{"Solicitar Proposta Pontual →"}</Button>
</article>
<article className="flex flex-col justify-between rounded-2xl border p-6 sm:p-7 border-[#A3E635]/55 bg-[#101715]">
<div >
<div className="flex items-center justify-between"><span className="font-mono-data text-[10px] uppercase tracking-[0.18em] text-[#8B9BB0]">{"PROPOSTA 02"}</span><span className="rounded-full bg-[#A3E635] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#090C10]">{"Mais Escolhido"}</span></div>
<h3 className="mt-3 text-xl font-semibold text-[#F0F4F8]">{"Consultoria & BI Recorrente"}</h3>
<p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">{"Seu departamento de Inteligência de Dados sob demanda, mês a mês."}</p>
<div className="mt-5 space-y-1 border-y border-[#1C2530] py-4"><p className="text-xs font-semibold text-[#E2E8F0]"><span className="text-[#A3E635]">{"◷"}</span>{" Evolução contínua • SLA prioritário"}</p><p className="text-xs text-[#7D8C9F]">{"Contrato mensal previsível"}</p></div>
<p className="mt-4 text-xs leading-relaxed text-[#94A3B8]"><strong className="text-[#CBD5E1]">{"Ideal para: "}</strong>{"Empresas em crescimento que desejam estruturar múltiplos setores e evoluir continuamente com dados."}</p>
<ul className="mt-5 space-y-2.5"><li className="flex items-start gap-2 text-xs text-[#CBD5E1]"><span className="text-[#A3E635]">{"✓"}</span><span >{"Criação contínua de novos dashboards por setor"}</span></li><li className="flex items-start gap-2 text-xs text-[#CBD5E1]"><span className="text-[#A3E635]">{"✓"}</span><span >{"Manutenção e governança de pipelines SQL / Power BI"}</span></li><li className="flex items-start gap-2 text-xs text-[#CBD5E1]"><span className="text-[#A3E635]">{"✓"}</span><span >{"Reuniões mensais de análise com a diretoria"}</span></li><li className="flex items-start gap-2 text-xs text-[#CBD5E1]"><span className="text-[#A3E635]">{"✓"}</span><span >{"Suporte rápido para novos KPIs e regras"}</span></li><li className="flex items-start gap-2 text-xs text-[#CBD5E1]"><span className="text-[#A3E635]">{"✓"}</span><span >{"Cultura Data-Driven sem custo de equipe CLT"}</span></li></ul>
</div>
<Button type="button" className="mt-7 w-full cursor-pointer rounded-full px-5 py-3 text-xs font-semibold transition-colors bg-[#A3E635] text-[#090C10] hover:bg-[#BEF264]" variant="imported" size="imported" onClick={(e) => { selectProposalAndScroll('consultoria-recorrente'); }}>{"Solicitar Plano Recorrente →"}</Button>
</article>
<article className="flex flex-col justify-between rounded-2xl border p-6 sm:p-7 border-[#1E2733] bg-[#0E1319]">
<div >
<div className="flex items-center justify-between"><span className="font-mono-data text-[10px] uppercase tracking-[0.18em] text-[#8B9BB0]">{"PROPOSTA 03"}</span></div>
<h3 className="mt-3 text-xl font-semibold text-[#F0F4F8]">{"Automação & Integrações"}</h3>
<p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">{"Elimine planilhas manuais conectando ERP, CRM, APIs e WhatsApp."}</p>
<div className="mt-5 space-y-1 border-y border-[#1C2530] py-4"><p className="text-xs font-semibold text-[#E2E8F0]"><span className="text-[#A3E635]">{"◷"}</span>{" Entrega em 1 a 3 semanas"}</p><p className="text-xs text-[#7D8C9F]">{"Por fluxo ou pacote de automações"}</p></div>
<p className="mt-4 text-xs leading-relaxed text-[#94A3B8]"><strong className="text-[#CBD5E1]">{"Ideal para: "}</strong>{"Operações que perdem horas toda semana copiando dados entre sistemas e montando relatórios manuais."}</p>
<ul className="mt-5 space-y-2.5"><li className="flex items-start gap-2 text-xs text-[#CBD5E1]"><span className="text-[#A3E635]">{"✓"}</span><span >{"Mapeamento de gargalos e ganho de tempo"}</span></li><li className="flex items-start gap-2 text-xs text-[#CBD5E1]"><span className="text-[#A3E635]">{"✓"}</span><span >{"Fluxos automatizados em n8n e Python"}</span></li><li className="flex items-start gap-2 text-xs text-[#CBD5E1]"><span className="text-[#A3E635]">{"✓"}</span><span >{"Integração via API entre CRM, ERP e bancos"}</span></li><li className="flex items-start gap-2 text-xs text-[#CBD5E1]"><span className="text-[#A3E635]">{"✓"}</span><span >{"Alertas automáticos via WhatsApp ou e-mail"}</span></li><li className="flex items-start gap-2 text-xs text-[#CBD5E1]"><span className="text-[#A3E635]">{"✓"}</span><span >{"Monitoramento de estabilidade e treinamento"}</span></li></ul>
</div>
<Button type="button" className="mt-7 w-full cursor-pointer rounded-full px-5 py-3 text-xs font-semibold transition-colors border border-[#2A3747] bg-[#131B24] text-[#F0F4F8] hover:border-[#A3E635]/60 hover:text-[#A3E635]" variant="imported" size="imported" onClick={(e) => { selectProposalAndScroll('automacao-integracoes'); }}>{"Solicitar Automação →"}</Button>
</article>
 </>);
return (<>

<header className="sticky top-0 z-40 border-b border-[#1A222C]/90 bg-[#090C10]/90 backdrop-blur-md">
<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
<a href="#inicio" className="flex items-center gap-3">
<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#A3E635] text-xs font-extrabold tracking-tight text-[#090C10]">{"ETP"}</span>
<div className="leading-tight">
<span className="block text-sm font-semibold tracking-tight text-[#F0F4F8]">{"ETP Analytics"}</span>
<span className="hidden text-[11px] text-[#7D8C9F] sm:block">{"Inteligência de Dados, BI & Automação"}</span>
</div>
</a>
<nav className="hidden items-center gap-7 md:flex">
<a href="#solucoes" className="text-xs font-medium text-[#94A3B8] hover:text-[#F0F4F8]">{"Soluções"}</a>
<a href="#dashboards" className="text-xs font-medium text-[#94A3B8] hover:text-[#F0F4F8]">{"Dashboards"}</a>
<a href="#propostas" className="text-xs font-medium text-[#94A3B8] hover:text-[#F0F4F8]">{"Propostas"}</a>
<a href="#processo" className="text-xs font-medium text-[#94A3B8] hover:text-[#F0F4F8]">{"Processo"}</a>
<a href="#sobre" className="text-xs font-medium text-[#94A3B8] hover:text-[#F0F4F8]">{"Fundador"}</a>
<a href="#contato" className="text-xs font-medium text-[#94A3B8] hover:text-[#F0F4F8]">{"Contato"}</a>
</nav>
<Button type="button" className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#A3E635] px-4 py-2 text-xs font-semibold text-[#090C10] transition-colors hover:bg-[#BEF264]" variant="imported" size="imported" onClick={(e) => { selectProposalAndScroll('diagnostico-gratuito'); }}>{"\n        Diagnóstico Gratuito ↗\n      "}</Button>
</div>
</header>
<main >

<section id="inicio" className="etp-hero-atmosphere border-b border-[#161E28]">
<div className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 md:pb-20 md:pt-20 lg:px-8">
<div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
<div className="lg:col-span-6">
<p className="font-mono-data mb-5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#94A3B8]">{"\n              Exclusivo para Donos de Empresa & Diretores • São Paulo, SP\n            "}</p>
<h1 className="font-editorial text-5xl leading-[1.05] text-[#F0F4F8] sm:text-6xl">{"\n              Inteligência de dados para "}<span className="italic text-[#A3E635]">{"decisões precisas"}</span>{" na sua empresa.\n            "}</h1>
<p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#94A3B8] sm:text-base">{"\n              A "}<strong className="font-semibold text-[#E2E8F0]">{"ETP Analytics"}</strong>{" estrutura dashboards executivos em Power BI, pipelines em SQL e Python e automações com n8n — entregando clareza de margem, caixa e operação para quem decide o rumo do negócio.\n            "}</p>
<div className="mt-8 flex flex-wrap items-center gap-3.5">
<Button type="button" className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#A3E635] px-6 py-3 text-sm font-semibold text-[#090C10] transition-colors hover:bg-[#BEF264]" variant="imported" size="imported" onClick={(e) => { selectProposalAndScroll('diagnostico-gratuito'); }}>{"\n                Solicitar Diagnóstico Gratuito →\n              "}</Button>
<a href="#dashboards" className="inline-flex items-center gap-2 rounded-full border border-[#273342] bg-[#0F141B]/80 px-5 py-3 text-sm font-medium text-[#E2E8F0] transition-colors hover:border-[#3A4C61] hover:bg-[#141C25]">{"\n                Testar Dashboards ao Vivo "}<span className="text-[#A3E635]">{"↗"}</span>
</a>
</div>

<a href="#sobre" className="mt-8 flex max-w-md items-center gap-3.5 rounded-xl border border-[#1D2733] bg-[#0D1218]/90 px-3.5 py-2.5 transition-colors hover:border-[#2E3E52]">
<img src="https://i.ibb.co/ycQ0dWr9/gustavo.jpg" alt="Gustavo Pereira" className="h-11 w-11 shrink-0 rounded-lg border border-[#263241] object-cover object-top" />
<div className="min-w-0 flex-1">
<p className="text-xs font-semibold text-[#F0F4F8]">{"Liderado por "}<span className="text-[#A3E635]">{"Gustavo Pereira"}</span></p>
<p className="truncate text-[11px] text-[#8B9BB0]">{"Fundador • 3+ anos em BI & Análise de Dados"}</p>
</div>
<span className="text-xs text-[#6E7E91]">{"↗"}</span>
</a>
<div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#8A9BB0]">
<span >{"✓ Proposta técnica em até 48h"}</span>
<span >{"✓ 9 dashboards reais em Power BI para testar"}</span>
</div>
</div>

<div className="lg:col-span-6">
<div className="rounded-2xl border border-[#1E2835] bg-[#0D1218]/95 p-5 shadow-2xl">
<div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1A232F] pb-4">
<div >
<span className="font-mono-data text-[10px] uppercase tracking-[0.16em] text-[#A3E635]">{"Demonstração Executiva"}</span>
<h2 id="hero-demo-subtitle" className="mt-0.5 text-sm font-semibold text-[#F0F4F8]">{heroSubtitle}</h2>
</div>
<div className="inline-flex rounded-lg border border-[#1E2733] bg-[#090C10] p-1" id="hero-tab-buttons">{heroButtons}</div>
</div>
<div className="mt-4 grid grid-cols-3 gap-2.5" id="hero-kpi-grid">{heroKpis}</div>
<div className="mt-4 grid gap-3 sm:grid-cols-12">
<div className="rounded-xl border border-[#1A232F] bg-[#0B0F14] p-3.5 sm:col-span-7">
<div className="mb-3 flex items-center justify-between">
<span className="text-[11px] font-medium text-[#94A3B8]">{"Evolução Mensal"}</span>
<span className="font-mono-data text-[10px] text-[#64748B]">{"Jan – Ago"}</span>
</div>
<div className="flex h-24 items-end justify-between gap-1.5" id="hero-bars">{heroBars}</div>
</div>
<div className="flex flex-col justify-between rounded-xl border border-[#1A232F] bg-[#0B0F14] p-3.5 sm:col-span-5">
<div className="flex items-center justify-between">
<span className="text-[11px] font-medium text-[#94A3B8]">{"Tendência"}</span>
<span className="font-mono-data text-[10px] text-[#A3E635]">{"+Meta"}</span>
</div>
<svg id="hero-trend-svg" viewBox="0 0 260 74" className="mt-2 h-20 w-full overflow-visible">{heroTrend}</svg>
<p id="hero-updated-label" className="font-mono-data text-[10px] text-[#64748B]">{heroUpdated}</p>
</div>
</div>
<div className="mt-3.5 flex items-start gap-2.5 rounded-xl border border-[#1E2A20] bg-[#101812] px-3.5 py-2.5">
<span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#A3E635]"></span>
<p id="hero-insight" className="text-xs leading-relaxed text-[#CBD5E1]">{heroInsight}</p>
</div>
</div>
</div>
</div>

<div className="mt-14 grid grid-cols-2 divide-y divide-[#1A232F] rounded-xl border border-[#1A232F] bg-[#0D1218]/90 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
<div className="px-5 py-4"><p className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#64748B]">{"Especialidade"}</p><p className="mt-1 text-sm font-semibold text-[#F0F4F8]">{"BI, Dados & Automação"}</p></div>
<div className="px-5 py-4"><p className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#64748B]">{"Atuação"}</p><p className="mt-1 text-sm font-semibold text-[#F0F4F8]">{"São Paulo • Nacional"}</p></div>
<div className="px-5 py-4"><p className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#64748B]">{"Stack Principal"}</p><p className="mt-1 text-sm font-semibold text-[#F0F4F8]">{"Power BI • SQL • n8n"}</p></div>
<div className="px-5 py-4"><p className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#64748B]">{"Atendimento"}</p><p className="mt-1 text-sm font-semibold text-[#F0F4F8]">{"Donos de Empresa & Diretoria"}</p></div>
</div>

<div className="mt-12 grid grid-cols-2 gap-8 border-t border-[#161E28] pt-10 sm:grid-cols-4">
<div ><p className="font-editorial text-4xl leading-none text-[#A3E635] sm:text-5xl">{"+20"}</p><p className="mt-2 text-xs font-medium text-[#8B9BB0]">{"Dashboards em produção"}</p></div>
<div ><p className="font-editorial text-4xl leading-none text-[#A3E635] sm:text-5xl">{"+20"}</p><p className="mt-2 text-xs font-medium text-[#8B9BB0]">{"Clientes & operações atendidas"}</p></div>
<div ><p className="font-editorial text-4xl leading-none text-[#A3E635] sm:text-5xl">{"9+"}</p><p className="mt-2 text-xs font-medium text-[#8B9BB0]">{"Segmentos estruturados"}</p></div>
<div ><p className="font-editorial text-4xl leading-none text-[#A3E635] sm:text-5xl">{"3+"}</p><p className="mt-2 text-xs font-medium text-[#8B9BB0]">{"Anos em análise de dados"}</p></div>
</div>
</div>
</section>

<section id="solucoes" className="border-b border-[#161E28] py-20 md:py-24">
<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
<div className="grid gap-6 md:grid-cols-12 md:items-end">
<div className="md:col-span-7">
<p className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-[#7D8C9F]">{"01 / Soluções & Stack Tecnológica"}</p>
<h2 className="font-editorial mt-3 text-4xl leading-[1.08] text-[#F0F4F8] sm:text-5xl">{"Arquitetura de dados sob medida para o dia a dia da sua operação."}</h2>
</div>
<div className="md:col-span-5">
<p className="text-sm leading-relaxed text-[#94A3B8]">{"Combinamos engenharia de dados, visualização executiva e automação de processos para eliminar retrabalho manual e colocar indicadores confiáveis nas mãos da liderança."}</p>
</div>
</div>
<div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[#1D2631] bg-[#1D2631] sm:grid-cols-2 lg:grid-cols-3" id="solutions-grid">{solutions}</div>
</div>
</section>

<section id="dashboards" className="border-b border-[#161E28] py-20 md:py-24">
<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
<div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
<div >
<p className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-[#7D8C9F]">{"02 / Portfólio de Projetos Reais"}</p>
<h2 className="font-editorial mt-3 text-4xl leading-[1.08] text-[#F0F4F8] sm:text-5xl">{"Dashboards por segmento"}</h2>
</div>
<p className="text-xs font-medium text-[#7D8C9F]">{"Clique no card para abrir o painel interativo em Power BI ou use o link direto"}</p>
</div>
<div className="mt-8 flex flex-wrap gap-2" id="category-filters">{filterButtons}</div>
<div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" id="dashboards-grid">{dashboardCards}</div>
</div>
</section>

<section id="propostas" className="border-b border-[#161E28] bg-[#0B0F14] py-20 md:py-24">
<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
<div className="grid gap-6 md:grid-cols-12 md:items-end">
<div className="md:col-span-7">
<p className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-[#A3E635]">{"03 / Modelos de Proposta Comercial"}</p>
<h2 className="font-editorial mt-3 text-4xl leading-[1.08] text-[#F0F4F8] sm:text-5xl">{"Formatos transparentes para cada estágio de maturidade em dados."}</h2>
</div>
<div className="md:col-span-5">
<p className="text-sm leading-relaxed text-[#94A3B8]">{"Analise qual modelo faz mais sentido para sua empresa hoje. Todos os projetos começam com um "}<strong className="text-[#E2E8F0]">{"diagnóstico gratuito"}</strong>{" e entregam proposta com escopo, prazo e investimento fechados."}</p>
</div>
</div>
<div className="mt-12 grid gap-6 lg:grid-cols-3" id="proposals-grid">{proposals}</div>
<div className="mt-10 overflow-hidden rounded-2xl border border-[#1C2530] bg-[#0D1218]">
<div className="border-b border-[#1A232F] px-6 py-4"><h3 className="text-sm font-semibold text-[#F0F4F8]">{"Comparativo Rápido dos Modelos"}</h3></div>
<div className="overflow-x-auto">
<table className="w-full min-w-[600px] text-left text-xs">
<thead >
<tr className="border-b border-[#1A232F] bg-[#0A0E13] text-[#7D8C9F]">
<th className="px-6 py-3.5 font-medium">{"Entregável / Recurso"}</th>
<th className="px-4 py-3.5 font-medium">{"Projeto Pontual"}</th>
<th className="px-4 py-3.5 font-semibold text-[#A3E635]">{"Consultoria Recorrente"}</th>
<th className="px-4 py-3.5 font-medium">{"Automação & APIs"}</th>
</tr>
</thead>
<tbody className="divide-y divide-[#17202B] text-[#CBD5E1]">
<tr className="hover:bg-[#111720]/70"><td className="px-6 py-3.5 font-medium text-[#E2E8F0]">{"Diagnóstico técnico inicial gratuito"}</td><td className="px-4 py-3.5 text-[#94A3B8]">{"Incluso"}</td><td className="px-4 py-3.5 font-medium text-[#D9F99D]">{"Incluso"}</td><td className="px-4 py-3.5 text-[#94A3B8]">{"Incluso"}</td></tr>
<tr className="hover:bg-[#111720]/70"><td className="px-6 py-3.5 font-medium text-[#E2E8F0]">{"Design executivo personalizado no Figma"}</td><td className="px-4 py-3.5 text-[#94A3B8]">{"Incluso"}</td><td className="px-4 py-3.5 font-medium text-[#D9F99D]">{"Contínuo"}</td><td className="px-4 py-3.5 text-[#94A3B8]">{"Opcional"}</td></tr>
<tr className="hover:bg-[#111720]/70"><td className="px-6 py-3.5 font-medium text-[#E2E8F0]">{"Integração com ERP, SQL, CRM e APIs"}</td><td className="px-4 py-3.5 text-[#94A3B8]">{"1 a 3 fontes"}</td><td className="px-4 py-3.5 font-medium text-[#D9F99D]">{"Multi-fontes"}</td><td className="px-4 py-3.5 text-[#94A3B8]">{"Foco principal"}</td></tr>
<tr className="hover:bg-[#111720]/70"><td className="px-6 py-3.5 font-medium text-[#E2E8F0]">{"Alertas automáticos (WhatsApp / E-mail)"}</td><td className="px-4 py-3.5 text-[#94A3B8]">{"Opcional"}</td><td className="px-4 py-3.5 font-medium text-[#D9F99D]">{"Incluso"}</td><td className="px-4 py-3.5 text-[#94A3B8]">{"Incluso"}</td></tr>
<tr className="hover:bg-[#111720]/70"><td className="px-6 py-3.5 font-medium text-[#E2E8F0]">{"Acompanhamento e novos KPIs mensais"}</td><td className="px-4 py-3.5 text-[#94A3B8]">{"30 dias garantia"}</td><td className="px-4 py-3.5 font-medium text-[#D9F99D]">{"Mensal contínuo"}</td><td className="px-4 py-3.5 text-[#94A3B8]">{"Sob demanda"}</td></tr>
</tbody>
</table>
</div>
</div>
</div>
</section>

<section id="processo" className="border-b border-[#161E28] py-20 md:py-24">
<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
<div className="max-w-2xl">
<p className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-[#7D8C9F]">{"04 / Metodologia de Entrega"}</p>
<h2 className="font-editorial mt-3 text-4xl leading-[1.08] text-[#F0F4F8] sm:text-5xl">{"Do dado bruto à reunião de diretoria em quatro etapas previsíveis."}</h2>
</div>
<div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
<div className="flex flex-col justify-between rounded-2xl border border-[#1C2530] bg-[#0D1218] p-6"><div ><div className="flex items-center justify-between"><span className="font-editorial text-3xl text-[#A3E635]">{"01"}</span><span className="font-mono-data rounded-md border border-[#1E2936] bg-[#111720] px-2 py-0.5 text-[10px] text-[#8B9BB0]">{"Dia 1 – 3"}</span></div><h3 className="mt-4 text-base font-semibold text-[#F0F4F8]">{"Diagnóstico & Mapeamento"}</h3><p className="mt-2.5 text-xs leading-relaxed text-[#94A3B8]">{"Entendemos a rotina da diretoria, identificamos as dores de gestão e mapeamos exatamente de onde vêm os dados (ERP, SQL, CRM ou Excel)."}</p></div><div className="mt-6 h-0.5 w-10 rounded-full bg-[#A3E635]/40"></div></div>
<div className="flex flex-col justify-between rounded-2xl border border-[#1C2530] bg-[#0D1218] p-6"><div ><div className="flex items-center justify-between"><span className="font-editorial text-3xl text-[#A3E635]">{"02"}</span><span className="font-mono-data rounded-md border border-[#1E2936] bg-[#111720] px-2 py-0.5 text-[10px] text-[#8B9BB0]">{"Semana 1"}</span></div><h3 className="mt-4 text-base font-semibold text-[#F0F4F8]">{"Arquitetura & Protótipo"}</h3><p className="mt-2.5 text-xs leading-relaxed text-[#94A3B8]">{"Estruturamos o modelo de dados e apresentamos o layout no Figma para sua aprovação antes de construir a versão final — zero surpresas."}</p></div><div className="mt-6 h-0.5 w-10 rounded-full bg-[#A3E635]/40"></div></div>
<div className="flex flex-col justify-between rounded-2xl border border-[#1C2530] bg-[#0D1218] p-6"><div ><div className="flex items-center justify-between"><span className="font-editorial text-3xl text-[#A3E635]">{"03"}</span><span className="font-mono-data rounded-md border border-[#1E2936] bg-[#111720] px-2 py-0.5 text-[10px] text-[#8B9BB0]">{"Semanas 2 – 3"}</span></div><h3 className="mt-4 text-base font-semibold text-[#F0F4F8]">{"Desenvolvimento & Automação"}</h3><p className="mt-2.5 text-xs leading-relaxed text-[#94A3B8]">{"Desenvolvemos os dashboards em Power BI, métricas DAX auditadas e rotinas automáticas em SQL, Python e n8n."}</p></div><div className="mt-6 h-0.5 w-10 rounded-full bg-[#A3E635]/40"></div></div>
<div className="flex flex-col justify-between rounded-2xl border border-[#1C2530] bg-[#0D1218] p-6"><div ><div className="flex items-center justify-between"><span className="font-editorial text-3xl text-[#A3E635]">{"04"}</span><span className="font-mono-data rounded-md border border-[#1E2936] bg-[#111720] px-2 py-0.5 text-[10px] text-[#8B9BB0]">{"Go-Live"}</span></div><h3 className="mt-4 text-base font-semibold text-[#F0F4F8]">{"Entrega, Treinamento & Escala"}</h3><p className="mt-2.5 text-xs leading-relaxed text-[#94A3B8]">{"Validamos cada número junto ao seu time, treinamos gestores e operadores para extrair o máximo da ferramenta."}</p></div><div className="mt-6 h-0.5 w-10 rounded-full bg-[#A3E635]/40"></div></div>
</div>
</div>
</section>

<section id="sobre" className="border-b border-[#161E28] bg-[#0B0F14] py-20 md:py-24">
<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
<div className="mb-10 flex flex-wrap items-center justify-between gap-4">
<div >
<p className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-[#A3E635]">{"05 / Quem Lidera Cada Projeto • Para Donos de Empresa"}</p>
<h2 className="font-editorial mt-2 text-4xl leading-[1.06] text-[#F0F4F8] sm:text-5xl">{"Atendimento direto com o fundador da ETP Analytics."}</h2>
</div>
<span className="font-mono-data rounded-full border border-[#263822] bg-[#101912] px-3.5 py-1.5 text-[10px] uppercase tracking-[0.16em] text-[#A3E635]">{"\n            Só para quem é dono da empresa & diretoria\n          "}</span>
</div>
<div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">

<div className="lg:col-span-5">
<div className="relative h-full min-h-[400px] overflow-hidden rounded-2xl border border-[#222D3A] bg-[#0A0D12]">
<img src="https://i.ibb.co/ycQ0dWr9/gustavo.jpg" alt="Gustavo Pereira — Fundador da ETP Analytics" className="h-full w-full object-cover object-top" />
<div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#090C10] via-[#090C10]/85 to-transparent"></div>
<div className="absolute inset-x-0 bottom-0 p-6">
<p className="font-mono-data text-[10px] uppercase tracking-[0.18em] text-[#A3E635]">{"Fundador & CEO • ETP Analytics"}</p>
<p className="font-editorial mt-1 text-4xl leading-none text-[#F0F4F8]">
<span className="text-[#A3E635]">{"Gustavo"}</span>
<span className="italic">{"Pereira"}</span>
</p>
<div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#CBD5E1]">
<span >{"Especialista em BI & Dados"}</span>
<span >{"•"}</span>
<span >{"São Paulo, SP"}</span>
</div>
</div>
</div>
</div>

<div className="flex flex-col justify-between gap-6 lg:col-span-7">
<div className="rounded-2xl border border-[#1E2733] bg-[#0E1319] p-6 sm:p-8">
<div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#1A232F] pb-5">
<div >
<p className="font-mono-data text-[10px] uppercase tracking-[0.16em] text-[#7D8C9F]">{"Perfil Profissional do Fundador"}</p>
<h3 className="font-editorial mt-1 text-4xl leading-tight text-[#F0F4F8]">
<span className="text-[#A3E635]">{"Gustavo"}</span>
<span className="italic">{"Pereira"}</span>
</h3>
</div>
<span className="rounded-lg border border-[#233224] bg-[#111B13] px-3 py-1 text-xs font-medium text-[#D9F99D]">{"3+ anos em Análise de Dados"}</span>
</div>
<div className="mt-5 space-y-4 text-sm leading-relaxed text-[#94A3B8]">
<p className="text-[15px] text-[#E2E8F0]">{"\n                  Profissional de TI especialista em Business Intelligence, graduado em "}<strong className="font-semibold text-white">{"Sistemas de Informação"}</strong>{" e fundador da "}<strong className="font-semibold text-white">{"ETP Analytics"}</strong>{". Falo a língua de quem é "}<strong className="text-[#A3E635]">{"dono da empresa"}</strong>{": lucro real, margem, fluxo de caixa, metas comerciais e eficiência operacional — sem jargão técnico desnecessário.\n                "}</p>
<p >{"\n                  Com atuação comprovada em ambientes de alta exigência — incluindo projetos de BI na Secretaria Municipal da Saúde de São Paulo e mais de 20 dashboards entregues em logística, finanças, vendas, indústria, RH e saúde — conduzo pessoalmente desde o diagnóstico estratégico até a entrega final em Power BI, SQL, Python e n8n.\n                "}</p>
</div>
<div className="mt-6 grid grid-cols-2 gap-4 border-t border-[#1A232F] pt-6">
<div className="border-l-2 border-[#A3E635] pl-3.5"><p className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#6E7E91]">{"Formação"}</p><p className="mt-1 text-xs font-semibold text-[#E2E8F0] sm:text-sm">{"Sistemas de Informação • TI"}</p></div>
<div className="border-l-2 border-[#A3E635] pl-3.5"><p className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#6E7E91]">{"Especialidade"}</p><p className="mt-1 text-xs font-semibold text-[#E2E8F0] sm:text-sm">{"Power BI, SQL, Python & n8n"}</p></div>
<div className="border-l-2 border-[#A3E635] pl-3.5"><p className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#6E7E91]">{"Histórico Real"}</p><p className="mt-1 text-xs font-semibold text-[#E2E8F0] sm:text-sm">{"+20 Dashboards • 9+ Segmentos"}</p></div>
<div className="border-l-2 border-[#A3E635] pl-3.5"><p className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#6E7E91]">{"Compromisso"}</p><p className="mt-1 text-xs font-semibold text-[#E2E8F0] sm:text-sm">{"Reunião direta com o fundador"}</p></div>
</div>
</div>
<div className="rounded-2xl border border-[#1E2733] bg-[#0E1319] p-6">
<div className="flex flex-wrap items-center justify-between gap-3">
<p className="font-mono-data text-[10px] uppercase tracking-[0.18em] text-[#A3E635]">{"O que entregamos para a diretoria"}</p>
<Button type="button" className="cursor-pointer text-xs font-semibold text-[#A3E635] hover:text-[#BEF264]" variant="imported" size="imported" onClick={(e) => { selectProposalAndScroll('diagnostico-gratuito'); }}>{"\n                  Conversar com Gustavo Pereira ↗\n                "}</Button>
</div>
<ul className="mt-4 grid gap-2.5 sm:grid-cols-2 text-xs text-[#CBD5E1]">
<li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Análise de dados sob medida para o seu setor"}</span></li>
<li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Dashboards executivos e gerenciais em Power BI"}</span></li>
<li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Modelagem e consolidação de bases SQL e ERPs"}</span></li>
<li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Automação de relatórios via n8n e Python"}</span></li>
<li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Diagnóstico de maturidade de dados e consultoria"}</span></li>
<li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Design de painéis para diretoria e TVs"}</span></li>
</ul>
</div>
</div>
</div>
</div>
</section>

<section id="contato" className="py-20 md:py-24">
<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
<div className="max-w-3xl">
<p className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-[#7D8C9F]">{"06 / Diagnóstico & Contato Comercial"}</p>
<h2 className="font-editorial mt-3 text-4xl leading-[1.06] text-[#F0F4F8] sm:text-5xl">{"\n            Vamos conversar sobre o próximo "}<span className="italic text-[#A3E635]">{"dashboard"}</span>{" da sua empresa.\n          "}</h2>
<p className="mt-3 text-sm leading-relaxed text-[#94A3B8]">{"\n            Preencha o diagnóstico rápido abaixo para gerar um briefing estruturado de proposta ou fale diretamente pelos nossos canais comerciais.\n          "}</p>
</div>
<div className="mt-12 grid gap-8 lg:grid-cols-12">
<div className="lg:col-span-7">
<div className="rounded-2xl border border-[#1E2733] bg-[#0D1218] p-6 sm:p-8">
<div className="mb-6 flex items-center justify-between gap-3 border-b border-[#1A232F] pb-4">
<div >
<h3 className="text-base font-semibold text-[#F0F4F8]">{"Solicitar Diagnóstico & Proposta Comercial"}</h3>
<p className="mt-0.5 text-xs text-[#7D8C9F]">{"Retorno técnico direto com Gustavo Pereira em até 1 dia útil"}</p>
</div>
<span className="font-mono-data rounded-md border border-[#223322] bg-[#121D14] px-2.5 py-1 text-[10px] font-medium text-[#A3E635]">{"Gratuito"}</span>
</div>
<form id="diagnostic-form" className={briefing ? "hidden space-y-4" : "space-y-4"} onSubmit={submitBriefing}>
<div className="grid gap-4 sm:grid-cols-2">
<div >
<label htmlFor="f-name" className="mb-1.5 block text-xs font-medium text-[#CBD5E1]">{"Seu nome *"}</label>
<input id="f-name" type="text" required placeholder="Ex: Mariana Oliveira" className="w-full rounded-xl border border-[#222D3B] bg-[#090C10] px-3.5 py-2.5 text-sm text-[#F0F4F8] placeholder-[#526071] focus:border-[#A3E635] focus:outline-none" />
</div>
<div >
<label htmlFor="f-company" className="mb-1.5 block text-xs font-medium text-[#CBD5E1]">{"Empresa *"}</label>
<input id="f-company" type="text" required placeholder="Ex: Grupo Horizonte Logística" className="w-full rounded-xl border border-[#222D3B] bg-[#090C10] px-3.5 py-2.5 text-sm text-[#F0F4F8] placeholder-[#526071] focus:border-[#A3E635] focus:outline-none" />
</div>
</div>
<div >
<label htmlFor="f-contact" className="mb-1.5 block text-xs font-medium text-[#CBD5E1]">{"E-mail corporativo ou WhatsApp *"}</label>
<input id="f-contact" type="text" required placeholder="Ex: mariana@empresa.com.br ou (11) 99999-9999" className="w-full rounded-xl border border-[#222D3B] bg-[#090C10] px-3.5 py-2.5 text-sm text-[#F0F4F8] placeholder-[#526071] focus:border-[#A3E635] focus:outline-none" />
</div>
<div className="grid gap-4 sm:grid-cols-2">
<div >
<label htmlFor="f-proposal" className="mb-1.5 block text-xs font-medium text-[#CBD5E1]">{"Modelo de proposta"}</label>
<select id="f-proposal" className="w-full rounded-xl border border-[#222D3B] bg-[#090C10] px-3.5 py-2.5 text-sm text-[#F0F4F8] focus:border-[#A3E635] focus:outline-none" value={proposal} onChange={(e)=>setProposal(e.target.value)}>
<option value="diagnostico-gratuito">{"Diagnóstico Gratuito (30 min)"}</option>
<option value="projeto-pontual">{"Projeto Pontual de BI"}</option>
<option value="consultoria-recorrente">{"Consultoria & BI Recorrente"}</option>
<option value="automacao-integracoes">{"Automação & Integrações"}</option>
</select>
</div>
<div >
<label htmlFor="f-segment" className="mb-1.5 block text-xs font-medium text-[#CBD5E1]">{"Área / Segmento prioritário"}</label>
<select id="f-segment" className="w-full rounded-xl border border-[#222D3B] bg-[#090C10] px-3.5 py-2.5 text-sm text-[#F0F4F8] focus:border-[#A3E635] focus:outline-none" value={segment} onChange={(e)=>setSegment(e.target.value)}>
<option >{"Financeiro"}</option><option >{"Vendas"}</option><option >{"Logística"}</option><option >{"Recursos Humanos"}</option><option >{"Hospitalar"}</option><option >{"Produção"}</option><option >{"Telemarketing"}</option><option >{"Evolução de Obra & Finanças"}</option><option >{"Operacional"}</option><option >{"Múltiplas áreas / Diretoria"}</option>
</select>
</div>
</div>
<div >
<label htmlFor="f-challenge" className="mb-1.5 block text-xs font-medium text-[#CBD5E1]">{"Conte brevemente o desafio atual (opcional)"}</label>
<textarea id="f-challenge" rows={3} placeholder="Ex: Hoje consolidamos o DRE e vendas manualmente no Excel toda semana..." className="w-full resize-none rounded-xl border border-[#222D3B] bg-[#090C10] px-3.5 py-2.5 text-sm text-[#F0F4F8] placeholder-[#526071] focus:border-[#A3E635] focus:outline-none"></textarea>
</div>
<Button type="submit" className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#A3E635] px-6 py-3 text-sm font-semibold text-[#090C10] hover:bg-[#BEF264]" variant="imported" size="imported">{"\n                  Gerar Briefing & Solicitar Proposta →\n                "}</Button>
</form>
<div id="briefing-result" className={briefing ? "space-y-4" : "hidden space-y-4"}>
<div className="rounded-xl border border-[#283B24] bg-[#101A12] p-4">
<p className="text-sm font-semibold text-[#A3E635]">{"✓ Briefing pronto para envio!"}</p>
<p className="mt-1 text-xs text-[#CBD5E1]">{"Copie o resumo abaixo ou encaminhe direto para o WhatsApp Comercial da ETP Analytics."}</p>
</div>
<pre id="briefing-text" className="whitespace-pre-wrap rounded-xl border border-[#1E2733] bg-[#090C10] p-4 font-mono-data text-xs leading-relaxed text-[#CBD5E1]">{briefing}</pre>
<div className="flex flex-wrap gap-3">
<Button type="button" id="copy-brief-btn" className="cursor-pointer rounded-full bg-[#A3E635] px-5 py-2.5 text-xs font-semibold text-[#090C10] hover:bg-[#BEF264]" variant="imported" size="imported" onClick={copyBriefing}>{copied ? "✓ Copiado!" : "Copiar Briefing"}</Button>
<Button type="button" className="cursor-pointer rounded-full border border-[#293646] px-4 py-2.5 text-xs text-[#CBD5E1] hover:text-white" variant="imported" size="imported" onClick={(e) => { resetBriefing(); }}>{"Editar dados"}</Button>
</div>
</div>
</div>
</div>
<div className="flex flex-col gap-3.5 lg:col-span-5">
<div className="etp-card flex items-center justify-between rounded-2xl p-5"><div ><p className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#6E7E91]">{"E-mail Comercial"}</p><p className="mt-0.5 text-sm font-medium text-[#F0F4F8]">{"contato@etpanalytics.com.br"}</p></div><span className="text-xs font-semibold text-[#A3E635]">{"↗"}</span></div>
<div className="etp-card flex items-center justify-between rounded-2xl p-5"><div ><p className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#6E7E91]">{"WhatsApp Direto"}</p><p className="mt-0.5 text-sm font-medium text-[#F0F4F8]">{"+55 (11) 99999-0000"}</p></div><span className="text-xs font-semibold text-[#A3E635]">{"↗"}</span></div>
<div className="etp-card flex items-center justify-between rounded-2xl p-5"><div ><p className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#6E7E91]">{"LinkedIn"}</p><p className="mt-0.5 text-sm font-medium text-[#F0F4F8]">{"linkedin.com/in/gustavo-pereira-bi"}</p></div><span className="text-xs font-semibold text-[#A3E635]">{"↗"}</span></div>
<div className="etp-card flex items-center justify-between rounded-2xl p-5"><div ><p className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-[#6E7E91]">{"Portfólio Técnico"}</p><p className="mt-0.5 text-sm font-medium text-[#F0F4F8]">{"etpportfolio.vercel.app"}</p></div><span className="text-xs font-semibold text-[#A3E635]">{"↗"}</span></div>
<div className="rounded-2xl border border-[#1B242F] bg-[#0B1016] p-5"><p className="text-xs font-semibold text-[#E2E8F0]">{"Base Operacional"}</p><p className="mt-1 text-xs leading-relaxed text-[#8B9BB0]">{"São Paulo, SP — Atendimento em todo o Brasil com reuniões online de diagnóstico executivo."}</p></div>
</div>
</div>
</div>
</section>
</main>
<footer className="border-t border-[#161E28] bg-[#080B0F] py-8">
<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-xs text-[#6E7E91] sm:flex-row sm:px-6 lg:px-8">
<div className="flex items-center gap-2.5">
<span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#A3E635] text-[10px] font-extrabold text-[#090C10]">{"ETP"}</span>
<span className="font-medium text-[#CBD5E1]">{"ETP Analytics • Gustavo Pereira"}</span>
<span >{"• © 2026"}</span>
</div>
<a href="#inicio" className="text-[#A3E635] hover:text-[#BEF264]">{"Voltar ao topo ↑"}</a>
</div>
</footer>



{modal === "logistica" && (<div id="dashboard-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-5" onClick={closeModal}>
<div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#243140] bg-[#0D1218] shadow-2xl" onClick={(e) => { e.stopPropagation(); }}>
<div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#1A232F] px-6 py-4">
<div >
<p className="font-mono-data text-[10px] uppercase tracking-[0.18em] text-[#A3E635]" id="modal-tag">{"LOGÍSTICA • Projeto Real em Power BI"}</p>
<h3 className="font-editorial mt-1 text-3xl text-[#F0F4F8]" id="modal-title">{"Dashboard de Logística"}</h3>
</div>
<div className="flex items-center gap-2.5">
<div className="inline-flex rounded-lg border border-[#1E2835] bg-[#090C10] p-1">
<Button className="cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium text-[#8B9BB0] hover:text-white" id="tab-pbi" type="button" variant="imported" size="imported" onClick={(e) => { switchModalTab('powerbi'); }}>{"Power BI Ao Vivo"}</Button>
<Button className="cursor-pointer rounded-md bg-[#A3E635] px-3 py-1.5 text-xs font-semibold text-[#090C10]" id="tab-ov" type="button" variant="imported" size="imported" onClick={(e) => { switchModalTab('overview'); }}>{"Indicadores & Escopo"}</Button>
</div>
<Button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#1E2835] bg-[#111720] text-[#94A3B8] hover:text-white" type="button" variant="imported" size="imported" onClick={(e) => { closeModal(); }} aria-label="Fechar dashboard">{"✕"}</Button>
</div>
</div>
<div className="flex-1 overflow-y-auto p-5 sm:p-6">

<div className="space-y-4" id="modal-view-powerbi" hidden={modalTab !== "powerbi"}>
<div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[#1E2835] bg-[#070A0E]">
{modalTab === "powerbi" && (<iframe allowFullScreen className="h-full w-full border-0" id="modal-pbi-iframe" src="https://app.powerbi.com/reportEmbed?reportId=7af30bbf-9e2a-4329-854b-b0880e4baabb&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" title="Relatório Power BI"></iframe>)}
</div>
<div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#1A2430] bg-[#0A0E14] px-4 py-3 text-xs text-[#94A3B8]">
<span >{"Caso o preview restrinja iframes externos ou peça login Microsoft, clique para abrir o relatório em tela cheia."}</span>
<a className="font-semibold text-[#A3E635] hover:text-[#BEF264]" href="https://app.powerbi.com/reportEmbed?reportId=7af30bbf-9e2a-4329-854b-b0880e4baabb&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" id="modal-pbi-ext-top" rel="noreferrer" target="_blank">{"Abrir relatório em nova aba ↗"}</a>
</div>
</div>

<div className="space-y-6" id="modal-view-overview" hidden={modalTab !== "overview"}>
<div className="rounded-xl border border-[#1B2532] bg-[#090D12] p-5">
<div className="grid grid-cols-3 gap-3" id="modal-kpis"><div className="rounded-xl border border-[#1A2430] bg-[#0F151D] px-4 py-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"OTIF"}</p><p className="font-mono-data mt-1 text-lg font-semibold text-[#F0F4F8]">{"96,4%"}</p></div><div className="rounded-xl border border-[#1A2430] bg-[#0F151D] px-4 py-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Custo/Km"}</p><p className="font-mono-data mt-1 text-lg font-semibold text-[#F0F4F8]">{"R$ 3,42"}</p></div><div className="rounded-xl border border-[#1A2430] bg-[#0F151D] px-4 py-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Entregas"}</p><p className="font-mono-data mt-1 text-lg font-semibold text-[#F0F4F8]">{"4.820"}</p></div></div>
<div className="mt-4 rounded-xl border border-[#1A2430] bg-[#0D1218] p-4">
<div className="mb-3 flex items-center justify-between">
<span className="text-xs font-medium text-[#CBD5E1]">{"Desempenho Consolidado (Exemplo de Estrutura)"}</span>
<span className="font-mono-data text-[10px] text-[#A3E635]">{"Power BI + Atualização Automática"}</span>
</div>
<div className="flex h-28 items-end justify-between gap-2" id="modal-bars"><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "55%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Jan"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "72%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Fev"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]" style={{"height": "91%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Mar"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]" style={{"height": "100%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Abr"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "77%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Mai"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "51%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Jun"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "64%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Jul"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "79%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Ago"}</span></div></div>
</div>
</div>
<div className="grid gap-6 md:grid-cols-2">
<div >
<h4 className="text-xs font-semibold uppercase tracking-wider text-[#F0F4F8]">{"Principais Indicadores Inclusos"}</h4>
<ul className="mt-3 space-y-2.5 text-sm text-[#CBD5E1]" id="modal-indicators"><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"OTIF por transportadora e região"}</span></li><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Custo de frete sobre faturamento e custo por km"}</span></li><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Tempo médio de carregamento, trânsito e descarga"}</span></li><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Mapa de ocorrências, avarias e devoluções"}</span></li></ul>
</div>
<div className="space-y-4">
<div >
<h4 className="text-xs font-semibold uppercase tracking-wider text-[#F0F4F8]">{"Impacto na Gestão"}</h4>
<ul className="mt-3 space-y-2" id="modal-impact"><li className="rounded-lg border border-[#1A2430] bg-[#10161E] px-3.5 py-2.5 text-xs text-[#CBD5E1]">{"Identificação imediata de rotas deficitárias e atrasos"}</li><li className="rounded-lg border border-[#1A2430] bg-[#10161E] px-3.5 py-2.5 text-xs text-[#CBD5E1]">{"Redução de custos extras com reentregas e ociosidade"}</li></ul>
</div>
<div className="grid grid-cols-2 gap-3">
<div className="rounded-xl border border-[#1A2430] bg-[#10161E] p-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Prazo Médio"}</p><p className="mt-1 text-sm font-semibold text-[#F0F4F8]" id="modal-time">{"2 a 3 semanas"}</p></div>
<div className="rounded-xl border border-[#1A2430] bg-[#10161E] p-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Integrações"}</p><p className="mt-1 text-xs font-medium text-[#CBD5E1]" id="modal-sources">{"TMS / ERP • SQL • Excel"}</p></div>
</div>
</div>
</div>
</div>
</div>
<div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#1A232F] bg-[#0B1016] px-6 py-4">
<a className="inline-flex items-center gap-2 rounded-full border border-[#283647] bg-[#111720] px-4 py-2 text-xs font-medium text-[#E2E8F0] hover:border-[#A3E635]/60 hover:text-[#A3E635]" href="https://app.powerbi.com/reportEmbed?reportId=7af30bbf-9e2a-4329-854b-b0880e4baabb&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" id="modal-pbi-link" rel="noreferrer" target="_blank">{"Abrir no Power BI ↗"}</a>
<Button className="cursor-pointer rounded-full bg-[#A3E635] px-5 py-2.5 text-xs font-semibold text-[#090C10] hover:bg-[#BEF264]" id="modal-cta-btn" onClick={()=>{closeModal();selectSegmentAndScroll("Logística");}} type="button" variant="imported" size="imported">{"Solicitar proposta para Logística →"}</Button>
</div>
</div>
</div>)}{modal === "rh" && (<div id="dashboard-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-5" onClick={closeModal}>
<div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#243140] bg-[#0D1218] shadow-2xl" onClick={(e) => { e.stopPropagation(); }}>
<div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#1A232F] px-6 py-4">
<div >
<p className="font-mono-data text-[10px] uppercase tracking-[0.18em] text-[#A3E635]" id="modal-tag">{"GENTE & GESTÃO • Projeto Real em Power BI"}</p>
<h3 className="font-editorial mt-1 text-3xl text-[#F0F4F8]" id="modal-title">{"Dashboard de Recursos Humanos"}</h3>
</div>
<div className="flex items-center gap-2.5">
<div className="inline-flex rounded-lg border border-[#1E2835] bg-[#090C10] p-1">
<Button className="cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium text-[#8B9BB0] hover:text-white" id="tab-pbi" type="button" variant="imported" size="imported" onClick={(e) => { switchModalTab('powerbi'); }}>{"Power BI Ao Vivo"}</Button>
<Button className="cursor-pointer rounded-md bg-[#A3E635] px-3 py-1.5 text-xs font-semibold text-[#090C10]" id="tab-ov" type="button" variant="imported" size="imported" onClick={(e) => { switchModalTab('overview'); }}>{"Indicadores & Escopo"}</Button>
</div>
<Button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#1E2835] bg-[#111720] text-[#94A3B8] hover:text-white" type="button" variant="imported" size="imported" onClick={(e) => { closeModal(); }} aria-label="Fechar dashboard">{"✕"}</Button>
</div>
</div>
<div className="flex-1 overflow-y-auto p-5 sm:p-6">

<div className="space-y-4" id="modal-view-powerbi" hidden={modalTab !== "powerbi"}>
<div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[#1E2835] bg-[#070A0E]">
{modalTab === "powerbi" && (<iframe allowFullScreen className="h-full w-full border-0" id="modal-pbi-iframe" src="https://app.powerbi.com/reportEmbed?reportId=03354214-1b1c-4ebe-aa2f-2583c2151eb4&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" title="Relatório Power BI"></iframe>)}
</div>
<div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#1A2430] bg-[#0A0E14] px-4 py-3 text-xs text-[#94A3B8]">
<span >{"Caso o preview restrinja iframes externos ou peça login Microsoft, clique para abrir o relatório em tela cheia."}</span>
<a className="font-semibold text-[#A3E635] hover:text-[#BEF264]" href="https://app.powerbi.com/reportEmbed?reportId=03354214-1b1c-4ebe-aa2f-2583c2151eb4&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" id="modal-pbi-ext-top" rel="noreferrer" target="_blank">{"Abrir relatório em nova aba ↗"}</a>
</div>
</div>

<div className="space-y-6" id="modal-view-overview" hidden={modalTab !== "overview"}>
<div className="rounded-xl border border-[#1B2532] bg-[#090D12] p-5">
<div className="grid grid-cols-3 gap-3" id="modal-kpis"><div className="rounded-xl border border-[#1A2430] bg-[#0F151D] px-4 py-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Headcount"}</p><p className="font-mono-data mt-1 text-lg font-semibold text-[#F0F4F8]">{"412"}</p></div><div className="rounded-xl border border-[#1A2430] bg-[#0F151D] px-4 py-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Turnover"}</p><p className="font-mono-data mt-1 text-lg font-semibold text-[#F0F4F8]">{"2,4%"}</p></div><div className="rounded-xl border border-[#1A2430] bg-[#0F151D] px-4 py-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Absenteísmo"}</p><p className="font-mono-data mt-1 text-lg font-semibold text-[#F0F4F8]">{"1,8%"}</p></div></div>
<div className="mt-4 rounded-xl border border-[#1A2430] bg-[#0D1218] p-4">
<div className="mb-3 flex items-center justify-between">
<span className="text-xs font-medium text-[#CBD5E1]">{"Desempenho Consolidado (Exemplo de Estrutura)"}</span>
<span className="font-mono-data text-[10px] text-[#A3E635]">{"Power BI + Atualização Automática"}</span>
</div>
<div className="flex h-28 items-end justify-between gap-2" id="modal-bars"><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]" style={{"height": "89%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Jan"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "48%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Fev"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "75%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Mar"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "61%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Abr"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]" style={{"height": "100%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Mai"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "69%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Jun"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "80%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Jul"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "66%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Ago"}</span></div></div>
</div>
</div>
<div className="grid gap-6 md:grid-cols-2">
<div >
<h4 className="text-xs font-semibold uppercase tracking-wider text-[#F0F4F8]">{"Principais Indicadores Inclusos"}</h4>
<ul className="mt-3 space-y-2.5 text-sm text-[#CBD5E1]" id="modal-indicators"><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Turnover voluntário e involuntário por área"}</span></li><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Evolução de headcount, admissões e desligamentos"}</span></li><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Absenteísmo, horas extras e banco de horas"}</span></li><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Análise de custo de folha e encargos"}</span></li></ul>
</div>
<div className="space-y-4">
<div >
<h4 className="text-xs font-semibold uppercase tracking-wider text-[#F0F4F8]">{"Impacto na Gestão"}</h4>
<ul className="mt-3 space-y-2" id="modal-impact"><li className="rounded-lg border border-[#1A2430] bg-[#10161E] px-3.5 py-2.5 text-xs text-[#CBD5E1]">{"Previsibilidade de contratação e menos custos rescisórios"}</li><li className="rounded-lg border border-[#1A2430] bg-[#10161E] px-3.5 py-2.5 text-xs text-[#CBD5E1]">{"Visão consolidada para diretoria e RH"}</li></ul>
</div>
<div className="grid grid-cols-2 gap-3">
<div className="rounded-xl border border-[#1A2430] bg-[#10161E] p-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Prazo Médio"}</p><p className="mt-1 text-sm font-semibold text-[#F0F4F8]" id="modal-time">{"2 semanas"}</p></div>
<div className="rounded-xl border border-[#1A2430] bg-[#10161E] p-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Integrações"}</p><p className="mt-1 text-xs font-medium text-[#CBD5E1]" id="modal-sources">{"Senior / TOTVS • Folha • Excel"}</p></div>
</div>
</div>
</div>
</div>
</div>
<div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#1A232F] bg-[#0B1016] px-6 py-4">
<a className="inline-flex items-center gap-2 rounded-full border border-[#283647] bg-[#111720] px-4 py-2 text-xs font-medium text-[#E2E8F0] hover:border-[#A3E635]/60 hover:text-[#A3E635]" href="https://app.powerbi.com/reportEmbed?reportId=03354214-1b1c-4ebe-aa2f-2583c2151eb4&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" id="modal-pbi-link" rel="noreferrer" target="_blank">{"Abrir no Power BI ↗"}</a>
<Button className="cursor-pointer rounded-full bg-[#A3E635] px-5 py-2.5 text-xs font-semibold text-[#090C10] hover:bg-[#BEF264]" id="modal-cta-btn" onClick={()=>{closeModal();selectSegmentAndScroll("Recursos Humanos");}} type="button" variant="imported" size="imported">{"Solicitar proposta para Recursos Humanos →"}</Button>
</div>
</div>
</div>)}{modal === "hospitalar" && (<div id="dashboard-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-5" onClick={closeModal}>
<div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#243140] bg-[#0D1218] shadow-2xl" onClick={(e) => { e.stopPropagation(); }}>
<div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#1A232F] px-6 py-4">
<div >
<p className="font-mono-data text-[10px] uppercase tracking-[0.18em] text-[#A3E635]" id="modal-tag">{"SAÚDE • Projeto Real em Power BI"}</p>
<h3 className="font-editorial mt-1 text-3xl text-[#F0F4F8]" id="modal-title">{"Dashboard de Hospitalar"}</h3>
</div>
<div className="flex items-center gap-2.5">
<div className="inline-flex rounded-lg border border-[#1E2835] bg-[#090C10] p-1">
<Button className="cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium text-[#8B9BB0] hover:text-white" id="tab-pbi" type="button" variant="imported" size="imported" onClick={(e) => { switchModalTab('powerbi'); }}>{"Power BI Ao Vivo"}</Button>
<Button className="cursor-pointer rounded-md bg-[#A3E635] px-3 py-1.5 text-xs font-semibold text-[#090C10]" id="tab-ov" type="button" variant="imported" size="imported" onClick={(e) => { switchModalTab('overview'); }}>{"Indicadores & Escopo"}</Button>
</div>
<Button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#1E2835] bg-[#111720] text-[#94A3B8] hover:text-white" type="button" variant="imported" size="imported" onClick={(e) => { closeModal(); }} aria-label="Fechar dashboard">{"✕"}</Button>
</div>
</div>
<div className="flex-1 overflow-y-auto p-5 sm:p-6">

<div className="space-y-4" id="modal-view-powerbi" hidden={modalTab !== "powerbi"}>
<div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[#1E2835] bg-[#070A0E]">
{modalTab === "powerbi" && (<iframe allowFullScreen className="h-full w-full border-0" id="modal-pbi-iframe" src="https://app.powerbi.com/reportEmbed?reportId=f3c9dc29-80ac-46ba-a457-1038e4fec79e&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" title="Relatório Power BI"></iframe>)}
</div>
<div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#1A2430] bg-[#0A0E14] px-4 py-3 text-xs text-[#94A3B8]">
<span >{"Caso o preview restrinja iframes externos ou peça login Microsoft, clique para abrir o relatório em tela cheia."}</span>
<a className="font-semibold text-[#A3E635] hover:text-[#BEF264]" href="https://app.powerbi.com/reportEmbed?reportId=f3c9dc29-80ac-46ba-a457-1038e4fec79e&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" id="modal-pbi-ext-top" rel="noreferrer" target="_blank">{"Abrir relatório em nova aba ↗"}</a>
</div>
</div>

<div className="space-y-6" id="modal-view-overview" hidden={modalTab !== "overview"}>
<div className="rounded-xl border border-[#1B2532] bg-[#090D12] p-5">
<div className="grid grid-cols-3 gap-3" id="modal-kpis"><div className="rounded-xl border border-[#1A2430] bg-[#0F151D] px-4 py-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Ocupação"}</p><p className="font-mono-data mt-1 text-lg font-semibold text-[#F0F4F8]">{"87,2%"}</p></div><div className="rounded-xl border border-[#1A2430] bg-[#0F151D] px-4 py-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Média Perm."}</p><p className="font-mono-data mt-1 text-lg font-semibold text-[#F0F4F8]">{"4,1 d"}</p></div><div className="rounded-xl border border-[#1A2430] bg-[#0F151D] px-4 py-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"SLA Triagem"}</p><p className="font-mono-data mt-1 text-lg font-semibold text-[#F0F4F8]">{"94%"}</p></div></div>
<div className="mt-4 rounded-xl border border-[#1A2430] bg-[#0D1218] p-4">
<div className="mb-3 flex items-center justify-between">
<span className="text-xs font-medium text-[#CBD5E1]">{"Desempenho Consolidado (Exemplo de Estrutura)"}</span>
<span className="font-mono-data text-[10px] text-[#A3E635]">{"Power BI + Atualização Automática"}</span>
</div>
<div className="flex h-28 items-end justify-between gap-2" id="modal-bars"><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "51%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Jan"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "78%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Fev"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]" style={{"height": "91%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Mar"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "71%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Abr"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]" style={{"height": "100%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Mai"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "84%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Jun"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]" style={{"height": "93%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Jul"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "76%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Ago"}</span></div></div>
</div>
</div>
<div className="grid gap-6 md:grid-cols-2">
<div >
<h4 className="text-xs font-semibold uppercase tracking-wider text-[#F0F4F8]">{"Principais Indicadores Inclusos"}</h4>
<ul className="mt-3 space-y-2.5 text-sm text-[#CBD5E1]" id="modal-indicators"><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Taxa de ocupação por ala (UTI, enfermaria, PS)"}</span></li><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Tempo médio de permanência e reinternação"}</span></li><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Produtividade cirúrgica, exames e fila de espera"}</span></li><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Faturamento hospitalar e glosas por convênio"}</span></li></ul>
</div>
<div className="space-y-4">
<div >
<h4 className="text-xs font-semibold uppercase tracking-wider text-[#F0F4F8]">{"Impacto na Gestão"}</h4>
<ul className="mt-3 space-y-2" id="modal-impact"><li className="rounded-lg border border-[#1A2430] bg-[#10161E] px-3.5 py-2.5 text-xs text-[#CBD5E1]">{"Melhor alocação de leitos e redução de espera"}</li><li className="rounded-lg border border-[#1A2430] bg-[#10161E] px-3.5 py-2.5 text-xs text-[#CBD5E1]">{"Governança sobre glosas e previsibilidade de receita"}</li></ul>
</div>
<div className="grid grid-cols-2 gap-3">
<div className="rounded-xl border border-[#1A2430] bg-[#10161E] p-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Prazo Médio"}</p><p className="mt-1 text-sm font-semibold text-[#F0F4F8]" id="modal-time">{"3 a 4 semanas"}</p></div>
<div className="rounded-xl border border-[#1A2430] bg-[#10161E] p-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Integrações"}</p><p className="mt-1 text-xs font-medium text-[#CBD5E1]" id="modal-sources">{"Tasy / MV • Oracle / SQL"}</p></div>
</div>
</div>
</div>
</div>
</div>
<div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#1A232F] bg-[#0B1016] px-6 py-4">
<a className="inline-flex items-center gap-2 rounded-full border border-[#283647] bg-[#111720] px-4 py-2 text-xs font-medium text-[#E2E8F0] hover:border-[#A3E635]/60 hover:text-[#A3E635]" href="https://app.powerbi.com/reportEmbed?reportId=f3c9dc29-80ac-46ba-a457-1038e4fec79e&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" id="modal-pbi-link" rel="noreferrer" target="_blank">{"Abrir no Power BI ↗"}</a>
<Button className="cursor-pointer rounded-full bg-[#A3E635] px-5 py-2.5 text-xs font-semibold text-[#090C10] hover:bg-[#BEF264]" id="modal-cta-btn" onClick={()=>{closeModal();selectSegmentAndScroll("Hospitalar");}} type="button" variant="imported" size="imported">{"Solicitar proposta para Hospitalar →"}</Button>
</div>
</div>
</div>)}{modal === "producao" && (<div id="dashboard-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-5" onClick={closeModal}>
<div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#243140] bg-[#0D1218] shadow-2xl" onClick={(e) => { e.stopPropagation(); }}>
<div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#1A232F] px-6 py-4">
<div >
<p className="font-mono-data text-[10px] uppercase tracking-[0.18em] text-[#A3E635]" id="modal-tag">{"INDÚSTRIA • Projeto Real em Power BI"}</p>
<h3 className="font-editorial mt-1 text-3xl text-[#F0F4F8]" id="modal-title">{"Dashboard de Produção"}</h3>
</div>
<div className="flex items-center gap-2.5">
<div className="inline-flex rounded-lg border border-[#1E2835] bg-[#090C10] p-1">
<Button className="cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium text-[#8B9BB0] hover:text-white" id="tab-pbi" type="button" variant="imported" size="imported" onClick={(e) => { switchModalTab('powerbi'); }}>{"Power BI Ao Vivo"}</Button>
<Button className="cursor-pointer rounded-md bg-[#A3E635] px-3 py-1.5 text-xs font-semibold text-[#090C10]" id="tab-ov" type="button" variant="imported" size="imported" onClick={(e) => { switchModalTab('overview'); }}>{"Indicadores & Escopo"}</Button>
</div>
<Button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#1E2835] bg-[#111720] text-[#94A3B8] hover:text-white" type="button" variant="imported" size="imported" onClick={(e) => { closeModal(); }} aria-label="Fechar dashboard">{"✕"}</Button>
</div>
</div>
<div className="flex-1 overflow-y-auto p-5 sm:p-6">

<div className="space-y-4" id="modal-view-powerbi" hidden={modalTab !== "powerbi"}>
<div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[#1E2835] bg-[#070A0E]">
{modalTab === "powerbi" && (<iframe allowFullScreen className="h-full w-full border-0" id="modal-pbi-iframe" src="https://app.powerbi.com/reportEmbed?reportId=40849204-011c-49b7-9a58-7af3e7dc1501&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" title="Relatório Power BI"></iframe>)}
</div>
<div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#1A2430] bg-[#0A0E14] px-4 py-3 text-xs text-[#94A3B8]">
<span >{"Caso o preview restrinja iframes externos ou peça login Microsoft, clique para abrir o relatório em tela cheia."}</span>
<a className="font-semibold text-[#A3E635] hover:text-[#BEF264]" href="https://app.powerbi.com/reportEmbed?reportId=40849204-011c-49b7-9a58-7af3e7dc1501&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" id="modal-pbi-ext-top" rel="noreferrer" target="_blank">{"Abrir relatório em nova aba ↗"}</a>
</div>
</div>

<div className="space-y-6" id="modal-view-overview" hidden={modalTab !== "overview"}>
<div className="rounded-xl border border-[#1B2532] bg-[#090D12] p-5">
<div className="grid grid-cols-3 gap-3" id="modal-kpis"><div className="rounded-xl border border-[#1A2430] bg-[#0F151D] px-4 py-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"OEE Global"}</p><p className="font-mono-data mt-1 text-lg font-semibold text-[#F0F4F8]">{"84,6%"}</p></div><div className="rounded-xl border border-[#1A2430] bg-[#0F151D] px-4 py-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Refugo"}</p><p className="font-mono-data mt-1 text-lg font-semibold text-[#F0F4F8]">{"1,3%"}</p></div><div className="rounded-xl border border-[#1A2430] bg-[#0F151D] px-4 py-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Disponib."}</p><p className="font-mono-data mt-1 text-lg font-semibold text-[#F0F4F8]">{"92,1%"}</p></div></div>
<div className="mt-4 rounded-xl border border-[#1A2430] bg-[#0D1218] p-4">
<div className="mb-3 flex items-center justify-between">
<span className="text-xs font-medium text-[#CBD5E1]">{"Desempenho Consolidado (Exemplo de Estrutura)"}</span>
<span className="font-mono-data text-[10px] text-[#A3E635]">{"Power BI + Atualização Automática"}</span>
</div>
<div className="flex h-28 items-end justify-between gap-2" id="modal-bars"><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "70%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Jan"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "64%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Fev"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "79%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Mar"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "53%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Abr"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]" style={{"height": "92%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Mai"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "73%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Jun"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]" style={{"height": "100%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Jul"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "86%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Ago"}</span></div></div>
</div>
</div>
<div className="grid gap-6 md:grid-cols-2">
<div >
<h4 className="text-xs font-semibold uppercase tracking-wider text-[#F0F4F8]">{"Principais Indicadores Inclusos"}</h4>
<ul className="mt-3 space-y-2.5 text-sm text-[#CBD5E1]" id="modal-indicators"><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"OEE completo: Disponibilidade, Performance e Qualidade"}</span></li><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Pareto de motivos de parada por máquina"}</span></li><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Volume produzido vs. planejado por turno e linha"}</span></li><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Índice de refugo e custo de perda industrial"}</span></li></ul>
</div>
<div className="space-y-4">
<div >
<h4 className="text-xs font-semibold uppercase tracking-wider text-[#F0F4F8]">{"Impacto na Gestão"}</h4>
<ul className="mt-3 space-y-2" id="modal-impact"><li className="rounded-lg border border-[#1A2430] bg-[#10161E] px-3.5 py-2.5 text-xs text-[#CBD5E1]">{"Mais capacidade produtiva sem novos investimentos"}</li><li className="rounded-lg border border-[#1A2430] bg-[#10161E] px-3.5 py-2.5 text-xs text-[#CBD5E1]">{"Gestão à vista em TVs de chão de fábrica"}</li></ul>
</div>
<div className="grid grid-cols-2 gap-3">
<div className="rounded-xl border border-[#1A2430] bg-[#10161E] p-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Prazo Médio"}</p><p className="mt-1 text-sm font-semibold text-[#F0F4F8]" id="modal-time">{"2 a 4 semanas"}</p></div>
<div className="rounded-xl border border-[#1A2430] bg-[#10161E] p-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Integrações"}</p><p className="mt-1 text-xs font-medium text-[#CBD5E1]" id="modal-sources">{"MES • ERP Industrial • SQL"}</p></div>
</div>
</div>
</div>
</div>
</div>
<div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#1A232F] bg-[#0B1016] px-6 py-4">
<a className="inline-flex items-center gap-2 rounded-full border border-[#283647] bg-[#111720] px-4 py-2 text-xs font-medium text-[#E2E8F0] hover:border-[#A3E635]/60 hover:text-[#A3E635]" href="https://app.powerbi.com/reportEmbed?reportId=40849204-011c-49b7-9a58-7af3e7dc1501&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" id="modal-pbi-link" rel="noreferrer" target="_blank">{"Abrir no Power BI ↗"}</a>
<Button className="cursor-pointer rounded-full bg-[#A3E635] px-5 py-2.5 text-xs font-semibold text-[#090C10] hover:bg-[#BEF264]" id="modal-cta-btn" onClick={()=>{closeModal();selectSegmentAndScroll("Produção");}} type="button" variant="imported" size="imported">{"Solicitar proposta para Produção →"}</Button>
</div>
</div>
</div>)}{modal === "vendas" && (<div id="dashboard-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-5" onClick={closeModal}>
<div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#243140] bg-[#0D1218] shadow-2xl" onClick={(e) => { e.stopPropagation(); }}>
<div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#1A232F] px-6 py-4">
<div >
<p className="font-mono-data text-[10px] uppercase tracking-[0.18em] text-[#A3E635]" id="modal-tag">{"COMERCIAL • Projeto Real em Power BI"}</p>
<h3 className="font-editorial mt-1 text-3xl text-[#F0F4F8]" id="modal-title">{"Dashboard de Vendas"}</h3>
</div>
<div className="flex items-center gap-2.5">
<div className="inline-flex rounded-lg border border-[#1E2835] bg-[#090C10] p-1">
<Button className="cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium text-[#8B9BB0] hover:text-white" id="tab-pbi" type="button" variant="imported" size="imported" onClick={(e) => { switchModalTab('powerbi'); }}>{"Power BI Ao Vivo"}</Button>
<Button className="cursor-pointer rounded-md bg-[#A3E635] px-3 py-1.5 text-xs font-semibold text-[#090C10]" id="tab-ov" type="button" variant="imported" size="imported" onClick={(e) => { switchModalTab('overview'); }}>{"Indicadores & Escopo"}</Button>
</div>
<Button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#1E2835] bg-[#111720] text-[#94A3B8] hover:text-white" type="button" variant="imported" size="imported" onClick={(e) => { closeModal(); }} aria-label="Fechar dashboard">{"✕"}</Button>
</div>
</div>
<div className="flex-1 overflow-y-auto p-5 sm:p-6">

<div className="space-y-4" id="modal-view-powerbi" hidden={modalTab !== "powerbi"}>
<div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[#1E2835] bg-[#070A0E]">
{modalTab === "powerbi" && (<iframe allowFullScreen className="h-full w-full border-0" id="modal-pbi-iframe" src="https://app.powerbi.com/reportEmbed?reportId=e3b8491b-9d8c-4de5-b39b-f0ba9855d0a6&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" title="Relatório Power BI"></iframe>)}
</div>
<div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#1A2430] bg-[#0A0E14] px-4 py-3 text-xs text-[#94A3B8]">
<span >{"Caso o preview restrinja iframes externos ou peça login Microsoft, clique para abrir o relatório em tela cheia."}</span>
<a className="font-semibold text-[#A3E635] hover:text-[#BEF264]" href="https://app.powerbi.com/reportEmbed?reportId=e3b8491b-9d8c-4de5-b39b-f0ba9855d0a6&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" id="modal-pbi-ext-top" rel="noreferrer" target="_blank">{"Abrir relatório em nova aba ↗"}</a>
</div>
</div>

<div className="space-y-6" id="modal-view-overview" hidden={modalTab !== "overview"}>
<div className="rounded-xl border border-[#1B2532] bg-[#090D12] p-5">
<div className="grid grid-cols-3 gap-3" id="modal-kpis"><div className="rounded-xl border border-[#1A2430] bg-[#0F151D] px-4 py-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Faturamento"}</p><p className="font-mono-data mt-1 text-lg font-semibold text-[#F0F4F8]">{"R$ 1,92M"}</p></div><div className="rounded-xl border border-[#1A2430] bg-[#0F151D] px-4 py-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Meta"}</p><p className="font-mono-data mt-1 text-lg font-semibold text-[#F0F4F8]">{"112%"}</p></div><div className="rounded-xl border border-[#1A2430] bg-[#0F151D] px-4 py-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Conversão"}</p><p className="font-mono-data mt-1 text-lg font-semibold text-[#F0F4F8]">{"29,8%"}</p></div></div>
<div className="mt-4 rounded-xl border border-[#1A2430] bg-[#0D1218] p-4">
<div className="mb-3 flex items-center justify-between">
<span className="text-xs font-medium text-[#CBD5E1]">{"Desempenho Consolidado (Exemplo de Estrutura)"}</span>
<span className="font-mono-data text-[10px] text-[#A3E635]">{"Power BI + Atualização Automática"}</span>
</div>
<div className="flex h-28 items-end justify-between gap-2" id="modal-bars"><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]" style={{"height": "96%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Jan"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "67%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Fev"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "59%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Mar"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]" style={{"height": "100%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Abr"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "74%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Mai"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]" style={{"height": "91%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Jun"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "61%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Jul"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "48%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Ago"}</span></div></div>
</div>
</div>
<div className="grid gap-6 md:grid-cols-2">
<div >
<h4 className="text-xs font-semibold uppercase tracking-wider text-[#F0F4F8]">{"Principais Indicadores Inclusos"}</h4>
<ul className="mt-3 space-y-2.5 text-sm text-[#CBD5E1]" id="modal-indicators"><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Faturamento realizado vs. meta (diário, mensal, YoY)"}</span></li><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Ranking de vendedores, filiais e canais"}</span></li><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Curva ABC de produtos, clientes ativos e churn"}</span></li><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Funil de vendas e ciclo médio de fechamento"}</span></li></ul>
</div>
<div className="space-y-4">
<div >
<h4 className="text-xs font-semibold uppercase tracking-wider text-[#F0F4F8]">{"Impacto na Gestão"}</h4>
<ul className="mt-3 space-y-2" id="modal-impact"><li className="rounded-lg border border-[#1A2430] bg-[#10161E] px-3.5 py-2.5 text-xs text-[#CBD5E1]">{"Direcionamento comercial para contas de maior margem"}</li><li className="rounded-lg border border-[#1A2430] bg-[#10161E] px-3.5 py-2.5 text-xs text-[#CBD5E1]">{"Visibilidade diária de metas sem esperar fim do mês"}</li></ul>
</div>
<div className="grid grid-cols-2 gap-3">
<div className="rounded-xl border border-[#1A2430] bg-[#10161E] p-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Prazo Médio"}</p><p className="mt-1 text-sm font-semibold text-[#F0F4F8]" id="modal-time">{"2 semanas"}</p></div>
<div className="rounded-xl border border-[#1A2430] bg-[#10161E] p-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Integrações"}</p><p className="mt-1 text-xs font-medium text-[#CBD5E1]" id="modal-sources">{"CRM • ERP Comercial • APIs"}</p></div>
</div>
</div>
</div>
</div>
</div>
<div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#1A232F] bg-[#0B1016] px-6 py-4">
<a className="inline-flex items-center gap-2 rounded-full border border-[#283647] bg-[#111720] px-4 py-2 text-xs font-medium text-[#E2E8F0] hover:border-[#A3E635]/60 hover:text-[#A3E635]" href="https://app.powerbi.com/reportEmbed?reportId=e3b8491b-9d8c-4de5-b39b-f0ba9855d0a6&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" id="modal-pbi-link" rel="noreferrer" target="_blank">{"Abrir no Power BI ↗"}</a>
<Button className="cursor-pointer rounded-full bg-[#A3E635] px-5 py-2.5 text-xs font-semibold text-[#090C10] hover:bg-[#BEF264]" id="modal-cta-btn" onClick={()=>{closeModal();selectSegmentAndScroll("Vendas");}} type="button" variant="imported" size="imported">{"Solicitar proposta para Vendas →"}</Button>
</div>
</div>
</div>)}{modal === "telemarketing" && (<div id="dashboard-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-5" onClick={closeModal}>
<div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#243140] bg-[#0D1218] shadow-2xl" onClick={(e) => { e.stopPropagation(); }}>
<div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#1A232F] px-6 py-4">
<div >
<p className="font-mono-data text-[10px] uppercase tracking-[0.18em] text-[#A3E635]" id="modal-tag">{"CONTACT CENTER • Projeto Real em Power BI"}</p>
<h3 className="font-editorial mt-1 text-3xl text-[#F0F4F8]" id="modal-title">{"Dashboard de Telemarketing"}</h3>
</div>
<div className="flex items-center gap-2.5">
<div className="inline-flex rounded-lg border border-[#1E2835] bg-[#090C10] p-1">
<Button className="cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium text-[#8B9BB0] hover:text-white" id="tab-pbi" type="button" variant="imported" size="imported" onClick={(e) => { switchModalTab('powerbi'); }}>{"Power BI Ao Vivo"}</Button>
<Button className="cursor-pointer rounded-md bg-[#A3E635] px-3 py-1.5 text-xs font-semibold text-[#090C10]" id="tab-ov" type="button" variant="imported" size="imported" onClick={(e) => { switchModalTab('overview'); }}>{"Indicadores & Escopo"}</Button>
</div>
<Button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#1E2835] bg-[#111720] text-[#94A3B8] hover:text-white" type="button" variant="imported" size="imported" onClick={(e) => { closeModal(); }} aria-label="Fechar dashboard">{"✕"}</Button>
</div>
</div>
<div className="flex-1 overflow-y-auto p-5 sm:p-6">

<div className="space-y-4" id="modal-view-powerbi" hidden={modalTab !== "powerbi"}>
<div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[#1E2835] bg-[#070A0E]">
{modalTab === "powerbi" && (<iframe allowFullScreen className="h-full w-full border-0" id="modal-pbi-iframe" src="https://app.powerbi.com/reportEmbed?reportId=6db77ebf-cd48-4903-94fc-e87710b5e195&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" title="Relatório Power BI"></iframe>)}
</div>
<div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#1A2430] bg-[#0A0E14] px-4 py-3 text-xs text-[#94A3B8]">
<span >{"Caso o preview restrinja iframes externos ou peça login Microsoft, clique para abrir o relatório em tela cheia."}</span>
<a className="font-semibold text-[#A3E635] hover:text-[#BEF264]" href="https://app.powerbi.com/reportEmbed?reportId=6db77ebf-cd48-4903-94fc-e87710b5e195&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" id="modal-pbi-ext-top" rel="noreferrer" target="_blank">{"Abrir relatório em nova aba ↗"}</a>
</div>
</div>

<div className="space-y-6" id="modal-view-overview" hidden={modalTab !== "overview"}>
<div className="rounded-xl border border-[#1B2532] bg-[#090D12] p-5">
<div className="grid grid-cols-3 gap-3" id="modal-kpis"><div className="rounded-xl border border-[#1A2430] bg-[#0F151D] px-4 py-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"TMA"}</p><p className="font-mono-data mt-1 text-lg font-semibold text-[#F0F4F8]">{"3m 42s"}</p></div><div className="rounded-xl border border-[#1A2430] bg-[#0F151D] px-4 py-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Nível Serv."}</p><p className="font-mono-data mt-1 text-lg font-semibold text-[#F0F4F8]">{"91,5%"}</p></div><div className="rounded-xl border border-[#1A2430] bg-[#0F151D] px-4 py-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Conversão"}</p><p className="font-mono-data mt-1 text-lg font-semibold text-[#F0F4F8]">{"18,4%"}</p></div></div>
<div className="mt-4 rounded-xl border border-[#1A2430] bg-[#0D1218] p-4">
<div className="mb-3 flex items-center justify-between">
<span className="text-xs font-medium text-[#CBD5E1]">{"Desempenho Consolidado (Exemplo de Estrutura)"}</span>
<span className="font-mono-data text-[10px] text-[#A3E635]">{"Power BI + Atualização Automática"}</span>
</div>
<div className="flex h-28 items-end justify-between gap-2" id="modal-bars"><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "54%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Jan"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "83%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Fev"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]" style={{"height": "91%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Mar"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "67%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Abr"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]" style={{"height": "100%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Mai"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "87%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Jun"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "78%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Jul"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "70%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Ago"}</span></div></div>
</div>
</div>
<div className="grid gap-6 md:grid-cols-2">
<div >
<h4 className="text-xs font-semibold uppercase tracking-wider text-[#F0F4F8]">{"Principais Indicadores Inclusos"}</h4>
<ul className="mt-3 space-y-2.5 text-sm text-[#CBD5E1]" id="modal-indicators"><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"TMA, TME e taxa de abandono por fila"}</span></li><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Atendimentos por hora, célula e operador"}</span></li><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Conversão e resolução no 1º contato"}</span></li><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Aderência à escala e CSAT/NPS"}</span></li></ul>
</div>
<div className="space-y-4">
<div >
<h4 className="text-xs font-semibold uppercase tracking-wider text-[#F0F4F8]">{"Impacto na Gestão"}</h4>
<ul className="mt-3 space-y-2" id="modal-impact"><li className="rounded-lg border border-[#1A2430] bg-[#10161E] px-3.5 py-2.5 text-xs text-[#CBD5E1]">{"Aumento na conversão por agente e menos abandono"}</li><li className="rounded-lg border border-[#1A2430] bg-[#10161E] px-3.5 py-2.5 text-xs text-[#CBD5E1]">{"Acompanhamento intra-hora para supervisão"}</li></ul>
</div>
<div className="grid grid-cols-2 gap-3">
<div className="rounded-xl border border-[#1A2430] bg-[#10161E] p-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Prazo Médio"}</p><p className="mt-1 text-sm font-semibold text-[#F0F4F8]" id="modal-time">{"2 semanas"}</p></div>
<div className="rounded-xl border border-[#1A2430] bg-[#10161E] p-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Integrações"}</p><p className="mt-1 text-xs font-medium text-[#CBD5E1]" id="modal-sources">{"PABX / Discador • Omnichannel"}</p></div>
</div>
</div>
</div>
</div>
</div>
<div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#1A232F] bg-[#0B1016] px-6 py-4">
<a className="inline-flex items-center gap-2 rounded-full border border-[#283647] bg-[#111720] px-4 py-2 text-xs font-medium text-[#E2E8F0] hover:border-[#A3E635]/60 hover:text-[#A3E635]" href="https://app.powerbi.com/reportEmbed?reportId=6db77ebf-cd48-4903-94fc-e87710b5e195&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" id="modal-pbi-link" rel="noreferrer" target="_blank">{"Abrir no Power BI ↗"}</a>
<Button className="cursor-pointer rounded-full bg-[#A3E635] px-5 py-2.5 text-xs font-semibold text-[#090C10] hover:bg-[#BEF264]" id="modal-cta-btn" onClick={()=>{closeModal();selectSegmentAndScroll("Telemarketing");}} type="button" variant="imported" size="imported">{"Solicitar proposta para Telemarketing →"}</Button>
</div>
</div>
</div>)}{modal === "obra-financas" && (<div id="dashboard-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-5" onClick={closeModal}>
<div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#243140] bg-[#0D1218] shadow-2xl" onClick={(e) => { e.stopPropagation(); }}>
<div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#1A232F] px-6 py-4">
<div >
<p className="font-mono-data text-[10px] uppercase tracking-[0.18em] text-[#A3E635]" id="modal-tag">{"ENGENHARIA • Projeto Real em Power BI"}</p>
<h3 className="font-editorial mt-1 text-3xl text-[#F0F4F8]" id="modal-title">{"Dashboard de Evolução de Obra & Finanças"}</h3>
</div>
<div className="flex items-center gap-2.5">
<div className="inline-flex rounded-lg border border-[#1E2835] bg-[#090C10] p-1">
<Button className="cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium text-[#8B9BB0] hover:text-white" id="tab-pbi" type="button" variant="imported" size="imported" onClick={(e) => { switchModalTab('powerbi'); }}>{"Power BI Ao Vivo"}</Button>
<Button className="cursor-pointer rounded-md bg-[#A3E635] px-3 py-1.5 text-xs font-semibold text-[#090C10]" id="tab-ov" type="button" variant="imported" size="imported" onClick={(e) => { switchModalTab('overview'); }}>{"Indicadores & Escopo"}</Button>
</div>
<Button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#1E2835] bg-[#111720] text-[#94A3B8] hover:text-white" type="button" variant="imported" size="imported" onClick={(e) => { closeModal(); }} aria-label="Fechar dashboard">{"✕"}</Button>
</div>
</div>
<div className="flex-1 overflow-y-auto p-5 sm:p-6">

<div className="space-y-4" id="modal-view-powerbi" hidden={modalTab !== "powerbi"}>
<div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[#1E2835] bg-[#070A0E]">
{modalTab === "powerbi" && (<iframe allowFullScreen className="h-full w-full border-0" id="modal-pbi-iframe" src="https://app.powerbi.com/reportEmbed?reportId=aff9e01d-61ed-4064-99a9-9cc088eb8129&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" title="Relatório Power BI"></iframe>)}
</div>
<div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#1A2430] bg-[#0A0E14] px-4 py-3 text-xs text-[#94A3B8]">
<span >{"Caso o preview restrinja iframes externos ou peça login Microsoft, clique para abrir o relatório em tela cheia."}</span>
<a className="font-semibold text-[#A3E635] hover:text-[#BEF264]" href="https://app.powerbi.com/reportEmbed?reportId=aff9e01d-61ed-4064-99a9-9cc088eb8129&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" id="modal-pbi-ext-top" rel="noreferrer" target="_blank">{"Abrir relatório em nova aba ↗"}</a>
</div>
</div>

<div className="space-y-6" id="modal-view-overview" hidden={modalTab !== "overview"}>
<div className="rounded-xl border border-[#1B2532] bg-[#090D12] p-5">
<div className="grid grid-cols-3 gap-3" id="modal-kpis"><div className="rounded-xl border border-[#1A2430] bg-[#0F151D] px-4 py-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Avanço Fís."}</p><p className="font-mono-data mt-1 text-lg font-semibold text-[#F0F4F8]">{"68,5%"}</p></div><div className="rounded-xl border border-[#1A2430] bg-[#0F151D] px-4 py-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Desvio Orç."}</p><p className="font-mono-data mt-1 text-lg font-semibold text-[#F0F4F8]">{"-1,4%"}</p></div><div className="rounded-xl border border-[#1A2430] bg-[#0F151D] px-4 py-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Medições"}</p><p className="font-mono-data mt-1 text-lg font-semibold text-[#F0F4F8]">{"R$ 4,6M"}</p></div></div>
<div className="mt-4 rounded-xl border border-[#1A2430] bg-[#0D1218] p-4">
<div className="mb-3 flex items-center justify-between">
<span className="text-xs font-medium text-[#CBD5E1]">{"Desempenho Consolidado (Exemplo de Estrutura)"}</span>
<span className="font-mono-data text-[10px] text-[#A3E635]">{"Power BI + Atualização Automática"}</span>
</div>
<div className="flex h-28 items-end justify-between gap-2" id="modal-bars"><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]" style={{"height": "93%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Jan"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "84%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Fev"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "77%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Mar"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "68%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Abr"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "59%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Mai"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "50%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Jun"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]" style={{"height": "100%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Jul"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]" style={{"height": "89%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Ago"}</span></div></div>
</div>
</div>
<div className="grid gap-6 md:grid-cols-2">
<div >
<h4 className="text-xs font-semibold uppercase tracking-wider text-[#F0F4F8]">{"Principais Indicadores Inclusos"}</h4>
<ul className="mt-3 space-y-2.5 text-sm text-[#CBD5E1]" id="modal-indicators"><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Curva S físico-financeira por etapa da obra"}</span></li><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Orçamento por centro de custo e empreiteiro"}</span></li><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Desembolsos, medições e saldo a executar"}</span></li><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Alertas de estouro de verba e prazos"}</span></li></ul>
</div>
<div className="space-y-4">
<div >
<h4 className="text-xs font-semibold uppercase tracking-wider text-[#F0F4F8]">{"Impacto na Gestão"}</h4>
<ul className="mt-3 space-y-2" id="modal-impact"><li className="rounded-lg border border-[#1A2430] bg-[#10161E] px-3.5 py-2.5 text-xs text-[#CBD5E1]">{"Controle rigoroso de margens em obras simultâneas"}</li><li className="rounded-lg border border-[#1A2430] bg-[#10161E] px-3.5 py-2.5 text-xs text-[#CBD5E1]">{"Prevenção de estouros orçamentários"}</li></ul>
</div>
<div className="grid grid-cols-2 gap-3">
<div className="rounded-xl border border-[#1A2430] bg-[#10161E] p-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Prazo Médio"}</p><p className="mt-1 text-sm font-semibold text-[#F0F4F8]" id="modal-time">{"3 semanas"}</p></div>
<div className="rounded-xl border border-[#1A2430] bg-[#10161E] p-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Integrações"}</p><p className="mt-1 text-xs font-medium text-[#CBD5E1]" id="modal-sources">{"Sienge / Mega • MS Project"}</p></div>
</div>
</div>
</div>
</div>
</div>
<div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#1A232F] bg-[#0B1016] px-6 py-4">
<a className="inline-flex items-center gap-2 rounded-full border border-[#283647] bg-[#111720] px-4 py-2 text-xs font-medium text-[#E2E8F0] hover:border-[#A3E635]/60 hover:text-[#A3E635]" href="https://app.powerbi.com/reportEmbed?reportId=aff9e01d-61ed-4064-99a9-9cc088eb8129&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" id="modal-pbi-link" rel="noreferrer" target="_blank">{"Abrir no Power BI ↗"}</a>
<Button className="cursor-pointer rounded-full bg-[#A3E635] px-5 py-2.5 text-xs font-semibold text-[#090C10] hover:bg-[#BEF264]" id="modal-cta-btn" onClick={()=>{closeModal();selectSegmentAndScroll("Evolução de Obra & Finanças");}} type="button" variant="imported" size="imported">{"Solicitar proposta para Evolução de Obra & Finanças →"}</Button>
</div>
</div>
</div>)}{modal === "operacional" && (<div id="dashboard-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-5" onClick={closeModal}>
<div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#243140] bg-[#0D1218] shadow-2xl" onClick={(e) => { e.stopPropagation(); }}>
<div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#1A232F] px-6 py-4">
<div >
<p className="font-mono-data text-[10px] uppercase tracking-[0.18em] text-[#A3E635]" id="modal-tag">{"GESTÃO • Projeto Real em Power BI"}</p>
<h3 className="font-editorial mt-1 text-3xl text-[#F0F4F8]" id="modal-title">{"Dashboard de Operacional"}</h3>
</div>
<div className="flex items-center gap-2.5">
<div className="inline-flex rounded-lg border border-[#1E2835] bg-[#090C10] p-1">
<Button className="cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium text-[#8B9BB0] hover:text-white" id="tab-pbi" type="button" variant="imported" size="imported" onClick={(e) => { switchModalTab('powerbi'); }}>{"Power BI Ao Vivo"}</Button>
<Button className="cursor-pointer rounded-md bg-[#A3E635] px-3 py-1.5 text-xs font-semibold text-[#090C10]" id="tab-ov" type="button" variant="imported" size="imported" onClick={(e) => { switchModalTab('overview'); }}>{"Indicadores & Escopo"}</Button>
</div>
<Button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#1E2835] bg-[#111720] text-[#94A3B8] hover:text-white" type="button" variant="imported" size="imported" onClick={(e) => { closeModal(); }} aria-label="Fechar dashboard">{"✕"}</Button>
</div>
</div>
<div className="flex-1 overflow-y-auto p-5 sm:p-6">

<div className="space-y-4" id="modal-view-powerbi" hidden={modalTab !== "powerbi"}>
<div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[#1E2835] bg-[#070A0E]">
{modalTab === "powerbi" && (<iframe allowFullScreen className="h-full w-full border-0" id="modal-pbi-iframe" src="https://app.powerbi.com/reportEmbed?reportId=573585de-6b23-4e8c-999c-e6d83f0c3915&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" title="Relatório Power BI"></iframe>)}
</div>
<div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#1A2430] bg-[#0A0E14] px-4 py-3 text-xs text-[#94A3B8]">
<span >{"Caso o preview restrinja iframes externos ou peça login Microsoft, clique para abrir o relatório em tela cheia."}</span>
<a className="font-semibold text-[#A3E635] hover:text-[#BEF264]" href="https://app.powerbi.com/reportEmbed?reportId=573585de-6b23-4e8c-999c-e6d83f0c3915&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" id="modal-pbi-ext-top" rel="noreferrer" target="_blank">{"Abrir relatório em nova aba ↗"}</a>
</div>
</div>

<div className="space-y-6" id="modal-view-overview" hidden={modalTab !== "overview"}>
<div className="rounded-xl border border-[#1B2532] bg-[#090D12] p-5">
<div className="grid grid-cols-3 gap-3" id="modal-kpis"><div className="rounded-xl border border-[#1A2430] bg-[#0F151D] px-4 py-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"SLA Interno"}</p><p className="font-mono-data mt-1 text-lg font-semibold text-[#F0F4F8]">{"95,2%"}</p></div><div className="rounded-xl border border-[#1A2430] bg-[#0F151D] px-4 py-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Backlog"}</p><p className="font-mono-data mt-1 text-lg font-semibold text-[#F0F4F8]">{"34"}</p></div><div className="rounded-xl border border-[#1A2430] bg-[#0F151D] px-4 py-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Eficiência"}</p><p className="font-mono-data mt-1 text-lg font-semibold text-[#F0F4F8]">{"89%"}</p></div></div>
<div className="mt-4 rounded-xl border border-[#1A2430] bg-[#0D1218] p-4">
<div className="mb-3 flex items-center justify-between">
<span className="text-xs font-medium text-[#CBD5E1]">{"Desempenho Consolidado (Exemplo de Estrutura)"}</span>
<span className="font-mono-data text-[10px] text-[#A3E635]">{"Power BI + Atualização Automática"}</span>
</div>
<div className="flex h-28 items-end justify-between gap-2" id="modal-bars"><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "54%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Jan"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "63%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Fev"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "71%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Mar"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "76%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Abr"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "80%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Mai"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "85%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Jun"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]" style={{"height": "90%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Jul"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]" style={{"height": "100%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Ago"}</span></div></div>
</div>
</div>
<div className="grid gap-6 md:grid-cols-2">
<div >
<h4 className="text-xs font-semibold uppercase tracking-wider text-[#F0F4F8]">{"Principais Indicadores Inclusos"}</h4>
<ul className="mt-3 space-y-2.5 text-sm text-[#CBD5E1]" id="modal-indicators"><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Demandas abertas, concluídas e backlog por área"}</span></li><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Cumprimento de SLA por prioridade"}</span></li><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Capacidade utilizada vs. disponível"}</span></li><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Painel executivo de OKRs semanais"}</span></li></ul>
</div>
<div className="space-y-4">
<div >
<h4 className="text-xs font-semibold uppercase tracking-wider text-[#F0F4F8]">{"Impacto na Gestão"}</h4>
<ul className="mt-3 space-y-2" id="modal-impact"><li className="rounded-lg border border-[#1A2430] bg-[#10161E] px-3.5 py-2.5 text-xs text-[#CBD5E1]">{"Eliminação de gargalos entre departamentos"}</li><li className="rounded-lg border border-[#1A2430] bg-[#10161E] px-3.5 py-2.5 text-xs text-[#CBD5E1]">{"Reuniões semanais guiadas 100% por fatos"}</li></ul>
</div>
<div className="grid grid-cols-2 gap-3">
<div className="rounded-xl border border-[#1A2430] bg-[#10161E] p-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Prazo Médio"}</p><p className="mt-1 text-sm font-semibold text-[#F0F4F8]" id="modal-time">{"2 semanas"}</p></div>
<div className="rounded-xl border border-[#1A2430] bg-[#10161E] p-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Integrações"}</p><p className="mt-1 text-xs font-medium text-[#CBD5E1]" id="modal-sources">{"Jira / Pipefy • ERP • APIs"}</p></div>
</div>
</div>
</div>
</div>
</div>
<div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#1A232F] bg-[#0B1016] px-6 py-4">
<a className="inline-flex items-center gap-2 rounded-full border border-[#283647] bg-[#111720] px-4 py-2 text-xs font-medium text-[#E2E8F0] hover:border-[#A3E635]/60 hover:text-[#A3E635]" href="https://app.powerbi.com/reportEmbed?reportId=573585de-6b23-4e8c-999c-e6d83f0c3915&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" id="modal-pbi-link" rel="noreferrer" target="_blank">{"Abrir no Power BI ↗"}</a>
<Button className="cursor-pointer rounded-full bg-[#A3E635] px-5 py-2.5 text-xs font-semibold text-[#090C10] hover:bg-[#BEF264]" id="modal-cta-btn" onClick={()=>{closeModal();selectSegmentAndScroll("Operacional");}} type="button" variant="imported" size="imported">{"Solicitar proposta para Operacional →"}</Button>
</div>
</div>
</div>)}{modal === "financeiro" && (<div id="dashboard-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-5" onClick={closeModal}>
<div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#243140] bg-[#0D1218] shadow-2xl" onClick={(e) => { e.stopPropagation(); }}>
<div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#1A232F] px-6 py-4">
<div >
<p className="font-mono-data text-[10px] uppercase tracking-[0.18em] text-[#A3E635]" id="modal-tag">{"FINANÇAS • Projeto Real em Power BI"}</p>
<h3 className="font-editorial mt-1 text-3xl text-[#F0F4F8]" id="modal-title">{"Dashboard de Financeiro"}</h3>
</div>
<div className="flex items-center gap-2.5">
<div className="inline-flex rounded-lg border border-[#1E2835] bg-[#090C10] p-1">
<Button className="cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium text-[#8B9BB0] hover:text-white" id="tab-pbi" type="button" variant="imported" size="imported" onClick={(e) => { switchModalTab('powerbi'); }}>{"Power BI Ao Vivo"}</Button>
<Button className="cursor-pointer rounded-md bg-[#A3E635] px-3 py-1.5 text-xs font-semibold text-[#090C10]" id="tab-ov" type="button" variant="imported" size="imported" onClick={(e) => { switchModalTab('overview'); }}>{"Indicadores & Escopo"}</Button>
</div>
<Button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#1E2835] bg-[#111720] text-[#94A3B8] hover:text-white" type="button" variant="imported" size="imported" onClick={(e) => { closeModal(); }} aria-label="Fechar dashboard">{"✕"}</Button>
</div>
</div>
<div className="flex-1 overflow-y-auto p-5 sm:p-6">

<div className="space-y-4" id="modal-view-powerbi" hidden={modalTab !== "powerbi"}>
<div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[#1E2835] bg-[#070A0E]">
{modalTab === "powerbi" && (<iframe allowFullScreen className="h-full w-full border-0" id="modal-pbi-iframe" src="https://app.powerbi.com/reportEmbed?reportId=fe422572-a98f-401d-91d3-2f5feff3e8d9&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" title="Relatório Power BI"></iframe>)}
</div>
<div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#1A2430] bg-[#0A0E14] px-4 py-3 text-xs text-[#94A3B8]">
<span >{"Caso o preview restrinja iframes externos ou peça login Microsoft, clique para abrir o relatório em tela cheia."}</span>
<a className="font-semibold text-[#A3E635] hover:text-[#BEF264]" href="https://app.powerbi.com/reportEmbed?reportId=fe422572-a98f-401d-91d3-2f5feff3e8d9&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" id="modal-pbi-ext-top" rel="noreferrer" target="_blank">{"Abrir relatório em nova aba ↗"}</a>
</div>
</div>

<div className="space-y-6" id="modal-view-overview" hidden={modalTab !== "overview"}>
<div className="rounded-xl border border-[#1B2532] bg-[#090D12] p-5">
<div className="grid grid-cols-3 gap-3" id="modal-kpis"><div className="rounded-xl border border-[#1A2430] bg-[#0F151D] px-4 py-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"EBITDA"}</p><p className="font-mono-data mt-1 text-lg font-semibold text-[#F0F4F8]">{"26,8%"}</p></div><div className="rounded-xl border border-[#1A2430] bg-[#0F151D] px-4 py-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Caixa Proj."}</p><p className="font-mono-data mt-1 text-lg font-semibold text-[#F0F4F8]">{"R$ 890k"}</p></div><div className="rounded-xl border border-[#1A2430] bg-[#0F151D] px-4 py-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Margem Líq."}</p><p className="font-mono-data mt-1 text-lg font-semibold text-[#F0F4F8]">{"19,4%"}</p></div></div>
<div className="mt-4 rounded-xl border border-[#1A2430] bg-[#0D1218] p-4">
<div className="mb-3 flex items-center justify-between">
<span className="text-xs font-medium text-[#CBD5E1]">{"Desempenho Consolidado (Exemplo de Estrutura)"}</span>
<span className="font-mono-data text-[10px] text-[#A3E635]">{"Power BI + Atualização Automática"}</span>
</div>
<div className="flex h-28 items-end justify-between gap-2" id="modal-bars"><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "70%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Jan"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "78%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Fev"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]" style={{"height": "100%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Mar"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "59%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Abr"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "67%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Mai"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "83%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Jun"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "87%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Jul"}</span></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex h-24 w-full items-end"><div className="w-full rounded-t-md bg-[#A3E635]/35" style={{"height": "76%"}}></div></div><span className="font-mono-data text-[10px] text-[#64748B]">{"Ago"}</span></div></div>
</div>
</div>
<div className="grid gap-6 md:grid-cols-2">
<div >
<h4 className="text-xs font-semibold uppercase tracking-wider text-[#F0F4F8]">{"Principais Indicadores Inclusos"}</h4>
<ul className="mt-3 space-y-2.5 text-sm text-[#CBD5E1]" id="modal-indicators"><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"DRE gerencial dinâmica (competência e caixa)"}</span></li><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Fluxo de caixa diário e projetado (30/60/90d)"}</span></li><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Contas a pagar/receber, aging e inadimplência"}</span></li><li className="flex items-start gap-2"><span className="text-[#A3E635]">{"✓"}</span><span >{"Análise vertical/horizontal de despesas"}</span></li></ul>
</div>
<div className="space-y-4">
<div >
<h4 className="text-xs font-semibold uppercase tracking-wider text-[#F0F4F8]">{"Impacto na Gestão"}</h4>
<ul className="mt-3 space-y-2" id="modal-impact"><li className="rounded-lg border border-[#1A2430] bg-[#10161E] px-3.5 py-2.5 text-xs text-[#CBD5E1]">{"Clareza absoluta sobre lucro real e ponto de equilíbrio"}</li><li className="rounded-lg border border-[#1A2430] bg-[#10161E] px-3.5 py-2.5 text-xs text-[#CBD5E1]">{"Fim dos fechamentos manuais demorados em Excel"}</li></ul>
</div>
<div className="grid grid-cols-2 gap-3">
<div className="rounded-xl border border-[#1A2430] bg-[#10161E] p-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Prazo Médio"}</p><p className="mt-1 text-sm font-semibold text-[#F0F4F8]" id="modal-time">{"2 a 3 semanas"}</p></div>
<div className="rounded-xl border border-[#1A2430] bg-[#10161E] p-3"><p className="text-[10px] uppercase tracking-wider text-[#7D8C9F]">{"Integrações"}</p><p className="mt-1 text-xs font-medium text-[#CBD5E1]" id="modal-sources">{"Omie / TOTVS / SAP • SQL"}</p></div>
</div>
</div>
</div>
</div>
</div>
<div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#1A232F] bg-[#0B1016] px-6 py-4">
<a className="inline-flex items-center gap-2 rounded-full border border-[#283647] bg-[#111720] px-4 py-2 text-xs font-medium text-[#E2E8F0] hover:border-[#A3E635]/60 hover:text-[#A3E635]" href="https://app.powerbi.com/reportEmbed?reportId=fe422572-a98f-401d-91d3-2f5feff3e8d9&autoAuth=true&ctid=f398df9c-fd0c-4829-a003-c770a1c4a063" id="modal-pbi-link" rel="noreferrer" target="_blank">{"Abrir no Power BI ↗"}</a>
<Button className="cursor-pointer rounded-full bg-[#A3E635] px-5 py-2.5 text-xs font-semibold text-[#090C10] hover:bg-[#BEF264]" id="modal-cta-btn" onClick={()=>{closeModal();selectSegmentAndScroll("Financeiro");}} type="button" variant="imported" size="imported">{"Solicitar proposta para Financeiro →"}</Button>
</div>
</div>
</div>)}</>);}
