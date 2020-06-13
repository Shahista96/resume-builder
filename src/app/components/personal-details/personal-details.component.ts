import { Component, OnInit } from '@angular/core';
import { PersonalDetails } from 'src/app/classes/PersonalDetails';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {

  personalDetailsClass: PersonalDetails = new PersonalDetails();

  constructor() { }

  ngOnInit(): void {

  }

  submit(personalDetails): void{
    console.log('Form Value is ', personalDetails);
    console.log('Personal Details are **************');
    console.log(this.personalDetailsClass);
  }

  close(){
    //
  }

}
