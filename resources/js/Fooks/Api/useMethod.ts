import useMessage from "@/Fooks/useMessage";
import { Method, MethodData, MethodError } from "@/types/api/Method";
import axios from "axios";
import { useCallback, useState } from "react";

export type MethodApiProps = {
    id?: number;
    methods?: Array<Method>;
    methodData?: MethodData | null;
};

const useMethod = () => {
    const [methodData, setMethodData] = useState<MethodData | null>({
        image: "",
        name: "",
    });
    const [methodError, setMethodError] = useState<MethodError | null>({
        image: "",
        name: "",
    })
    const [methodProcessing, setMethodProcessing] = useState(false);
    const [methods, setMethods] = useState<Array<Method>>([]);
    const { getMessage } = useMessage();

    const resetData = useCallback(() => {
        setMethodData({
            image: "",
            name: "",
        });
    }, []);

    const resetError = useCallback(() => {
        setMethodError({
            image: "",
            name: "",
        });
    }, []);

    const getMethods = useCallback(() => {
        setMethodProcessing(true);
        axios.get(route("methods.get"))
            .then((res) => {
                setMethods(res.data.methods);
            })
            .catch((err) => {
                getMessage({ title: "決済データを取得できません", status: "error" });
                console.log(err);
            })
            .finally(() => setMethodProcessing(false));
    }, []);

    const addMethod = useCallback((props: MethodApiProps) => {
        const { methodData = null, methods = null } = props;

        setMethodProcessing(true);
        axios.post(route("methods.store"), {
            methodData
        })
        .then((res) => {
            if (res.data.errors) {
                getMessage({ title: "入力内容に誤りがあります", status: "warning" });
                setMethodError({
                    image: res.data.errors.image,
                    name: res.data.errors.name,
                });
            } else {
                setMethods([...methods!, res.data.method])
                getMessage({ title: "決済データを追加しました", status: "success" });
            }
        })
        .catch((err) => {
            getMessage({ title: "追加時にエラー発生", status: "error" });
            console.log(err);
        })
        .finally(() => setMethodProcessing(false));
    }, []);

    const deleteMethod = useCallback((props: MethodApiProps) => {
        const { id = null, methods = null } = props;

        setMethodProcessing(true);
        axios.put(route("methods.destroy", {id}))
            .then((res) => {
                getMessage({ title: `「${res.data.name}」を削除しました`, status: "success" });
                const newMethods = methods!.filter((data) => data.id !== id);
                setMethods(newMethods);
            })
            .catch((err) => {
                getMessage({ title: "削除中にエラー発生", status: "error" });
                console.log(err);
            })
            .finally(() => setMethodProcessing(false));
    }, []);

    return {
        methodProcessing,
        methodData,
        methodError,
        methods,
        resetData,
        resetError,
        setMethodData,
        getMethods,
        addMethod,
        deleteMethod
    };
};

export default useMethod;