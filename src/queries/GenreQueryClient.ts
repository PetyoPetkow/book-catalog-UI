import {QueryKey, UseMutationOptions, UseQueryOptions, UseQueryResult, useMutation, useQuery} from '@tanstack/react-query'
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { QueryKeys } from './QueryKeys';
import BaseResponse from '../models/BaseResponse';
import { UseMutationResult } from 'react-query';
import {  GenreCreateDto, GenreReturnDto } from '../models/Genre';

export type QueryOptions<TData> = UseQueryOptions<TData, AxiosError, TData, QueryKey>;

export type MutationOptions<TData, TProperties> = UseMutationOptions<
  TData,
  AxiosError,
  TProperties,
  unknown
>;

export interface GenreQueryClient {
  createGenre: (body: GenreCreateDto) => Promise<void>
  useCreateGenre: (options?: MutationOptions<void, GenreCreateDto>) => UseMutationResult<void, AxiosError<CreateUpdateGenreErrorResponse>, GenreCreateDto>;  
  allGenres: () => Promise<BaseResponse<GenreReturnDto[]>>;
  useAllGenres: (options?: QueryOptions<BaseResponse<GenreReturnDto[]>>) => UseQueryResult<BaseResponse<GenreReturnDto[]>, AxiosError>;
  fuelTypeById: (id: number) => Promise<GenreReturnDto>;
  useGenreById: (id: number, options?: QueryOptions<GenreReturnDto>) => UseQueryResult<GenreReturnDto, AxiosError>;
  deleteGenre: (id: number) => Promise<void>;
  updateGenre: (id: number, body: GenreCreateDto) => Promise<any>;
  useUpdateGenre: (id: number, body: GenreCreateDto, options?: MutationOptions<any, {id: number, body: GenreCreateDto}>) => UseMutationResult<any, AxiosError<CreateUpdateGenreErrorResponse>, {id: number, body: GenreCreateDto}>;
  useDeleteGenre: (id: number, options?: MutationOptions<void, number>) => UseMutationResult<void, AxiosError, number>;
}

export function createGenreQueryClient(axios: AxiosInstance): GenreQueryClient {
  return new GenreQueryClientImp(axios);
}

class GenreQueryClientImp {
  public constructor(private axios: AxiosInstance) {}

  public createGenre = async (body: GenreCreateDto): Promise<void> => {
    return await this.axios
    .post('/api/v1/genres', body)
    .then((response: AxiosResponse<void>) => response.data);
  }

  public useCreateGenre = (options?: MutationOptions<void, GenreCreateDto>
    ): UseMutationResult<void, AxiosError<CreateUpdateGenreErrorResponse>, GenreCreateDto> => {
      return useMutation<void, AxiosError<CreateUpdateGenreErrorResponse>, GenreCreateDto>(
        [QueryKeys.CreateGenre],
        (body: GenreCreateDto) => this.createGenre(body),
        options
      );
    };

  public allGenres = async (
  ): Promise<BaseResponse<GenreReturnDto[]>> => {
    return await this.axios
      .get('/api/v1/genres')
      .then((response: AxiosResponse<BaseResponse<GenreReturnDto[]>>) => response.data);
  };

  public useAllGenres = (
    options?: QueryOptions<BaseResponse<GenreReturnDto[]>>
  ): UseQueryResult<BaseResponse<GenreReturnDto[]>, AxiosError> => {
    return useQuery<BaseResponse<GenreReturnDto[]>, AxiosError>(
      [QueryKeys.GetAllGenres],
      ()=>this.allGenres(),
      options
    );
  };

  public fuelTypeById = async ( 
    id: number
    ): Promise<GenreReturnDto> => {
      return await this.axios
        .get(`/api/v1/genres/${id}`)
        .then((response: AxiosResponse<GenreReturnDto>) => response.data);
    };

    public useGenreById = (
      id: number,
      options?: QueryOptions<GenreReturnDto>
    ): UseQueryResult<GenreReturnDto, AxiosError> => {
      return useQuery<GenreReturnDto, AxiosError>(
        [QueryKeys.GetGenreById, id],
        ()=>this.fuelTypeById(id),
        options
      );
    };

  public deleteGenre = async (id: number): Promise<void> => {
    return await this.axios
      .delete(`/api/v1/genres/${id}`)
      .then((response: AxiosResponse<void>) => {
        return response.data;
      });
  };

  public useDeleteGenre = (
    id: number,
    options?: MutationOptions<void, number>
  ): UseMutationResult<void, AxiosError, number> => {
    return useMutation<void, AxiosError, number>(
      [QueryKeys.DeleteGenre, id],
      () => this.deleteGenre(id),
      options
    );
  };

  public updateGenre = async (id: number, body: GenreCreateDto): Promise<void> => {
    return await this.axios
      .patch(`/api/v1/genres/${id}`, body)
      .then((response: AxiosResponse<any>) => {
        return response.data;
      })
      .catch((error)=>{
      throw error
    })
  };

  public useUpdateGenre = (
    id: number,
    body: GenreCreateDto,
    options?: MutationOptions<void,  {id: number, body: GenreCreateDto}>
  ): UseMutationResult<void, AxiosError<CreateUpdateGenreErrorResponse>,  {id: number, body: GenreCreateDto}> => {
    return useMutation<void, AxiosError<CreateUpdateGenreErrorResponse>,  {id: number, body: GenreCreateDto}>(
      [QueryKeys.UpdateGenre, id, body],
      () => this.updateGenre(id, body),
      options
    );
  };
}

interface CreateUpdateGenreErrorResponse {
  name?: string;
  description?: string;
  errorMessage?: string;
}