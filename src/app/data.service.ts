import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getGithubAccounts(term: string = null) {
    if (term) {
      return this.http.get<any>(`https://api.github.com/search/users?q=${term}`)
        .pipe(map(
          response => response
        ));
    } else {
      return of({});
    }
  }
  getUserRepositories(user: string) {
    if (user) {
      return this.http.get<any>(`https://api.github.com/users/${user}/repos`)
        .pipe(map(
          response => response
        ));
    } else {
      return of({});
    }
  }
}
