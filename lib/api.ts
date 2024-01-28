import axios from "axios";

export const fetchCategories = async () => {
    try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
        return response.data.categories;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

export const fetchByCategory = async (category: string) => {
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        return response.data.meals
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

export const fetchAreaMeal = async (area: string) => {
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        return response.data.meals;
    } catch (error) {
        console.error(`Error fetching ${area} meals:`, error);
        throw error;
    }
};

export const fetchArea = async () => {
    try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
        return response.data.meals;
    } catch (error) {
        console.error(`Error fetching area:`, error);
        throw error;
    }
};

export const fetchSingleMeal = async (mealId: string) => {
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        return response.data.meals;
    } catch (error) {
        console.error(`Error fetching area:`, error);
        throw error;
    }
};

export const fetchSearchedMeal = async (mealName: string) => {
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
        return response.data.meals;
    } catch (error) {
        console.error(`Error fetching meals:`, error);
        throw error;
    }
};

export const fetchRandomMeals = async () => {
    try {
        const requests = Array.from({ length: 30 }, () =>
            fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        );

        const responses = await Promise.all(requests);
        const mealData = await Promise.all(responses.map((response) => response.json()));

        const meals = mealData.map((data) => data.meals && data.meals[0]);
        return meals.filter((meal) => meal);
    } catch (error) {
        console.error("Error fetching random meals:", error);
        throw error;
    }
};