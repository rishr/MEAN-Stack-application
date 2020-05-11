import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChatService } from './chat.service';
import { CollabComponent } from './collab/collab.component';
import { NavComponent } from './nav/nav.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './auth.service';
import { ShowPostComponent } from './show-post/show-post.component';
import { UserEditProfileComponent } from './/user-edit-profile/user-edit-profile.component';
import { AddPostComponent } from './add-post/add-post.component';
import { AvatarModule} from 'ngx-avatar';
import { GravatarModule } from 'ngx-gravatar';
import { GravatarDirective } from './gravatar.directive';
import { UserProfileNavComponent } from './user-profile-nav/user-profile-nav.component';
import { RedirectComponent } from './redirect/redirect.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PopupComponent } from './popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    CollabComponent,
    NavComponent,
    AboutusComponent,
    RegisterComponent,
    DashboardComponent,
    ShowPostComponent,
    UserEditProfileComponent,
    AddPostComponent,
    UserEditProfileComponent,
    GravatarDirective,
    UserProfileNavComponent,
    RedirectComponent,
    NotfoundComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AvatarModule,
    GravatarModule
  ],
  providers: [ChatService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
