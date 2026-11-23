"use server";

import { Resend } from "resend";

const MAX_LENGTH = { name: 100, email: 200, phone: 30, message: 5000 };
const EMAIL_PATTERN = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

const escapeHtml = (value: string) =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

/** Nettoie un champ d'une seule ligne (pas de saut de ligne dans un sujet d'email). */
const singleLine = (value: unknown) =>
    typeof value === "string" ? value.replace(/[\r\n]+/g, " ").trim() : "";

interface ContactPayload {
    name: string;
    email: string;
    phone?: string;
    message: string;
    /** Champ piège : invisible pour un humain, rempli par les robots. */
    website?: string;
}

export async function sendEmail(formData: ContactPayload) {
    try {
        // Un robot a rempli le champ piège : on répond « ok » sans rien envoyer
        if (formData?.website) return { success: true };

        const name = singleLine(formData?.name);
        const email = singleLine(formData?.email);
        const phone = singleLine(formData?.phone);
        const message = typeof formData?.message === "string" ? formData.message.trim() : "";

        const isValid =
            name.length > 0 && name.length <= MAX_LENGTH.name &&
            email.length <= MAX_LENGTH.email && EMAIL_PATTERN.test(email) &&
            phone.length <= MAX_LENGTH.phone &&
            message.length > 0 && message.length <= MAX_LENGTH.message;

        if (!isValid) return { success: false, error: "Champs invalides" };

        const resend = new Resend(process.env.RESEND_API_KEY);
        const { data, error } = await resend.emails.send({
            from: "Site hugo-ferreira.fr <contact@hugo-ferreira.fr>",
            to: ["ferreira.hugo602@gmail.com"],
            subject: `Demande d'appel : ${name}`,
            replyTo: email,
            text: `Message de ${name} (${email})\nTéléphone : ${phone || "non renseigné"}\n\n${message}`,
            html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Nouvelle demande d'appel</h2>
          <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
          <p><strong>Email :</strong> ${escapeHtml(email)}</p>
          <p><strong>Téléphone :</strong> ${escapeHtml(phone) || "non renseigné"}</p>
          <hr />
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
        });

        if (error) {
            console.error("Erreur API Resend:", error);
            return { success: false, error: "Envoi impossible" };
        }

        return { success: true, id: data?.id };
    } catch (error) {
        console.error("Erreur critique serveur:", error);
        return { success: false, error: "Envoi impossible" };
    }
}
