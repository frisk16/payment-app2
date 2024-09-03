import useMessage from "@/Fooks/useMessage";
import { Category, CategoryData, CategoryError } from "@/types/api/Category";
import axios from "axios";
import { useCallback, useState } from "react";

export type CategoryApiProps = {
    id?: number;
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
    const [updateCount, setUpdateCount] = useState(0);
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
        const { categories = null, categoryData = null } = props;

        setCategoryProcessing(true);
        axios.post(route("categories.store"), {
            categories,
            categoryData
        })
        .then((res) => {
            if (res.data.errors) {
                getMessage({ title: "入力内容に誤りがあります", status: "warning" });
                setCategoryError({
                    name: res.data.errors.name ?? "",
                });
            } else {
                setCategories([...categories!, res.data.category]);
                setUpdateCount((cnt) => cnt + 1);
                getMessage({ title: "カテゴリーを追加しました", status: "success" });
                resetData();
                resetError();
            }
        })
        .catch((err) => {
            getMessage({ title: "追加時にエラー発生", status: "error" });
            console.log(err);
        })
        .finally(() => setCategoryProcessing(false));
    }, []);

    const deleteCategory = useCallback((props: CategoryApiProps) => {
        const { id = null, categories = null } = props;

        setCategoryProcessing(true);
        axios.put(route("categories.destroy", {category_id: id}))
            .then((res) => {
                getMessage({ title: `「${res.data.name}」を削除しました`, status: "success" });
                const newCategories = categories!.filter((data) => data.id !== id);
                setCategories(newCategories);
                setUpdateCount((cnt) => cnt + 1);
            })
            .catch((err) => {
                getMessage({ title: "削除中にエラー発生", status: "error" });
                console.log(err);
            })
            .finally(() => setCategoryProcessing(false));
    }, []);

    return {
        categoryProcessing,
        categoryData,
        categoryError,
        categories,
        updateCount,
        resetData,
        resetError,
        setCategoryData,
        getCategories,
        addCategory,
        deleteCategory
    };
};

export default useCategory;