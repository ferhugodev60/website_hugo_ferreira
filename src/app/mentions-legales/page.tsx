import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Mentions légales" };

export default function MentionsLegales() {
    const { address, email, phone, siret, host } = site.legal;

    return (
        <LegalPage title="Mentions légales">
            <section>
                <h2>Éditeur du site</h2>
                <ul>
                    <li>{site.name}</li>
                    {address && <li>Adresse : {address}</li>}
                    {email && <li>Email : <a href={`mailto:${email}`}>{email}</a></li>}
                    {phone && <li>Téléphone : {phone}</li>}
                    {siret && <li>SIRET : {siret}</li>}
                    <li>Directeur de la publication : {site.name}</li>
                </ul>
            </section>
            {host && (
                <section>
                    <h2>Hébergeur</h2>
                    <p>{host.name}, {host.address}, {host.phone}</p>
                </section>
            )}
            <section>
                <h2>Propriété intellectuelle</h2>
                <p>
                    Les textes, le design et le code de ce site appartiennent à {site.name}, sauf mention contraire.
                    Les marques et visuels des projets présentés restent la propriété de leurs titulaires.
                </p>
            </section>
        </LegalPage>
    );
}
