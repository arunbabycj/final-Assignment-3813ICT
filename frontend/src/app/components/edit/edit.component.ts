import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { IssueService } from '../../issue.service';
import { Issue } from '../../issue.model';
import { Group} from '../../group.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  issue: any = {};
  updateForm: FormGroup;

  //createForm: FormGroup;
  groups: Issue[];
  displayedColumns = ['name'];
  sessionuser = "";
  constructor(private issueService: IssueService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.sessionuser = sessionStorage.getItem('username');
      console.log(this.sessionuser);
      this.updateForm.get('name').setValue(this.sessionuser);
    });
    this.fetchGroups();
  }

  fetchGroups() {
    this.issueService
    .getGroups(this.sessionuser)
    .subscribe((data: Issue[]) => {
      this.groups = data.groupname;
      console.log('group requested ... ');
      console.log(this.groups);
    });
  }

  createForm() {
    this.updateForm = this.fb.group({
      name: ['', Validators.required ],
    });
  }

  logout() {
    sessionStorage.setItem('username', "");
    this.router.navigate(['/list']);
  }

  addGroup(group) {
     this.issueService.addGroup(group,this.sessionuser).subscribe((data:any) => {
       if (data.ok) {
         alert("group made");
       }else{
         alert("group already exists");
       }
     });
   }

}
