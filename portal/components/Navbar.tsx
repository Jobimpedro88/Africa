import Link from 'next/link';
import { Home, Map as MapIcon, BookOpen, Plane, CheckSquare } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="bg-[var(--savanna-card)] border-b border-[var(--savanna-sand)] px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
            <Link href="/" className="flex items-center gap-2 font-serif font-bold text-xl text-[var(--savanna-terracotta)] hover:opacity-80 transition-opacity">
                <span>África 2026</span>
            </Link>

            <div className="flex gap-6">
                <Link href="/" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[var(--savanna-terracotta)] transition-colors">
                    <Home size={18} />
                    <span className="hidden sm:inline">Início</span>
                </Link>
                <Link href="/knowledge" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[var(--savanna-terracotta)] transition-colors">
                    <BookOpen size={18} />
                    <span className="hidden sm:inline">Biblioteca</span>
                </Link>
                <Link href="/flights" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[var(--savanna-terracotta)] transition-colors">
                    <Plane size={18} />
                    <span className="hidden sm:inline">Voos</span>
                </Link>
                <Link href="/checklist" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[var(--savanna-terracotta)] transition-colors">
                    <CheckSquare size={18} />
                    <span className="hidden sm:inline">Checklist</span>
                </Link>
            </div>
        </nav>
    );
}
