import { Component, Input, inject, signal } from '@angular/core';
  import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonContent } from '@ionic/angular/standalone';
  import { Post } from 'src/app/auth/interfaces/post';
  import { PostsService } from 'src/app/post/services/post.service';

  @Component({
      selector: 'post-detail',
      templateUrl: './post-profile.page.html',
      styleUrls: ['./post-profile.page.scss'],
      standalone: true,
      imports: [IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel]
    })
  export class PostProfilePage  {
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