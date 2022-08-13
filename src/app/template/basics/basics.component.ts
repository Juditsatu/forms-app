import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styles: [`
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
  `
  ]
})
export class BasicsComponent implements OnInit {

  @ViewChild('myForm') myForm!: NgForm;

  initForm = {
    product: 'RTX 3040',
    price: 10,
    stock: 10
  }

  constructor() { }

  ngOnInit(): void {
  }

  validName(): boolean {
    return this.myForm?.controls['product']?.invalid && 
           this.myForm?.controls['product']?.touched;
  }

  validPrice(): boolean {
    return this.myForm?.controls['price']?.value < 0 &&
           this.myForm?.controls['price']?.touched;
  }

  save() {
    console.log(this.myForm);

    this.myForm.resetForm({
      price: 0,
      stock: 0
    });
  }

}
