import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { AchievementComponent } from '../achievement/achievement.component';
import { CourseComponent } from '../course/course.component';


@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {

  skillsForm: FormGroup;
  skills: Array<string> = [];

  constructor(private fb: FormBuilder, private matDialog: MatDialog,
              public dialogRef: MatDialogRef<SkillComponent>, private dataTransferService: DataTransferService) { }

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
  }

  openAchievement(){
    this.matDialog.open(AchievementComponent, {width: '400px', minHeight: '150px'});
    this.close();
  }

  openCourse(){
    this.matDialog.open(CourseComponent, {width: '400px', minHeight: '150px'});
    this.close();
  }


}
