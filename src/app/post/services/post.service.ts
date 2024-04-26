import { HttpClient } from '@angular/common/http';
      import { Injectable, inject } from '@angular/core';
      import { Observable, map } from 'rxjs';
      import { Post, Publicaciones } from 'src/app/auth/interfaces/post';
      import { Comment } from 'src/app/auth/interfaces/commen';
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
      
        addPost(post: Post): Observable<Post> {
          return this.#http
            .post<SinglePostResponse>(this.#postsUrl, post)
            .pipe(map((resp) => resp.post));
        }
      
        deletePost(id: number): Observable<void> {
          return this.#http.delete<void>(`${this.#postsUrl}/${id}`);
        }
      
        
      addVote(postId: number, likes: boolean): Observable<{ totalLikes: number }> {
        return this.#http.post<{ totalLikes: number }>(`${this.#postsUrl}/${postId}/likes`, { likes });
      }
      
      
      
        deleteVote(id: number) {
          return this.#http.delete<void>(`${this.#postsUrl}/${id}/likes`);
        }
        addComment(idProd: number, comment: string): Observable<Comment> {
          return this.#http
            .post<{ comment: Comment }>(`post/${idProd}/comments`, {
              text: comment,
            })
            .pipe(map((resp) => resp.comment));
        }
        getComments(id:number){
          return this.#http
            .get<SinglePostResponse>(`${this.#postsUrl}/${id}/comments`);
             
        }
        
      }