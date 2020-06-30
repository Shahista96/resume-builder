import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { SkillComponent } from '../skill/skill.component';
import { ExtraCurricularComponent } from '../extra-curricular/extra-curricular.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  courseForm: FormGroup;
  coursesArray: Array<string> = [];

  constructor(private fb: FormBuilder, private matDialog: MatDialog,
              public dialogRef: MatDialogRef<CourseComponent>, private dataTransferService: DataTransferService) { }

  ngOnInit(): void {
    this.createForm();
  }

  close() {
    this.dialogRef.close();
  }

  createForm() {
    if (this.dataTransferService.courseForm){
      this.courseForm = this.dataTransferService.courseForm;
    }else{
      this.courseForm = this.fb.group({
        courses: this.fb.array([])
      });
      this.addCourse();
    }
  }

  getCourses() {
    return (this.courseForm.get('courses') as FormArray);
  }

  addCourse() {
    (this.courseForm.get('courses') as FormArray).push(this.fb.control(''));
    console.log('Form is ** ', this.courseForm);
  }

  removeCourse(index: number) {
    (this.courseForm.get('courses') as FormArray).removeAt(index);
  }

  submit() {
    this.dataTransferService.courseForm = this.courseForm;
    this.dataTransferService.courses = this.courseForm.value.courses;
    console.log('Courses are :: ', this.coursesArray);
  }

  openSkill(){
    this.matDialog.open(SkillComponent, {width: '400px', minHeight: '150px'});
    this.close();
  }

  openExtraCurricular(){
    this.matDialog.open(ExtraCurricularComponent, {width: '400px', minHeight: '150px'});
    this.close();
  }
}
