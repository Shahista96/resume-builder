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

  personalDetails: PersonalDetails;
  qualifications: QualificationDetails[];
  workExperience: WorkExperience[];
  documentDefinition: any;

  constructor(private dataTransferService: DataTransferService) { }

  ngOnInit(): void {
    //this.getUpdatedValues();
    //this.initializeDocumentDefinition();
   // this.addPersonalDetailsToPDF();
    //this.addQualificationDetailsToPDF();
    //this.addWorkExperienceDetailsToPDF();
  }

  getUpdatedValues() {
    this.dataTransferService.personalInfoObserver.subscribe((data) => {
      //this.personalDetails = data;
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

      let details = [];
      details.push(elem.designation + ' @' + elem.organizationName + ', ' + elem.fromDate + ' to ' + elem.toDate);
      details.push(elem.jobDescription);
      details.push(elem.responsibility);

      if (count === 0) {
        this.documentDefinition.content.push(
          {
            columns: [
              {
                width: 150,
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
                width: 150,
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

      let details = [];
      details.push(elem.degree);
      details.push(elem.institute);
      details.push('Percentage : ' + elem.grade);

      if (count === 0) {
        this.documentDefinition.content.push(
          {
            columns: [
              {
                width: 150,
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
                width: 150,
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

  pushDetailsDynamicallyTest() {

    this.details = [];


    this.qualifications.forEach(qualification => {
      this.details.push(qualification.degree);
      this.details.push(qualification.institute);
      this.details.push('Percentage : ' + qualification.grade);
      console.log('Details are - ', this.details)

      this.documentDefinition.content.push([
        {
          rowGap: 20,
          columns: [
            {
              width: 150,
              text: ''
            },
            this.details[0],
            this.details[1]
          ]
        }
      ]);

      this.details = [];
    });


    // this.qualifications.forEach(qualification => {
    //   this.documentDefinition.content.columns.push(qualification.description);
    //   this.documentDefinition.content[2].columns[2].push(qualification.institute);
    //   this.documentDefinition.content[2].columns[2].push(qualification.description);
    //   this.documentDefinition.content[2].columns[2].push(qualification.institute);
    // });

  }

  generatePdf() {
    this.personalDetails = this.dataTransferService.personalDetails;
    this.qualifications = this.dataTransferService.qualificationDetails;
    this.workExperience = this.dataTransferService.workExperienceDetails;
    console.log('Generating PDF - ', this.personalDetails);
    this.initializeDocumentDefinition();
    this.addPersonalDetailsToPDF();
    this.addQualificationDetailsToPDF();
    this.addWorkExperienceDetailsToPDF();
    pdfMake.createPdf(this.documentDefinition).open();
  }

}
