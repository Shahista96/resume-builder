import { Component, OnInit } from '@angular/core';
import pdfMake from 'node_modules/pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { PersonalDetails } from 'src/app/classes/PersonalDetails';
import { QualificationDetails } from 'src/app/classes/QualificationDetails';
import { WorkExperience } from 'src/app/classes/WorkExperience';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { PersonalDetailsComponent } from '../personal-details/personal-details.component';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PDFComponent implements OnInit {


  details: string[];
  courses: string[];
  hobbies: string[];
  personalDetails: PersonalDetails;
  qualifications: QualificationDetails[];
  workExperience: WorkExperience[];
  documentDefinition: any;


  constructor(private dataTransferService: DataTransferService) { }

  ngOnInit(): void {
    // this.getUpdatedValues();
    // this.initializeDocumentDefinition();
   // this.addPersonalDetailsToPDF();
    // this.addQualificationDetailsToPDF();
    // this.addWorkExperienceDetailsToPDF();
  }

  getUpdatedValues() {
    this.dataTransferService.personalInfoObserver.subscribe((data) => {
      // this.personalDetails = data;
      console.log('Updated Personal Details', this.personalDetails);
    });

    this.dataTransferService.educationInfoObserver.subscribe((data) => {
      this.qualifications = data;
      console.log('Updated Educational Details', this.qualifications);
    });

    this.dataTransferService.workExperienceInfoObserver.subscribe((data) => {
      this.workExperience = data;
      console.log('Updated Work Experience Details', this.qualifications);
    });
  }

  addPersonalDetailsToPDF() {
    this.documentDefinition.content.push(
      {
        text: this.personalDetails.fname + ' ' + this.personalDetails.lname + '\n',
        style: 'header'
      });
    // tslint:disable-next-line: align
    this.documentDefinition.content.push(
      [
        this.personalDetails.qualification,
        this.personalDetails.email,
        this.personalDetails.phoneNumber,
        this.personalDetails.linkedIn,
        '\n',
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] },
        '\n'
      ]
    );
  }

  initializeDocumentDefinition() {
    this.documentDefinition = {
      content: [
      ],
      styles: {
        header: {
          fontSize: 16,
          bold: true
        },
        bigger: {
          fontSize: 15,
          italics: true
        }
      }
    };
  }

  generateDocumentDefinition11() {
    const documentDefinition = {
      content: [
        {
          text: 'This is a header (whole paragraph uses the same header style)\n\n',
          style: 'header'
        },
        {
          text: [
            'It is however possible to provide an array of texts ',
            'to the paragraph (instead of a single string) and have ',
            { text: 'a better ', fontSize: 15, bold: true },
            'control over it. \nEach inline can be ',
            { text: 'styled ', fontSize: 20 },
            { text: 'independently ', italics: true, fontSize: 40 },
            'then.\n\n'
          ]
        },
      ]
    };
    return documentDefinition;
  }


  addWorkExperienceDetailsToPDF(){
    let count = 0;
    this.workExperience.forEach((elem) => {

      const details = [];
      details.push(elem.designation + ' @' + elem.organizationName + ', ' + elem.fromDate + ' to ' + elem.toDate);
      details.push(elem.jobDescription);
      details.push(elem.responsibility);

      if (count === 0) {
        this.documentDefinition.content.push(
          {
            columns: [
              {
                width: 160,
                text: 'Work Experience',
              },
              [
                {
                  text: details[0],
                  bold: true
                },
                details[1],
                details[2],
                '\n'
              ]
            ]
          }
        );
      } else {
        this.documentDefinition.content.push(
          {
            columns: [
              {
                width: 160,
                text: ' ',
              },
              [
                {
                  text: details[0],
                  bold: true
                },
                details[1],
                details[2],
                '\n'
              ]
            ]
          }
        );
      }

      count++;
    }
    );

    this.documentDefinition.content.push(
      [{ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] }]
    );
  }


  addQualificationDetailsToPDF() {

    let count = 0;
    this.qualifications.forEach((elem) => {

      const details = [];
      details.push(elem.degree);
      details.push(elem.institute);
      details.push('Percentage : ' + elem.grade);

      if (count === 0) {
        this.documentDefinition.content.push(
          {
            columns: [
              {
                width: 160,
                text: 'Education',
              },
              [
                {
                  text: details[0],
                  bold: true
                },
                details[1],
                details[2],
                '\n'
              ]
            ]
          }
        );
      } else {
        this.documentDefinition.content.push(
          {
            columns: [
              {
                width: 160,
                text: ' ',
              },
              [
                {
                  text: details[0],
                  bold: true
                },
                details[1],
                details[2],
                '\n'
              ]
            ]
          }
        );
      }

      count++;
    }
    );

    this.documentDefinition.content.push(
      [{ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] }]
    );
  }

  //Internship, Research, Projects, Training
  addOtherDetailsToPDF(obj: Array<any>, title: string) {

    let count = 0;
    obj.forEach((elem) => {

      const details = [];
      details.push(elem.title);
      details.push(elem.description);

      if (count === 0) {
        this.documentDefinition.content.push(
          {
            columns: [
              {
                width: 160,
                text: title,
              },
              [
                {
                  text: details[0],
                  bold: true
                },
                details[1],
                '\n'
              ]
            ]
          }
        );
      } else {
        this.documentDefinition.content.push(
          {
            columns: [
              {
                width: 160,
                text: ' ',
              },
              [
                {
                  text: details[0],
                  bold: true
                },
                details[1],
                '\n'
              ]
            ]
          }
        );
      }

      count++;
    }
    );

    this.documentDefinition.content.push(
      [{ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] }]
    );
  }


  // Hobbies, Courses, Skills, Achievements, Extra/Co-Curricular
  addUnorderedListContentToPDF(obj: string[], title: string){
    let count = 0;
    obj.forEach((elem) => {
      if (count === 0) {
        this.documentDefinition.content.push(
          {
            columns: [
              {
                width: 160,
                text: title,
                bold: true
              },
              [
                {
                  ul: [
                   elem
                  ]
                }
              ]
            ]
          }
        );
      } else {
        this.documentDefinition.content.push(
          {
            columns: [
              {
                width: 160,
                text: ' ',
              },
              [
                {
                  ul: [
                    elem
                   ]
                }
              ]
            ]
          }
        );
      }

      count++;
    }
    );

    this.documentDefinition.content.push(
      [{ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] }]
    );
  }

  generatePdf() {
    this.personalDetails = this.dataTransferService.personalDetails;
    this.qualifications = this.dataTransferService.qualificationDetails;
    this.workExperience = this.dataTransferService.workExperienceDetails;
    this.hobbies = this.dataTransferService.hobbyDetails;
    this.courses = this.dataTransferService.courses;
    console.log('Generating PDF - ', this.personalDetails);
    this.initializeDocumentDefinition();
    // this.addPersonalDetailsToPDF();
    // this.addQualificationDetailsToPDF();
    // this.addWorkExperienceDetailsToPDF();
    //this.addUnorderedListContentToPDF(this.courses, 'Courses/Certifications');
    //this.addUnorderedListContentToPDF(this.dataTransferService.skillDetails, 'Skills/Expertise');
    // this.addUnorderedListContentToPDF(this.dataTransferService.achievementDetails, 'Achievements');
    // this.addUnorderedListContentToPDF(this.dataTransferService.skillDetails, 'Skills/Expertise');
    // this.addUnorderedListContentToPDF(this.dataTransferService.activityDetails, 'Extra Curricular Activities');
    
    //this.addOtherDetailsToPDF(this.dataTransferService.projectDetails, 'Projects');
    //this.addOtherDetailsToPDF(this.dataTransferService.intershipDetails, 'Internships');
    this.addOtherDetailsToPDF(this.dataTransferService.trainingDetails, 'Trainings');
    pdfMake.createPdf(this.documentDefinition).open();
  }

}
