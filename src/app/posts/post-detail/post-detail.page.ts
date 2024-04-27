import { Component, Input, inject, signal } from '@angular/core';
  import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
  import { Post } from 'src/app/auth/interfaces/post';
  import { PostsService } from 'src/app/post/services/post.service';

  @Component({
    selector: 'post-detail',
    templateUrl: './post-detail.page.html',
    styleUrls: ['./post-detail.page.scss'],
    standalone: true,
    imports: [IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel]
  })
  export class postDetailPage  {
    @Input() id!: number;
    post = signal<Post|null>(null);

    #postsService = inject(PostsService);

    constructor() { }

    ionViewWillEnter() {
      this.#postsService.getPost(this.id).subscribe(
        p => this.post.set(p)
      )
    }
  }