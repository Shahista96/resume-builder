import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DataTransferService } from 'src/app/services/data-transfer.service';


@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {

  skillsForm: FormGroup;
  skills: Array<string> = [];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<SkillComponent>, private dataTransferService: DataTransferService) { }

  ngOnInit(): void {
    this.createForm();
  }

  close() {
    this.dialogRef.close();
  }

  createForm() {
    if (this.dataTransferService.skillForm){
      this.skillsForm = this.dataTransferService.skillForm;
    }else{
      this.skillsForm = this.fb.group({
        skillSet: this.fb.array([])
      });
      this.addSkill();
    }
  }

  getSkills() {
    return this.skillsForm.get('skills') as FormArray;
  }

  addSkill() {
    (this.skillsForm.get('skillSet') as FormArray).push(this.fb.control(''));
    console.log('Form is ** ', this.skillsForm);
  }

  removeSkill(index: number) {
    (this.skillsForm.get('skillSet') as FormArray).removeAt(index);
  }

  submit() {
    this.dataTransferService.skillForm = this.skillsForm;
    this.skills = this.skillsForm.value.skillSet;
    console.log('Skills are :: ', this.skills);
    this.dataTransferService.skillDetails = this.skills;
    this.dialogRef.close();
  }
}
