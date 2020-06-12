import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PersonalDetailsComponent } from '../personal-details/personal-details.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  openPersonalDetailsComponent(){
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(PersonalDetailsComponent, dialogConfig);
  }

}
