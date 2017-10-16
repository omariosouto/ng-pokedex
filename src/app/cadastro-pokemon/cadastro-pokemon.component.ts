import { Component } from '@angular/core';
import { PokemonComponent } from '../pokemon/pokemon.component'
import { Http, Headers } from '@angular/http'


@Component({
  selector: 'cadastro-pokemon',
  templateUrl: './cadastro-pokemon.component.html'
})
export class CadastroPokemonComponent {

  pokemon: PokemonComponent = new PokemonComponent()
  http: Http;

  constructor(http: Http) {
    this.pokemon.nome = 'Pikachu'
    this.pokemon.numero = 16
    this.http = http
  }

  cadastrar(event) {
    event.preventDefault()

    // Mostra o pokémon no console se ta tudo certo
    console.log(this.pokemon)

    // Headers
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    // Enviar para o servidor
    this.http.post('http://localhost:4201/api/pokemons', JSON.stringify(this.pokemon), { headers: headers })
             .subscribe( dados => {
                console.log(dados)
             })

  }

}
