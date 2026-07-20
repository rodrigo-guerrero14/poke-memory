'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
interface Props {
    deletePokemonsFinded: () => void;
    pokemonsFinded: any[]
}

export const PokemonModal = ({ pokemonsFinded, deletePokemonsFinded }: Props) => {
    const [active, setActive] = useState(false)
    const router = useRouter()
    
    const retry = () => {
        deletePokemonsFinded()
        setActive(false)
        router.refresh();
    }

    useEffect(() => {
        if (pokemonsFinded.length >= 3) {
            setActive(true)
        } else {
            setActive(false)
        }
    }, [pokemonsFinded])

    return active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4" >
            <div className="w-full max-w-sm rounded-2xl border-2 border-pokedex-blue bg-paper p-6 text-center shadow-xl">
                <h2 className="font-display text-2xl font-bold text-pokedex-blue">
                    ¡Los atrapaste a todos!
                </h2>

                <p className="mt-3 text-ink/80">
                    Encontraste las 3 parejas. ¿Quieres jugar otra ronda?
                </p>

                <div className="mt-6 flex justify-center">
                    <button
                        onClick={retry}
                        className="rounded-full bg-vermilion px-6 py-2 font-semibold text-white shadow-md transition-colors hover:bg-poke-red focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pika-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                    >
                        Jugar de nuevo
                    </button>
                </div>
            </div>
        </div>
    )
}