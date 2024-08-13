export interface Ingredient {
  ingredient: string;
  id: string;
}

export interface Instruction {
  children: { text: string }[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  loginAttempts: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  cookTime: number;
  prepTime: number;
  servings: number;
  difficulty: string;
  categories: Category;
  author: Author;
  createdAt: string;
  updatedAt: string;
}

// export interface Category {
//   id: string;
//   name: string;
//   slug: string;
//   description?: string;
// }

export interface User {
  name: string;
  email: string;
  password?: string; // For registration, not stored in production
  role: 'admin' | 'user';
}

export interface Comment {
  content: string;
  author: User;
  recipe: Recipe;
}
