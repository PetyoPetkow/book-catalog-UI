import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface QueryClientWrapperProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const ReactQueryWrapper: FC<QueryClientWrapperProps> = (props: QueryClientWrapperProps) => {
  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
};

export default ReactQueryWrapper;
