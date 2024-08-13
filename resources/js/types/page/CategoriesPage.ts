import { Category, CategoryData, CategoryError } from "@/types/api/Category";
import { Dispatch, SetStateAction } from "react";

export type CategoriesPageProps = {
    year: number;
    categoryProcessing: boolean;
    categoryData: CategoryData | null;
    categoryError: CategoryError | null;
    categories: Array<Category>;
    resetData: () => void;
    resetError: () => void;
    setCategoryData: Dispatch<SetStateAction<CategoryData | null>>
};