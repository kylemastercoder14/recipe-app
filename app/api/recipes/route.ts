import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
    try {
        const { recipeName, instruction, ingredient, imageUrl, location, category, source, videoUrl } = await req.json();
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const recipes = await db.recipe.create({
            data: {
                profileId: profile.id,
                name: recipeName,
                imageUrl: imageUrl,
                instructions: instruction,
                ingredients: ingredient,
                location: location,
                category: category,
                source: source,
                videoUrl: videoUrl
            }
        });

        return NextResponse.json(recipes);
    } catch (error) {
        console.log("[RECIPE_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
};
