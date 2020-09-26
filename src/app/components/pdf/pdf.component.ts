import { Component, OnInit } from '@angular/core';
import pdfMake from 'node_modules/pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { PersonalDetails } from 'src/app/classes/PersonalDetails';
import { QualificationDetails } from 'src/app/classes/QualificationDetails';
import { WorkExperience } from 'src/app/classes/WorkExperience';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { PersonalDetailsComponent } from '../personal-details/personal-details.component';
import { MatDialogRef } from '@angular/material/dialog';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PDFComponent implements OnInit {




  imageEvent;
  url;
  details: string[];
  courses: string[];
  hobbies: string[];
  personalDetails: PersonalDetails;
  qualifications: QualificationDetails[];
  workExperience: WorkExperience[];
  documentDefinition: any;


  constructor(private dataTransferService: DataTransferService,
    private matDialogRef: MatDialogRef<PDFComponent>) { }

  ngOnInit(): void {

  }

  getUpdatedValues() {
    this.dataTransferService.personalInfoObserver.subscribe((data) => {
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

  
  getResponsibilitiesArrayToString(arr) {
    let str = '';
    arr.forEach(element => {
      str = str + '* ' + element.responsibility + '\n';
    });
    return str;
  }

  addWorkExperienceDetailsToPDF() {
    let count = 0;
    console.log('*********');
    console.log(this.workExperience);
    this.workExperience.forEach((elem) => {

      const details = [];
      details.push(elem.designation + ' @' + elem.organizationName + ', ' + elem.fromDate + ' to ' + elem.toDate);
      details.push(elem.jobDescription);
      //details.push(this.getResponsibilitiesArrayToString(elem.responsibilities));

      if (count === 0) {
        this.documentDefinition.content.push(
          {
            columns: [
              {
                width: 160,
                text: 'Work Experience',
                bold: true
              },
              [
                {
                  text: 'Total Experience - ' + this.dataTransferService.totalWorkExperience,
                  bold: true
                },
                '\n',
                {
                  text: details[0],
                  bold: true
                },
                '\n',
                details[1],
                '\n',
                {
                  text: 'Responsibilities',
                },
              ]
            ]
          }
        );

        this.addUnorderedListContentToPDF(elem.responsibilities, '');
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
                '\n',
                details[1],
                '\n',
                {
                  text: 'Responsibilities: ',

                },
              ]
            ]
          }
        );
        this.addUnorderedListContentToPDF(elem.responsibilities, '');
      }
      count++;
    }
    );

    this.documentDefinition.content.push(
      [{ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] }, '\n']
    );
  }


  addQualificationDetailsToPDF() {

    let count = 0;
    this.qualifications.forEach((elem) => {

      const details = [];
      details.push(elem.degree + ' (' + elem.fromDate + ' to ' + elem.toDate + ')');
      details.push(elem.institute);
      details.push('Percentage : ' + elem.grade);

      if (count === 0) {
        this.documentDefinition.content.push(
          {
            columns: [
              {
                width: 160,
                text: 'Education',
                bold: true
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
      [{ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] }, '\n']
    );
  }

  // Internship, Research, Projects, Training
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
                bold: true
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
      [{ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] }, '\n']
    );
  }

  addPhotoToPDF() {
    const event = this.dataTransferService.imageDetails;
    console.log('Event in Home ', event);
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => { // called once readAsDataURL is completed
      this.url = event.target.result;
    };
    const url = this.dataTransferService.personalDetails.photoUrl;
    // this.documentDefinition.content.push({
    //   image: this.url,
    //   fit: [100, 100]
    // });

    this.documentDefinition.content.push(
      {
        columns: [
          [
            {
              width: 250,
              text: this.personalDetails.fname + ' ' + this.personalDetails.lname + '\n',
              style: 'header',
            },
            this.personalDetails.qualification,
            this.personalDetails.email,
            this.personalDetails.phoneNumber,
            this.personalDetails.linkedIn,
            '\n',
            '\n'
          ],
          [
            {
              image: this.url,
              alignment: 'right',
              fit: [100, 100]
            },
            '\n'
          ]
        ]
      }
    );

    this.documentDefinition.content.push(
      [{ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] }, '\n']
    );

  }

  // Hobbies, Courses, Skills, Achievements, Extra/Co-Curricular
  addUnorderedListContentToPDF(obj: string[], title: string) {
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


    if (title != '') {
      this.documentDefinition.content.push(
        ['\n', { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] }, '\n']
      );
    } else {
      this.documentDefinition.content.push(['\n']);
    }

  }

  setDetailsFromService() {
    this.personalDetails = this.dataTransferService.personalDetails;
    this.qualifications = this.dataTransferService.qualificationDetails;
    this.workExperience = this.dataTransferService.workExperienceDetails;
    this.hobbies = this.dataTransferService.hobbyDetails;
    this.courses = this.dataTransferService.courses;
  }

  generatePDF(){
    this.setDetailsFromService();
    this.initializeDocumentDefinition();
    this.generatePdfTemplate2();
    pdfMake.createPdf(this.documentDefinition).open();
  }

  generatePdfTemplate2(){
    this.addPersonalDetailsToPDF();
    if (this.dataTransferService.projectDetails.length > 0) {
      this.addOtherDetailsToPDFTemplate2(this.dataTransferService.projectDetails, 'Projects');
    }

    if (this.dataTransferService.intershipDetails.length > 0) {
      this.addOtherDetailsToPDFTemplate2(this.dataTransferService.intershipDetails, 'Internships');
    }

    if (this.dataTransferService.trainingDetails.length > 0) {
      this.addOtherDetailsToPDFTemplate2(this.dataTransferService.trainingDetails, 'Trainings/Workshops');
    }

    if (this.dataTransferService.skillDetails.length > 0) {
      this.addUnorderedListContentToPDFTemplate2(this.dataTransferService.skillDetails, 'Skills/Technologies');
    }

    if (this.courses.length > 0) {
      this.addUnorderedListContentToPDFTemplate2(this.courses, 'Courses/Certifications');
    }

    if (this.dataTransferService.achievementDetails.length > 0) {
      this.addUnorderedListContentToPDFTemplate2(this.dataTransferService.achievementDetails, 'Achievements');
    }

    if (this.dataTransferService.hobbyDetails.length > 0) {
      this.addUnorderedListContentToPDFTemplate2(this.dataTransferService.hobbyDetails, 'Hobbies');
    }

    if (this.dataTransferService.activityDetails.length > 0) {
      this.addUnorderedListContentToPDFTemplate2(this.dataTransferService.activityDetails, 'Extra Curricular Activities');
    }
  }

  //Template 1
  generatePdfTemplate1() {
   
    console.log('Generating PDF - ', this.personalDetails);
   
    if (this.dataTransferService.imageDetails) {
      this.addPhotoToPDF();
    } else {
      this.addPersonalDetailsToPDF();
    }

    if (this.workExperience.length > 0) {
      this.addWorkExperienceDetailsToPDF();
    }

    if (this.qualifications.length > 0) {
      this.addQualificationDetailsToPDF();
    }

    if (this.dataTransferService.projectDetails.length > 0) {
      this.addOtherDetailsToPDF(this.dataTransferService.projectDetails, 'Projects');
    }

    if (this.dataTransferService.intershipDetails.length > 0) {
      this.addOtherDetailsToPDF(this.dataTransferService.intershipDetails, 'Internships');
    }

    if (this.dataTransferService.trainingDetails.length > 0) {
      this.addOtherDetailsToPDF(this.dataTransferService.trainingDetails, 'Trainings/Workshops');
    }

    if (this.dataTransferService.skillDetails.length > 0) {
      this.addUnorderedListContentToPDF(this.dataTransferService.skillDetails, 'Skills/Technologies');
    }

    if (this.courses.length > 0) {
      this.addUnorderedListContentToPDF(this.courses, 'Courses/Certifications');
    }

    if (this.dataTransferService.achievementDetails.length > 0) {
      this.addUnorderedListContentToPDF(this.dataTransferService.achievementDetails, 'Achievements');
    }

    if (this.dataTransferService.hobbyDetails.length > 0) {
      this.addUnorderedListContentToPDF(this.dataTransferService.hobbyDetails, 'Hobbies');
    }

    if (this.dataTransferService.activityDetails.length > 0) {
      this.addUnorderedListContentToPDF(this.dataTransferService.activityDetails, 'Extra Curricular Activities');
    }

    pdfMake.createPdf(this.documentDefinition).open();
  }

  close() {
    this.matDialogRef.close();
  }

  addUnorderedListContentToPDFTemplate2(obj: string[], title: string) {
  
    this.documentDefinition.content.push([
      {
        text: title,
        bold: true
      }
    ])
    obj.forEach((elem) => {
        this.documentDefinition.content.push(
          {
            ul: [
              elem
            ]
          }
        );
      } 
    );
    this.documentDefinition.content.push(
      ['\n', { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] }, '\n']
    );  
  }

  addWorkExperienceDetailsToPDFTemplate2(obj, title: string) {
  
    this.documentDefinition.content.push([
      {
        text: title,
        bold: true
      },
      '\n',
    ])
    obj.forEach((elem) => {
        this.documentDefinition.content.push(
         [
           {
             text: elem.designation + ' @' + elem.organizationName + ', ' + elem.fromDate + ' to ' + elem.toDate,
             bold: true
           },
           '\n',
           elem.description
         ]
        );
      } 
    );
    this.documentDefinition.content.push(
      ['\n', { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] }, '\n']
    );  
  }

  addOtherDetailsToPDFTemplate2(obj, title: string) {
  
    this.documentDefinition.content.push([
      {
        text: title,
        bold: true
      }
    ])
    obj.forEach((elem) => {
        this.documentDefinition.content.push(
          [
            '\n',
            elem.title,
            elem.description
          ]
        );
      } 
    );
    this.documentDefinition.content.push(
      ['\n', { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] }, '\n']
    );  
  }

  addEducationDetailsToPDFTemplate2(obj){
    this.documentDefinition.content.push([
      {
        text: 'Qualification Details',
        bold: true
      }
    ])
    obj.forEach((elem) => {
        this.documentDefinition.content.push(
          [
            '\n',
            elem.degree + ' (' + elem.fromDate + ' to ' + elem.toDate + ')',
            elem.institute,
            'Percentage : '+elem.grade
          ]
        );
      } 
    );
    this.documentDefinition.content.push(
      ['\n', { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] }, '\n']
    );  
  }

 
}
