import { useEffect, FC, memo } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardBody, Container, FormControl, FormErrorMessage, Stack } from '@chakra-ui/react';
import PrimaryButton from '@/Components/Button/PrimaryButton';
import DefaultLayout from '@/Layouts/DefaultLayout';
import SFormLabel from '@/Components/Form/SFormLabel';
import SInput from '@/Components/Form/SInput';

type Props = {
    token: string;
    email: string;
};

const ResetPassword: FC<Props> = memo((props) => {
    const { token, email } = props;

    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    return (
        <DefaultLayout>
            <Head title="Reset Password" />

            <Container>
                <Card>
                    <CardBody px={{ base: 8, lg: 32 }} py={16}>
                        <Stack spacing={12}>

                            <FormControl isInvalid={errors.email !== undefined}>
                                <SFormLabel>Eメールアドレス</SFormLabel>
                                <SInput
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                />
                                {errors.email !== undefined && (
                                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                                )}
                            </FormControl>

                            <FormControl isInvalid={errors.password !== undefined}>
                                <SFormLabel>新しいパスワード</SFormLabel>
                                <SInput
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData("password", e.target.value)}
                                />
                                {errors.password !== undefined && (
                                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                                )}
                            </FormControl>

                            <FormControl isInvalid={errors.password_confirmation !== undefined}>
                                <SFormLabel>パスワード(確認用)</SFormLabel>
                                <SInput
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData("password_confirmation", e.target.value)}
                                />
                                {errors.password_confirmation !== undefined && (
                                    <FormErrorMessage>{errors.password_confirmation}</FormErrorMessage>
                                )}
                            </FormControl>

                            <FormControl>
                                <PrimaryButton
                                    onClick={() => post(route("password.store"))}
                                    w="100%"
                                    loading={processing}
                                    disabled={processing}
                                >
                                    パスワード再設定
                                </PrimaryButton>
                            </FormControl>

                        </Stack>
                    </CardBody>
                </Card>
            </Container>


        </DefaultLayout>
    );
});

export default ResetPassword;
