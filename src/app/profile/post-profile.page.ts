import { Component, Input, inject, signal } from '@angular/core';
  import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonContent, IonGrid, IonButton, IonInput, IonCol, IonRow, IonItem, IonText, IonAvatar, } from '@ionic/angular/standalone';
  import { Post } from 'src/app/auth/interfaces/post';
  import { PostsService } from 'src/app/post/services/post.service';
import { User, UserLogin } from '../auth/interfaces/user';
import { AuthService } from '../auth/services/auth.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

  @Component({
                      selector: 'post-detail',
                      templateUrl: './post-profile.page.html',
                      styleUrls: ['./post-profile.page.scss'],
                      standalone: true,
                      imports: [FormsModule,ReactiveFormsModule,IonAvatar, IonText, IonItem, IonRow, IonCol, IonInput, IonButton, IonGrid, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel]
                    })
  export class PostProfilePage  {
    #http = inject(HttpClient);
    // Actualizar el avatar del usuario
updateAvatar(data: {  avatar: string}): Observable<any> {
  //const formData = new FormData();
  //formData.append('avatar', file);
  console.log("VOY A ENVIAR EL AVATA :", data);

  return this.#http.put('users/me/avatar', data);
}
  changeUserPassword(): void {
  const data = {
    
    password: this.newPassword
  };

  this.#authService.changePassword(data).subscribe({
    next: (response : any) => {
      console.log('Password changed successfully');
      console.log("este es tu response :",response);
      // Resto de tu lógica de éxito
    },
    error: (error) => {
      console.error('Error changing password', error);
      // Resto de tu lógica de error
    }
  });
}

  
// Cambio de Avatar
changeAvatar(event: Event): void {
  const element = event.target as HTMLInputElement;
  if (element.files && element.files.length > 0) {
    const file = element.files[0];
    const reader = new FileReader();
          reader.onload = () => {
            this.avatarUrl = reader.result as string; // Asume formato Base64
          };
          reader.readAsDataURL(file);
    console.log("ESTE ES TU AVATARURL :",this.avatarUrl);
    this.#authService.updateAvatar({avatar : this.avatarUrl}).subscribe({
      next: (user) => {
        console.log(" HE CAMBIADO EL AVATAR Y ME DEVUELVE :", user);
        // Actualizar la UI con el nuevo avatar
        this.avatarUrl = user.avatar;
      },
      error: (error) => console.error('Error updating avatar', error)
    });
  }
}
// Actualizar perfil
updateProfile(data: { name: string; email: string }): Observable<UserLogin> {
  
  return this.#http.put<UserLogin>('users/me', data);
}
changePassword(data: {  password: string }): Observable<any> {
  console.log("VOY A ENVIAR EL DATA :",data);
  return this.#http.put('users/me/password', data);
}
    @Input() id!: number;
    post = signal<Post|null>(null);

    #postsService = inject(PostsService);
    #authService = inject(AuthService); 
    userProfile: any;
    name: any;
    email: any;
    avatarUrl: any;
showEditProfileForm: any;
showEditPasswordForm: any;
updatedEmail: any;
updatedName: any;
newPassword: any;
coordinates: any;

    constructor() { }
    

    loadUserProfile(): void {
      this.#authService.getProfile().subscribe({
        next: (response: any) => { // Cambio aquí para aceptar cualquier tipo
          console.log("Respuesta completa de profile:", response);
          this.userProfile = response.user; // Accede a través de la propiedad 'user'
          this.name = response.user.name; // Ahora sí, accedemos a 'name'
          this.email = response.user.email; // Y aquí accedemos a 'email'
          this.avatarUrl = response.user.avatar;
          console.log("TU NOMBRE : ", this.name);
          console.log("TU EMAIL : ", this.email);
          console.log("URL del avatar:", this.avatarUrl);
          console.log("ESTE ES TU USUARIOOOOOO   : ",response.user);
        },
        error: (error) => console.error('Error obtaining user profile:', error),
      });
    }
    
    updateUserProfile(): void 
    {
      // Asume que updatedName y updatedEmail son propiedades en tu componente vinculadas a los inputs del formulario
      this.#authService.updateProfile({ name: this.updatedName, email: this.updatedEmail }).subscribe({
        next: () => {
          this.loadUserProfile(); // Recarga los datos del perfil
          this.showEditProfileForm = false; // Oculta el formulario después de la actualización
          console.log("Perfil actualizado con éxito.");
        },
        error: (error) => console.error('Error updating profile', error)
      });
    }
    
  }
  