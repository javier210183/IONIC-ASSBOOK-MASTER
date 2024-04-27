import { Component, Input, NgZone, inject } from '@angular/core';
import { Platform, AlertController, IonHeader, IonToolbar, IonContent, IonRefresher, IonRefresherContent, IonFab, IonFabButton, IonIcon, IonList, IonItem, IonAvatar, IonImg, IonLabel } from '@ionic/angular/standalone';
import { PostsService } from 'src/app/post/services/post.service';
import { Subscription } from 'rxjs';
import { Comment } from 'src/app/auth/interfaces/comment';

@Component({
  selector: 'post-comments',
  templateUrl: './post-comments.page.html',
  styleUrls: ['./post-comments.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonContent, IonRefresher, IonRefresherContent, IonFab, IonFabButton, IonIcon, IonList, IonItem, IonAvatar, IonImg, IonLabel]
})
export class PostCommentsPage {
  @Input() id!: number;
  comments!: Comment[];
  resumeSub!: Subscription;

  #alertCtrl = inject(AlertController);
  #postsService = inject(PostsService);
  #platform = inject(Platform);
  #ngZone = inject(NgZone);

  ionViewWillEnter() {
    this.loadComments();
    // If the app comes back from being paused, reload comments
    this.resumeSub = this.#platform.resume.subscribe(
      () => this.loadComments() // Needs NgZone because Angular doesn't detect this event
    );
  }

  ionViewWillLeave(): void {
    this.resumeSub.unsubscribe();
  }

  loadComments(refresher?: IonRefresher) {
    this.#postsService.getComments(this.id).subscribe((comments) => {
      this.#ngZone.run(() => comments = comments);                                  //PORQUE NO PUEDO PONER THIS.COMMENTS?

      refresher?.complete();
    });
  }

  async addComment() {
    const alert = await this.#alertCtrl.create({
      header: 'New commment',
      inputs: [
        {
          name: 'comment',
          type: 'text',
          placeholder: 'Enter your comment',
        },
      ],
      buttons: [
        {
          text: 'Add',
          role: 'ok',
        },
        {
          role: 'cancel',
          text: 'Cancel',
        },
      ],
    });

    await alert.present();
    const result = await alert.onDidDismiss();

    if (result.role === 'ok') {
      this.#postsService
        .addComment(this.id, result.data.values.comment)
        .subscribe((comment) => this.#ngZone.run(() => this.comments.push(comment)));
    }
  }
}