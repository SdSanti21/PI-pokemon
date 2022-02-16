const axios = require('axios');
const { Pokemon, Type } = require('../db');

const getPokemonInfo = async(req, res)=>{
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10`);
    const pokemons = response.data.results;
    return  Promise.all(pokemons.map((pokemon) => axios.get(pokemon.url)))
    .then((pokemonResponses) => pokemonResponses.map((response) =>response.data))
    .then(resF=>res.json(
      resF.map(el=>({
          name:el.name,
          types:el.types.map(ele=>ele.type.name).join(", "),
          img: el.sprites.other.home.front_default
        }))))
}

const getPokemonId= async(req, res)=>{
    const { id } = req.params
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const dataFull = await response.data
    const pokemon = {
      id:id,
      name:dataFull.name,
      img:dataFull.sprites.other.home.front_default,
      type: dataFull.types.map(ele=>ele.type.name).join(", "),
      live: dataFull.stats[0].base_stat ,
      defense: dataFull.stats[2].base_stat ,
      speed : dataFull.stats[5].base_stat ,
      hp: dataFull.stats[1].base_stat ,
      weight: dataFull.weight,
      height:dataFull.height
  
    }
    res.json(pokemon)
}

const getPokemonName= async(req, res)=>{
    try {
      const { namePokemon } = req.query
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${namePokemon.toLowerCase()}`);
       const dataFull = await response.data
        const pokemon = {
          id:dataFull.id,
          name:dataFull.name,
          img:dataFull.sprites.other.home.front_default,
          type: dataFull.types.map(ele=>ele.type.name).join(", "),
          live: dataFull.stats[0].base_stat ,
          defense: dataFull.stats[2].base_stat ,
          speed : dataFull.stats[5].base_stat ,
          hp: dataFull.stats[1].base_stat ,
          weight: dataFull.weight,
          height:dataFull.height
          
        }
        res.json(pokemon) 
    
      
    } catch (error) {
      console.log('no se encontro al pokemon')
    }
  }

module.exports = {
    getPokemonInfo,
    getPokemonId,
    getPokemonName
}