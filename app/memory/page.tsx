import { MemoryContenedor } from "@/components/MemoryContenedor/page";
import { PokemonsInfo } from "@/pokemons/interfaces/pokemon-image";
import { PokemonResponse } from "@/pokemons/interfaces/pokemon-response";
import { notFound } from "next/navigation";

const getPokemon = async (id: string): Promise<any> => {
    try{
        const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/` + id, {
        })
            .then(res => res.json())
        return pokemon
    }catch(error){
        notFound();
    }
}

const getIdPokemonsRandom = () => {
    return Math.floor(Math.random() * (151 - 1)) + 1;
}

const sortPokemons = (pokemons:PokemonsInfo[]) => {
    return pokemons.sort(() => ( 0.5 - Math.random()));
}

const getPokemons = async () => {
    try {
        const firstPokemon = getIdPokemonsRandom();
        const secondPokemon = getIdPokemonsRandom();
        const thirdPokemon = getIdPokemonsRandom();

        const pokemons: PokemonResponse[] = await Promise.all([
            getPokemon(firstPokemon.toString()),
            getPokemon(secondPokemon.toString()),
            getPokemon(thirdPokemon.toString()),
        ]);

        const pokemonImages : PokemonsInfo[] =  pokemons.map((pokemonInfo) => ({
            pokemonImage: pokemonInfo.sprites.other?.dream_world.front_default,
            id: pokemonInfo.id,
            name: pokemonInfo.name
        }))
        const pokemonsArray = sortPokemons([...pokemonImages, ...pokemonImages]);

        return pokemonsArray;
        
    } catch (error) {
        notFound();
    }
}

export default async function MemoryPage() {
    const listadoPokemons: PokemonsInfo[]  = await getPokemons();
    return (
        <>
            <MemoryContenedor listadoPokemons={listadoPokemons} />
        </>
    )
}