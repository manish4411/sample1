import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {
  searchUser: FormGroup;
  details: any = [];
  find: boolean = true;
  count;
  allRepos: any = [];
  submitted: boolean = true;

  pageNumber: number = 1;
  pageSize: number = 5;
  totalLength: number = 0;
  selectedindex: number;
  dataSource: any;

  filterData: any[] = ['Sort by Name(A-Z)', 'Sort by Name(Z-A)', 'Sort by Rank(low-to-high)', 'Sort by Rank(high-to-low)']
  selected: String = this.filterData[0];
  filterForSelected: String = '';
  constructor(private service: DataService, private formBuilder: FormBuilder) { }

  get f() { return this.searchUser.controls }
  ngOnInit() {
    this.searchUser = this.formBuilder.group({
      sort: ['', Validators.required],
      userName: ['', Validators.required]
    })
  }

  onUserSearch() {
    if (this.searchUser.invalid) {
      return;
    }
    this.find = false;
    this.service.getGithubAccounts(this.f.userName.value).subscribe(userName => {
      this.count = userName.total_count
      this.details = userName.items;
      this.totalLength = this.details.length;
      this.details.forEach(User => {
        User.selected = false;
        User.allRepos = [];
      });
    });
  }

  onFilterSelect() {
    switch (this.selected) {
      case 'Sort by Name(A-Z)':
        this.filterForSelected = 'login';
        break;
      case 'Sort by Name(Z-A)':
        this.filterForSelected = "'login':true";
        break;
      case 'Sort by Rank(low-to-high)':
        this.filterForSelected = 'score';
        break;
      case 'Sort by Rank(high-to-low)':
        this.filterForSelected = "'score':true";
        break;
      default:
        this.filterForSelected = '';
        break;
    }
  }

  userdata(user) {
    for (let item of this.details) {
      if (item.id == user.id) {
        item.selected = true;
      }
    }

    this.service.getUserRepositories(user.login).subscribe(
      repos => {
        for (let item of this.details) {
          if (item.id == user.id) {
            item.allRepos = repos;
          }
        }
      });
  }

  collapse(user) {
    for (let item of this.details) {
      if (item.id == user.id) {
        item.selected = false;
      }
    }
  }

  pageChanged(event) {
    this.pageNumber = event;
  }
}
