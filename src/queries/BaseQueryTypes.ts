import { AxiosError } from "axios";
import { QueryKey, UseMutationOptions, UseQueryOptions } from "react-query";

export type QueryOptions<TData> = UseQueryOptions<TData, AxiosError, TData, QueryKey>;

export type MutationOptions<TData, TProperties> = UseMutationOptions<
  TData,
  AxiosError,
  TProperties,
  unknown
>;
