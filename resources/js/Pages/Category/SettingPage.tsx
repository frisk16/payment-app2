import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { FC } from "react";

type Props = {
    auth: PageProps['auth'];
};

const SettingPage: FC<Props> = (props) => {
    const { auth } = props;

    return (
        <AuthenticatedLayout user={auth.user} title="カテゴリー設定">
            <Head title="カテゴリー設定" />

            <h1>test</h1>
        </AuthenticatedLayout>
    )
};

export default SettingPage;