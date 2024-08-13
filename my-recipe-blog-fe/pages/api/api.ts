import axiosInstance from '../../utils/axiosInstance';
import { Recipe, Category } from '../../types/types';
import axios from 'axios';

export const fetchRecipes = async (): Promise<Recipe[]> => {
  const response = await axiosInstance.get('/recipes');
  return response.data;
};

export const fetchCategories = async (): Promise<Category[]> => {
  console.log('Fetching categories');
  let token;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.get('http://localhost:3000/api/categories', {
    headers: headers,
  });
  return response.data;
};

export const fetchRecipeById = async (id: string): Promise<Recipe> => {
  const response = await axiosInstance.get(`/recipes/${id}`);
  return response.data;
};
