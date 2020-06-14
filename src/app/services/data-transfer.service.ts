import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PersonalDetails } from '../classes/PersonalDetails';
import { QualificationDetails } from '../classes/QualificationDetails';
import { WorkExperience } from '../classes/WorkExperience';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  personalDetails: PersonalDetails;
  qualificationDetails: QualificationDetails[];
  workExperienceDetails: WorkExperience[];

  private personalInfo = new BehaviorSubject({PersonalDetails});
  personalInfoObserver = this.personalInfo.asObservable();

  private educationInfo = new BehaviorSubject([]);
  educationInfoObserver = this.educationInfo.asObservable();

  private workExperienceInfo = new BehaviorSubject([]);
  workExperienceInfoObserver = this.workExperienceInfo.asObservable();

  constructor() { }

  updatePersonalInfo(personalInfoDetails){
    console.log('Called ', personalInfoDetails);
    this.personalInfo.next(personalInfoDetails);
  }

  updateEducationInfo(educationInfo: QualificationDetails[]){
    this.educationInfo.next(educationInfo);
  }

  updateWorkExperienceInfo(workExperienceInfo: WorkExperience[]){
    this.workExperienceInfo.next(workExperienceInfo);
  }
}
