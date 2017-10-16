import { Component, Input } from '@angular/core'

@Component({
  selector: 'Pokemon',
  templateUrl: './pokemon.component.html'
})
export class PokemonComponent {
  @Input() nome
  @Input() numero
}
