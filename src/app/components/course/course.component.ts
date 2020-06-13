import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  courseForm: FormGroup;
  coursesArray: Array<string> = [];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<CourseComponent>) { }

  ngOnInit(): void {
    this.createForm();
  }

  close() {
    this.dialogRef.close();
  }

  createForm() {
    this.courseForm = this.fb.group({
      courses: this.fb.array([])
    });
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
    this.coursesArray = this.courseForm.value.courses;
    console.log('Courses are :: ', this.coursesArray);
    this.dialogRef.close();
  }
}
