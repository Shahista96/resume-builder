import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-extra-curricular',
  templateUrl: './extra-curricular.component.html',
  styleUrls: ['./extra-curricular.component.scss']
})
export class ExtraCurricularComponent implements OnInit {

  form: FormGroup;
  activitiesArray: Array<string> = [];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ExtraCurricularComponent>) { }

  ngOnInit(): void {
    this.createForm();
  }

  close() {
    this.dialogRef.close();
  }

  createForm() {
    this.form = this.fb.group({
      activities: this.fb.array([])
    });
  }

  getActivity() {
    return this.form.get('activities') as FormArray;
  }

  addActivity() {
    (this.form.get('activities') as FormArray).push(this.fb.control(''));
  }

  removeActivity(index: number) {
    (this.form.get('activities') as FormArray).removeAt(index);
  }

  submit() {
    this.activitiesArray = this.form.value.activities;
    this.dialogRef.close();
  }
}
