"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "@/components/file-upload";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  recipeName: z.string().min(1, {
    message: "Recipe name is required.",
  }),
  instruction: z.string().min(1, {
    message: "Instruction is required.",
  }),
  ingredient: z.string().min(1, {
    message: "Ingredient is required.",
  }),
  imageUrl: z.string().min(1, {
    message: "Image is required.",
  }),
  videoUrl: z.string().min(1, {
    message: "Video URL is required.",
  }),
  source: z.string().min(1, {
    message: "Source is required.",
  }),
  location: z.string({
    required_error: "Please select a location."
  }),
  category: z.string({
    required_error: "Please select a category."
  }),
});

const SubmitRecipe = () => {
  const [categories, setCategories] = useState<{ strCategory: string }[]>([]);
  const [area, setArea] = useState<{ strArea: string }[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Make a GET request to the MealDB API to fetch categories
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        const { categories } = response.data;

        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchArea = async () => {
      try {
        // Make a GET request to the MealDB API to fetch categories
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
        );
        const { meals } = response.data;

        setArea(meals);
      } catch (error) {
        console.error("Error fetching area:", error);
      }
    };
    fetchArea();
  }, []);

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipeName: "",
      instruction: "",
      ingredient: "",
      imageUrl: "",
      location: "",
      category: "",
      source: "",
      videoUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const {location, category, ...otherValues} = values;
      const dataToSend = {...otherValues, location, category};

      await axios.post("/api/recipes", dataToSend);

      form.reset();
      router.refresh();
      toast({
        description: "Recipe submitted successfully",
        variant: "success"
      });

      setSelectedLocation("");
      setSelectedCategory("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center py-10 w-full">
      <h3 className="font-bold text-3xl text-center">Submit your recipe</h3>
      <p className="font-normal text-md text-center">
        Share your amazing recipes with thousands of web developers across the
        world. Fill our form to get started.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex items-center justify-center text-center mt-5">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileUpload
                      endPoint="recipeImage"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-6 w-full">
            <FormField
              control={form.control}
              name="recipeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Recipe Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="bg-zinc-300/50 dark:bg-zinc-800 md:w-[700px] w-full border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      placeholder="Enter recipe name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ingredient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Ingredients
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="bg-zinc-300/50 dark:bg-zinc-800 md:w-[700px] w-full border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      placeholder="Enter ingredient"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Source
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="bg-zinc-300/50 dark:bg-zinc-800 md:w-[700px] w-full border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      placeholder="Enter source e.g https://panlasangpinoy.com/pork-steak-recip/"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Video URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="bg-zinc-300/50 dark:bg-zinc-800 md:w-[700px] w-full border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      placeholder="Enter source e.g https://www.youtube.com/watch?v=4iBw9KXQ5hQ"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Location
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} disabled={isLoading} defaultValue={selectedLocation}>
                      <SelectTrigger className="bg-zinc-300/50 dark:bg-zinc-800 md:w-[700px] w-full border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0">
                        <SelectValue placeholder="Select a location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Location</SelectLabel>
                          {area &&
                            area.map((loc) => (
                              <SelectItem key={loc.strArea} value={loc.strArea}>
                                {loc.strArea}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Category
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={selectedCategory} disabled={isLoading}>
                      <SelectTrigger className="bg-zinc-300/50 dark:bg-zinc-800 md:w-[700px] w-full border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Category</SelectLabel>
                          {categories.map((category) => (
                            <SelectItem
                              key={category.strCategory}
                              value={category.strCategory}
                            >
                              {category.strCategory}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instruction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Instructions
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      className="bg-zinc-300/50 dark:bg-zinc-800 md:w-[700px] w-full border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      placeholder="Enter instruction"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="float-right" disabled={isLoading}>
              Submit Recipe
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SubmitRecipe;
