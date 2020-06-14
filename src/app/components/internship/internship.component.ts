import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { InternshipDetails } from 'src/app/classes/InternshipDetails';

@Component({
  selector: 'app-internship',
  templateUrl: './internship.component.html',
  styleUrls: ['./internship.component.scss']
})
export class InternshipComponent implements OnInit {

  form: FormGroup;
  internshipArray: InternshipDetails[];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<InternshipComponent>, private dataTransferService: DataTransferService) { }
  

  ngOnInit(): void {
    this.createForm();
  }

  close() {
    this.dialogRef.close();
  }

  createForm() {
    if (this.dataTransferService.internshipForm){
      this.form = this.dataTransferService.internshipForm;
    }else{
      this.form = this.fb.group({
        internships: this.fb.array([])
      });
      this.addInternship();
    }
  }

  getInternships() {
    return this.form.get('internships') as FormArray;
  }

  addInternship() {
    (this.form.get('internships') as FormArray).push(this.createItem());
    console.log('Form is ** ', this.form);
  }

  removeInternship(index: number) {
    (this.form.get('internships') as FormArray).removeAt(index);
  }

  submit() {
    this.dataTransferService.internshipForm = this.form;
    this.internshipArray = this.form.value.internships;
    this.dataTransferService.intershipDetails = this.internshipArray;
    console.log('Internships are - > ', this.internshipArray);
    this.dialogRef.close();
  }

  createItem(): FormGroup {
    return this.fb.group({
      title: '',
      description: '',
    });
  }
}
