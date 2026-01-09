"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TextHoverEffect = ({
                                    text,
                                    duration,
                                }: {
    text: string;
    duration?: number;
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);
    const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (svgRef.current) {
            const svgRect = svgRef.current.getBoundingClientRect();
            const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
            const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
            setMaskPosition({ cx: `${cxPercentage}%`, cy: `${cyPercentage}%` });
        }
    }, [cursor]);

    // FIX DESKTOP : On utilise une valeur négative (-4) pour coller au bord gauche
    const textX = isMobile ? "50%" : "-4";
    const anchor = isMobile ? "middle" : "start";

    return (
        <svg
            ref={svgRef}
            width="100%"
            height="100%"
            viewBox="0 0 400 60"
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
            className="select-none overflow-visible"
        >
            <defs>
                <linearGradient id="textGradient" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="0%">
                    {hovered && (
                        <>
                            <stop offset="0%" stopColor="#39FF14" />
                            <stop offset="50%" stopColor="#22c55e" />
                            <stop offset="100%" stopColor="#39FF14" />
                        </>
                    )}
                </linearGradient>

                <motion.radialGradient
                    id="revealMask"
                    gradientUnits="userSpaceOnUse"
                    r="25%"
                    animate={maskPosition}
                    transition={{ duration: duration ?? 0, ease: "easeOut" }}
                >
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="black" />
                </motion.radialGradient>

                <mask id="textMask">
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
                </mask>
            </defs>

            <text
                x={textX}
                y="50%"
                textAnchor={anchor}
                dominantBaseline="middle"
                strokeWidth="0.3"
                className="fill-transparent stroke-neutral-200 font-[helvetica] text-5xl md:text-6xl font-bold dark:stroke-neutral-800 opacity-20"
            >
                {text}
            </text>

            <motion.text
                x={textX}
                y="50%"
                textAnchor={anchor}
                dominantBaseline="middle"
                strokeWidth="0.3"
                className="fill-transparent stroke-neutral-200 font-[helvetica] text-5xl md:text-6xl font-bold dark:stroke-neutral-800"
                initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
                animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
                transition={{ duration: 4, ease: "easeInOut" }}
            >
                {text}
            </motion.text>

            <text
                x={textX}
                y="50%"
                textAnchor={anchor}
                dominantBaseline="middle"
                stroke="url(#textGradient)"
                strokeWidth="0.3"
                mask="url(#textMask)"
                className="fill-transparent font-[helvetica] text-5xl md:text-6xl font-bold"
            >
                {text}
            </text>
        </svg>
    );
};