import { useEffect, FC, memo } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Card, CardBody, Center, Container, FormControl, FormErrorMessage, Stack } from '@chakra-ui/react';
import PrimaryButton from '@/Components/Button/PrimaryButton';
import SFormLabel from '@/Components/Form/SFormLabel';
import SInput from '@/Components/Form/SInput';

const Register: FC = memo(() => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    return (
        <GuestLayout title="会員登録">
            <Head title="会員登録" />

            <Container>

                <Card>
                    <CardBody px={{ base: 8, lg: 32 }} py={16}>
                        <Stack spacing={12}>

                            <FormControl isInvalid={errors.name !== undefined} isRequired>
                                <SFormLabel>ユーザー名</SFormLabel>
                                <SInput
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    placeholder="10文字以内"
                                />
                                {errors.name !== undefined && (
                                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                                )}
                            </FormControl>

                            <FormControl isInvalid={errors.email !== undefined} isRequired>
                                <SFormLabel>Eメールアドレス</SFormLabel>
                                <SInput
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                    placeholder="example.gmail.com"
                                />
                                {errors.email !== undefined && (
                                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                                )}
                            </FormControl>

                            <FormControl isInvalid={errors.password !== undefined} isRequired>
                                <SFormLabel>パスワード</SFormLabel>
                                <SInput
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData("password", e.target.value)}
                                    placeholder="最低8文字以上"
                                />
                                {errors.password !== undefined && (
                                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                                )}
                            </FormControl>

                            <FormControl isInvalid={errors.password_confirmation !== undefined} isRequired>
                                <SFormLabel>パスワード(確認用)</SFormLabel>
                                <SInput
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData("password_confirmation", e.target.value)}
                                    placeholder="再度入力"
                                />
                                {errors.password_confirmation !== undefined && (
                                    <FormErrorMessage>{errors.password_confirmation}</FormErrorMessage>
                                )}
                            </FormControl>

                            <FormControl>
                                <PrimaryButton
                                    w="100%"
                                    loading={processing}
                                    disabled={processing}
                                    onClick={() => post(route("register"))}
                                >
                                    登録
                                </PrimaryButton>
                            </FormControl>

                        </Stack>
                    </CardBody>
                </Card>

                <Center mt={12}>
                    <Link
                        href={route("login")}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        既に会員登録はお済みですか？
                    </Link>
                </Center>
            </Container>

        </GuestLayout>
    );
});

export default Register;
