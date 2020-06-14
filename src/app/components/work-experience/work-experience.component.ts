import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { QualificationDetails } from 'src/app/classes/QualificationDetails';
import { MatDialogRef } from '@angular/material/dialog';
import { WorkExperience } from 'src/app/classes/WorkExperience';
import { DataTransferService } from 'src/app/services/data-transfer.service';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent implements OnInit {

  form: FormGroup;
  experience: WorkExperience[];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<WorkExperienceComponent>, private dataTransferService: DataTransferService) { }

  ngOnInit(): void {
    this.createForm();
  }

  close() {
    this.dialogRef.close();
  }

  createForm() {
    this.form = this.fb.group({
      experienceControl: this.fb.array([])
    });
  }

  getWorkExperience() {
    return this.form.get('experienceControl') as FormArray;
  }

  addWorkExperience() {
    (this.form.get('experienceControl') as FormArray).push(this.createItem());
    console.log('Form is ** ', this.form);
  }

  removeWorkExperience(index: number) {
    (this.form.get('work') as FormArray).removeAt(index);
  }

  submit() {
    this.experience = this.form.value.experienceControl;
    console.log('Education Details are ', this.experience);
    this.dataTransferService.workExperienceDetails = this.experience;
    this.dialogRef.close();
  }

  createItem(): FormGroup {
    return this.fb.group({
      designation: '',
      organizationName: '',
      fromDate: '',
      toDate: '',
      jobDescription: '',
      responsibility: ''
    });
  }

}
