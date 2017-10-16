import { RouterModule, Routes } from '@angular/router'

import { CadastroPokemonComponent } from './cadastro-pokemon/cadastro-pokemon.component';
import { ListagemPokemonComponent } from './listagem-pokemon/listagem-pokemon.component';

const AppRoutes: Routes = [
  {path: '', component: ListagemPokemonComponent},
  {path: 'cadastro', component: CadastroPokemonComponent}
]


export const routing = RouterModule.forRoot(AppRoutes)
