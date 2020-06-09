import { Component, OnInit } from '@angular/core';
import { PersonalDetails } from 'src/app/classes/PersonalDetails';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {

  personalDetails: PersonalDetails = new PersonalDetails();

  constructor() { }

  ngOnInit(): void {

    this.personalDetails.email = 'test';
  }

}
