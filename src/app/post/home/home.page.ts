import { Component, OnInit, inject } from '@angular/core';
import { NavController, ActionSheetController, IonRouterLink, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonFab, IonFabButton, IonIcon, IonList, IonItem, IonThumbnail, IonLabel, IonButton, IonCard, IonCardContent, IonSearchbar, IonCardHeader, IonCardTitle, IonCardSubtitle, IonGrid, IonRow, IonCol, IonImg, IonAvatar } from '@ionic/angular/standalone';
import { PostsService } from 'src/app/post/services/post.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Post, Publicaciones } from 'src/app/auth/interfaces/post';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonAvatar, IonImg, IonCol, IonRow, IonGrid, IonCardSubtitle, IonCardTitle, IonCardHeader, IonSearchbar, IonCardContent, IonCard, CurrencyPipe, RouterLink, IonRouterLink, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonFab, IonFabButton, IonIcon, IonList, IonItem, IonThumbnail, IonLabel, IonButton]
})
export class HomePage implements OnInit {
  posts: Publicaciones[] = [];
  userId: number | null = null;

  #postsService = inject(PostsService);
  #authService = inject(AuthService);
  #navController = inject(NavController);

  ngOnInit() {
    this.loadUserProfile();
  }

  ionViewWillEnter() {
    this.loadPosts();
  }

  loadPosts() {
    this.#postsService.getPosts().subscribe((prods) => {
      this.posts = prods;
    });
  }

  reloadPosts(refresher: IonRefresher) {
    this.#postsService.getPosts().subscribe((prods) => {
      this.posts = prods;
      refresher.complete();
    });
  }

  showOptions(prod: Publicaciones) {
    this.#navController.navigateForward(['/post', prod.id]);
  }

  loadUserProfile() {
    this.#authService.getProfile().subscribe(user => {
      this.userId = user.id ?? null;  //se otorga al userid el usuario actual nunca es undefined
    });
  }

  editPost(prod: Publicaciones) {
    this.#navController.navigateForward([`/post/edit/${prod.id}`]);
  }
  

  toggleLike(prod: Publicaciones) {
    const isLike = !prod.userLike;
    this.#postsService.addVote(prod.id ?? 0, isLike).subscribe({
      next: (resp) => {
        prod.totalLikes = resp.totalLikes;
        prod.userLike = isLike;
        if (isLike && prod.userDislike) {
          prod.userDislike = false;
        }
      },
      error: (err) => {
        console.error('Error al votar', err);
      }
    });
  }

  toggleDislike(prod: Publicaciones) {
    const isDislike = !prod.userDislike;
    this.#postsService.addVote(prod.id ?? 0, !isDislike).subscribe({
      next: (resp) => {
        prod.totalLikes = resp.totalLikes;
        prod.userDislike = isDislike;
        if (isDislike && prod.userLike) {
          prod.userLike = false;
        }
      },
      error: (err) => {
        console.error('Error al votar', err);
      }
    });
  }
  navigateToUserProfile(userId: number | undefined) {
    if (userId) {
      this.#navController.navigateForward([`/user/${userId}`]);
    }
  }
}
