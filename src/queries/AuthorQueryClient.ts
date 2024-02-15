import {QueryKey, UseMutationOptions, UseQueryOptions, UseQueryResult, useMutation, useQuery} from '@tanstack/react-query'
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { QueryKeys } from './QueryKeys';
import BaseResponse from '../models/BaseResponse';
import { UseMutationResult } from 'react-query';
import { AuthorCreateDto, AuthorReturnDto, AuthorUpdateDto } from '../models/Author';

export type QueryOptions<TData> = UseQueryOptions<TData, AxiosError, TData, QueryKey>;

export type MutationOptions<TData, TProperties> = UseMutationOptions<
  TData,
  AxiosError,
  TProperties,
  unknown
>;

export interface AuthorQueryClient {
  createAuthor: (body: AuthorCreateDto) => Promise<void>
  useCreateAuthor: (options?: MutationOptions<void, AuthorCreateDto>) => UseMutationResult<void, AxiosError<CreateUpdateAuthorErrorResponse>, AuthorCreateDto>;  
  getAllAuthors: () => Promise<BaseResponse<AuthorReturnDto[]>>;
  getAuthorById: (id: number) => Promise<AuthorReturnDto>;
  useAuthorById: (id: number, options?: QueryOptions<AuthorReturnDto>) => UseQueryResult<AuthorReturnDto, AxiosError>;
  deleteAuthor: (id: number) => Promise<void>;
  updateAuthor: (id: number, body: AuthorUpdateDto) => Promise<any>;
  useUpdateAuthor: (id: number, body: AuthorUpdateDto, options?: MutationOptions<any, {id: number, body: AuthorUpdateDto}>) => UseMutationResult<any, AxiosError<CreateUpdateAuthorErrorResponse>, {id: number, body: AuthorUpdateDto}>;
  useAllAuthors: (options?: QueryOptions<BaseResponse<AuthorReturnDto[]>>) => UseQueryResult<BaseResponse<AuthorReturnDto[]>, AxiosError>;
  useDeleteAuthor: (id: number, options?: MutationOptions<void, number>) => UseMutationResult<void, AxiosError, number>;
}

export function createAuthorQueryClient(axios: AxiosInstance): AuthorQueryClient {
  return new AuthorQueryClientImp(axios);
}

class AuthorQueryClientImp {
  public constructor(private axios: AxiosInstance) {}

  public createAuthor = async (body: AuthorCreateDto): Promise<void> => {
    return await this.axios
    .post('/api/v1/authors', body)
    .then((response: AxiosResponse<void>) => response.data);
  }

  public useCreateAuthor = (options?: MutationOptions<void, AuthorCreateDto>
    ): UseMutationResult<void, AxiosError<CreateUpdateAuthorErrorResponse>, AuthorCreateDto> => {
      return useMutation<void, AxiosError<CreateUpdateAuthorErrorResponse>, AuthorCreateDto>(
        [QueryKeys.CreateAuthor],
        (body: AuthorCreateDto) => this.createAuthor(body),
        options
      );
    };

  public getAllAuthors = async (
  ): Promise<BaseResponse<AuthorReturnDto[]>> => {
    return await this.axios
      .get('/api/v1/authors')
      .then((response: AxiosResponse<BaseResponse<AuthorReturnDto[]>>) => response.data);
  };

  public getAuthorById = async ( 
    id: number
    ): Promise<AuthorReturnDto> => {
      return await this.axios
        .get(`/api/v1/authors/${id}`)
        .then((response: AxiosResponse<AuthorReturnDto>) => response.data);
    };

    public useAuthorById = (
      id: number,
      options?: QueryOptions<AuthorReturnDto>
    ): UseQueryResult<AuthorReturnDto, AxiosError> => {
      return useQuery<AuthorReturnDto, AxiosError>(
        [QueryKeys.GetAuthorById, id],
        ()=>this.getAuthorById(id),
        options
      );
    };

  public useAllAuthors = (
    options?: QueryOptions<BaseResponse<AuthorReturnDto[]>>
  ): UseQueryResult<BaseResponse<AuthorReturnDto[]>, AxiosError> => {
    return useQuery<BaseResponse<AuthorReturnDto[]>, AxiosError>(
      [QueryKeys.GetAllAuthors],
      ()=>this.getAllAuthors(),
      options
    );
  };

  public deleteAuthor = async (id: number): Promise<void> => {
    return await this.axios
      .delete(`/api/v1/authors/${id}`)
      .then((response: AxiosResponse<void>) => {
        return response.data;
      });
  };

  public useDeleteAuthor = (
    id: number,
    options?: MutationOptions<void, number>
  ): UseMutationResult<void, AxiosError, number> => {
    return useMutation<void, AxiosError, number>(
      [QueryKeys.DeleteAuthor, id],
      () => this.deleteAuthor(id),
      options
    );
  };

  public updateAuthor = async (id: number, body: AuthorUpdateDto): Promise<void> => {
    return await this.axios
      .patch(`/api/v1/authors/${id}`, body)
      .then((response: AxiosResponse<any>) => {
        return response.data;
      })
      .catch((error)=>{
      throw error
    })
  };

  public useUpdateAuthor = (
    id: number,
    body: AuthorUpdateDto,
    options?: MutationOptions<void,  {id: number, body: AuthorUpdateDto}>
  ): UseMutationResult<void, AxiosError<CreateUpdateAuthorErrorResponse>,  {id: number, body: AuthorUpdateDto}> => {
    return useMutation<void, AxiosError<CreateUpdateAuthorErrorResponse>,  {id: number, body: AuthorUpdateDto}>(
      [QueryKeys.UpdateAuthor, id, body],
      () => this.updateAuthor(id, body),
      options
    );
  };
}

interface CreateUpdateAuthorErrorResponse {
  firstName?: string;
  lastName?: string;
  errorMessage?: string;
}