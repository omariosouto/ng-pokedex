import { Component } from '@angular/core';
import { Http } from '@angular/http'

@Component({
  selector: 'listagem-pokemon',
  templateUrl: './listagem-pokemon.component.html'
})

export class ListagemPokemonComponent {

  pokemons: Array<Object> = []

  constructor(http: Http) {

    http
        .get('http://localhost:4201/api/pokemons')
        .map( dados => dados.json() )
        .subscribe((json) => {
          this.pokemons = json
        })
  }
}
