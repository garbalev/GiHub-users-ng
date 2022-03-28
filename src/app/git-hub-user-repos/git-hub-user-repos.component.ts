import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  distinctUntilChanged,
  filter,
  from,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { GhUsersService } from '../shared/gh-users.service';

@Component({
  selector: 'app-git-hub-user-repos',
  templateUrl: './git-hub-user-repos.component.html',
  styleUrls: ['./git-hub-user-repos.component.scss'],
})
export class GitHubUserReposComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private gitHubUsersService: GhUsersService
  ) {}

  repositories!: [any];

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        map((value) => value['login'].trim()),
        distinctUntilChanged(),
        tap((login: string) => console.log(login)),
        switchMap((login: string) => this.gitHubUsersService.findRepos(login)),
        tap((repos) => console.log(repos))
      )
      .subscribe((repos) => {
        this.repositories = repos;
      });
  }

  fromSmallerToLargerDate = '';
  fromSmallerToLargerLetter = '';
  toggleActiveDate = '';
  toggleActiveLetter = '';


  sortAlphabetically() {
    this.fromSmallerToLargerDate = '';
    this.toggleActiveLetter = 'active';
    this.toggleActiveDate = '';
    const sort = () => {
      return this.repositories.sort((a, b) => a.name.localeCompare(b.name));
    };
    if (this.fromSmallerToLargerLetter === '') {
      sort().reverse();
      this.fromSmallerToLargerLetter = '&darr;';
    } else if (this.fromSmallerToLargerLetter === '&darr;') {
      sort();
      this.fromSmallerToLargerLetter = '&uarr;';
    } else {
      sort().reverse();
      this.fromSmallerToLargerLetter = '&darr;';
    }
  }

  sortByDate() {
    this.fromSmallerToLargerLetter = '';
    this.toggleActiveLetter = '';
    this.toggleActiveDate = 'active';
    const sort = () => {
      return this.repositories.sort(
        (a: any, b: any) =>
          <any>new Date(a.created_at) - <any>new Date(b.created_at)
      );
    };
    if (this.fromSmallerToLargerDate === '') {
      sort().reverse();
      this.fromSmallerToLargerDate = '&darr;';
    } else if (this.fromSmallerToLargerDate === '&darr;') {
      sort();
      this.fromSmallerToLargerDate = '&uarr;';
    } else {
      sort().reverse();
      this.fromSmallerToLargerDate = '&darr;';
    }
  }
}
