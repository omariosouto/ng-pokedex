const Express = require('express')
const Cors = require('cors')
const BodyParser = require('body-parser')

const App = new Express()

const MockData = require('./data/index.js')

data = MockData;

App.use(Cors())
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());

App.get('/api/pokemons', (req, res) => {
  res.json(data.pokemons)
})

App.post('/api/pokemons', (req,res) => {
  console.log(req.body)
  const newPokemon = req.body
  const pokemonExists = data.pokemons.some(pokemon => pokemon.numero === newPokemon.numero)

  console.log(pokemonExists)

  if(pokemonExists) {
    res.status(400)
    res.json({ error: `Pokémon com o número: ${newPokemon.numero}. Já foi cadastrado` })
  } else {
    data.pokemons.push(newPokemon)
    res.send(newPokemon)
  }
})

App.get('*', (req, res) => {
  res.send('Coming soon...')
})

App.listen(4201, () => {
  console.log('Deus no comando')
})
