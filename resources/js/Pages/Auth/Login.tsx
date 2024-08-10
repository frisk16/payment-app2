import PrimaryButton from "@/Components/Button/PrimaryButton";
import SCheckbox from "@/Components/Form/SCheckbox";
import SFormLabel from "@/Components/Form/SFormLabel";
import SInput from "@/Components/Form/SInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Card, CardBody, Center, Container, FormControl, FormErrorMessage, Stack } from "@chakra-ui/react";
import { Head, Link, useForm } from "@inertiajs/react";
import { FC, memo, useEffect } from "react";

type Props = {
    status?: string;
    canResetPassword: boolean;
};

const Login: FC<Props> = memo((props) => {
    const { status, canResetPassword } = props;
    
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });
    
    useEffect(() => {
        return () => reset("password");
    }, []);

    return (
        <GuestLayout title="ログイン">
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <Head title="ログイン" />

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
                                <SFormLabel>パスワード</SFormLabel>
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

                            <FormControl>
                                <SCheckbox
                                    name="remember"
                                    isChecked={data.remember}
                                    onChange={(e) => setData("remember", e.target.checked)}
                                >
                                    ログイン状態を保持する
                                </SCheckbox>
                            </FormControl>

                            <FormControl>
                                <PrimaryButton
                                    w="100%"
                                    loading={processing}
                                    disabled={processing}
                                    onClick={() => post(route("login"))}
                                >
                                    ログイン
                                </PrimaryButton>
                            </FormControl>

                        </Stack>
                    </CardBody>
                </Card>
                
                <Center mt={12}>
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            パスワードをお忘れですか？
                        </Link>
                    )}
                </Center>

            </Container>

        </GuestLayout>
    )
});

export default Login;