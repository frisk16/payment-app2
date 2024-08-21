import { CategoryApiProps } from "@/Fooks/Api/useCategory";
import { Category, CategoryData, CategoryError } from "@/types/api/Category";
import { Dispatch, SetStateAction } from "react";

export type CategoriesPageProps = {
    year: number;
    categoryProcessing: boolean;
    categoryData: CategoryData | null;
    categoryError: CategoryError | null;
    categories: Array<Category>;
    paymentsCounter: Array<{ id: number, count: number }>;
    resetData: () => void;
    resetError: () => void;
    setCategoryData: Dispatch<SetStateAction<CategoryData | null>>;
    addCategory: (props: CategoryApiProps) => void;
};