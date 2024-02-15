import {QueryKey, UseMutationOptions, UseQueryOptions, UseQueryResult, useMutation, useQuery} from '@tanstack/react-query'
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { QueryKeys } from './QueryKeys';
import BaseResponse from '../models/BaseResponse';
import { UseMutationResult } from 'react-query';
import { BookCreateDto, BookReturnDto, BookSearchParams } from '../models/Book';

export type QueryOptions<TData> = UseQueryOptions<TData, AxiosError, TData, QueryKey>;

export type MutationOptions<TData, TProperties> = UseMutationOptions<
  TData,
  AxiosError,
  TProperties,
  unknown
>;

export interface BookQueryClient {
  createBook: (body: BookCreateDto) => Promise<void>
  useCreateBook: (options?: MutationOptions<void, BookCreateDto>) => UseMutationResult<void, AxiosError<CreateUpdateBookErrorResponse>, BookCreateDto>;  
  allBooks: () => Promise<BaseResponse<BookReturnDto[]>>;
  useAllBooks: (options?: QueryOptions<BaseResponse<BookReturnDto[]>>) => UseQueryResult<BaseResponse<BookReturnDto[]>, AxiosError>;
  BookById: (id: number) => Promise<BookReturnDto>;
  useBookById: (id: number, options?: QueryOptions<BookReturnDto>) => UseQueryResult<BookReturnDto, AxiosError>;
  deleteBook: (id: number) => Promise<void>;
  updateBook: (id: number, body: BookCreateDto) => Promise<any>;
  useUpdateBook: (id: number, body: BookCreateDto, options?: MutationOptions<any, {id: number, body: BookCreateDto}>) => UseMutationResult<any, AxiosError<CreateUpdateBookErrorResponse>, {id: number, body: BookCreateDto}>;
  useDeleteBook: (id: number, options?: MutationOptions<void, number>) => UseMutationResult<void, AxiosError, number>;
  searchBooks: (params: BookSearchParams)=> Promise<BookReturnDto[] | void>;
  useSearchBooks: (params: BookSearchParams, options?: QueryOptions<BookReturnDto[] | void>) => UseQueryResult<BookReturnDto[] | void, AxiosError>
}

export function createBookQueryClient(axios: AxiosInstance): BookQueryClient {
  return new BookQueryClientImp(axios);
}

class BookQueryClientImp {
  public constructor(private axios: AxiosInstance) {}

  public createBook = async (body: BookCreateDto): Promise<void> => {
    return await this.axios
    .post('/api/v1/books', body)
    .then((response: AxiosResponse<void>) => response.data);
  }

  public useCreateBook = (options?: MutationOptions<void, BookCreateDto>
    ): UseMutationResult<void, AxiosError<CreateUpdateBookErrorResponse>, BookCreateDto> => {
      return useMutation<void, AxiosError<CreateUpdateBookErrorResponse>, BookCreateDto>(
        [QueryKeys.CreateBook],
        (body: BookCreateDto) => this.createBook(body),
        options
      );
    };

  public allBooks = async (
  ): Promise<BaseResponse<BookReturnDto[]>> => {
    return await this.axios
      .get('/api/v1/books')
      .then((response: AxiosResponse<BaseResponse<BookReturnDto[]>>) => response.data);
  };

  public useAllBooks = (
    options?: QueryOptions<BaseResponse<BookReturnDto[]>>
  ): UseQueryResult<BaseResponse<BookReturnDto[]>, AxiosError> => {
    return useQuery<BaseResponse<BookReturnDto[]>, AxiosError>(
      [QueryKeys.GetAllBooks],
      ()=>this.allBooks(),
      options
    );
  };

  public BookById = async ( 
    id: number
    ): Promise<BookReturnDto> => {
      return await this.axios
        .get(`/api/v1/books/${id}`)
        .then((response: AxiosResponse<BookReturnDto>) => response.data);
    };

    public useBookById = (
      id: number,
      options?: QueryOptions<BookReturnDto>
    ): UseQueryResult<BookReturnDto, AxiosError> => {
      return useQuery<BookReturnDto, AxiosError>(
        [QueryKeys.GetBookById, id],
        ()=>this.BookById(id),
        options
      );
    };

  public deleteBook = async (id: number): Promise<void> => {
    return await this.axios
      .delete(`/api/v1/books/${id}`)
      .then((response: AxiosResponse<void>) => {
        return response.data;
      });
  };

  public useDeleteBook = (
    id: number,
    options?: MutationOptions<void, number>
  ): UseMutationResult<void, AxiosError, number> => {
    return useMutation<void, AxiosError, number>(
      [QueryKeys.DeleteBook, id],
      () => this.deleteBook(id),
      options
    );
  };

  public updateBook = async (id: number, body: BookCreateDto): Promise<void> => {
    return await this.axios
      .patch(`/api/v1/books/${id}`, body)
      .then((response: AxiosResponse<any>) => {
        return response.data;
      })
      .catch((error)=>{
      throw error
    })
  };

  public useUpdateBook = (
    id: number,
    body: BookCreateDto,
    options?: MutationOptions<void,  {id: number, body: BookCreateDto}>
  ): UseMutationResult<void, AxiosError<CreateUpdateBookErrorResponse>,  {id: number, body: BookCreateDto}> => {
    return useMutation<void, AxiosError<CreateUpdateBookErrorResponse>,  {id: number, body: BookCreateDto}>(
      [QueryKeys.UpdateBook, id, body],
      () => this.updateBook(id, body),
      options
    );
  };

  public searchBooks = async (
    params: BookSearchParams
    ): Promise<BookReturnDto[] | void> => {
      return await this.axios
        .get('/api/v1/books/search',{params: params})
        .then((response: AxiosResponse<BookReturnDto[]>) => response.data)
        .catch((error: AxiosError)=>console.log(error.message))
        ;
    };

    public useSearchBooks = (
      params: BookSearchParams,
      options?: QueryOptions<BookReturnDto[] | void>
    ): UseQueryResult<BookReturnDto[] | void, AxiosError> => {
      return useQuery<BookReturnDto[] | void, AxiosError>(
        [QueryKeys.SearchBooks],
        ()=>this.searchBooks(params),
        options
      );
    };
}


interface CreateUpdateBookErrorResponse {
  title?: string;
  isbn?: string;
  available?: string;
  publishedDate?: string;
  genreIds?: string;
  errorMessage?: string;
}