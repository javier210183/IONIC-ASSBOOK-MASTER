import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ToastController,
  NavController,
  IonRouterLink,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonButton,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonLabel,
} from '@ionic/angular/standalone';
import { PostsService } from '../services/post.service';
import { Post } from 'src/app/auth/interfaces/post';
import { RouterLink } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'posts-form',
  templateUrl: './posts-form.page.html',
  styleUrls: ['./posts-form.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    IonRouterLink,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonButton,
    IonImg,
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonLabel,
  ],
})
export class PostsFormPage {
  newProd: Post = {
      description: '',

      image: '',
      totalLikes: undefined,
      mood: 0,
      likes: null,
      imageUrl: ''
  };

  #postsService = inject(PostsService);
  #toastCtrl = inject(ToastController);
  #nav = inject(NavController);
    #PostService: any;

  addPost() {
    this.#PostService.addPost(this.newProd).subscribe(
      async () => {
        (
          await this.#toastCtrl.create({
            position: 'bottom',
            duration: 3000,
            message: 'Post added succesfully',
            color: 'success',
          })
        ).present();
        this.#nav.navigateRoot(['/posts']);
      },
      async () =>
        (
          await this.#toastCtrl.create({
            position: 'bottom',
            duration: 3000,
            message: 'Error adding post',
          })
        ).present()
    );
  }

  async takePhoto() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 90,
      height: 640,
      width: 640,
      allowEditing: true,
      resultType: CameraResultType.DataUrl, // Base64 (url encoded)
    });

    this.newProd.imageUrl = photo.dataUrl as string;
  }

  async pickFromGallery() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 640,
      width: 640,
      allowEditing: true,
      resultType: CameraResultType.DataUrl, // Base64 (url encoded)
    });

    this.newProd.imageUrl = photo.dataUrl as string;
  }
}