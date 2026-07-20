"use client";
import { PokemonsInfo } from "@/pokemons/interfaces/pokemon-image";
import { useEffect, useState } from "react";
import { MemoryItem } from "../MemoryItem/page";
import { PokemonModal } from "../PokemonModal/page";
import { MemoryHeader } from "../MemoryHeader/page";

interface Props {
    listadoPokemons: PokemonsInfo[];
}

interface CardSelection {
    pokemon: PokemonsInfo;
    indice: number;
}

const EVALUATION_DELAY_MS = 500;

export const MemoryContenedor = ({listadoPokemons} : Props) => {
    const [pokemonsActives, setPokemonsActives] = useState<CardSelection[]>([]);
    const [pokemonsFinded, setPokemonsFinded] = useState<PokemonsInfo[]>([]);

    const seleccionarPokemon = (pokemonInfo: PokemonsInfo, indice: number) => {
        setPokemonsActives((actuales) => {
            const cardYaSeleccionada = actuales.some((activo) => activo.indice === indice);
            if (cardYaSeleccionada || actuales.length >= 2) {
                return actuales;
            }
            return [...actuales, { pokemon: pokemonInfo, indice }];
        });
    }

    useEffect(() => {
        if (pokemonsActives.length < 2) {
            return;
        }

        const [primerElegido, segundoElegido] = pokemonsActives;
        const timeoutId = setTimeout(() => {
            if (primerElegido.pokemon.id === segundoElegido.pokemon.id) {
                setPokemonsFinded((actuales) => [...actuales, primerElegido.pokemon]);
            }
            setPokemonsActives([]);
        }, EVALUATION_DELAY_MS);

        return () => clearTimeout(timeoutId);
    }, [pokemonsActives]);

    const deletePokemonsFinded = () => {
        setPokemonsFinded([]);
        setPokemonsActives([]); 
    }

    return (
        <div className="relative z-10 flex min-h-dvh w-full flex-col items-center">
            <MemoryHeader totalPairs={listadoPokemons.length / 2} pairsFound={pokemonsFinded.length} />
            <div className="grid w-full max-w-3xl grid-cols-3 place-items-center gap-4 p-6 sm:gap-6">
                {listadoPokemons.map((pokemon, indice) => {
                    const isFinded = pokemonsFinded.some((encontrado) => encontrado.id === pokemon.id);
                    const isActive = pokemonsActives.some((activo) => activo.indice === indice);
                    return (
                        <MemoryItem
                            key={`${pokemon.id}-${indice}`}
                            pokemonInfo={pokemon}
                            isActive={isActive}
                            isFinded={isFinded}
                            onSelect={() => seleccionarPokemon(pokemon, indice)}
                        />
                    );
                })}
            </div>
            <PokemonModal pokemonsFinded={pokemonsFinded} deletePokemonsFinded={deletePokemonsFinded} />
        </div>
    )
}
