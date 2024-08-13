import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '../utils/axiosInstance'; // Ensure the path is correct
import { Recipe, Category } from '../types/types';
import styles from '../styles/Home.module.css'; // Import CSS module
import { GetServerSideProps } from 'next';

interface HomeProps {
  initialRecipes: Recipe[];
  initialCategories: Category[];
}

const Home: React.FC<HomeProps> = ({ initialRecipes, initialCategories }) => {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      const user = window.localStorage.getItem('token');
      console.log('User retrieved from localStorage:', user);
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push('/auth/login');
      }
    };

    checkAuthentication();
  }, [router]);

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    router.push('/auth/login');
  };

  const handleRecipeClick = (recipeId: string) => {
    router.push(`/recipes/${recipeId}`);
  };

  if (isAuthenticated === null) {
    return <div>Loading...</div>; 
  }

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <div className={styles.container}>
      <button onClick={handleLogout}>Logout</button>
      <h1 className={styles.title}>Featured Recipes</h1>
      <div className={styles.recipes}>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              key={recipe.id}
              className={styles.recipeCard}
              onClick={() => handleRecipeClick(recipe.id)}
            >
              <h2 className={styles.recipeTitle}>{recipe.title}</h2>
              <p>
                <strong>Cook Time:</strong> {recipe.cookTime} minutes
              </p>
              <p>
                <strong>Prep Time:</strong> {recipe.prepTime} minutes
              </p>
            </div>
          ))
        ) : (
          <p>No recipes available.</p>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    console.log('Fetching initial recipes and categories...');
    const [recipesResponse, categoriesResponse] = await Promise.all([
      axiosInstance.get('/recipes'),
      axiosInstance.get('/categories'),
    ]);

    return {
      props: {
        initialRecipes: recipesResponse.data.docs,
        initialCategories: categoriesResponse.data.docs,
      },
    };
  } catch (error) {
    console.error('Error fetching initial data:', error);
    return {
      props: {
        initialRecipes: [],
        initialCategories: [],
      },
    };
  }
};

export default Home;
