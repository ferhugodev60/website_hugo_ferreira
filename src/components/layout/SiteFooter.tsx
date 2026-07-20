export default function SiteFooter() {
    return (
        <footer className="py-6 px-6 text-center border-t border-white/5">
            <div className="flex flex-col items-center gap-0.5 text-[10px] text-white/30 font-mono sm:flex-row sm:justify-center sm:gap-2">
                <span>© 2026 Hugo Ferreira</span>
                <span className="hidden sm:inline">—</span>
                <span>Tous droits réservés</span>
            </div>
        </footer>
    );
}
