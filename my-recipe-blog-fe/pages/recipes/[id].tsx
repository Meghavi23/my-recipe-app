import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { Recipe } from '../../types/types';
import styles from '../../styles/Home.module.css';

const RecipeDescription: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (id) {
        try {
          const response = await axiosInstance.get(`/recipes/${id}`);
          setRecipe(response.data);
        } catch (error) {
          console.error('Error fetching recipe:', error);
        }
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <p>
        <strong>Cook Time:</strong> {recipe.cookTime} minutes
      </p>
      <p>
        <strong>Prep Time:</strong> {recipe.prepTime} minutes
      </p>
      <p>
        <strong>Ingredients:</strong>
      </p>
      <ul>
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.ingredient}</li>
        ))}
      </ul>
      <p>
        <strong>Instructions:</strong>
      </p>
      <ul>
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>
            {instruction.children.map((child) => child.text).join(' ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeDescription;
