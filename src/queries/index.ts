import axios from 'axios';
import { createAuthorQueryClient } from './AuthorQueryClient';
import { createBookQueryClient } from './BookQueryClient';
import { createLibraryQueryClient } from './LibraryQueryClient';
import { createGenreQueryClient } from './GenreQueryClient';
import { createAuthQueryClient } from './AuthQueryClient';

const Axios = axios.create();
Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
Axios.defaults.headers.common['Access-Control-Allow-Methods'] =
  'GET, POST, PATCH, PUT, DELETE, OPTIONS';
Axios.defaults.headers.common['Access-Control-Allow-Headers'] =
  'Origin, Content-Type, X-Auth-Token';

export const authorQueryClient = createAuthorQueryClient(Axios);
export const bookQueryClient = createBookQueryClient(Axios);
export const libraryQueryClient = createLibraryQueryClient(Axios);
export const genreQueryClient = createGenreQueryClient(Axios);
export const authQueryClient = createAuthQueryClient(Axios)