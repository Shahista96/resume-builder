import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { InternshipComponent } from '../internship/internship.component';
import { WorkExperienceComponent } from '../work-experience/work-experience.component';

@Component({
  selector: 'app-hobby',
  templateUrl: './hobby.component.html',
  styleUrls: ['./hobby.component.scss']
})
export class HobbyComponent implements OnInit {

  hobbyForm: FormGroup;
  hobbiesArray: Array<string> = [];

  constructor(private fb: FormBuilder, private matDialog: MatDialog,
              public dialogRef: MatDialogRef<HobbyComponent>, private dataTransferService: DataTransferService) { }

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

  openInternship(){
    this.matDialog.open(InternshipComponent, {width: '400px', minHeight: '150px'});
  }

  openWorkExperience(){
    this.matDialog.open(WorkExperienceComponent, {width: '400px', minHeight: '150px'});
}
}
