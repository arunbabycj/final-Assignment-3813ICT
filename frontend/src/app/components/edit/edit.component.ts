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
  //issue: any = {};
  updateForm: FormGroup;

  //createForm: FormGroup;
  joinedgroups: Issue[];
  restgroups: ;
  displayedColumns = ['name'];
  sessionuser = "";
  join ="" ;
  rest =" ";
  res = "";
  diffdata = [];
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
    this.fetchRestGroups();
  }

  fetchGroups() {
    this.issueService
    .getGroups(this.sessionuser)
    .subscribe((data: any) => {
      this.joinedgroups = data.groupname;
      this.join = data.groupname;
      console.log('group requested ... ');
      console.log(this.joinedgroups);
      console.log("are",this.join);
      this.router.navigate(['/edit']);
    });
  }

  fetchRestGroups() {
    this.issueService
    .getRestGroups(this.sessionuser)
    .subscribe((data: any) => {
      console.log(data);
      var num = 0;
      if(data.length==0){
      }else {
        for(var i=0;i<data.length;i++){
          num = i;
        }
        this.rest = data[num].allgroup;
        console.log("hi",this.rest);
        this.res = this.rest.filter( function(n) { return !this.has(n) }, new Set(this.join) );
        console.log(this.res);
      }
      this.restgroups = this.res;
      console.log('rest group requested ... ');
      console.log(this.restgroups);
      this.router.navigate(['/edit']);
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
