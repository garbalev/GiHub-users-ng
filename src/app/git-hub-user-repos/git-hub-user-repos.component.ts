import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, filter, map, Observable, switchMap, tap } from 'rxjs';
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

  repos$!: Observable<[any]>;

  ngOnInit(): void {
    this.repos$ = this.activatedRoute.params.pipe(
      map((value) => value['login'].trim()),
      distinctUntilChanged(),
      tap((login: string) => console.log(login)),
      switchMap((login: string) => this.gitHubUsersService.findRepos(login)),
      tap(repos => console.log(repos))
    );
  }
}
