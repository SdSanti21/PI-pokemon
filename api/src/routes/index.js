const { Router } = require('express');
const { getPokemonInfo, getPokemonId, getPokemonName } = require('../routes/controllers');

const router = Router();

router.get('/pokemones', getPokemonInfo)
router.get('/pokemon/:id', getPokemonId)
router.get('/pokemonesNm', getPokemonName)


module.exports = router;
