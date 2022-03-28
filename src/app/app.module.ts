import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GitHubUserReposComponent } from './git-hub-user-repos/git-hub-user-repos.component';
import { GitHubUsersComponent } from './git-hub-users/git-hub-users.component';
import { SingleGitHubUserComponent } from './single-git-hub-user/single-git-hub-user.component';

@NgModule({
  declarations: [AppComponent, GitHubUsersComponent, SingleGitHubUserComponent, GitHubUserReposComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
