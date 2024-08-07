import { TItem } from '../types';
import apiClient from './axiosConfig';

export const getInventory = (): Promise<TItem[]> => apiClient.get('/inventory').then(result => result?.data);

export const updateInventory = (data: TItem[]) => apiClient.post('/inventory', data);

export const resetInventory = () => apiClient.post('/inventory/reset');
