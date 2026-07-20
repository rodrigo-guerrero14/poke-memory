import Image from "next/image";
import { PokeBall } from "@/components/PokeBall/page";

const SPRITE_BASE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world";

const Zzz = ({ className = "" }: { className?: string }) => (
    <span className={`select-none font-display font-bold text-pokedex-blue/50 ${className}`}>z</span>
);

export const PokemonCorner = () => {
    return (
        <div className="pointer-events-none fixed bottom-0 right-0 z-0 hidden items-end pr-2 pb-2 opacity-80 sm:flex">
            <div className="relative h-16 w-16 -mr-3 rotate-[-6deg]">
                <Image src={`${SPRITE_BASE}/1.svg`} alt="" fill sizes="64px" className="object-contain" />
                <Zzz className="absolute -top-1 right-1 text-xs" />
            </div>
            <div className="relative h-20 w-20 -mr-4 rotate-[4deg]">
                <Image src={`${SPRITE_BASE}/7.svg`} alt="" fill sizes="80px" className="object-contain" />
                <Zzz className="absolute -top-2 right-2 text-sm" />
            </div>
            <div className="relative h-28 w-28 -mr-2">
                <Image src={`${SPRITE_BASE}/25.svg`} alt="" fill sizes="112px" className="object-contain" />
                <Zzz className="absolute -top-2 right-4 text-base" />
            </div>
            <div className="relative h-20 w-20 rotate-[6deg]">
                <Image src={`${SPRITE_BASE}/4.svg`} alt="" fill sizes="80px" className="object-contain" />
                <Zzz className="absolute -top-2 left-2 text-sm" />
            </div>
            <PokeBall className="absolute bottom-1 left-6 h-4 w-4" />
            <PokeBall className="absolute bottom-1 right-8 h-4 w-4" />
        </div>
    );
};
