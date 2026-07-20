"use client";

import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { sendEmail } from "@/app/actions/sendEmail";

type ContactFormData = { name: string; email: string; message: string };

export default function Contact() {
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<ContactFormData>();
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const { playTransmit } = useSoundEffects();

    const onSubmit = async (data: ContactFormData) => {
        try {
            setStatus("idle");
            playTransmit();

            const result = await sendEmail(data);

            if (result.success) {
                setStatus("success");
                reset();
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <section className="w-full max-w-6xl mx-auto px-6 py-32 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-studio-neon/5 blur-[120px] pointer-events-none" />

            {/* HEADER DE SECTION */}
            <div className="mb-12 border-b border-white/10 pb-4">
                <span className="text-[10px] font-bold text-studio-neon uppercase tracking-[0.3em]">
                    Contact
                </span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-2">
                    Un projet en tête ? Parlons-en.
                </h2>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-4xl mx-auto bg-black/40 border border-white/10 rounded-2xl backdrop-blur-xl relative z-10 transition-colors duration-700 hover:border-studio-neon/30"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-12 space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label htmlFor="contact-name" className="text-xs font-medium text-white/50">
                                Nom
                            </label>
                            <input
                                id="contact-name"
                                {...register("name", { required: true })}
                                placeholder="Votre nom"
                                className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:border-studio-neon outline-none transition-all placeholder:text-white/25"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="contact-email" className="text-xs font-medium text-white/50">
                                Email
                            </label>
                            <input
                                id="contact-email"
                                {...register("email", { required: true })}
                                type="email"
                                placeholder="vous@exemple.com"
                                className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:border-studio-neon outline-none transition-all placeholder:text-white/25"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="contact-message" className="text-xs font-medium text-white/50">
                            Message
                        </label>
                        <textarea
                            id="contact-message"
                            {...register("message", { required: true })}
                            rows={4}
                            placeholder="Parlez-moi de votre projet..."
                            className="w-full bg-white/[0.02] border border-white/5 rounded-lg p-4 text-sm focus:border-studio-neon/50 outline-none transition-all placeholder:text-white/25 resize-none"
                        />
                    </div>

                    <div className="relative">
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={!isSubmitting ? { scale: 1.005 } : {}}
                            whileTap={!isSubmitting ? { scale: 0.99 } : {}}
                            className={`w-full font-semibold py-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2
                                ${!isSubmitting
                                ? 'bg-white text-black hover:bg-studio-neon cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.05)]'
                                : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
                        >
                            <Send size={18} />
                            {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                        </motion.button>

                        {/* Feedback après envoi */}
                        <AnimatePresence>
                            {status !== "idle" && (
                                <motion.div
                                    role="status"
                                    aria-live="polite"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className={`absolute -bottom-8 left-0 right-0 text-center text-xs ${
                                        status === "success" ? "text-studio-neon" : "text-red-500"
                                    }`}
                                >
                                    {status === "success" ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <CheckCircle2 size={12} /> Message envoyé, je vous réponds rapidement.
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            <AlertCircle size={12} /> Un problème est survenu, réessayez.
                                        </span>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </form>
            </motion.div>
        </section>
    );
}
