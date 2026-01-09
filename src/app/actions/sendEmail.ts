"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: { name: string; email: string; message: string }) {
    try {
        const { name, email, message } = formData;

        // 1. Destructuration de la réponse (on récupère data ET error)
        const { data, error } = await resend.emails.send({
            from: `Studio Contact <contact@hugo-ferreira.fr>`,
            to: ["ferreira.hugo602@gmail.com"],
            subject: `Nouveau Signal : ${name}`,
            replyTo: email,
            text: `Message de ${name} (${email}) :\n\n${message}`,
            html: `
        <div style="font-family: monospace; background: #000; color: #fff; padding: 20px; border: 1px solid #39FF14;">
          <h2 style="color: #39FF14;">[SIGNAL_RECEIVED]</h2>
          <p><strong>SENDER_ID:</strong> ${name}</p>
          <p><strong>RETURN_ADDRESS:</strong> ${email}</p>
          <hr style="border: 0; border-top: 1px solid #333;" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
        });

        // 2. Vérification de l'erreur renvoyée par l'API Resend
        if (error) {
            console.error("Erreur API Resend:", error);
            return { success: false, error: error.message };
        }

        // 3. Ici, TypeScript sait que data existe et contient l'id
        return { success: true, id: data?.id };

    } catch (error) {
        // Erreur réseau ou plantage critique
        console.error("Erreur critique serveur:", error);
        return { success: false, error: "Transmission failed" };
    }
}