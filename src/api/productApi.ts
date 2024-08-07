import { TProduct } from '../types';
import apiClient from './axiosConfig';

export const getAllProducts = (): Promise<TProduct[]> => apiClient.get('/product/all').then(result => result?.data);

export const putNewProduct = (name: string) => apiClient.put('/product', { name });
