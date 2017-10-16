# Componente
representa um pedaço de código da minha telinha mutcho louca (Igual react precisa de um seletor e um component/url de um)

# Modulo
Representa um agregador de coisas que eu só preciso incluir uma vez e deixar disponível pra todo mundo
tenho: Declarations e Exports
*** Módulos são importados por outros via o 'import'

======

1.0 -----

- Introdução, jogar CSS na cara deles

2.0 -----
- Criar um Componente
- Criar um módulo para gerenciar tudo o que esse componente pode vir a ter.
- No componente, passar propriedades chamando o @Input e criando as propriedades na classe

> [numero]="pokemon.numero" (one-way Bind)
> {{ pokemon.numero }} (one-wary Bind) 
one-way sendo [] ou {{ }}: Vem do Model (Classe) para o Componente



3.0 -----
- Fazendo requests muito loucos, importa do @angular/http pq o core é a parte de componentes
- Precisamos dar um @Inject para inserir a dependência do Http. Mas criar um Http não é algo trivial, quero que o angular crie
- Como dizer pro angular que ele precisa de um http? Ele precisa de um provedor que vem via um módulo: HttpModule
- Agora ta tudo certo, a página não ta erro

3.1 -----
- Quando fizemos o @Inject dissemos pro angular que o http do constructor é do tipo Http por debaixo dos panos
- Pra fazer isso, podemos usar o próprio TypeScript, ao invés de importar mais um cara, só informamos o tipo
`http: Http`

3.2 ------
- Continuando no mundo dos requests, agora nosso http pode fazer um `http.get('localhost:4201')`
- Mas como eu sei que isso chegou? Tenho que me inscrever nesse fluxo de dados pra saber quando ele terminou
- Promisses vs Streams (Jogar na cara deles)
```js
    http.get('http://localhost:4201/pokemons')
        .subscribe((dados) => {
          console.log(dados.json())
        })

```
- Quando chegar, convertemos ele para json e jogamos na nossa classe por meio do atributo pokemons `this,pokemons = dados.json()`

3.3 -------
- Podemos melhorar esse código, deixá-lo mais limpo, para isso vamos usar 
- O Angular não trabalha com promisses e sim com streams que são fluxos de dados, existe uma
lib famosa por lidar com isso chamada RxJs, ela será chamada no app.module.ts (assim geral vai usar)
```js
  import 'rxjs/add/operator/map'; // Modifica os Observables tudo para serem tratados como Arrays
```

- Com essa lib e nosso código pode tratar os streams como arrays ficando assim:
 ```js
    http
        .get('http://localhost:4201/pokemons')
        .map( dados => dados.json() )
        .subscribe((json) => {
          this.pokemons = json.pokemons
        })
```

3.4 -------
- Agora que temos nossos pokemons em mãos, vamos renderiza-los na tela `app.component.html`:
- Precisamos de algo que percorra o array, um for! e esse for vai direto no nosso componente usando o `*` antes
```html
<Pokemon *ngFor="let pokemon of pokemons" numero="{{ pokemon.numero }}" nome="{{ pokemon.nome }}"></Pokemon>
```

3.5 ------ Melhorando a App
- Queremos colocar uma moldura nas nossas fotos de pokémons, um novo componente
1. Cria a pasta para guardar os arquivos
  - painel.component.html ( tem nosso template e devemos usar `<ng-content></ng-content> ` para exibir conteúdo que for jogado nele)
  - painel.component.ts ( É quem define a modelagem do que vai ter no componente, dados que vão aparecer )
  - painel.module.ts ( Pega todas as dependências de um componente e deixa ele mais fácil de ser exportado )

2. no painel.module.ts, temos que declarar todas nossas declarations e o que vai ser exportado
```js
import { NgModule } from '@angular/core'
import { PainelComponent } from './painel.component'

@NgModule({
  declarations: [ PainelComponent ],
  exports: [ PainelComponent ]
})
export class PainelModule {}
```

3. Devemos importar esse novo module e colocar no `app.module.ts` para que geral possa usar esse cara.

4. E pronto nosso painel está configurado 

4.0 -------- Componentes e Paginas
- Separar paginas da app: Extrair tudo do app.component e jogar em um listagem.component em uma pasta nova e deixar o antigo vazio
- Criar o app.routes.ts

```js
import { RouterModule, Routes } from '@angular/router'

import { CadastroPokemonComponent } from './cadastro-pokemon/cadastro-pokemon.component';
import { ListagemPokemonComponent } from './listagem-pokemon/listagem-pokemon.component';

const AppRoutes: Routes = [
  {path: '', component: ListagemPokemonComponent},
  {path: 'cadastro', component: CadastroPokemonComponent}
]


export const routing = RouterModule.forRoot(AppRoutes)
```

  - Declara as dependencias do RouterModule e do tipo Routes,
  - Importa as páginas que serão roteadas
  - Cria um AppRoutes do tipo Routes, e passa um array de rotas com path e component (React Router like)
  - Exporta uma variavel routing com o forRoot do RouterModule

4.1 ---------

- Com o roteamento pronto o angular ainda vai xingar a gente, não da pra acessar o cadastro
  - É necessário ter o `<base href="/">`
  - Por fim, para chavear os componentes no app.component.html precisamos colocar um <router-outlet></router-outlet>
    - Outlet pq é a saída Saida do router, baseado no que a gente digitou e ta configurado no **app.routes.ts**
  - Para criar links entre as páginas precisamos criar um link customizado
    ```html
      <a class="btn btn-primary" [routerLink]="['/cadastro']">Novo Pokémon</a>
    ```


5.0 -------- Cadastrando Pokemons

## Criando o form e o evento
- Criar um formulário basicão com eles;
- Quem modela as informações dos componentes? a Classe! Ela vai ter nosso novo pokémon
- Mas como sabemoso que um pokémon precisa ter? Usando o pokemon component `pokemon: PokemonComponent = new PokemonComponent()`
- Legal e como preenchemos o valor desse cara? Via nosso form.
- Cria o evento de submit do angular `<form (submit)></form>` (angular sempre chama eventos com o () parenteses, isso abre uma conexão da view-to-model acessa algo que possuimos no model)
- Porém a página ainda carrega, pq? (passa o $event e recebe o evento na classe)

## Pegando dados da view e jogando para o usuário
- Até agora como vimos que podemos passar dados via angular?
  - No constructor declara algo e resgata via angular expression {{ }} ou one-way model-view "[]"
     <input [value]="pokemon.nome">
  - Mas como pegar as alterações desse cara? Fazer o reverso one-way view-model "()" 
     <input (input)="pokemon.nome = $event.target.value">

  Combinando tudo, temos algo assim:
  <input id="nome" type="text" class="form-control" [value]="pokemon.nome" (input)="pokemon.nome = $event.target.value">

## o two-way do core pra valer com [(ngModel)]
`import { ngModel } from '@angular/core'`
<input [(ngModel)]="pokemon.nome"> // Manda bala com esse cara

## Salvando as infos pra valer com AJAX
```js
    // Precisamos dizer para o servidor que tipo de dados estamos trabalhando em 3 Headers
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    // Enviar para o servidor, 1 a url 2 o que vamos enviar lembrando que JSON é um texto.
    this.http.post('http://localhost:4201/api/pokemons', JSON.stringify(this.pokemon), { headers: headers })
             .subscribe( dados => {
                console.log(dados)
             })
```

6 ---------- Melhorando o layout e vendo o ciclo de vida do componente (ngOnInit).


7 ---------- Pipes filtrando as porra toda



XX ------ Diretivas
https://angular.io/guide/testing

XX ------- Angualr Multi-lingua
https://angular.io/guide/i18n

XX ------- Angular Universal
https://medium.com/burak-tasci/angular-4-with-server-side-rendering-aka-angular-universal-f6c228ded8b0
