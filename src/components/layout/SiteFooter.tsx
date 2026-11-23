import Link from "next/link";

export default function SiteFooter() {
    return (
        <footer className="py-6 px-6 text-center border-t border-white/5">
            <div className="flex flex-col items-center gap-2 text-xs text-white/60 sm:flex-row sm:justify-center sm:gap-6">
                <span>© 2026 Hugo Ferreira</span>
                <Link href="/mentions-legales" className="py-2 hover:text-studio-neon transition-colors">Mentions légales</Link>
                <Link href="/confidentialite" className="py-2 hover:text-studio-neon transition-colors">Confidentialité</Link>
            </div>
        </footer>
    );
}
