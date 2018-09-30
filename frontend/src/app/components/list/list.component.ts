import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { Issue } from '../../issue.model';
import { IssueService } from '../../issue.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  createForm: FormGroup;
  //issues: Issue[];
  //displayedColumns = ['name', 'price', 'description', 'type', 'actions'];

  constructor(private issueService: IssueService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    // this.createForm = this.fb.group({
    //   search: ['', Validators.required],
    // });

    this.createForm = this.fb.group({
      username: ['', Validators.required],
      password: ''
    });
  }

  checkUser(username,password) {
     this.issueService.checkUser(username).subscribe((data: any) => {
       if (data.ok) {
         console.log("ready");
         sessionStorage.setItem('username', username);
         this.router.navigate(['/edit']);
       }else{
         console.log("notready");
       }
     });
     this.issueService.checkPassword(password).subscribe((data: any) => {

     });
   }

  ngOnInit() {
  }


}
