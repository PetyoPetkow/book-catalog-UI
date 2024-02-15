import { BookReturnDto } from "./Book";

export interface LibraryCreateDto {
  name: string;
  location: string;
  bookIds: number[];
}

export interface LibraryReturnDto {
  id: number;
  name: string;
  location: string;
  books: BookReturnDto[];
}

export interface LibraryUpdateDto {
  name: string;
  location: string;
  bookIds: number[];
}

export interface LibraryDisplay {
  id: number;
  name: string;
  location: string;
  booksNames: string;
}