import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  //validate name with mayus and minus
  public namePattern: string = '([A-z]+) ([A-z]+)';
  
  //Validate email
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor() {}

  notStrider( control: FormControl ): ValidationErrors | null {
    const queue = control.value?.trim().toLowerCase();
    if (queue === 'strider') {
      return {
        noStrider: true
      };
    }
    return null;
  }

  sameFields(field1: string, field2: string ) {

    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      const pass1 = formGroup.get(field1)?.value;
      const pass2 = formGroup.get(field2)?.value;

      if (pass1 !== pass2) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true };
      }

      formGroup.get(field2)?.setErrors( null );
      return null;
    }

  }
}
