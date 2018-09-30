import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IssueService } from '../../issue.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private issueService: IssueService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      username: ['', Validators.required],
      password: ''
    });
 }

 addIssue(username, password) {
    this.issueService.addIssue(username, password).subscribe((data:any) => {
      if (data.ok) {
        alert("register success");
        //sessionStorage.setItem('username', username);
        this.router.navigate(['/list']);
      }else{
        alert("username already exists");
      }
    });
  }

  ngOnInit() {
  }

}
