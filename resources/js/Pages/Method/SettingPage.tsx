import MethodSettingPageMain from "@/Components/Main/MethodSettingPageMain";
import useMethod from "@/Fooks/Api/useMethod";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { FC, useEffect } from "react";

type Props = {
    auth: PageProps['auth'];
    year: number;
    paymentsCounter: Array<{ id: number, count: number }>;
};

const SettingPage: FC<Props> = (props) => {
    const { auth, year, paymentsCounter } = props;

    const {
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
    } = useMethod();

    useEffect(() => getMethods(), []);

    return (
        <AuthenticatedLayout user={auth.user} title="決済方法設定">
            <Head title="決済方法設定" />

            <MethodSettingPageMain
                year={year}
                methodProcessing={methodProcessing}
                methodData={methodData}
                methodError={methodError}
                methods={methods}
                paymentsCounter={paymentsCounter}
                resetData={resetData}
                resetError={resetError}
                setMethodData={setMethodData}
                addMethod={addMethod}
                deleteMethod={deleteMethod}
            />
            
        </AuthenticatedLayout>
    )
};

export default SettingPage;