import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  filter,
  map,
  Observable,
  ReplaySubject,
  Subject,
  switchMap,
  tap,
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

  // private searchReposSubj$ = new Subject<any>();

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
      map((response) => response.items),
      tap((el) => {
        // console.log('repo subs');
        ///many subs
        // this.getRepos().subscribe();
      })
    );
  }

  newUsers(searchValue: string) {
    this.keyUpSubj$.next(searchValue);
  }

  ///

  findRepos(login: string): Observable<any> {
    return this.http.get(`https://api.github.com/users/${login}/repos`);
  }

  // getRepos() {
  //   console.log('getRepos');
  //   return this.searchReposSubj$.pipe(
  //     filter((val) => val.trim()),
  //     tap((el) => console.log(el)),
  //     switchMap((val:string) => this.findRepos(val)),
  //     tap((val) => console.log(val))
  //   );
  // }

  // newRepos(searchValue: string) {
  //   this.searchReposSubj$.next(searchValue);
  //   console.log(this.keyUpSubj$);
  // }
}
