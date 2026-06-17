'use client';
import { PokemonsInfo } from "@/pokemons/interfaces/pokemon-image";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
    pokemonInfo: PokemonsInfo;
    compararPokemons: (pokemonInfo: PokemonsInfo) => void;
    hidePokemons: boolean;
    pokemonsFinded: PokemonsInfo[];
}

export const MemoryItem = ({ pokemonInfo, compararPokemons, hidePokemons, pokemonsFinded }: Props) => {

    const [isActive, setIsActive] = useState(false);
    const [isFinded, setIsFinded] = useState(false);

    const handleOnClick = () => {
        setIsActive((prevStatus) => !prevStatus);
        if(!isFinded) {
            compararPokemons(pokemonInfo);
        }
    }

    const findPokemon = () => {
        const isPokemonFinded = pokemonsFinded.find((pokemon) => { return pokemon.id === pokemonInfo.id });
        if(isPokemonFinded !== undefined && isPokemonFinded){
            setIsFinded(true);
        }else{
            setIsFinded(false);
        }
    }

    useEffect(() => {
        if(hidePokemons && !isFinded){
            setIsActive(false);
        }
    }, [hidePokemons, isFinded])

    useEffect(() => {
        findPokemon();
    }, [pokemonsFinded])

    return (
        <div className={`flex align-items-center justify-center rate mb-2 w-96 h-72 bg-white py-6 px-6 rounded-md  `} onClick={() => handleOnClick()}>
            <div className={`flex flex-col justify-center items-center ${isActive ? '' : 'invisible'}`}>
                <Image src={pokemonInfo.pokemonImage!} alt="" width={220} height={220}/>
            </div>
        </div>
    )
}