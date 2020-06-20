import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DataTransferService } from 'src/app/services/data-transfer.service';

@Component({
  selector: 'app-hobby',
  templateUrl: './hobby.component.html',
  styleUrls: ['./hobby.component.scss']
})
export class HobbyComponent implements OnInit {

  hobbyForm: FormGroup;
  hobbiesArray: Array<string> = [];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<HobbyComponent>, private dataTransferService: DataTransferService) { }

  ngOnInit(): void {
    this.createForm();
  }

  close() {
    this.dialogRef.close();
  }

  createForm() {
    this.hobbyForm = this.fb.group({
      hobbies: this.fb.array(this.dataTransferService.hobbyDetails)
    });
    if (this.dataTransferService.hobbyDetails.length < 1){
     this.addHobby();
    }
  }

  getHobbies() {
    return this.hobbyForm.get('hobbies') as FormArray;
  }

  addHobby() {
    (this.hobbyForm.get('hobbies') as FormArray).push(this.fb.control(''));
    console.log('Form is ** ', this.hobbyForm);
  }

  removeHobby(index: number) {
    (this.hobbyForm.get('hobbies') as FormArray).removeAt(index);
  }

  submit() {
    this.hobbiesArray = this.hobbyForm.value.hobbies;
    this.dataTransferService.hobbyDetails = this.hobbiesArray;
    this.dialogRef.close();
  }
}
