import { Check } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import { offers } from "@/data/offers";

export default function Offers() {
    return (
        <section id="offres" className="w-full max-w-6xl mx-auto px-6 py-20">
            <SectionHeader label="Offres" title="Un site développé pour vous, pas un modèle tout fait" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {offers.map((offer) => (
                    <article
                        key={offer.name}
                        className="flex flex-col bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:hover:border-studio-neon/40 transition-colors duration-300"
                    >
                        <h3 className="text-lg font-bold text-white tracking-tight lg:min-h-14">{offer.name}</h3>
                        <p className="mt-2 text-sm text-white/60 leading-relaxed lg:min-h-[4.5rem]">{offer.pitch}</p>
                        <p className="mt-6">
                            <span className="block text-xs text-white/60">À partir de</span>
                            <span className="text-3xl font-bold text-white tracking-tight">{offer.price}</span>
                        </p>
                        <ul className="mt-6 space-y-3">
                            {offer.features.map((feature) => (
                                <li key={feature} className="flex gap-2 text-sm text-white/70 leading-snug">
                                    <Check size={16} className="shrink-0 mt-0.5 text-studio-neon" aria-hidden="true" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white tracking-tight">Projet sur-mesure</h3>
                    <p className="mt-2 text-sm text-white/60 leading-relaxed">
                        Boutique, réservation, espace professionnel, cartes cadeaux : quand votre projet combine
                        plusieurs besoins, je le chiffre sur devis.
                    </p>
                </div>
                <div className="border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white tracking-tight">Maintenance : premier mois offert</h3>
                    <p className="mt-2 text-sm text-white/60 leading-relaxed">
                        Ensuite 45 € par mois si vous le souhaitez, sans engagement : mises à jour techniques,
                        surveillance, petites modifications et corrections.
                    </p>
                </div>
            </div>

            <p className="mt-6 text-xs text-white/60">
                Prix de départ indicatifs. Le montant définitif est fixé par un devis gratuit.
            </p>
        </section>
    );
}
