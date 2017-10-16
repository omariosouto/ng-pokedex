import { Component, Input } from '@angular/core'

@Component({
  selector: 'Painel',
  templateUrl: './painel.component.html'
})
export class PainelComponent {
  @Input() numero: number
}
