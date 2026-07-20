import { PokeBall } from "@/components/PokeBall/page";

interface Props {
    totalPairs: number;
    pairsFound: number;
}

export const MemoryHeader = ({ totalPairs, pairsFound }: Props) => {
    return (
        <header className="relative z-10 flex flex-col items-center gap-3 px-6 pt-8 text-center">
            <h1 className="font-display text-3xl font-bold tracking-wide text-pokedex-blue drop-shadow-[2px_2px_0_var(--color-pika-yellow)] sm:text-4xl">
                Memory Pokémon
            </h1>

            <ul
                className="flex items-center gap-2"
                aria-label={`Parejas encontradas: ${pairsFound} de ${totalPairs}`}
            >
                {Array.from({ length: totalPairs }).map((_, indice) => {
                    const isFound = indice < pairsFound;
                    return (
                        <li key={indice} aria-hidden="true">
                            <PokeBall
                                className={`h-5 w-5 transition-all duration-300 ${isFound
                                    ? "opacity-100 ring-2 ring-pika-yellow ring-offset-2 ring-offset-paper"
                                    : "opacity-30 grayscale"
                                    }`}
                            />
                        </li>
                    );
                })}
            </ul>
        </header>
    );
};
