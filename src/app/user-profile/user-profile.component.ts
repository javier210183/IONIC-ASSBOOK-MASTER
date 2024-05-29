import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/interfaces/user';
import { NavController, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonItem, IonAvatar, IonLabel, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonItem, IonAvatar, IonLabel, IonText]
})
export class UserProfileComponent implements OnInit {
  user: User | null = null;

  #authService = inject(AuthService);
  #navController = inject(NavController);
  #route = inject(ActivatedRoute);

  ngOnInit() {
    const userId = this.#route.snapshot.paramMap.get('id');
    if (userId) {
      this.loadUserProfile(+userId);
    }
  }

  loadUserProfile(userId: number) {
    console.log(`Loading user profile for ID: ${userId}`);
    this.#authService.getUserProfile(userId).subscribe({
      next: (user) => {
        console.log('Loaded user:', user);
        this.user = user;
      },
      error: (err) => {
        console.error('Error loading user profile:', err);
      }
    });
  }


  goBack() {
    this.#navController.back();
  }
}
