import { Component} from '@angular/core';
import { GhUsersService } from '../shared/gh-users.service';

@Component({
  selector: 'app-git-hub-users',
  templateUrl: './git-hub-users.component.html',
  styleUrls: ['./git-hub-users.component.scss'],
})
export class GitHubUsersComponent {
  constructor(public gitHubUsersService: GhUsersService) {}

  users$ = this.gitHubUsersService.getUsers();

  getInfo(event: any) {
    const value = event.target.value;
    this.gitHubUsersService.newUsers(value);
  }
}
