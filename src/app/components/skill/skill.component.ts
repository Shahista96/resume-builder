import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {

  skillsForm: FormGroup;
  skills: Array<string> = [];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<SkillComponent>) { }

  ngOnInit(): void {
    this.createForm();
  }

  close() {
    this.dialogRef.close();
  }

  createForm() {
    this.skillsForm = this.fb.group({
      skillSet: this.fb.array([])
    });
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
    this.skills = this.skillsForm.value.skillSet;
    console.log('Skills are :: ', this.skills);
    this.dialogRef.close();
  }
}
