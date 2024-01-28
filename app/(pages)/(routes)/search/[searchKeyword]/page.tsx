"use client";

import { fetchSearchedMeal } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import PaginationControls from "@/components/pagination";
import { ChevronsRight, HomeIcon } from "lucide-react";
import Image from "next/image";

const SearchPage = ({
  params,
  searchParams,
}: {
  params: { searchKeyword: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [meals, setMeals] = useState<
    { strMeal: string; strMealThumb: string; idMeal: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const pageParam = searchParams["page"];
  const defaultPage = 1; // You can adjust this to your desired default page

  let currentPage: number;

  if (Array.isArray(pageParam)) {
    // Handle array case (use the first element)
    currentPage = parseInt(pageParam[0], 10) || defaultPage;
  } else {
    // Handle string case
    currentPage = parseInt(pageParam || "1", 10) || defaultPage;
  }
  const [currentPageState, setCurrentPage] = useState<number>(currentPage);
  const [totalPages, setTotalPages] = useState<number>(1);

  const searchKeyword = params.searchKeyword;
  const perPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mealsData = await fetchSearchedMeal(searchKeyword);
        const totalPages = Math.ceil(mealsData.length / perPage);
        setTotalPages(totalPages);

        const start = (currentPage - 1) * perPage;
        const end = start + perPage;

        const entries = mealsData.slice(start, end);
        setMeals(entries);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [searchKeyword, currentPage]);

  if (!isMounted) {
    return null;
  }

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
        <div className="bg-orange-500 gap-2 text-white flex w-full items-center px-10 mb-3 md:mb-10 py-5 rounded-md shadow-md">
          <Link href="/home">
            <HomeIcon />
          </Link>
          <ChevronsRight />
          <p className="text-xl font-bold capitalize">{searchKeyword}</p>
        </div>
        <section>
        {loading ? (
            <div className="flex justify-center items-center mt-10">
              <Skeleton className="w-60 bg-gray-300 dark:bg-zinc-800 h-40 shadow-md rounded-md" />
            </div>
          ) : meals.length === 0 ? (
            <div className="flex justify-center items-center mt-10">
              <p className="text-xl font-semibold">No results found for '{searchKeyword}'</p>
            </div>
          ) : (
            <div className="flex justify-center items-center mt-10 gap-x-4 md:gap-y-16 gap-y-10 flex-wrap">
              {meals.map((meal, index) => (
                <Link
                  href={`/meals/${meal.idMeal}`}
                  key={index}
                  className="flex flex-col items-center gap-3 md:w-80 w-44 h-44 md:h-80"
                >
                  <Image
                    src={meal.strMealThumb}
                    className="w-full h-full object-contain rounded-md"
                    alt={meal.strMeal}
                    width={500}
                    height={500}
                  />
                  <p className="capitalize text-center hidden md:block">
                    {meal.strMeal}
                  </p>
                </Link>
              ))}
            </div>
          )}
          <div className="mt-16">
            <PaginationControls
              label="search"
              currentPage={currentPage}
              totalPages={totalPages}
              category={searchKeyword}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default SearchPage;
