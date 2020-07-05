import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { QualificationDetails } from 'src/app/classes/QualificationDetails';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { WorkExperience } from 'src/app/classes/WorkExperience';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { EducationComponent } from '../education/education.component';
import { HobbyComponent } from '../hobby/hobby.component';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent implements OnInit {

  disableSubmit = true;
  form: FormGroup;
  experience: WorkExperience[];
  totalWorkExperience;

  constructor(private fb: FormBuilder, private matDialog: MatDialog,
              public dialogRef: MatDialogRef<WorkExperienceComponent>, private dataTransferService: DataTransferService) { }

  ngOnInit(): void {
    this.createForm();
    this.form.valueChanges.subscribe((data) => this.disableSubmit = !(this.form.valid));
  }

  close() {
    this.dialogRef.close();
  }

  createForm() {
    if (this.dataTransferService.workExperienceForm) {
      this.form = this.dataTransferService.workExperienceForm;
      this.totalWorkExperience = this.dataTransferService.totalWorkExperience;
    } else {
      this.form = this.fb.group({
        experienceControl: this.fb.array([])
      });
      this.addWorkExperience();
      this.addResponsibility(0);
    }
  }

  getWorkExperience() {
    return this.form.get('experienceControl') as FormArray;
  }

  addWorkExperience() {
    (this.form.get('experienceControl') as FormArray).push(this.createItem());
    // this.addResponsibility(0);
    console.log('Form is ** ', this.form);
  }

  removeWorkExperience(index: number) {
    (this.form.get('experienceControl') as FormArray).removeAt(index);
  }

  submit() {
   
    this.dataTransferService.totalWorkExperience = this.totalWorkExperience;
    this.dataTransferService.workExperienceForm = this.form;
    this.experience = this.form.value.experienceControl;
    this.dataTransferService.workExperienceDetails = this.experience;
    console.log('Work Ex Details : ',this.experience);
  }

  initResponsibilities() {
    return new FormGroup({
      responsibility: new FormControl('', [Validators.required, Validators.minLength(1)])
    });
  }

  createItem(): FormGroup {
    return this.fb.group({
      designation: this.fb.control('', [Validators.required, Validators.minLength(1)]),
      organizationName: this.fb.control('', [Validators.required, Validators.minLength(1)]),
      fromDate: this.fb.control('', [Validators.required, Validators.minLength(1)]),
      toDate: this.fb.control('', [Validators.required, Validators.minLength(1)]),
      jobDescription: this.fb.control('', [Validators.required, Validators.minLength(1)]),
      responsibilities: new FormArray([
      ],[Validators.required])
    });
    
  }

  addResponsibility(i: number): void {
    ((this.form.get('experienceControl') as FormArray).controls[i].get('responsibilities') as FormArray).push(this.fb.control(''));
    console.log('After Adding Form Value is ** ', this.form);
  }

  getResponsibilities(i) {
    return ((this.form.get('experienceControl') as FormArray).controls[i].get('responsibilities') as FormArray).controls;
  }

  removeResponsibility(i, j): void {
    if (j !== 0) {
      const control = (this.form.get('experienceControl') as FormArray).controls[i].get('responsibilities') as FormArray;
      control.removeAt(j);
    }
  }

  openEducation(){
    this.matDialog.open(EducationComponent, {width: '400px', minHeight: '150px'});
    this.close();
  }

  openHobby(){
    this.matDialog.open(HobbyComponent, {width: '400px', minHeight: '150px'});
    this.close();
  }

}
