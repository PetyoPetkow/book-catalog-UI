export interface User {
  email: string,
  username: string,
} 

export interface AccountLoginDto {
  email: string,
  password: string,
}

export interface AccountRegisterDto {
  email: string,
  username: string,
  password: string,
}

export interface AccountLoginErrorResponse {
  errorMessage?: string;
}

export interface AccountRegisterErrorResponse {
  email?: string;
  username?: string;
  password?: string;
  errorMessage?: string;
}