import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FC, memo } from 'react';
import { Card, CardBody, Container, FormControl, FormErrorMessage, Stack } from '@chakra-ui/react';
import PrimaryButton from '@/Components/Button/PrimaryButton';
import SFormLabel from '@/Components/Form/SFormLabel';
import SInput from '@/Components/Form/SInput';

type Props = {
    status: string;
};

const ForgotPassword: FC<Props> = memo((props) =>  {
    const { status } = props;

    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    return (
        <GuestLayout title="パスワード再設定">
            <Head title="パスワード再設定" />

            <Container>
                <div className="mb-4 text-sm text-gray-600">
                    登録中のEメールアドレス宛にパスワード再設定リンクを送信します
                </div>

                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                <Card>
                    <CardBody px={{ base: 8, lg: 32 }} py={16}>
                        <Stack spacing={12}>

                            <FormControl isInvalid={errors.email !== undefined}>
                                <SFormLabel>登録中のEメールアドレス</SFormLabel>
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

                            <FormControl>
                                <PrimaryButton
                                    w="100%"
                                    loading={processing}
                                    disabled={processing}
                                    onClick={() => post(route("password.email"))}
                                >
                                    パスワード再設定メール送信
                                </PrimaryButton>
                            </FormControl>

                        </Stack>
                    </CardBody>
                </Card>

            </Container>
        </GuestLayout>
    );
});

export default ForgotPassword;
