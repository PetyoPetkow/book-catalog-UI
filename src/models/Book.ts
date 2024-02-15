import { AuthorReturnDto } from "./Author";
import { GenreReturnDto } from "./Genre";

export interface BookCreateDto {
  title: string;
  isbn: string
  publishedDate: string;
  available: boolean;
  authorId: number;
  genreIds: number[];
}

export interface BookReturnDto {
  id: number;
  title: string;
  isbn: string;
  publishedDate: string;
  available: boolean;
  author: AuthorReturnDto;
  genres: GenreReturnDto[];
}

export interface BookUpdateDto {
  title: string;
  isbn: string
  publishedDate: string;
  available: boolean;
  authorId: number;
  genreIds: number[];
}

export interface BookDisplay {
  id: number,
  title: string;
  isbn: string
  publishedDate: string;
  available: boolean;
  authorName: string;
  genresNames: string;
}

export interface BookSearchParams {
  title?: string;
}