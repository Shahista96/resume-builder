import { Component, OnInit } from '@angular/core';
import { PersonalDetails } from 'src/app/classes/PersonalDetails';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {

  url;
  selectedFile = null;
  personalDetailsClass: PersonalDetails;

  constructor(private http: HttpClient, private dataTransferService: DataTransferService, private matDialogRef: MatDialogRef<PersonalDetails>) { }

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

  onUpload(){
    //this.http.post('')
    
  }

}
