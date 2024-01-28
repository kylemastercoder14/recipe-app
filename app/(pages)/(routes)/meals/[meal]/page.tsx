"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Autoplay from "embla-carousel-autoplay";
import { fetchRandomMeals, fetchSingleMeal } from "@/lib/api";
import { CheckCircle, Copy, Heart, PrinterIcon, Share } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const SingleMeal = ({
  params,
  searchParams,
}: {
  params: { meal: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [meals, setMeals] = useState<
    {
      strMeal: string;
      strMealThumb: string;
      idMeal: number;
      strCategory: string;
      strYoutube: string;
      strTags: string;
      strInstructions: string;
      strSource: string;
    }[]
  >([]);
  const [randomMeals, setRandomMeals] = useState<
    {
      strMealThumb: string;
      idMeal: string;
      strMeal: string;
      strCategory: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Logic to copy the link
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  const handlePrint = () => {
    window.print();
  };

  const mealId = params.meal;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mealsData = await fetchSingleMeal(mealId);
        setMeals(mealsData);

        const randomMealsData = await fetchRandomMeals();
        setRandomMeals(randomMealsData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [mealId]);

  return (
    <>
      <div className="bg-[url('/images/header_image.jpg')] relative md:px-[500px] px-5 w-full h-[40vh] bg-cover bg-no-repeat flex flex-col items-center justify-center">
        <h1 className="font-bold text-3xl text-white mt-5 text-center">
          What are your favorite cuisines?
        </h1>
        <p className="font-normal text-white mt-3 text-center">
          PERSONALIZE YOUR EXPERIENCE
        </p>
      </div>
      <div className="flex flex-col md:px-20 px-5 py-10">
        <p className="text-3xl font-bold">Meal Details</p>
        {meals.map((meal, index) => (
          <Card className="mt-10 dark:bg-zinc-800/90 bg-gray-100 shadow-lg" key={index}>
            <CardContent>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-10 md:p-10 p-5">
                <Image src={meal.strMealThumb} className="rounded-md" alt={meal.strMeal} width={800} height={500} />
                <div className="flex flex-col">
                  <h3 className="md:text-3xl text-2xl font-bold border-b flex border-zinc-600 dark:border-zinc-300 pb-2 md:pb-5">
                    {meal.strMeal}
                    <Button
                      variant={"ghost"}
                      className="rounded-full flex items-center"
                      onClick={handleCopy}
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2 text-emerald-700 dark:text-emerald-500" />
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                        </>
                      )}
                    </Button>
                  </h3>
                  <Link
                    href={meal.strSource}
                    target="_blank"
                    className="mt-5 md:text-xl text-md"
                  >
                    <b>Source:</b>{" "}
                    <span className="underline text-center">{meal.strSource}</span>
                  </Link>
                  <p className="md:text-xl text-md mt-5">
                    <b>Category: </b>
                    {meal.strCategory}
                  </p>
                  <p className="mt-5 md:text-xl text-md">
                    <b>Tags: </b>
                    {meal.strTags === null
                      ? "N/A"
                      : meal.strTags.split(",").map((tag, index) => (
                          <React.Fragment key={index}>
                            {tag.trim()}
                            {""}
                            {/* Trim any leading or trailing spaces */}
                            {index < meal.strTags.split(",").length - 1 && ", "}
                            {""}
                            {/* Add a comma and space if it's not the last tag */}
                          </React.Fragment>
                        ))}
                  </p>
                  <div className="bg-zinc-300 dark:bg-zinc-700 rounded-lg p-5 mt-5">
                    <h4 className="text-xl font-bold mb-3">Ingredients:</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {Array.from({ length: 20 }, (_, index) => {
                        //@ts-ignore
                        const ingredient = meal[`strIngredient${index + 1}`];
                        // @ts-ignore
                        const measure = meal[`strMeasure${index + 1}`];
                        if (ingredient) {
                          return (
                            <div key={index} className="flex items-center">
                              <CheckCircle className="w-4 h-4 mr-3 dark:text-emerald-500 text-emerald-600" />
                              <span>
                                {ingredient} - {measure}
                              </span>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-zinc-300 dark:bg-zinc-700 rounded-lg p-5 mt-5">
                <h4 className="text-xl font-bold mb-3">Instructions:</h4>
                <div className="flex flex-col gap-3">
                  {meal.strInstructions
                    .split(/\d+\.\s/)
                    .map((instruction, index) => {
                      if (!instruction.trim()) return null;
                      return (
                        <div key={index}>
                          <span className="font-bold">Step {index + 1}:</span>{" "}
                          {instruction}
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="mt-5">
                {/* i want a video tag here */}
                <h4 className="text-xl font-bold mb-3">Watch Video:</h4>
                <iframe
                  width="100%"
                  height="800"
                  src={meal.strYoutube.replace("watch?v=", "embed/")}
                  title={meal.strMeal}
                  allowFullScreen
                ></iframe>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <section className="mt-10 px-20 pb-10">
        <p className="text-3xl font-bold">Featured Recipe</p>
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
                  <CarouselItem key={meal.idMeal} className="pl-1 lg:basis-1/5">
                    <Link
                      href={`/meals/${meal.idMeal}`}
                      className="relative flex flex-col items-center gap-3"
                      key={index}
                    >
                      <Image
                        src={meal.strMealThumb}
                        className="w-80 h-80 object-contain rounded-md shadow-lg"
                        alt={meal.strMeal}
                        width={500}
                        height={500}
                      />
                      <Badge
                        variant={"destructive"}
                        className="absolute top-0 right-0 my-3 mx-5"
                      >
                        {meal.strCategory}
                      </Badge>
                      <p className="text-center capitalize">{meal.strMeal}</p>
                    </Link>
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </>
  );
};

export default SingleMeal;
