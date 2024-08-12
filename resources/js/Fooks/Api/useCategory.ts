import useMessage from "@/Fooks/useMessage";
import { Category, CategoryData, CategoryError } from "@/types/api/Category";
import axios from "axios";
import { useCallback, useState } from "react";

export type CategoryApiProps = {
    categoryData: CategoryData | null;
};

const useCategory = () => {

    const [categoryData, setCategoryData] = useState<CategoryData | null>({
        name: "",
    });
    const [categoryError, setCategoryError] = useState<CategoryError | null>({
        name: "",
    })
    const [categoryProcessing, setCategoryProcessing] = useState(false);
    const [categories, setCategories] = useState<Array<Category>>([]);
    const { getMessage } = useMessage();

    const getCategories = useCallback(() => {
        setCategoryProcessing(true);
        axios.get(route("categories.get"))
            .then((res) => {
                setCategories(res.data.categories);
            })
            .catch((err) => {
                getMessage({ title: "カテゴリーを取得できません", status: "error" });
                console.log(err);
            })
            .finally(() => setCategoryProcessing(false));
    }, []);

    return {
        categoryProcessing,
        categoryData,
        categoryError,
        categories,
        setCategoryData,
        getCategories
    };
};

export default useCategory;