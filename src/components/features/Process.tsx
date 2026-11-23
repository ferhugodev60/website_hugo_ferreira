"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Phone, Search } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";

/* Illustrations décoratives : une petite scène par étape, sans texte à lire. */

function CallScene() {
    return (
        <div className="w-full max-w-60 space-y-3">
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                <Search size={14} className="shrink-0 text-white/60" />
                <span className="text-xs text-white/70">votre métier + ville</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-studio-neon/10 border border-studio-neon/30 px-4 py-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-studio-neon text-black">
                    <Phone size={14} fill="currentColor" />
                </span>
                <span className="text-xs font-semibold text-white">Appel, 20 min</span>
            </div>
        </div>
    );
}

function QuoteScene() {
    return (
        <div className="w-40 -rotate-3 rounded-lg bg-white p-4 shadow-2xl shadow-black/60 transition-transform duration-500 md:group-hover:rotate-0">
            <span className="text-xs font-bold text-black">Devis</span>
            <div className="mt-3 space-y-2">
                {["w-16", "w-20", "w-12"].map((width) => (
                    <div key={width} className="flex items-center gap-2">
                        <Check size={12} strokeWidth={3} className="shrink-0 text-green-700" />
                        <span className={`h-2 rounded-full bg-black/15 ${width}`} />
                    </div>
                ))}
            </div>
            <div className="mt-3 flex justify-end">
                <span className="rounded bg-studio-neon px-2 py-1 text-xs font-bold text-black">48 h</span>
            </div>
        </div>
    );
}

function BuildScene() {
    return (
        <div className="w-full max-w-60 rounded-lg border border-white/15 bg-studio-black p-3">
            <div className="flex h-12 items-center justify-center rounded bg-white/10">
                <span className="rounded-full bg-studio-neon px-3 py-1 text-[10px] font-bold text-black">Réserver</span>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2">
                <span className="h-10 rounded border border-dashed border-studio-neon/50 bg-studio-neon/10" />
                <span className="h-10 rounded bg-white/10" />
                <span className="h-10 rounded bg-white/10" />
            </div>
        </div>
    );
}

function LiveScene() {
    return (
        <div className="w-full max-w-60 rounded-lg border border-white/15 bg-studio-black overflow-hidden">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-studio-neon" />
                <span className="text-xs text-white/70">votre-site.fr</span>
            </div>
            <div className="flex flex-col items-center gap-2 px-4 py-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-studio-neon text-black">
                    <Check size={18} strokeWidth={3} />
                </span>
                <span className="text-xs font-semibold text-white">En ligne</span>
            </div>
        </div>
    );
}

const steps = [
    { name: "Appel gratuit", text: "20 minutes pour comprendre votre activité et regarder comment vous apparaissez sur Google.", Scene: CallScene },
    { name: "Devis sous 48 h", text: "Une proposition écrite : ce qui est inclus, ce qui ne l'est pas, le prix et les délais.", Scene: QuoteScene },
    { name: "Création", text: "Je m'occupe du design et du développement. Vous validez les étapes importantes.", Scene: BuildScene },
    { name: "Mise en ligne et suivi", text: "Votre site est publié, et le premier mois de maintenance est offert.", Scene: LiveScene },
];

export default function Process() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <section id="deroule" className="w-full max-w-6xl mx-auto px-6 py-20">
            <SectionHeader label="Déroulé" title="Comment on travaille ensemble" />
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
                {steps.map(({ name, text, Scene }, i) => (
                    <motion.li
                        key={name}
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-2 transition-colors duration-300 md:hover:border-studio-neon/40"
                    >
                        <div
                            aria-hidden="true"
                            className="flex h-48 items-center justify-center overflow-hidden rounded-xl bg-[radial-gradient(circle_at_50%_120%,rgba(57,255,20,0.18),transparent_70%)] bg-white/[0.03] px-4"
                        >
                            <Scene />
                        </div>
                        <div className="p-4 pb-8">
                            <h3 className="text-lg font-bold leading-7 tracking-tight text-white lg:max-xl:min-h-14">{name}</h3>
                            <p className="mt-2 text-sm text-white/60 leading-relaxed">{text}</p>
                        </div>
                        {/* Numéro à cheval sur le bord bas de la carte */}
                        <span
                            aria-hidden="true"
                            className="absolute bottom-0 left-1/2 flex h-10 w-10 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-studio-neon text-base font-bold text-black ring-4 ring-studio-black"
                        >
                            {i + 1}
                        </span>
                    </motion.li>
                ))}
            </ol>
        </section>
    );
}
