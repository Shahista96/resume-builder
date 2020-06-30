import { Component, OnInit } from '@angular/core';
import { PersonalDetails } from 'src/app/classes/PersonalDetails';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { EducationComponent } from '../education/education.component';


@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {

  url;
  selectedFile = null;
  personalDetailsClass: PersonalDetails;

  constructor(private matDialog: MatDialog,
              private dataTransferService: DataTransferService,
              private matDialogRef: MatDialogRef<PersonalDetails>) { }

  ngOnInit(): void {
    this.personalDetailsClass = new PersonalDetails();
    if (this.dataTransferService.personalDetailsForm) {
      this.personalDetailsClass = this.dataTransferService.personalDetails;
    }
  }

  submit(personalDetails): void {
    console.log('Personal Details are ', personalDetails.value);
    this.dataTransferService.personalDetailsForm = personalDetails;
    this.dataTransferService.personalDetails = personalDetails.value;
    this.matDialogRef.close();

  }

  close() {
    this.matDialogRef.close();
  }

  // onFileSelected(event) {
  //   console.log('On File Selected ', event);
  //   this.selectedFile = event.target.files[0];
  // }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      this.dataTransferService.imageDetails = event;
      localStorage.setItem('imageEvent', event);
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      console.log('Event in Personal Details ', event);
      // tslint:disable-next-line: no-shadowed-variable
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        this.personalDetailsClass.photoUrl = this.url;
      };
    }
    this.selectedFile = true;
}

openEducation(){
  // this.matDialogRef.close();
  console.log('Opening dialog education ');
  this.matDialog.open(EducationComponent, {width: '400px', minHeight: '150px'});
}

}
