import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { QueryKeys } from './QueryKeys';
import { UseMutationResult } from 'react-query';
import { AccountLoginDto, AccountRegisterDto, AccountLoginErrorResponse, AccountRegisterErrorResponse, User } from '../models/Auth';
import { MutationOptions } from './BaseQueryTypes';

export interface AuthQueryClient {
  login: (credentials: AccountLoginDto) => Promise<User>;
  useLogin: (options?: MutationOptions<User, AccountLoginDto>) => UseMutationResult<User, AxiosError<AccountLoginErrorResponse>, AccountLoginDto>;
  register: (credentials: AccountRegisterDto) => Promise<void>;
  useRegister: (options?: MutationOptions<void, AccountRegisterDto>) => UseMutationResult<void, AxiosError<AccountRegisterErrorResponse>, AccountRegisterDto>;
}

export function createAuthQueryClient(axios: AxiosInstance): AuthQueryClient {
  return new AuthQueryClientImp(axios);
}

class AuthQueryClientImp {
  public constructor(private axios: AxiosInstance) {}

  public login = async (credentials: AccountLoginDto): Promise<User> => {
    return await this.axios
      .post(`/api/v1/accounts/login`,credentials)
      .then((response: AxiosResponse<User>) => {
        return response.data;
      });
  };

  public useLogin = (
    options?: MutationOptions<User, AccountLoginDto>
  ): UseMutationResult<User, AxiosError<AccountLoginErrorResponse>, AccountLoginDto> => {
    return useMutation<User, AxiosError<AccountLoginErrorResponse>, AccountLoginDto>(
      [QueryKeys.Login],
      (credentials: AccountLoginDto) => this.login(credentials),
      options
    );
  };

  public register = async (credentials: AccountRegisterDto): Promise<void> => {
    return await this.axios
      .post(`/api/v1/accounts/register`,credentials)
      .then((response: AxiosResponse<void>) => {
        return response.data;
      });
  };

  public useRegister = (
    options?: MutationOptions<void, AccountRegisterDto>
  ): UseMutationResult<void, AxiosError<AccountRegisterErrorResponse>, AccountRegisterDto> => {
    return useMutation<void, AxiosError<AccountRegisterErrorResponse>, AccountRegisterDto>(
      [QueryKeys.Register],
      (credentials: AccountRegisterDto) => this.register(credentials),
      options
    );
  };
}
