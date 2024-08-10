import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FC, memo } from 'react';
import { Card, CardBody, Stack } from '@chakra-ui/react';

type Props = {
    auth: PageProps["auth"];
    mustVerifyEmail: boolean;
    status: string;
};

const Edit: FC<Props> = memo((props) => {
    const { auth, mustVerifyEmail, status } = props;

    return (
        <AuthenticatedLayout user={auth.user} title="マイページ">
            <Head title="マイページ" />

            <Stack spacing={8}>
                <Card>
                    <CardBody >
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            user={auth.user}
                        />
                    </CardBody>
                </Card>

                <Card>
                    <CardBody>
                        <UpdatePasswordForm />
                    </CardBody>
                </Card>

                <Card>
                    <CardBody>
                        <DeleteUserForm />
                    </CardBody>
                </Card>
            </Stack>

        </AuthenticatedLayout>
    );
});

export default Edit;
