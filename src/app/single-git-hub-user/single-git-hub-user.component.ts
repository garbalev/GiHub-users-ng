import { Component, Input, OnInit } from '@angular/core';
import { User } from '../shared/gh-users.service';

@Component({
  selector: 'app-single-git-hub-user',
  templateUrl: './single-git-hub-user.component.html',
  styleUrls: ['./single-git-hub-user.component.scss'],
})

export class SingleGitHubUserComponent implements OnInit {
  @Input() user!: User;
  constructor() {}

  ngOnInit(): void {}
}
