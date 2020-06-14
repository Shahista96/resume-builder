import { Component, OnInit } from '@angular/core';
import { PersonalDetails } from 'src/app/classes/PersonalDetails';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {

  personalDetailsClass: PersonalDetails;

  constructor(private dataTransferService: DataTransferService, private matDialogRef: MatDialogRef<PersonalDetails>) { }

  ngOnInit(): void {
    this.dataTransferService.personalInfoObserver.subscribe((data) => {
      this.personalDetailsClass = data;
      console.log("In Personal Details On Init - ", this.personalDetailsClass);
    });
  }

  submit(personalDetails): void{
    console.log('Personal Details are ', personalDetails.value);
    this.dataTransferService.personalDetails = personalDetails.value;
    this.dataTransferService.updatePersonalInfo(personalDetails.value);
    this.matDialogRef.close();

  }

  close(){
    this.matDialogRef.close();
  }

}
