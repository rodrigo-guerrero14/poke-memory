"use client";
import { PokemonsInfo } from "@/pokemons/interfaces/pokemon-image";
import { useState } from "react";
import { MemoryItem } from "../MemoryItem/page";
import { PokemonModal } from "../PokemonModal/page";
import { MemoryHeader } from "../MemoryHeader/page";

interface Props {
    listadoPokemons: PokemonsInfo[];
}

export const MemoryContenedor = ({listadoPokemons} : Props) => {
    const [pokemonsActives, setPokemonsActives] = useState<PokemonsInfo[]>([]);
    const [pokemonsFinded, setPokemonsFinded] = useState<PokemonsInfo[]>([]);
    const [hidePokemons, setHidePokemons] = useState(false)

    const compararPokemons = (pokemonInfo: PokemonsInfo) => {
        setHidePokemons(false);
        agregarPokemonsActivos(pokemonInfo);
        evaluarPokemons(pokemonInfo);
    }

    const agregarPokemonsActivos = (pokemonInfo: PokemonsInfo) => {
        setPokemonsActives((pokemonsActivosActuales) => {
            return [...pokemonsActivosActuales, pokemonInfo];
        });
    }

    const evaluarPokemons = (pokemonInfo: PokemonsInfo) => {
        if(pokemonsActives.length >= 1){
            const pokemonFirstChoice: PokemonsInfo =  pokemonsActives[0];
            if(pokemonInfo.id === pokemonFirstChoice.id){
                setPokemonsFinded((pokemonsFinded) =>{ return [...pokemonsFinded, pokemonInfo]} )
                setPokemonsActives([]);
            }else{
                setPokemonsActives([]);
                setHidePokemons(true);
            }
        }
    }

    const deletePokemonsFinded = () => {
        setPokemonsFinded([])
    }
    
    return (
        <div className="relative z-10 flex min-h-dvh w-full flex-col items-center">
            <MemoryHeader totalPairs={listadoPokemons.length / 2} pairsFound={pokemonsFinded.length} />
            <div className="grid w-full max-w-3xl grid-cols-3 place-items-center gap-4 p-6 sm:gap-6">
                {listadoPokemons.map((pokemon, indice) => (
                    <MemoryItem
                        key={`${pokemon.id}-${indice}`}
                        pokemonInfo={pokemon}
                        compararPokemons={compararPokemons}
                        hidePokemons={hidePokemons}
                        pokemonsFinded={pokemonsFinded}
                    />
                ))}
            </div>
            <PokemonModal pokemonsFinded={pokemonsFinded} deletePokemonsFinded={deletePokemonsFinded} />
        </div>
    )
} 