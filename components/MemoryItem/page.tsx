'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from 'motion/react'
import { PokeBall } from "@/components/PokeBall/page";
import { PokemonsInfo } from "@/pokemons/interfaces/pokemon-image";

interface Props {
    pokemonInfo: PokemonsInfo;
    isActive: boolean;
    isFinded: boolean;
    onSelect: () => void;
}

const usePrefersReducedMotion = () => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const query = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(query.matches);
        const handleChange = () => setPrefersReducedMotion(query.matches);
        query.addEventListener("change", handleChange);
        return () => query.removeEventListener("change", handleChange);
    }, []);

    return prefersReducedMotion;
}

export const MemoryItem = ({ pokemonInfo, isActive, isFinded, onSelect }: Props) => {

    const prefersReducedMotion = usePrefersReducedMotion();
    const isRevealed = isActive || isFinded;

    return (
        <button
            type="button"
            disabled={isFinded || isActive}
            onClick={onSelect}
            aria-label={isRevealed ? `${pokemonInfo.name}${isFinded ? ", pareja encontrada" : ""}` : "Carta oculta, pulsa para voltear"}
            className={`relative flex aspect-square w-24 items-center justify-center rounded-2xl transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pika-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:w-32 md:w-40 ${isRevealed ? '' : 'cursor-pointer'} ${isFinded ? 'scale-95 opacity-60' : ''}`}
            style={{ perspective: 1000 }}
        >
            <motion.div
                className="relative h-full w-full"
                initial={false}
                animate={{
                    rotateY: !isRevealed ? 180 : 0,
                }}
                transition={{
                    duration: prefersReducedMotion ? 0 : 0.6,
                    ease: "easeInOut",
                }}
                style={{
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Frente: Pokémon */}
                <div
                    className={`absolute inset-0 flex items-center justify-center rounded-2xl border-2 bg-white p-3 shadow-md transition-shadow ${isFinded ? 'border-pika-yellow ring-2 ring-pika-yellow' : 'border-pokedex-blue'}`}
                    style={{ backfaceVisibility: "hidden" }}
                    aria-hidden={!isRevealed}
                >
                    <Image
                        src={pokemonInfo.pokemonImage!}
                        alt={isRevealed ? pokemonInfo.name : ""}
                        width={140}
                        height={140}
                        className="h-4/5 w-4/5 object-contain"
                    />
                </div>

                {/* Reverso: Pokébola */}
                <div
                    className="absolute inset-0 flex items-center justify-center rounded-2xl border-2 border-ink bg-pokedex-blue p-5 shadow-md"
                    style={{
                        transform: "rotateY(180deg)",
                        backfaceVisibility: "hidden",
                    }}
                    aria-hidden={isRevealed}
                >
                    <PokeBall className="h-full w-full" />
                </div>
            </motion.div>
        </button>
    )
}
