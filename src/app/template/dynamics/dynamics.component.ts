import { Component } from '@angular/core';

interface Person {
  name: string;
  favorites: Favorite[];
}

interface Favorite {
  id: number;
  name: string;
}

@Component({
  selector: 'app-dynamics',
  templateUrl: './dynamics.component.html',
  styles: [
  ]
})
export class DynamicsComponent {

  newGame: string = '';

  person: Person = {
    name: 'John Doe',
    favorites: [
      {id: 1, name: 'Elden Ring'},
      {id: 2, name: 'Stardew Valley'}
    ]
    
  }

  addGame() {
    const favGame: Favorite = {
      id: this.person.favorites.length + 1,
      name: this.newGame
    }

    this.person.favorites.push({...favGame});
    this.newGame = '';
  }

  deleteGame(index: number) {
    this.person.favorites.splice(index, 1);
  }

  save() {
    console.log('Saved form');
  }

}
