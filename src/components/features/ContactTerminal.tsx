"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import {Cpu, Send, Terminal} from "lucide-react";

const ScrambleText = ({ text }: { text: string }) => {
    const [display, setDisplay] = useState("");
    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplay(text.split("").map((l, i) =>
                i < iteration ? text[i] : "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 36)]
            ).join(""));
            if (iteration >= text.length) clearInterval(interval);
            iteration += 1 / 2;
        }, 30);
        return () => clearInterval(interval);
    }, [text]);
    return <span>{display}</span>;
};

export default function ContactTerminal() {
    const { register, handleSubmit } = useForm();
    const [mounted, setMounted] = useState(false);
    const [nodeId, setNodeId] = useState("");
    const { playTransmit } = useSoundEffects();

    useEffect(() => {
        setMounted(true);
        setNodeId(Math.random().toString(36).substring(7).toUpperCase());
    }, []);

    const onSubmit = (data: any) => {
        playTransmit();
        console.log("Transmission initiée...", data);
    };

    if (!mounted) return null;

    return (
        <section className="w-full max-w-4xl mx-auto px-6 py-32 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-studio-neon/5 blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group bg-black/40 border border-white/10 rounded-2xl backdrop-blur-xl relative z-10 transition-colors duration-700 hover:border-studio-neon/30"
            >
                <div className="bg-white/5 border-b border-white/10 px-5 py-3 flex items-center justify-between rounded-t-2xl">
                    <div className="flex gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-studio-neon/20 border border-studio-neon/40 animate-pulse" />
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase">
                        <Terminal size={12} />
                        <ScrambleText text="TERMINAL.SESSION_01" />
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-12 space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="relative space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-studio-neon/50 ml-1">
                                [01] SENDER_ID
                            </label>
                            <input
                                {...register("name")}
                                placeholder="IDENTIFY YOURSELF"
                                className="w-full bg-transparent border-b border-white/10 py-3 text-sm font-mono focus:border-studio-neon outline-none transition-all placeholder:text-white/5"
                            />
                        </div>

                        <div className="relative space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-studio-neon/50 ml-1">
                                [02] RETURN_ADDRESS
                            </label>
                            <input
                                {...register("email")}
                                type="email"
                                placeholder="EMAIL@DOMAIN.COM"
                                className="w-full bg-transparent border-b border-white/10 py-3 text-sm font-mono focus:border-studio-neon outline-none transition-all placeholder:text-white/5"
                            />
                        </div>
                    </div>

                    <div className="relative space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-studio-neon/50 ml-1">
                            [03] SIGNAL_MESSAGE
                        </label>
                        <textarea
                            {...register("message")}
                            rows={3}
                            placeholder="AWAITING SIGNAL..."
                            className="w-full bg-white/[0.02] border border-white/5 rounded-lg p-4 text-sm font-mono focus:border-studio-neon/50 outline-none transition-all placeholder:text-white/5 resize-none"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.005, backgroundColor: "rgba(255,255,255,1)", color: "#000" }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full bg-studio-neon text-black font-black py-5 rounded-xl uppercase tracking-[0.2em] text-[11px] transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(149,255,0,0.2)]"
                    >
                        <Send size={14} />
                        Transmit Data Request
                    </motion.button>
                </form>

                <div className="bg-white/5 border-t border-white/5 px-6 py-4 flex justify-between items-center rounded-b-2xl">
                    <div className="flex items-center gap-6 text-[8px] font-mono text-white/20 tracking-widest uppercase">
                        <span className="flex items-center gap-1.5"><Cpu size={10} /> AES-256</span>
                        <span>NODE: {nodeId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[8px] font-mono text-studio-neon animate-pulse uppercase tracking-tighter">System_Active</span>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}