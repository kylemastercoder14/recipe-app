"use client";

import React, { useEffect, useState } from "react";
import { ModeToggle } from "./theme-toggle";
import Logo from "./logo";
import SearchBar from "./searchbar";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { fetchArea, fetchCategories } from "@/lib/api";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

const MainNavbar = () => {
  const [areas, setAreas] = useState<{ strArea: string }[]>([]);
  const [categories, setCategories] = useState<{ strCategory: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const areasData = await fetchArea();
        setAreas(areasData);

        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <header className="relative top-0 w-full">
      <div className="flex items-center justify-between px-5 border-b shadow-lg">
        <Logo width={200} />
        <NavigationMenu className="ml-10 hidden md:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-transparent">
                Categories
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {categories.map((category) => (
                    <Link
                      key={category.strCategory}
                      title={category.strCategory}
                      href={`/categories/${encodeURIComponent(
                        category.strCategory
                      )}`}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      {category.strCategory}
                    </Link>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-transparent">
                Cuisine
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-4 lg:w-[600px]">
                  {areas.map((area) => (
                    <Link
                      key={area.strArea}
                      title={area.strArea}
                      href={`/areas/${encodeURIComponent(area.strArea)}`}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      {area.strArea}
                    </Link>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <div className="flex items-center gap-10">
              <NavigationMenuItem className="ml-5">
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink>About</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink>Contact</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/faq" legacyBehavior passHref>
                  <NavigationMenuLink>FAQs</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center justify-center gap-3">
          <div className="md:block hidden">
            <SearchBar
              color="black"
              border="border"
              background="bg-transparent"
            />
          </div>
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
          <Sheet key="left">
            <SheetTrigger asChild className="md:hidden block">
              <button className="focus:outline-none hover:opacity-90 transition">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
            </SheetTrigger>
            <SheetContent side="left">
              <NavigationMenu>
                <NavigationMenuList className="md:hidden flex flex-col mt-10">
                  <div className="flex flex-col gap-8 mr-6 mb-8">
                    <NavigationMenuItem className="ml-5">
                      <Link href="/about" legacyBehavior passHref>
                        <NavigationMenuLink>About</NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link href="/contact" legacyBehavior passHref>
                        <NavigationMenuLink>Contact</NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link href="/faq" legacyBehavior passHref>
                        <NavigationMenuLink>FAQs</NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </div>
                  <NavigationMenuItem className="mb-7">
                    <NavigationMenuTrigger className="bg-transparent hover:bg-transparent text-lg font-semibold text-black dark:text-white">
                      Categories
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 grid-cols-2 lg:w-[600px]">
                        {categories.map((category) => (
                          <Link
                            key={category.strCategory}
                            title={category.strCategory}
                            href={`/categories/${encodeURIComponent(
                              category.strCategory
                            )}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            {category.strCategory}
                          </Link>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="mb-4">
                    <NavigationMenuTrigger className="bg-transparent hover:bg-transparent text-lg font-semibold text-black dark:text-white -ml-12">
                      Cuisine
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 grid-cols-3 lg:w-[600px]">
                        {areas.map((area) => (
                          <Link
                            key={area.strArea}
                            title={area.strArea}
                            href={`/areas/${encodeURIComponent(area.strArea)}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            {area.strArea}
                          </Link>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <div className="md:hidden block mt-10">
                <SearchBar
                  color="black"
                  border="border"
                  background="bg-transparent"
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default MainNavbar;
