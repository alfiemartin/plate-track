import { cache } from 'react';

export const getServerContext = cache(() => ({
  user: 'name'
}));
