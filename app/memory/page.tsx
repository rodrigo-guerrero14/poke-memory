import { MemoryContenedor } from "@/components/MemoryContenedor/page";
import { PokemonCorner } from "@/components/PokemonCorner/page";
import { PokemonsInfo } from "@/pokemons/interfaces/pokemon-image";
import { PokemonResponse } from "@/pokemons/interfaces/pokemon-response";
import { notFound } from "next/navigation";
import { connection } from "next/server";

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

const MIN_POKEMON_ID = 1;
const MAX_POKEMON_ID = 151;
const PAIRS_COUNT = 3;

const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

const sortPokemons = (): number[] => {
    const idsRange = Array.from(
        { length: MAX_POKEMON_ID - MIN_POKEMON_ID + 1 },
        (_, index) => index + MIN_POKEMON_ID
    );
    return shuffleArray(idsRange).slice(0, PAIRS_COUNT);
}

const getPokemons = async () => {
    try {
        await connection();
        const [firstPokemon, secondPokemon, thirdPokemon] = sortPokemons();

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

        return shuffleArray([...pokemonImages, ...pokemonImages]);

    } catch (error) {
        notFound();
    }
}

export default async function MemoryPage() {
    const listadoPokemons: PokemonsInfo[]  = await getPokemons();
    return (
        <>
            <MemoryContenedor listadoPokemons={listadoPokemons} />
            <PokemonCorner />
        </>
    )
}   