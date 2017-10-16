import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// App Providers
import { HttpModule } from '@angular/http'
// App Modules
import { PokemonModule } from './pokemon/pokemon.module'
import { PainelModule } from './painel/painel.module'

// RxJS Bagulhos
import 'rxjs/add/operator/map'; // Modifica os Observables tudo para serem tratados como Arrays

import { CadastroPokemonComponent } from './cadastro-pokemon/cadastro-pokemon.component';
import { ListagemPokemonComponent } from './listagem-pokemon/listagem-pokemon.component';

// Routing
import { routing } from './app.routes'

@NgModule({
  declarations: [
    AppComponent,
    CadastroPokemonComponent,
    ListagemPokemonComponent
  ],
  imports: [
    PokemonModule,
    PainelModule,
    BrowserModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap:  [ AppComponent ]
})
export class AppModule { }
