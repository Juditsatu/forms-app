import { Component, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  constructor( 
    private fb: FormBuilder,
    private modalService: NgbModal ) { }

  ngOnInit(): void {
    this.myForm.reset({
       ...this.person,
       terms: false
    });

    //prints on console live the changes made in the form
    this.myForm.valueChanges
      .subscribe( ({ terms, ...rest }) => {
        // delete form.terms;
        this.person = rest;
      })
  }
  person = {
    gender: 'F',
    notifications: true
  }

  save() {
    const formValue = { ...this.myForm.value };
    console.log(formValue)
  }

  myForm: FormGroup =  this.fb.group({
    gender: [ this.person.gender, Validators.required ],
    notifications: [ this.person.notifications, Validators.required ],
    terms: [ false, Validators.requiredTrue ]
  });

  //MODAL
  title = 'appBootstrap';
  
  closeResult: string | undefined;

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
