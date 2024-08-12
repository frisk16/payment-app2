import { Category, CategoryData, CategoryError } from "@/types/api/Category";
import { Dispatch, SetStateAction } from "react";

export type CategoriesPageProps = {
    categoryProcessing: boolean;
    categoryData: CategoryData | null;
    categoryError: CategoryError | null;
    categories: Array<Category>;
    setCategoryData: Dispatch<SetStateAction<CategoryData | null>>
};