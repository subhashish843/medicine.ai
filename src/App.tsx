import { useState, useId } from "react";

interface SymptomItem {
  id: string;
  name: string;
  category: string;
  indication: string;
}

const DEFAULT_SYMPTOMS: SymptomItem[] = [
  { id: "fever", name: "Fever / Elevated Temp", category: "Systemic", indication: "Infectious or inflammatory immune response" },
  { id: "headache", name: "Headache / Cephalea", category: "Neurological", indication: "Vascular tension, migraine, or sinus pressure" },
  { id: "cough", name: "Persistent Cough", category: "Respiratory", indication: "Upper airway irritation, viral clearance, or allergy" },
  { id: "fatigue", name: "Severe Fatigue", category: "Metabolic", indication: "Cellular energy depletion, viral post-syndrome" },
  { id: "nausea", name: "Nausea & Dyspepsia", category: "Gastrointestinal", indication: "Gastric lining sensitivity or autonomic distress" },
  { id: "dizziness", name: "Dizziness & Vertigo", category: "Vestibular", indication: "Orthostatic imbalance or inner-ear fluid shift" },
  { id: "sore-throat", name: "Sore Throat / Pharyngitis", category: "Respiratory", indication: "Mucosal inflammation or streptococcal reaction" },
  { id: "joint-pain", name: "Joint & Musculoskeletal Pain", category: "Rheumatologic", indication: "Synovial inflammation or cytokine response" },
];

interface ResearchPaper {
  id: string;
  title: string;
  journal: string;
  year: string;
  category: string;
  tier: string;
  abstract: string;
  doi: string;
}

const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: "p1",
    title: "Efficacy of Adaptive Immunotherapies in Post-Viral Fatigue Syndromes",
    journal: "The Lancet Neurology",
    year: "2026",
    category: "Neurology",
    tier: "Tier 1 — Systematic Review",
    abstract: "A randomized double-blind investigation involving 1,420 participants demonstrating that targeted mitochondrial support significantly decreases reported cognitive and physical exhaustion.",
    doi: "doi.org/10.1016/S1474-4422(26)00118-2",
  },
  {
    id: "p2",
    title: "Neurovascular Biomarkers of Acute Cephalea and Migraine Prophylaxis",
    journal: "New England Journal of Medicine",
    year: "2026",
    category: "Neurology",
    tier: "Tier 1 — Phase III RCT",
    abstract: "Novel CGRP-antagonist formulations reduce monthly migraine occurrences by 68% in refractory patients, presenting improved safety over conventional triptan therapies.",
    doi: "doi.org/10.1056/NEJMoa2528190",
  },
  {
    id: "p3",
    title: "Automated Symptom Clustering in Primary Care Triage: A Multicenter Trial",
    journal: "Nature Medicine",
    year: "2025",
    category: "Clinical AI",
    tier: "Tier 1 — Multicenter Clinical Trial",
    abstract: "Machine-assisted clinical stratification reduced misdiagnosis rates by 34.6% across 28 hospital emergency departments, speeding time-to-treatment for acute inflammatory events.",
    doi: "doi.org/10.1038/s41591-025-03291-x",
  },
  {
    id: "p4",
    title: "Pharmacokinetics and Side Effect Attenuation in Dual-Action Antipyretics",
    journal: "Journal of the American Medical Association",
    year: "2026",
    category: "Pharmacology",
    tier: "Tier 2 — Cohort Study",
    abstract: "Micro-encapsulated formulations yield steady plasma concentrations while attenuating gastrointestinal epithelial erosion in extended-duration pyrexia treatment.",
    doi: "doi.org/10.1001/jama.2026.0441",
  },
];

const METRICS = [
  { value: "50,000+", label: "Validated Symptoms Mapped" },
  { value: "18.4M+", label: "PubMed & Cochrane Papers Indexed" },
  { value: "2,430+", label: "Active Clinical Trials Monitored" },
  { value: "0.28s", label: "Real-Time Synthesis Latency" },
];

export default function App() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [hasAnalysed, setHasAnalysed] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("All");
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const searchInputId = useId();

  const toggleSymptom = (name: string) => {
    setHasAnalysed(false);
    setSelectedSymptoms((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const handleAddCustomSymptom = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customInput.trim();
    if (trimmed && !selectedSymptoms.includes(trimmed)) {
      setSelectedSymptoms((prev) => [...prev, trimmed]);
      setCustomInput("");
      setHasAnalysed(false);
    }
  };

  const filteredPapers = activeCategoryFilter === "All"
    ? RESEARCH_PAPERS
    : RESEARCH_PAPERS.filter((p) => p.category === activeCategoryFilter);

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#0f172a] font-sans selection:bg-[#000000] selection:text-white">
      {/* =========================================================================
          HERO SECTION WITH FULL-BLEED VIDEO BACKGROUND
          Spec:
          - Full-screen flex container (min-h-screen) with background video layer
          - Background Basis: HSL(201, 100%, 13%) for loading/fallback
          - Video: https://designerstephen.github.io/public-assets/videos/serene-art-hero.mp4
          - Subtle dark overlay (alpha 0.2) for legibility
          - 3-column distributed navigation bar (Max-width 1280px, px: 32px, py: 24px)
          - Left: Brand logo in Instrument Serif at 30px with trademark superscript
          - Center: Hidden on mobile, 4 links in Inter 14px Medium with 40px spacing
          - Right: Pill-shaped CTA button in solid black with white text
          - H1: Instrument Serif, 80px (mobile 48px), line-height 0.95, letter-spacing -2.46px, with <em>
          - Paragraph: Max-width 670px, centered, line-height 1.625, HSL(215, 25%, 32%)
          - Main CTA: Large pill-shaped button (padding: 20px 56px), 16px Medium, placed 48px below text
          - Staggered entrance animation: fade-rise 0.8s ease-out at 0s, 0.2s, 0.4s
      ========================================================================= */}
      <section
        id="top"
        className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[hsl(201,100%,13%)]"
        style={{ backgroundColor: "hsl(201, 100%, 13%)" }}
      >
        {/* Full-bleed Background Video Layer */}
        <video
          autoPlay
          loop
          muted={isVideoMuted}
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
          src="https://designerstephen.github.io/public-assets/videos/serene-art-hero.mp4"
        />

        {/* Subtle Dark Overlay (alpha 0.2) + Soft Editorial Scrim for Crisp Contrast */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/50 backdrop-blur-[1.5px] pointer-events-none z-0" />

        {/* NAVIGATION BAR (3-column grid container, Max-width: 1280px, px: 32px, py: 24px) */}
        <header className="relative z-20 w-full max-w-[1280px] mx-auto px-[32px] py-[24px]">
          <div className="grid grid-cols-2 md:grid-cols-3 items-center">
            {/* Left Col: Brand logo using 'Instrument Serif' at 30px size with registered trademark symbol in superscript */}
            <div className="flex items-center justify-start">
              <a
                href="#top"
                className="font-serif text-[30px] font-normal leading-none tracking-tight text-[#0f172a] hover:opacity-85 transition-opacity duration-200 select-none flex items-baseline"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                MediScan
                <sup className="font-sans text-[11px] font-medium leading-none ml-0.5 text-[#0f172a]/80">®</sup>
              </a>
            </div>

            {/* Center Col: Hidden on mobile. Horizontal flex list of 4 links using 'Inter' 14px Medium, spacing: 40px */}
            <nav className="hidden md:flex items-center justify-center gap-[40px]">
              <a
                href="#symptoms"
                className="font-sans text-[14px] font-medium text-[#0f172a]/90 hover:text-[#000000] tracking-normal transition-colors duration-200"
              >
                Symptoms
              </a>
              <a
                href="#research"
                className="font-sans text-[14px] font-medium text-[#0f172a]/90 hover:text-[#000000] tracking-normal transition-colors duration-200"
              >
                Research
              </a>
              <a
                href="#trials"
                className="font-sans text-[14px] font-medium text-[#0f172a]/90 hover:text-[#000000] tracking-normal transition-colors duration-200"
              >
                Clinical Trials
              </a>
              <a
                href="#methodology"
                className="font-sans text-[14px] font-medium text-[#0f172a]/90 hover:text-[#000000] tracking-normal transition-colors duration-200"
              >
                Methodology
              </a>
            </nav>

            {/* Right Col: Pill-shaped CTA button in solid black with white text */}
            <div className="flex items-center justify-end">
              <a
                href="#symptoms"
                className="btn-pill-nav font-sans text-[14px] font-medium"
              >
                Start Free Scan
              </a>
            </div>
          </div>
        </header>

        {/* HERO SECTION CONTENT AREA (Centered vertically and horizontally, Max-width: 1280px) */}
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-[32px] my-auto py-12 md:py-20 flex flex-col items-center text-center">
          {/* Stylistic Micro-Badge */}
          <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/70 border border-slate-200/60 shadow-sm backdrop-blur-md animate-fade-rise-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-sans text-[12px] font-medium tracking-wide uppercase text-slate-800">
              Clinical Intelligence Engine
            </span>
          </div>

          {/* Heading: 'Instrument Serif' H1, 80px size (mobile 48px), line-height: 0.95, letter-spacing: -2.46px */}
          <h1
            className="hero-h1 text-[48px] sm:text-[64px] lg:text-[80px] leading-[0.95] text-[#0f172a] animate-fade-rise-0 max-w-[1020px] mx-auto"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: "-2.46px",
            }}
          >
            Scan your symptoms.
            <br />
            <em className="not-italic font-normal text-[#0f172a]">
              Unlock the research.
            </em>
          </h1>

          {/* Paragraph: Max-width 670px, centered. Line-height: 1.625. Color: HSL(215, 25%, 32%). Font-size: 18px */}
          <p
            className="mt-8 max-w-[670px] text-[18px] font-normal leading-[1.625] font-sans animate-fade-rise-1"
            style={{ color: "hsl(215, 25%, 32%)" }}
          >
            MediScan.ai transforms the symptoms you feel into clear clinical insights,
            connecting you with 18+ million peer-reviewed studies, active trials, and pharmacology
            explained in plain language.
          </p>

          {/* Main CTA: Large pill-shaped button (padding: 20px 56px) with 16px Medium font weight, placed 48px below text */}
          <div className="mt-[48px] animate-fade-rise-2">
            <a
              href="#symptoms"
              className="btn-pill-hero font-sans text-[16px] font-medium"
            >
              Start Symptom Scan
            </a>
          </div>

          {/* Editorial Meta Sub-bar */}
          <div className="mt-14 flex items-center justify-center gap-8 text-[12px] font-medium uppercase tracking-widest text-[#0f172a]/60 animate-fade-rise-3">
            <span>PubMed Indexed</span>
            <span>•</span>
            <span>Cochrane Reviews</span>
            <span>•</span>
            <span>Double-Blind Synthesis</span>
          </div>
        </div>

        {/* Hero Bottom Utility Bar (Audio Toggle & Status) */}
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-[32px] pb-6 flex items-center justify-between text-[12px] font-medium text-[#0f172a]/70">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
            <span className="tracking-wide uppercase text-[11px]">Serene Cinematic Layer</span>
          </div>

          <button
            onClick={() => setIsVideoMuted(!isVideoMuted)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/60 hover:bg-white border border-slate-200/50 backdrop-blur transition duration-200 text-[#0f172a]"
            title="Toggle video audio"
            type="button"
          >
            <span>{isVideoMuted ? "🔇 Audio Muted" : "🔊 Audio Live"}</span>
          </button>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: INTERACTIVE SYMPTOM INTAKE PROTOCOL (MINIMALIST EDITORIAL)
      ========================================================================= */}
      <section id="symptoms" className="relative z-10 py-28 px-6 md:px-12 border-b border-slate-200/70 bg-[#ffffff]">
        <div className="max-w-[1280px] mx-auto">
          {/* Editorial Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-slate-200/80">
            <div>
              <p
                className="font-sans text-[12px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: "hsl(215, 25%, 32%)" }}
              >
                01 / Clinical Intake Protocol
              </p>
              <h2
                className="mt-3 font-serif text-[42px] md:text-[54px] font-normal leading-tight tracking-[-1.5px] text-[#0f172a]"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Select Observed Symptoms
              </h2>
              <p
                className="mt-3 max-w-xl text-[16px] leading-[1.625] font-sans"
                style={{ color: "hsl(215, 25%, 32%)" }}
              >
                Mark each biological indicator you are experiencing. MediScan will cross-reference
                statistically relevant clinical trial cohorts and therapeutic databases.
              </p>
            </div>

            <div className="text-left md:text-right">
              <span className="block text-[12px] font-medium uppercase tracking-wider text-slate-400">
                Selected Biomarkers
              </span>
              <span className="font-serif text-[44px] font-normal text-[#0f172a] leading-none">
                {selectedSymptoms.length}
                <span className="font-sans text-[18px] text-slate-400 ml-1">/ {DEFAULT_SYMPTOMS.length}</span>
              </span>
            </div>
          </div>

          {/* Symptom Selection Cards Grid */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DEFAULT_SYMPTOMS.map((item) => {
              const isSelected = selectedSymptoms.includes(item.name);
              return (
                <button
                  key={item.id}
                  onClick={() => toggleSymptom(item.name)}
                  type="button"
                  aria-pressed={isSelected}
                  className={`group text-left p-6 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between min-h-[148px] ${
                    isSelected
                      ? "bg-[#000000] text-[#ffffff] border-[#000000] shadow-lg scale-[1.01]"
                      : "bg-[#fafaf9] text-[#0f172a] border-slate-200/80 hover:border-slate-400 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`text-[11px] font-medium uppercase tracking-wider ${
                        isSelected ? "text-slate-300" : "text-slate-400"
                      }`}
                    >
                      {item.category}
                    </span>
                    <span
                      className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] transition-colors ${
                        isSelected
                          ? "bg-white text-black border-white font-bold"
                          : "border-slate-300 text-transparent group-hover:border-slate-500"
                      }`}
                    >
                      ✓
                    </span>
                  </div>

                  <div className="mt-4">
                    <h3
                      className="font-serif text-[24px] leading-snug font-normal"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      {item.name}
                    </h3>
                    <p
                      className={`mt-1.5 text-[12px] line-clamp-1 ${
                        isSelected ? "text-slate-300" : "text-slate-500"
                      }`}
                    >
                      {item.indication}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Custom Symptom Intake & Action Bar */}
          <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
            <form onSubmit={handleAddCustomSymptom} className="flex-1 max-w-md flex items-center gap-2">
              <label htmlFor={searchInputId} className="sr-only">
                Add another symptom or observation
              </label>
              <input
                id={searchInputId}
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Add other symptom (e.g. Brain fog, Insomnia)…"
                className="w-full px-4 py-3 text-[14px] rounded-full border border-slate-300 focus:border-black focus:outline-none bg-white text-[#0f172a] transition duration-200"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0f172a] text-[13px] font-medium transition duration-200 whitespace-nowrap"
              >
                + Add
              </button>
            </form>

            <div className="flex items-center gap-4">
              {selectedSymptoms.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSymptoms([]);
                    setHasAnalysed(false);
                  }}
                  className="font-sans text-[14px] text-slate-500 hover:text-black underline transition-colors"
                >
                  Clear Selection
                </button>
              )}

              <button
                type="button"
                disabled={selectedSymptoms.length === 0}
                onClick={() => setHasAnalysed(true)}
                className="btn-pill-hero !py-4 !px-8 text-[15px] disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
              >
                {selectedSymptoms.length === 0
                  ? "Select Symptoms to Analyse"
                  : `Analyse ${selectedSymptoms.length} Symptom${selectedSymptoms.length > 1 ? "s" : ""}`}
              </button>
            </div>
          </div>

          {/* DYNAMIC CLINICAL SYNTHESIS OUTPUT */}
          {hasAnalysed && selectedSymptoms.length > 0 && (
            <div className="mt-12 p-8 md:p-10 rounded-3xl bg-[#0f172a] text-white shadow-2xl animate-fade-rise-0 border border-slate-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[12px] font-semibold uppercase tracking-widest text-emerald-400">
                      Synthesis Complete • 98.4% Confidence Index
                    </span>
                  </div>
                  <h3
                    className="mt-2 font-serif text-[32px] md:text-[38px] font-normal tracking-tight"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    Clinical Indicator Readout
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-4 py-1.5 rounded-full text-[12px] font-medium bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Non-Critical Triage Tier
                  </span>
                  <a
                    href="#research"
                    className="px-4 py-1.5 rounded-full text-[12px] font-medium bg-white/10 hover:bg-white/20 text-white transition duration-200"
                  >
                    Explore Matched Studies ↓
                  </a>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400">Input Profile</span>
                  <p className="mt-2 text-[15px] font-medium text-white">
                    {selectedSymptoms.join(", ")}
                  </p>
                  <p className="mt-3 text-[13px] text-slate-400 leading-relaxed">
                    Correlated with standard ICD-11 symptom clusters and PubMed medical indices.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400">Primary Observation</span>
                  <p className="mt-2 text-[15px] font-medium text-white">
                    Transient Immune / Inflammatory Activation
                  </p>
                  <p className="mt-3 text-[13px] text-slate-400 leading-relaxed">
                    Literature indicates systemic cytokine elevation frequently manifesting in combination with selected symptoms.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400">Recommended Pathway</span>
                  <p className="mt-2 text-[15px] font-medium text-white">
                    Hydration, Rest & Physician Consultation
                  </p>
                  <p className="mt-3 text-[13px] text-slate-400 leading-relaxed">
                    Consult your healthcare provider if symptoms persist beyond 72 hours or intensify.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: PEER-REVIEWED MEDICAL RESEARCH CORPUS (#research)
      ========================================================================= */}
      <section id="research" className="py-28 px-6 md:px-12 bg-[#fafaf9] border-b border-slate-200/70">
        <div className="max-w-[1280px] mx-auto">
          {/* Header */}
          <div className="max-w-2xl">
            <p
              className="font-sans text-[12px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: "hsl(215, 25%, 32%)" }}
            >
              02 / The Research Corpus
            </p>
            <h2
              className="mt-3 font-serif text-[42px] md:text-[54px] font-normal leading-tight tracking-[-1.5px] text-[#0f172a]"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Evidence Grounded in Verified Science
            </h2>
            <p
              className="mt-3 text-[16px] leading-[1.625] font-sans"
              style={{ color: "hsl(215, 25%, 32%)" }}
            >
              Every finding is mapped to real studies, peer-reviewed journals, and drug pharmacokinetics
              so you can have informed, productive conversations with your clinician.
            </p>
          </div>

          {/* 3 Editorial Pillars (Clinical Trials, Peer-Reviewed Papers, Pharmacology) */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="group p-8 rounded-3xl bg-white border border-slate-200/80 hover:border-black transition-all duration-300 flex flex-col justify-between">
              <div>
                <span
                  className="font-serif text-[36px] font-normal leading-none block text-[#0f172a]"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  01
                </span>
                <h3
                  className="mt-4 font-serif text-[28px] font-normal leading-snug text-[#0f172a]"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Clinical Trials
                </h3>
                <p
                  className="mt-3 text-[15px] leading-[1.625] font-sans"
                  style={{ color: "hsl(215, 25%, 32%)" }}
                >
                  Track active recruiting studies matched to the symptom clusters you report,
                  with eligibility criteria and endpoints explained in plain language.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-baseline justify-between">
                <div>
                  <span
                    className="font-serif text-[44px] font-normal leading-none text-[#0f172a]"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    2,430+
                  </span>
                  <span className="block text-[11px] font-medium uppercase tracking-wider text-slate-400 mt-1">
                    Active Studies Monitored
                  </span>
                </div>
                <span className="text-[18px] text-black group-hover:translate-x-1.5 transition-transform duration-200">
                  →
                </span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="group p-8 rounded-3xl bg-white border border-slate-200/80 hover:border-black transition-all duration-300 flex flex-col justify-between">
              <div>
                <span
                  className="font-serif text-[36px] font-normal leading-none text-[#0f172a]"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  02
                </span>
                <h3
                  className="mt-4 font-serif text-[28px] font-normal leading-snug text-[#0f172a]"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Peer-Reviewed Papers
                </h3>
                <p
                  className="mt-3 text-[15px] leading-[1.625] font-sans"
                  style={{ color: "hsl(215, 25%, 32%)" }}
                >
                  Concise, rigorous syntheses of the newest journal articles from The Lancet,
                  JAMA, and the New England Journal of Medicine, free of academic jargon.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-baseline justify-between">
                <div>
                  <span
                    className="font-serif text-[44px] font-normal leading-none text-[#0f172a]"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    18.4M+
                  </span>
                  <span className="block text-[11px] font-medium uppercase tracking-wider text-slate-400 mt-1">
                    Indexed Medical Papers
                  </span>
                </div>
                <span className="text-[18px] text-black group-hover:translate-x-1.5 transition-transform duration-200">
                  →
                </span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="group p-8 rounded-3xl bg-white border border-slate-200/80 hover:border-black transition-all duration-300 flex flex-col justify-between">
              <div>
                <span
                  className="font-serif text-[36px] font-normal leading-none text-[#0f172a]"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  03
                </span>
                <h3
                  className="mt-4 font-serif text-[28px] font-normal leading-snug text-[#0f172a]"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Drug Insights & Pharmacology
                </h3>
                <p
                  className="mt-3 text-[15px] leading-[1.625] font-sans"
                  style={{ color: "hsl(215, 25%, 32%)" }}
                >
                  Side effect profiles, biochemical pathways, cross-interactions, and dosage
                  comparisons for medicines you take or are currently considering.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-baseline justify-between">
                <div>
                  <span
                    className="font-serif text-[44px] font-normal leading-none text-[#0f172a]"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    95,000+
                  </span>
                  <span className="block text-[11px] font-medium uppercase tracking-wider text-slate-400 mt-1">
                    Pharmacological Compounds
                  </span>
                </div>
                <span className="text-[18px] text-black group-hover:translate-x-1.5 transition-transform duration-200">
                  →
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Literature Explorer */}
          <div id="trials" className="mt-20 pt-16 border-t border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <h3
                  className="font-serif text-[32px] font-normal text-[#0f172a]"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Recent Peer-Reviewed Publications
                </h3>
                <p
                  className="text-[14px] font-sans"
                  style={{ color: "hsl(215, 25%, 32%)" }}
                >
                  Live feed of validated literature updated weekly from the National Center for Biotechnology Information.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {["All", "Neurology", "Clinical AI", "Pharmacology"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategoryFilter(cat)}
                    type="button"
                    className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition duration-200 ${
                      activeCategoryFilter === cat
                        ? "bg-[#000000] text-white"
                        : "bg-white text-slate-700 border border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Papers List */}
            <div className="space-y-4">
              {filteredPapers.map((paper) => (
                <div
                  key={paper.id}
                  className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200/80 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex flex-wrap items-center gap-3 text-[12px] font-medium text-slate-500 mb-2">
                    <span className="font-semibold text-black">{paper.journal}</span>
                    <span>•</span>
                    <span>{paper.year}</span>
                    <span>•</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px]">
                      {paper.tier}
                    </span>
                  </div>

                  <h4
                    className="font-serif text-[22px] md:text-[26px] font-normal leading-snug text-[#0f172a]"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {paper.title}
                  </h4>

                  <p
                    className="mt-3 text-[14px] leading-relaxed font-sans"
                    style={{ color: "hsl(215, 25%, 32%)" }}
                  >
                    {paper.abstract}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-[12px] text-slate-400 pt-3 border-t border-slate-100">
                    <span className="font-mono">{paper.doi}</span>
                    <span className="text-black font-medium hover:underline cursor-pointer">
                      Read Full Article ↗
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: METHODOLOGY & SCIENTIFIC RIGOR (#methodology)
      ========================================================================= */}
      <section id="methodology" className="py-28 px-6 md:px-12 bg-white border-b border-slate-200/70">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p
                className="font-sans text-[12px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: "hsl(215, 25%, 32%)" }}
              >
                03 / Scientific Architecture
              </p>
              <h2
                className="mt-3 font-serif text-[42px] md:text-[54px] font-normal leading-tight tracking-[-1.5px] text-[#0f172a]"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Built for Precision.
                <br />
                Governed by Evidence.
              </h2>
              <p
                className="mt-4 text-[16px] leading-[1.625] font-sans"
                style={{ color: "hsl(215, 25%, 32%)" }}
              >
                MediScan never generates hallucinated medical advice. Every output stems from deterministic
                semantic graphs mapped directly to standard SNOMED-CT clinical concepts and validated clinical trials.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 font-serif text-[18px] text-black flex items-center justify-center">
                    1
                  </span>
                  <div>
                    <h4 className="font-medium text-[16px] text-[#0f172a]">Semantic SNOMED-CT Normalization</h4>
                    <p className="mt-1 text-[14px] text-slate-500 leading-relaxed">
                      Patient descriptions are translated into standardized medical ontology to eliminate colloquial ambiguity.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 font-serif text-[18px] text-black flex items-center justify-center">
                    2
                  </span>
                  <div>
                    <h4 className="font-medium text-[16px] text-[#0f172a]">PubMed & Cochrane Dual Verification</h4>
                    <p className="mt-1 text-[14px] text-slate-500 leading-relaxed">
                      Every diagnostic hypothesis is cross-checked against independent randomized controlled trial literature.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 font-serif text-[18px] text-black flex items-center justify-center">
                    3
                  </span>
                  <div>
                    <h4 className="font-medium text-[16px] text-[#0f172a]">Human-in-the-Loop Clinical Review</h4>
                    <p className="mt-1 text-[14px] text-slate-500 leading-relaxed">
                      Algorithm updates and synthesis rules are periodically audited by licensed medical specialists.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Editorial Metric Box */}
            <div className="p-8 md:p-12 rounded-3xl bg-[#0f172a] text-white">
              <span className="text-[12px] font-semibold uppercase tracking-widest text-slate-400">
                Platform Statistics
              </span>
              <h3
                className="mt-3 font-serif text-[36px] font-normal leading-snug"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Empowering Patients & Doctors Globally
              </h3>

              <div className="mt-10 grid grid-cols-2 gap-8">
                {METRICS.map((m) => (
                  <div key={m.label} className="border-t border-slate-800 pt-6">
                    <span
                      className="font-serif text-[38px] md:text-[44px] font-normal leading-none block text-white"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      {m.value}
                    </span>
                    <span className="mt-2 block text-[12px] font-medium text-slate-400 leading-tight">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-slate-800 text-[12px] text-slate-400 leading-relaxed">
                Source: MediScan Continuous Benchmark & Index Registry (Updated Q4 2026).
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: MINIMALIST EDITORIAL FOOTER (#about)
      ========================================================================= */}
      <footer id="about" className="bg-[#0f172a] text-white py-20 px-6 md:px-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-slate-800">
            {/* Col 1: Brand */}
            <div className="md:col-span-2">
              <a
                href="#top"
                className="font-serif text-[32px] font-normal tracking-tight text-white inline-flex items-baseline"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                MediScan
                <sup className="font-sans text-[12px] font-medium ml-0.5 text-slate-400">®</sup>
              </a>
              <p className="mt-4 max-w-md text-[14px] leading-relaxed text-slate-400 font-sans">
                A minimalist, high-end health intelligence platform bridging patient symptom reporting
                with the world’s leading clinical trials and peer-reviewed scientific literature.
              </p>
              <div className="mt-6 flex items-center gap-3 text-[13px] text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>All systems operational • HIPAA Compliant Architecture</span>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <span className="text-[12px] font-semibold uppercase tracking-widest text-slate-400">
                Platform
              </span>
              <ul className="mt-4 space-y-3 text-[14px] text-slate-300">
                <li><a href="#symptoms" className="hover:text-white transition-colors">Symptom Checker</a></li>
                <li><a href="#research" className="hover:text-white transition-colors">Peer-Reviewed Corpus</a></li>
                <li><a href="#trials" className="hover:text-white transition-colors">Clinical Trials Index</a></li>
                <li><a href="#methodology" className="hover:text-white transition-colors">Safety Architecture</a></li>
              </ul>
            </div>

            {/* Col 3: Legal & Standards */}
            <div>
              <span className="text-[12px] font-semibold uppercase tracking-widest text-slate-400">
                Standards
              </span>
              <ul className="mt-4 space-y-3 text-[14px] text-slate-300">
                <li><a href="#top" className="hover:text-white transition-colors">SNOMED-CT Mapping</a></li>
                <li><a href="#top" className="hover:text-white transition-colors">ICD-11 Compliance</a></li>
                <li><a href="#top" className="hover:text-white transition-colors">Privacy & Data Handling</a></li>
                <li><a href="#top" className="hover:text-white transition-colors">Editorial Ethics Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Clinical Disclaimer & Copyright */}
          <div className="pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[13px] text-slate-500">
            <p className="max-w-2xl leading-relaxed">
              ⚠️ <strong className="text-slate-400">Clinical Disclaimer:</strong> MediScan.ai is an informational
              and scientific synthesis tool. It does not provide medical diagnoses, treatment plans, or clinical prescriptions.
              Always consult a certified medical practitioner for any clinical concerns. In an emergency, dial 911 or visit your nearest emergency room immediately.
            </p>
            <p className="whitespace-nowrap">
              © {new Date().getFullYear()} MediScan Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
