import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  filter,
  map,
  Observable,
  Subject,
  switchMap,
  take,
  tap,
  timer,
} from 'rxjs';

export interface User {
  login: string;
  avatar_url: string;
  html_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class GhUsersService {
  private keyUpSubj$ = new Subject<any>();

  constructor(private http: HttpClient) {}

  findUsers(user: string): Observable<any> {
    console.log(user);
    return this.http
      .get(`https://api.github.com/search/users?q=${user}`)
      .pipe(catchError((err) => EMPTY));
  }

  getUsers(): Observable<any> {
    return this.keyUpSubj$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((val) => val.trim()),
      switchMap((val: string) => this.findUsers(val)),
      map((response) => response.items)
    );
  }

  newUsers(searchValue: string) {
    this.keyUpSubj$.next(searchValue);
  }

  findRepos(login: string): Observable<any> {
    return this.http.get(`https://api.github.com/users/${login}/repos`);
  }
}
