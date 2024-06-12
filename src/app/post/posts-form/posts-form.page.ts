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
  IonRadioGroup,
  IonRadio,
} from '@ionic/angular/standalone';
import { PostsService } from '../services/post.service';
import { Post } from 'src/app/auth/interfaces/post';
import { RouterLink } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Coordinates } from 'src/app/auth/interfaces/Coordinates';
import { BmMapDirective } from 'src/app/src/app/bingmaps/bm-map.directive';
import { Geolocation } from '@capacitor/geolocation';

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
    IonRadioGroup,
    IonRadio,
    BmMapDirective,
  ],
})
export class PostFormPage implements OnInit {
  newProd: Post = {
    description: '',
    title: '',
    image: '',
    totalLikes: undefined,
    mood: 0,
    likes: null,
    imageUrl: undefined,
    price: '',
    totalDislikes: 0,
  };

  postOption = 'camera'; // Default option
  coordinates: Coordinates = { latitude: 0, longitude: 0 }; // Default coordinates

  #postService = inject(PostsService);
  #toastCtrl = inject(ToastController);
  #nav = inject(NavController);

  ngOnInit() {
    this.getCurrentLocation();
  }

  async getCurrentLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.coordinates = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    } catch (error) {
      console.error('Error getting current location:', error);
    }
  }

  addPost() {
    if (this.postOption === 'location') {
      this.newProd.lat = this.coordinates.latitude;
      this.newProd.lng = this.coordinates.longitude;
      this.newProd.image = ''; // Optional: clear the image if the location is selected
    } else if (this.postOption === 'camera' || this.postOption === 'gallery') {
      this.newProd.lat = undefined;
      this.newProd.lng = undefined;
    }

    this.#postService.addPost(this.newProd).subscribe(
      async () => {
        (
          await this.#toastCtrl.create({
            position: 'bottom',
            duration: 3000,
            message: 'Post added successfully',
            color: 'success',
          })
        ).present();
        this.#nav.navigateRoot(['/post']);
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

    this.newProd.image = photo.dataUrl as string;
  }

  async pickFromGallery() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 640,
      width: 640,
      allowEditing: true,
      resultType: CameraResultType.DataUrl, // Base64 (url encoded)
    });

    this.newProd.image = photo.dataUrl as string;
  }
}
