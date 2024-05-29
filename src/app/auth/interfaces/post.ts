import { User } from './user';

export interface Post {
imageUrl: any;
price: string|number;
creator?: any;
totalDislikes: number; 
  totalLikes: any;
  id?: number;
  title?: string;
  description?: string;
  mood: number;
  image?: string;
  date?: string;
  likes: boolean | null;
  lat?: number; // Opcional, para la geolocalización
  lng?: number; // Opcional, para la geolocalización
  userLike?: boolean; // Nuevo: indica si el usuario ha dado like
  userDislike?: boolean; // Nuevo: indica si el usuario ha dado dislike
}
export interface Publicaciones extends Post {
  id?: number;
  date?: string;
  totalLikes: number;
  creator?: User;
  title?: string;
  description?: string;
  mood: number;
  image?: string;
  lat?: number; // Opcional, para la geolocalización
  lng?: number; // Opcional, para la geolocalización
  likes: boolean | null;
  mine?: boolean;
  totalDislikes: number; 
}