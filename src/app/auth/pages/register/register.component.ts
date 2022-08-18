import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.vs.namePattern)] ],
    email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern)], [ this.emailValidator ] ],
    user: ['', [Validators.required, this.vs.notStrider] ],
    password: ['', [Validators.required, Validators.minLength(6)] ],
    passwordConfirm: ['', [Validators.required, Validators.minLength(6)] ],
  }, {
    validators: [ this.vs.sameFields('password', 'passwordConfirm') ]
  })

  get emailErrorMsg(): string {
    const errors = this.myForm.get('email')?.errors;

    if (errors?.['required']) {
      return 'Email is required';
    } else if (errors?.['pattern']) {
      return 'Enter a valid Email';
    } else if (errors?.['emailTaken']) {
      return 'This email is already taken';
    }
    
    return '';
  }

  constructor( private fb: FormBuilder, 
               private vs: ValidatorsService,
               private emailValidator: EmailValidatorService ) { }

  ngOnInit(): void {

    this.myForm.reset({
      name: 'Judit Santos',
      email: 'test2@test.com',
      user: 'Juditsatu',
      password: '123456',
      passwordConfirm: '123456'
    })
  }

  invalidField( field: string ) {
    return this.myForm.get(field)?.invalid &&
           this.myForm.get(field)?.touched;
  }

  submitForm() {
    console.log(this.myForm.value);

    this.myForm.markAllAsTouched();
  }

}
