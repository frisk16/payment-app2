import { MethodApiProps } from "@/Fooks/Api/useMethod";
import { Method, MethodData, MethodError } from "@/types/api/Method";
import { Dispatch, SetStateAction } from "react";

export type MethodsPageProps = {
    year: number;
    methodProcessing: boolean;
    methodData: MethodData | null;
    methodError: MethodError | null;
    methods: Array<Method>;
    paymentsCounter: Array<{ id: number, count: number }>;
    resetData: () => void;
    resetError: () => void;
    setMethodData: Dispatch<SetStateAction<MethodData | null>>;
    addMethod: (props: MethodApiProps) => void;
    deleteMethod: (props: MethodApiProps) => void;
};