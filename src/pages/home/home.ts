import { Component } from '@angular/core';
import { NavController, AlertController, Alert, LoadingController } from 'ionic-angular';
import * as moment from "moment";
import { HttpClient} from '@angular/common/http';
import { Post } from '../../modelos/post';
import { UserPage } from '../user/user';
import { CadastroPage } from '../cadastro/cadastro';
import { SocialSharing } from '@ionic-native/social-sharing';
import { PostServiceProvider } from '../../providers/post-service/post-service';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  conteudoPost:string="";
  carregando: any;
  

  
  public post:Post;
  public posts: Post[];
  public postDateOrder:Post[];

  public novoPostInput = document.querySelector('.formPostInput');
  private _alerta:Alert;

  constructor(public navCtrl: NavController,
    public loadingCtrl:LoadingController,
    private _alertCtrl:AlertController,
    private _http: HttpClient,
    private socialSharing: SocialSharing,
    private _postService:PostServiceProvider,
    private _usuarioService:UsuariosServiceProvider,
    ) 
    {
      this.carregandoAnimaçao();
      // this._postService.obtemPius();
      this.obtemPius();
      console.log("SOU O CONTADOR",this.novoPostInput);
      setTimeout(()=>{
        this.carregando.dismiss();
      },10000);
      
      
    }
    obtemPius(){

      this._http.get<Post[]>('http://piupiuwer.polijunior.com.br/api/pius/')
      .subscribe(
        (posts) =>{
          moment.locale('pt-BR');
          // Trata cada piu e adiciona informação do username e tempo relativo
          posts.forEach(post =>{
            console.log("olar");
            this._postService.adicionaAutor(post);
            post.tempoRelativo=moment(post.data).fromNow();
            console.log(post.tempoRelativo);
          });
          this.posts = posts.reverse();
          console.log(posts);
          
        }
      );
                     
      }
    
    // ionViewWillEnter() {

    //   this.carregando = this.loadingCtrl.create({
    //     content: 'Preparando tudo...'
    //   });
  
    //   this.carregando.present();
  
    //   this._postService.obtemPius();
    //   this.carregando.dismiss();
    //     };
  
    
  



    //Função para selecionar o piu
    selecionaPost(post: Post){
      console.log("OLA");
      console.log(post.conteudo);
      this.navCtrl.push(UserPage);

    }

    selecionaUsuario(post: Post){
      console.log(post.usuario);
      console.log("fechou");
      this.navCtrl.push(UserPage);
      // this._autorService
    }

    irParaTeste(){
      this.navCtrl.push(CadastroPage);
    }

    // Função para compartilhar no whats
    compartilhaWhats(post:Post){
      var msg = post.conteudo;
      this.socialSharing.shareViaWhatsApp(msg,null,null);
      console.log("compartilhei");
    }

    // Função para contar palavras
    contagemInput(conteudo){
      var contador = document.querySelector('.contador');
      var novoPostCard = document.querySelector('.formCard');
      var num_palavras = conteudo.length;
      contador.innerHTML="<p>"+num_palavras+" /140 caracteres </p>";
      // Altera os estilos / aviso conforme o contador
        if(num_palavras==140){
          novoPostCard.classList.add("highlight_blue");}
  
  }
    
    // Função para criar um post
    criaPost(){
      this._alertCtrl.create({
        title: 'Aviso',
        buttons:[
          {text:'ok'}
        ]});
      console.log("entrei na função criaPost dentro de home.ts")
      console.log(this.conteudoPost);
      let post={
        conteudo:this.conteudoPost,
        usuario:this._usuarioService.id,
      }

      this._postService.criaPost(post).then(
        
        ()=>{
        // No caso de sucesso
        // Limpar os campos do input
        this.conteudoPost="";
        console.log("CRIADO");
        this.obtemPius();
        // this._postService.obtemPius();

      },()=>{
        // No caso de erro
        console.log("deu ruim");
        this._alerta.setSubTitle("Ocorreu um erro");
        this._alerta.present();

      });
    

      
      // MODELO ANTIGO
      // .subscribe(
      //   ()=>{
      //     console.log("funcionou");
      //     // this._alerta.setSubTitle("Post criado com sucesso");
      //     // this._alerta.present();
      //   },
      //   ()=>{
      //     console.log("deu erro");
      //     console.log(post);
      //     // this._alerta.setSubTitle("Ocorreu um erro");
      //     // this._alerta.present();
      //   }
      // )

    }
    carregandoAnimaçao(){
      this.carregando=this.loadingCtrl.create({
        content:'Estamos preparando tudo...'
      });
      this.carregando.present();
    }
  }

