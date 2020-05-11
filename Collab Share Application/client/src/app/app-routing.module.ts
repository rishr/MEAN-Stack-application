import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserDownloadComponent } from './user-download/user-download.component';
import { UserHistoryComponent } from './user-history/user-history.component';
import { CreateDocumentComponent } from './create-document/create-document.component';
import { RegisterComponent } from './register/register.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CollabComponent } from './collab/collab.component';
import { UserEditProfileComponent } from './/user-edit-profile/user-edit-profile.component';
import { ShowPostComponent } from './show-post/show-post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { RedirectComponent } from './redirect/redirect.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'collab/:code', component: CollabComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'user-download', component: UserDownloadComponent },
  { path: 'user-history', component: UserHistoryComponent },
  { path: 'create-document', component: CreateDocumentComponent },
  { path: 'todo-list', component: TodoListComponent },
  { path: 'homepage', component: HomePageComponent },
  { path: 'loginpage', component: LoginPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user-edit-profile', component: UserEditProfileComponent },
  { path: 'add-post', component: AddPostComponent },
  { path: 'show-post', component: ShowPostComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'collab/join/:id', component: RedirectComponent },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '/404' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// tslint:disable-next-line:max-line-length
export const routingComponents = [UserProfileComponent, AboutusComponent, UserDownloadComponent, UserHistoryComponent, CreateDocumentComponent, RegisterComponent, TodoListComponent, HomePageComponent, LoginPageComponent, ShowPostComponent, UserEditProfileComponent, AddPostComponent, RedirectComponent, NotfoundComponent];
