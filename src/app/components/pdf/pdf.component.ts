import { Component, OnInit } from '@angular/core';
import pdfMake from 'node_modules/pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { PersonalDetails } from 'src/app/classes/PersonalDetails';
import { QualificationDetails } from 'src/app/classes/QualificationDetails';
import { WorkExperience } from 'src/app/classes/WorkExperience';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PDFComponent implements OnInit {


  personalDetails: PersonalDetails;
  qualifications: QualificationDetails[];
  workExperience: WorkExperience[];
  documentDefinition: any;

  constructor() { }

  ngOnInit(): void {
    this.personalDetails = new PersonalDetails();
    this.personalDetails.fname = 'Shahista';
    this.personalDetails.lname = 'Patel';
    this.personalDetails.qualification = 'Bachelor of Engineering, Information Technology';
    this.personalDetails.email = 'patelshahista96@gmail.com';
    this.personalDetails.phoneNumber = '+91 7391071076';
    this.personalDetails.linkedIn = '../shahistapatel0108/';

    this.initializeDocumentDefinition();
    this.addPersonalDetailsToPDF();
    this.generatePdf();

  }

  // generateDocumentDefinition1(){
  //   const documentDefinition = { content: 'This is for testing.' };
  //   return documentDefinition;
  // }

  addPersonalDetailsToPDF(){
    this.documentDefinition.content.push(
      {
        text: this.personalDetails.fname + ' ' + this.personalDetails.lname + '\n\n',
        style: 'header'
      });
      this.documentDefinition.content.push(
        [
         this.personalDetails.qualification,
         this.personalDetails.email,
         this.personalDetails.phoneNumber,
         this.personalDetails.linkedIn
        ]
      )

  }

  initializeDocumentDefinition(){
    this.documentDefinition = {
      content: [
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true
        },
        bigger: {
          fontSize: 15,
          italics: true
        }
      }
    };
  }

  generateDocumentDefinition11(){
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

  generatePdf(){
    pdfMake.createPdf(this.documentDefinition).open();
  }



}
