import useMessage from "@/Fooks/useMessage";
import { Category, CategoryData, CategoryError } from "@/types/api/Category";
import axios from "axios";
import { useCallback, useState } from "react";

export type CategoryApiProps = {
    categories?: Array<Category>;
    categoryData?: CategoryData | null;
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

    const resetData = useCallback(() => {
        setCategoryData({
            name: "",
        });
    }, []);

    const resetError = useCallback(() => {
        setCategoryError({
            name: "",
        });
    }, []);

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

    const addCategory = useCallback((props: CategoryApiProps) => {
        const { categoryData } = props;

        setCategoryProcessing(true);
        axios.post(route("categories.store"), {
            categoryData
        })
        .then((res) => {
            if (res.data.errors) {
                getMessage({ title: "入力内容に誤りがあります", status: "warning" });
                setCategoryError({
                    name: res.data.errors.name,
                });
                setCategoryProcessing(false);
            } else {
                getMessage({ title: "カテゴリー追加中...", status: "success" });
                setTimeout(() => {
                    location.reload();
                }, 1500);
            }
        })
        .catch((err) => {
            getMessage({ title: "追加時にエラー発生", status: "error" });
            console.log(err);
            setCategoryProcessing(false);
        });
    }, []);

    return {
        categoryProcessing,
        categoryData,
        categoryError,
        categories,
        resetData,
        resetError,
        setCategoryData,
        getCategories,
        addCategory,
    };
};

export default useCategory;