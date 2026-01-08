import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";
import js from "@eslint/js";

// Simulation de __dirname pour le mode ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

const eslintConfig = [
    // On utilise compat.extends pour charger les configs de Next.js
    ...compat.extends("next/core-web-vitals", "next/typescript"),

    {
        // Configuration des fichiers à ignorer (remplace globalIgnores)
        ignores: [
            ".next/**",
            "out/**",
            "build/**",
            "next-env.d.ts",
        ],
    },
];

export default eslintConfig;