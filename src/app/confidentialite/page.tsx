import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/layout/LegalPage";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Politique de confidentialité" };

export default function Confidentialite() {
    const { email } = site.legal;

    return (
        <LegalPage title="Politique de confidentialité">
            <section>
                <h2>Responsable du traitement</h2>
                <p>{site.name}, éditeur de ce site.</p>
            </section>
            <section>
                <h2>Données collectées et utilisation</h2>
                <p>
                    Le formulaire de contact recueille votre nom, votre email, votre message et, si vous le donnez,
                    votre téléphone. Ces données servent uniquement à répondre à votre demande, dans le cadre de
                    démarches précontractuelles effectuées à votre demande.
                </p>
            </section>
            <section>
                <h2>Destinataires</h2>
                <p>
                    Vos données sont lues par {site.name}. Elles transitent par Resend, prestataire d&apos;envoi
                    d&apos;emails établi aux États-Unis, et par la messagerie Gmail (Google). Elles ne sont jamais
                    vendues.
                </p>
            </section>
            <section>
                <h2>Durée de conservation</h2>
                <p>Trois ans au maximum après notre dernier échange, si nous ne travaillons pas ensemble.</p>
            </section>
            <section>
                <h2>Cookies</h2>
                <p>
                    Ce site ne dépose pas de cookie publicitaire ni de mesure d&apos;audience.
                </p>
            </section>
            <section>
                <h2>Vos droits</h2>
                <p>
                    Vous pouvez demander l&apos;accès, la rectification, l&apos;effacement ou la limitation de vos
                    données{" "}
                    {email ? <>à <a href={`mailto:${email}`}>{email}</a></> : <>via le <Link href="/#contact">formulaire de contact</Link></>}.
                    Vous pouvez aussi saisir la <a href="https://www.cnil.fr">CNIL</a>.
                </p>
            </section>
        </LegalPage>
    );
}
