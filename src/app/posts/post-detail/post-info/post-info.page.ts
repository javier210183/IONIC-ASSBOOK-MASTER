import { Component, inject } from '@angular/core';
import { AlertController, NavController ,IonHeader, IonToolbar, IonContent, IonCard, IonCardContent, IonCardTitle, IonCardSubtitle, IonButton, IonIcon, IonLabel, IonItem, IonAvatar } from '@ionic/angular/standalone';
import { PostsService } from 'src/app/post/services/post.service';
import { postDetailPage } from '../post-detail.page';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'post-info',
  templateUrl: './post-info.page.html',
  styleUrls: ['./post-info.page.scss'],
  standalone: true,
  imports: [CurrencyPipe ,IonHeader, IonToolbar, IonContent, IonCard, IonCardContent, IonCardTitle, IonCardSubtitle, IonButton, IonIcon, IonLabel, IonItem, IonAvatar],
})
export class PostInfoPage {
  post = inject(postDetailPage).post; // Obtenemos signal de la página padre

  #alertCtrl = inject(AlertController);
  #postsService = inject(PostsService);
  #nav = inject(NavController);

  async delete() {
    const alert = await this.#alertCtrl.create({
      header: 'Delete post',
      message: 'Are you sure you want to delete this post?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.#postsService
              .deletePost(this.post()!.id!)
              .subscribe(() => this.#nav.navigateBack(['/posts']));
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    alert.present();
  }
}