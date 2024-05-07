import { Component, OnInit, inject } from '@angular/core';
import { NavController, ActionSheetController, IonRouterLink, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonFab, IonFabButton, IonIcon, IonList, IonItem, IonThumbnail,IonLabel, IonButton, IonCard, IonCardContent, IonSearchbar, IonCardHeader, IonCardTitle, IonCardSubtitle, IonGrid, IonRow, IonCol, IonImg, IonAvatar } from '@ionic/angular/standalone';
import { PostsService } from 'src/app/post/services/post.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Post, Publicaciones } from 'src/app/auth/interfaces/post';

@Component({
  selector: 'home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonAvatar, IonImg, IonCol, IonRow, IonGrid, IonCardSubtitle, IonCardTitle, IonCardHeader, IonSearchbar, IonCardContent, IonCard, CurrencyPipe, RouterLink, IonRouterLink, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonFab, IonFabButton, IonIcon, IonList, IonItem, IonThumbnail,IonLabel, IonButton]
})
export class HomePage {
[x: string]: any;
logout() {
throw new Error('Method not implemented.');
}
  posts: Publicaciones[] = [];
  

  #postsService = inject(PostsService);
  #navController = inject(NavController);
  #actionSheetCtrl =inject(ActionSheetController);
  title: any;


ionViewWillEnter() {
  this.#postsService
    .getPosts()
    .subscribe((prods) => {
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxPosts loaded:OBJETO--PRODS---', prods);  // Verificar los datos cargados
      this.posts = prods;
      console.log('this.posts después de la asignación:', this.posts);
    });
}

  reloadPosts(refresher: IonRefresher) {
    this.#postsService
    .getPosts()
    .subscribe((prods) => {
      this.posts = prods;
      refresher.complete();
    });
  }

  async showOptions(prod: Publicaciones) {
    
            this.#navController.navigateForward(['/post', prod.id]); 
        
  }
  redirectToEdit(prod: Publicaciones) {
    this.#navController.navigateForward(['/profile', prod.creator?.id]);
  }
  
  
  
  
  handleVote(postId: number, isLike: boolean): void {
    this.#postsService.addVote(postId, isLike).subscribe({
      next: (resp) => {
        // Encuentra el post y actualiza `totalLikes` con el nuevo valor recibido
        const post = this.posts.find(p => p.id === postId);
        if (post) {
          post.totalLikes = resp.totalLikes;
        }
      },
      error: (err) => {
        console.error('Error al votar', err);
      }
    });
  }
  // En tu componente HomePage

mostrarDetallesPost(postId: number) {
  this.#navController.navigateForward(['/post', postId]);
}

}