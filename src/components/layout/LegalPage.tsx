import Link from "next/link";

export default function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="max-w-6xl mx-auto px-6 py-20">
            <Link href="/" className="text-sm text-studio-neon hover:underline">
                ← Retour à l&apos;accueil
            </Link>
            <h1 className="mt-8 text-3xl md:text-4xl font-bold tracking-tight text-white">{title}</h1>
            <div className="mt-10 space-y-8 text-sm text-white/70 leading-relaxed [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-white [&_h2]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_a]:text-studio-neon [&_a]:underline">
                {children}
            </div>
        </div>
    );
}
