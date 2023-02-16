import { useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [pokeName, setPokeName] = useState("");

  // initially no pokemon is chosen =>set it's state false
  const [pokemonChosen, setPokemonChosen] = useState(false);

  // set everything initially to empty string
  // it is only set when button is clicked
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    image1: "",
    image2: "",
    abilities: "",
    hp: "",
    attack: "",
    defense: "",
    specialAttack: "",
    specialDefense: "",
    speed: "",
    type: "",
  });

  // get all info about pokemon
  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`).then(
      (response) => {
        console.log(response);

        setPokemon({
          name: pokeName,
          species: response.data.species.name,
          image1: response.data.sprites.front_default,
          image2: response.data.sprites.back_default,
          abilities: response.data.abilities[0].ability.name,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          specialAttack: response.data.stats[3].base_stat,
          specialDefense: response.data.stats[4].base_stat,
          speed: response.data.stats[5].base_stat,
          type: response.data.types[0].type.name,
        });
        setPokemonChosen(true);
      }
    );
  };

  return (
    <div className="App">
      <div className="TitleSection">
        <h1>Pokemon Stats</h1>
        <input
          type="text"
          onChange={(event) => {
            setPokeName(event.target.value);
          }}
        />
        <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className="DisplaySection">
        {/* if no pokemon is chosen -> display a msg to ask them to chose a pokemon , else display details */}
        {!pokemonChosen ? (
          <h1>Choose a pokemon </h1>
        ) : (
          <>
            <h1> {pokemon.name} </h1>

            <div className="image_div">
              <img
                src={pokemon.image1}
                alt="pokemon_image_is_supposed_to_come_here"
              />
              <img
                src={pokemon.image2}
                alt="pokemon_image_is_supposed_to_come_here"
              />
            </div>

            <h3>Type : {pokemon.type}</h3>
            <h3>Species : {pokemon.species}</h3>
            <h3>Ability : {pokemon.abilities}</h3>
            <h4>Hp : {pokemon.hp}</h4>
            <h4>Attack : {pokemon.attack}</h4>
            <h4>Defense : {pokemon.defense}</h4>
            <h4>SpecialAttack : {pokemon.specialAttack}</h4>
            <h4>SpecialDefense : {pokemon.specialDefense}</h4>
            <h4>Speed : {pokemon.speed}</h4>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
