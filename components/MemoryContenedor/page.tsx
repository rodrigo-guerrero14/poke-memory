"use client";
import { PokemonsInfo } from "@/pokemons/interfaces/pokemon-image";
import { useState } from "react";
import { MemoryItem } from "../MemoryItem/page";

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
    
    return (
        <div className="w-screen min-h-dvh items-center justify-around bg-indigo-700 grid grid-cols-3 gap-2">
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
    )
} 