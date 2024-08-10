import { useEffect, FC, memo } from 'react';
import { Head, useForm } from '@inertiajs/react';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { Card, CardBody, Container, FormControl, FormErrorMessage, Stack } from '@chakra-ui/react';
import PrimaryButton from '@/Components/Button/PrimaryButton';
import SFormLabel from '@/Components/Form/SFormLabel';
import SInput from '@/Components/Form/SInput';

const ConfirmPassword: FC =  memo(() => {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    return (
        <DefaultLayout>
            <Head title="パスワード確認" />

            <Container>
                <div className="mb-4 text-sm text-gray-600">
                    確認の為、パスワードを入力してください
                </div>

                <Card>
                    <CardBody px={{ base: 8, lg: 32 }} py={16}>
                        <Stack spacing={12}>

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
                                <PrimaryButton
                                    onClick={() => post(route("password.confirm"))}
                                    w="100%"
                                    loading={processing}
                                    disabled={processing}
                                >
                                    確認
                                </PrimaryButton>
                            </FormControl>

                        </Stack>
                    </CardBody>
                </Card>
            </Container>

        </DefaultLayout>
    );
});

export default ConfirmPassword;
