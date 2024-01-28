"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { fetchAreaMeal, fetchCategories, fetchRandomMeals } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const HomePage = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<
    { strCategory: string; strCategoryThumb: string }[]
  >([]);
  const [areaMeal, setAreaMeal] = useState<
    { strMealThumb: string; idMeal: string; strMeal: string }[]
  >([]);
  const [randomMeals, setRandomMeals] = useState<
    { strMealThumb: string; idMeal: string; strMeal: string, strCategory: string; }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);

        const areaMealData = await fetchAreaMeal("Filipino");
        setAreaMeal(areaMealData);

        const randomMealsData = await fetchRandomMeals();
        setRandomMeals(randomMealsData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col px-20 py-20">
      <div className="flex items-center justify-center gap-20">
        <div className="flex flex-col">
          <h1 className="text-5xl font-bold leading-snug">
            Huge selection of delicious <br />
            recipe ideas
          </h1>
          <p className="mt-5 font-normal text-xl">
            Explore our huge selection of delicious recipe ideas including: easy
            desserts, vegan, meats, <br /> vegetarian dinner ideas, gorgeous
            pasta recipes, quick bakes, family-friendly meals and gluten-free
            recipes.
          </p>
          <p className="mt-10 text-xl text-zinc-600 dark:text-zinc-300 font-bold">Download the App Now</p>
          <div className="flex items-center mt-5 md:-ml-4 -ml-2">
            <Link href={"https://play.google.com/store/apps/details?id=com.globaltelehealth.konsultamd&pli=1"} target="_blank">
              <Image src="/images/playstore.png" className="md:w-60 w-[100px]" width={500} height={500} alt="" />
            </Link>
            <Link href={"https://play.google.com/store/apps/details?id=com.globaltelehealth.konsultamd&pli=1"} target="_blank">
              <Image src="/images/app-store.png" className="md:w-60 w-[100px]" width={500} height={500} alt="" />
            </Link>
            <Link href={"https://play.google.com/store/apps/details?id=com.globaltelehealth.konsultamd&pli=1"} target="_blank">
              <Image src="/images/app-gallery.png" className="md:w-[200px] w-[85px] ml-3" width={500} height={500} alt="" />
            </Link>
          </div>
        </div>
        <div className="md:block hidden">
          <Image src="/images/hero-image.png" width={500} height={500} alt="" />
        </div>
      </div>
      <Carousel
        opts={{ align: "start", loop: true }}
        plugins={[Autoplay({ delay: 2000 })]}
        className="flex items-center justify-center w-full mt-16 px-5"
      >
        <CarouselContent>
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="p-4">
                  <Skeleton className="w-60 bg-gray-300 dark:bg-zinc-800 h-40 shadow-md rounded-md" />
                  <Skeleton className="w-60 mt-3 bg-gray-300 dark:bg-zinc-800 shadow-md h-10" />
                </div>
              ))
            : categories.map((category, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 lg:basis-1/6"
                >
                  <Link href={`/categories/${encodeURIComponent(category.strCategory)}`} className="flex flex-col items-center gap-3 hover:scale-110 transition">
                    <Image
                      src={category.strCategoryThumb}
                      className="w-60 h-40 object-contain rounded-md"
                      width={500}
                      height={500}
                      alt={category.strCategory}
                    />
                    <p className="capitalize">{category.strCategory}</p>
                  </Link>
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <section className="mt-40">
        <p className="text-3xl font-bold">Latest Recipe</p>
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 2000 })]}
          className="flex items-center justify-center w-full mt-5 px-5"
        >
          <CarouselContent>
            {loading
              ? Array.from({ length: 30 }).map((_, index) => (
                  <div key={index} className="p-4">
                    <Skeleton className="w-80 bg-gray-300 h-80 dark:bg-zinc-800 shadow-md rounded-md" />
                    <Skeleton className="w-80 mt-3 bg-gray-300 dark:bg-zinc-800 shadow-md h-10" />
                  </div>
                ))
              : randomMeals.map((meal, index) => (
                  <CarouselItem key={index} className="pl-1 lg:basis-1/5">
                    <Link href={`/meals/${meal.idMeal}`} className="relative flex flex-col items-center gap-3 hover:scale-105 transition">
                      <Image
                        src={meal.strMealThumb}
                        className="w-80 h-80 object-contain rounded-md shadow-lg"
                        alt={meal.strMeal}
                        width={500}
                        height={500}
                      />
                      <Badge variant={"destructive"} className="absolute top-0 right-0 my-3 mx-5">{meal.strCategory}</Badge>
                      <p className="text-center capitalize">{meal.strMeal}</p>
                    </Link>
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
      <section className="mt-40">
        <p className="text-3xl font-bold">Filipino Recipes</p>
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 3000 })]}
          className="flex items-center justify-center w-full mt-5 px-5"
        >
          <CarouselContent>
            {loading
              ? Array.from({ length: 30 }).map((_, index) => (
                  <div key={index} className="p-4">
                    <Skeleton className="w-80 bg-gray-300 h-80 dark:bg-zinc-800 shadow-md rounded-md" />
                    <Skeleton className="w-80 mt-3 bg-gray-300 dark:bg-zinc-800 shadow-md h-10" />
                  </div>
                ))
              : areaMeal.map((meal, index) => (
                  <CarouselItem key={index} className="pl-1 lg:basis-1/5">
                    <Link href={`/meals/${meal.idMeal}`} className="flex flex-col items-center gap-3 hover:scale-105 transition">
                      <Image
                        src={meal.strMealThumb}
                        className="w-80 h-80 object-contain rounded-md shadow-lg"
                        alt={meal.strMeal}
                        width={500}
                        height={500}
                      />
                      <p className="text-center capitalize">{meal.strMeal}</p>
                    </Link>
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
      <div className="mt-28">
        <div className="flex items-center justify-center flex-col">
          <Image src="/images/publish-recipe.png" width={500} height={500} alt="recipe image" />
          <div className="flex items-center gap-5 justify-center mt-10">
            <h3 className="font-bold md:text-3xl text-2xl text-center">Publish your recipe for FREE today</h3>
            <div>|</div>
            <div className="flex items-center justify-center">
              <h3>Powered by &nbsp; </h3>
              <Image src="/images/meal-db.png" width={200} height={200} alt="mealdb api" />
              <Badge variant="destructive">API</Badge>
            </div>
          </div>
          <p className="font-semibold mt-5 md:text-lg text-sm text-center md:px-60 px-0">Are you passionate about cooking and love sharing your culinary creations? Look no further! Recipe App is the ultimate destination for food enthusiasts to share, discover, and savor an extensive array of delectable recipes from around the world.</p>
          <Button className="mt-5" onClick={() => router.push("/submit")}>Submit Recipe</Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
