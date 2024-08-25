import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Heading } from "@chakra-ui/react";
import { Head } from "@inertiajs/react";
import { FC } from "react";

type Props = {
    auth: PageProps['auth'];
    year: number;
    paymentsCounter: Array<{ id: number, count: number }>;
};

const SettingPage: FC<Props> = (props) => {
    const { auth, year, paymentsCounter } = props;

    return (
        <AuthenticatedLayout user={auth.user} title="決済方法設定">
            <Head title="決済方法設定" />

            <Heading size="md">準備中</Heading>
        </AuthenticatedLayout>
    )
};

export default SettingPage;