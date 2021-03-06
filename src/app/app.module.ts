import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpClientModule } from '@angular/common/http';
// import { UserPage } from '../pages/user/user';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { LoginPage } from '../pages/login/login';
import { UsuariosServiceProvider } from '../providers/usuarios-service/usuarios-service';

import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
// Integração com o WhatsApp
import { SocialSharing} from '@ionic-native/social-sharing';
// Display de tempo relativo
import {TimeAgoPipe} from 'time-ago-pipe';
// Salvar token
import { IonicStorageModule} from '@ionic/storage';

import { CadastroServiceProvider } from '../providers/cadastro-service/cadastro-service';
import { PostServiceProvider } from '../providers/post-service/post-service';
import { FriendPage } from '../pages/friend/friend';
import { DocumentacaoPage } from '../pages/documentacao/documentacao';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    // UserPage,
    CadastroPage,
    LoginPage,
    TimeAgoPipe,
    FriendPage,
    DocumentacaoPage,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false} ),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    // UserPage,
    CadastroPage,
    LoginPage, 
    FriendPage,
    DocumentacaoPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuariosServiceProvider,
    CadastroServiceProvider,
    PostServiceProvider,
    SocialSharing,
    
    
    

    
  ]
})
export class AppModule {}
