import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dynamics',
  templateUrl: './dynamics.component.html',
  styles: [
  ]
})
export class DynamicsComponent {

  myForm: FormGroup = this.fb.group({
    name: [ , [Validators.required, Validators.minLength(3)]],
    favorites: this.fb.array( [
      ['Stardew Valley'],
      ['Elden Ring']
    ], Validators.required )
  });

  newFavorite: FormControl = this.fb.control('', Validators.required);

  get favoritesArr() {
    return this.myForm.get('favorites') as FormArray;
  }

  constructor( private fb: FormBuilder ) { }

  invalidField( field: string ) {
    return this.myForm.controls[field].errors && 
           this.myForm.controls[field].touched;
  }

  addFavorite() {
    if (this.newFavorite.invalid) {
      return;
    }

    //Passes added game into the array form
    this.favoritesArr.push(new FormControl(this.newFavorite.value, Validators.required));

    this.newFavorite.reset();
  }

  deleteGame(index: number) {
    this.favoritesArr.removeAt(index)
  }

  save() {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value)
  }

}
