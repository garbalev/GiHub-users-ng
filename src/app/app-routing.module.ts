import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GitHubUserReposComponent } from './git-hub-user-repos/git-hub-user-repos.component';
import { AppComponent } from './app.component'
import { GitHubUsersComponent } from './git-hub-users/git-hub-users.component';

const routes: Routes = [
  {path: '', redirectTo: 'users', pathMatch: 'full'},
  {path: 'users', component: GitHubUsersComponent},
  {path: 'users/repos/:login', component: GitHubUserReposComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
