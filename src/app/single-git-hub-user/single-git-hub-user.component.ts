import { Component, Input, OnInit } from '@angular/core';
import { GhUsersService, User } from '../shared/gh-users.service';

@Component({
  selector: 'app-single-git-hub-user',
  templateUrl: './single-git-hub-user.component.html',
  styleUrls: ['./single-git-hub-user.component.scss'],
})

export class SingleGitHubUserComponent implements OnInit {
  @Input() user!: User;
  constructor(private gitHubUsersService: GhUsersService) {}

  // repos$ = this.gitHubUsersService.getRepos(this.user.login).subscribe();

  ngOnInit(): void {}

  getRepos() {
    let val:string = this.user.login
    // console.log(val)
    // this.gitHubUsersService.newUsers(val)
  }
}
