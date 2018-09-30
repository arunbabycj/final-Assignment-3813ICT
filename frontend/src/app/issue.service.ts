import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  uri = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getIssues() {
    return this.http.get(`${this.uri}/issues`);
  }

  getIssueById(id) {
    return this.http.get(`${this.uri}/issues/${id}`);
  }

  getGroups(user) {
    return this.http.get(`${this.uri}/groups/${user}`);
  }
  // searchIssue(data) {
  //   return this.http.get(`${this.uri}/search/${data}`);
  // }

  addIssue(username, password) {
    //console.log(name, price, description, type);
    const issue = {
      username: username,
      password: password
    };
    return this.http.post(`${this.uri}/issues/add`, issue);
  }

  addGroup(group,sessionuser) {
    const newgroup = {
      groupname: group,
      user: sessionuser
    };
    console.log(newgroup);
    return this.http.post(`${this.uri}/groups/add`, newgroup);
  }

  checkUser(username){
    console.log(username);
    return this.http.get(`${this.uri}/users/check/${username}`);
  }
  checkPassword(password){
    console.log(password);
    return this.http.get(`${this.uri}/password/check/${password}`);
  }

  // checkPassword(password){
  //   return this.http.get(`${this.uri}/password/check/${password}`);
  // }

  updateIssue(id, name, price, description, type) {
    const issue = {
      name: name,
      price: price,
      description: description,
      type: type
    };
    return this.http.post(`${this.uri}/issues/update/${id}`, issue);
  }

  deleteIssue(id) {
   return this.http.get(`${this.uri}/issues/delete/${id}`);
 }

}
