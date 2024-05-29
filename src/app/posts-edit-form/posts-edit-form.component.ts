import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink, RouterModule } from '@angular/router';
import { PostsService } from 'src/app/post/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/auth/interfaces/post';

@Component({
  selector: 'app-posts-edit-form',
  templateUrl: './posts-edit-form.component.html',
  styleUrls: ['./posts-edit-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule, RouterLink]
})
export class PostsEditFormComponent implements OnInit {
  post: Post = {
    description: '',
    title: '',
    image: '',
    totalLikes: 0,
    mood: 0,
    likes: null,
    imageUrl: '',
    price: '',
    totalDislikes:0,
  };

  #postService = inject(PostsService);
  #route = inject(ActivatedRoute);

  ngOnInit() {
    const postId = this.#route.snapshot.paramMap.get('id');
    if (postId) {
      this.#postService.getPostById(postId).subscribe((post: Post) => {
        this.post = post;
      });
    }
  }

  updatePost() {
    this.#postService.updatePost(this.post).subscribe(() => {
      console.log('Post updated successfully');
      // Add your navigation logic here
    });
  }

  async takePhoto() {
    // Logic for taking a photo
  }

  async pickFromGallery() {
    // Logic for picking a photo from the gallery
  }
}
