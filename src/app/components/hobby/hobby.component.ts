import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-hobby',
  templateUrl: './hobby.component.html',
  styleUrls: ['./hobby.component.scss']
})
export class HobbyComponent implements OnInit {

  hobbyForm: FormGroup;
  hobbiesArray: Array<string> = [];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<HobbyComponent>) { }

  ngOnInit(): void {
    this.createForm();
  }

  close() {
    this.dialogRef.close();
  }

  createForm() {
    this.hobbyForm = this.fb.group({
      hobbies: this.fb.array([])
    });
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
    this.dialogRef.close();
  }
}
