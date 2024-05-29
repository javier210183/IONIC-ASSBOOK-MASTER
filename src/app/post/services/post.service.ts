import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Post, Publicaciones } from 'src/app/auth/interfaces/post';
import { Comment } from 'src/app/auth/interfaces/comment';
import { PostsResponse, SinglePostResponse } from 'src/app/auth/interfaces/responses';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  #postsUrl = 'posts';
  #http = inject(HttpClient);

  getPosts(): Observable<Publicaciones[]> {
    return this.#http
      .get<PostsResponse>(this.#postsUrl)
      .pipe(map((resp) => resp.posts));
  }

  getPost(id: number): Observable<Post> {
    return this.#http
      .get<SinglePostResponse>(`${this.#postsUrl}/${id}`)
      .pipe(map((resp) => resp.post));
  }

  getPostById(id: string): Observable<Post> {
    return this.#http
      .get<SinglePostResponse>(`${this.#postsUrl}/${id}`)
      .pipe(map((resp) => resp.post));
  }

  addPost(post: Post): Observable<Post> {
    return this.#http
      .post<SinglePostResponse>(this.#postsUrl, post)
      .pipe(map((resp) => resp.post));
  }

  deletePost(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#postsUrl}/${id}`);
  }

  updatePost(post: Post): Observable<void> {
    return this.#http.put<void>(`${this.#postsUrl}/${post.id}`, post);
  }

  addVote(postId: number, likes: boolean): Observable<{ totalLikes: number }> {
    return this.#http.post<{ totalLikes: number }>(`${this.#postsUrl}/${postId}/likes`, { likes });
  }
  
    deleteVote(id: number) {
      return this.#http.delete<void>(`${this.#postsUrl}/${id}/likes`);
    }

  getComments(id: number): Observable<Comment[]> {
    return this.#http
      .get<{ comments: Comment[] }>(`${this.#postsUrl}/${id}/comments`)
      .pipe(map((resp) => resp.comments));
  }

  addComment(idProd: number, comment: string): Observable<Comment> {
    return this.#http
      .post<{ comment: Comment }>(`${this.#postsUrl}/${idProd}/comments`, { text: comment })
      .pipe(map((resp) => resp.comment));
  }

}
