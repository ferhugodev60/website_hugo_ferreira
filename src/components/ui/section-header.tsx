interface SectionHeaderProps {
    label: string;
    title: string;
}

export default function SectionHeader({ label, title }: SectionHeaderProps) {
    return (
        <div className="mb-12">
            <span className="block text-center text-[10px] font-bold text-studio-neon uppercase tracking-[0.3em]">
                {label}
            </span>
            <h2 className="text-center text-2xl md:text-3xl font-bold tracking-tight text-white mt-2">
                {title}
            </h2>
        </div>
    );
}
