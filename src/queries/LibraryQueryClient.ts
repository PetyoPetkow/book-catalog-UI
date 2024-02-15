import {QueryKey, UseMutationOptions, UseQueryOptions, UseQueryResult, useMutation, useQuery} from '@tanstack/react-query'
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { QueryKeys } from './QueryKeys';
import BaseResponse from '../models/BaseResponse';
import { UseMutationResult } from 'react-query';
import {  LibraryCreateDto, LibraryReturnDto } from '../models/Library';

export type QueryOptions<TData> = UseQueryOptions<TData, AxiosError, TData, QueryKey>;

export type MutationOptions<TData, TProperties> = UseMutationOptions<
  TData,
  AxiosError,
  TProperties,
  unknown
>;

export interface LibraryQueryClient {
  createLibrary: (body: LibraryCreateDto) => Promise<void>
  useCreateLibrary: (options?: MutationOptions<void, LibraryCreateDto>) => UseMutationResult<void, AxiosError<CreateUpdateLibraryErrorResponse>, LibraryCreateDto>;  
  allLibraries: () => Promise<BaseResponse<LibraryReturnDto[]>>;
  useAllLibraries: (options?: QueryOptions<BaseResponse<LibraryReturnDto[]>>) => UseQueryResult<BaseResponse<LibraryReturnDto[]>, AxiosError>;
  modelById: (id: number) => Promise<LibraryReturnDto>;
  useLibraryById: (id: number, options?: QueryOptions<LibraryReturnDto>) => UseQueryResult<LibraryReturnDto, AxiosError>;
  deleteLibrary: (id: number) => Promise<void>;
  updateLibrary: (id: number, body: LibraryCreateDto) => Promise<any>;
  useUpdateLibrary: (id: number, body: LibraryCreateDto, options?: MutationOptions<any, {id: number, body: LibraryCreateDto}>) => UseMutationResult<any, AxiosError<CreateUpdateLibraryErrorResponse>, {id: number, body: LibraryCreateDto}>;
  useDeleteLibrary: (id: number, options?: MutationOptions<void, number>) => UseMutationResult<void, AxiosError, number>;
}

export function createLibraryQueryClient(axios: AxiosInstance): LibraryQueryClient {
  return new LibraryQueryClientImp(axios);
}

class LibraryQueryClientImp {
  public constructor(private axios: AxiosInstance) {}

  public createLibrary = async (body: LibraryCreateDto): Promise<void> => {
    return await this.axios
    .post('/api/v1/libraries', body)
    .then((response: AxiosResponse<void>) => response.data);
  }

  public useCreateLibrary = (options?: MutationOptions<void, LibraryCreateDto>
    ): UseMutationResult<void, AxiosError<CreateUpdateLibraryErrorResponse>, LibraryCreateDto> => {
      return useMutation<void, AxiosError<CreateUpdateLibraryErrorResponse>, LibraryCreateDto>(
        [QueryKeys.CreateLibrary],
        (body: LibraryCreateDto) => this.createLibrary(body),
        options
      );
    };

  public allLibraries = async (
  ): Promise<BaseResponse<LibraryReturnDto[]>> => {
    return await this.axios
      .get('/api/v1/libraries')
      .then((response: AxiosResponse<BaseResponse<LibraryReturnDto[]>>) => response.data);
  };

  public useAllLibraries = (
    options?: QueryOptions<BaseResponse<LibraryReturnDto[]>>
  ): UseQueryResult<BaseResponse<LibraryReturnDto[]>, AxiosError> => {
    return useQuery<BaseResponse<LibraryReturnDto[]>, AxiosError>(
      [QueryKeys.GetAllLibrarys],
      ()=>this.allLibraries(),
      options
    );
  };

  public modelById = async ( 
    id: number
    ): Promise<LibraryReturnDto> => {
      return await this.axios
        .get(`/api/v1/libraries/${id}`)
        .then((response: AxiosResponse<LibraryReturnDto>) => response.data);
    };

    public useLibraryById = (
      id: number,
      options?: QueryOptions<LibraryReturnDto>
    ): UseQueryResult<LibraryReturnDto, AxiosError> => {
      return useQuery<LibraryReturnDto, AxiosError>(
        [QueryKeys.GetLibraryById, id],
        ()=>this.modelById(id),
        options
      );
    };

  public deleteLibrary = async (id: number): Promise<void> => {
    return await this.axios
      .delete(`/api/v1/libraries/${id}`)
      .then((response: AxiosResponse<void>) => {
        return response.data;
      });
  };

  public useDeleteLibrary = (
    id: number,
    options?: MutationOptions<void, number>
  ): UseMutationResult<void, AxiosError, number> => {
    return useMutation<void, AxiosError, number>(
      [QueryKeys.DeleteLibrary, id],
      () => this.deleteLibrary(id),
      options
    );
  };

  public updateLibrary = async (id: number, body: LibraryCreateDto): Promise<void> => {
    return await this.axios
      .patch(`/api/v1/libraries/${id}`, body)
      .then((response: AxiosResponse<any>) => {
        return response.data;
      })
      .catch((error)=>{
      throw error
    })
  };

  public useUpdateLibrary = (
    id: number,
    body: LibraryCreateDto,
    options?: MutationOptions<void,  {id: number, body: LibraryCreateDto}>
  ): UseMutationResult<void, AxiosError<CreateUpdateLibraryErrorResponse>,  {id: number, body: LibraryCreateDto}> => {
    return useMutation<void, AxiosError<CreateUpdateLibraryErrorResponse>,  {id: number, body: LibraryCreateDto}>(
      [QueryKeys.UpdateLibrary, id, body],
      () => this.updateLibrary(id, body),
      options
    );
  };
}

interface CreateUpdateLibraryErrorResponse {
  name?: string;
  location?: string;
  bookIds?: string;
  errorMessage?: string;
}