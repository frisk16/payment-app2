import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FC } from 'react';
import { Box, Card, CardBody, Container, FormControl, Text } from '@chakra-ui/react';
import PrimaryButton from '@/Components/Button/PrimaryButton';

type Props = {
    status?: string;
};

const VerifyEmail: FC<Props> = (props) => {
    const { status = "" } = props;

    const { post, processing } = useForm({});

    return (
        <GuestLayout title="メールを確認してください">
            <Head title="確認メール送信" />

            <Container>
                <Card>
                    <CardBody>
                        <Text mb={4} fontWeight="bold">
                            ご登録いただきありがとうございます！、現在はまだ仮登録状態です。
                        </Text>
                        <Text>
                            始める前に、先ほどメールでお送りしたリンクをクリックして、メール アドレスを確認していただけますか?
                        </Text>
                        <Text>
                            メールが届かない場合は、お手数ですが以下のボタンから再送信を行ってください。
                        </Text>

                        <FormControl mt={8}>
                            {status === 'verification-link-sent' && (
                                <div className="mb-4 font-medium text-sm text-green-600">
                                    確認メールを送信しました、ご確認ください
                                </div>
                            )}
                            <PrimaryButton
                                loading={processing}
                                disabled={processing}
                                onClick={() => post(route("verification.send"))}
                                w={{ base: "full", md: "240px" }}
                            >
                                確認メール再送信
                            </PrimaryButton>
                            <Box float="right" mt={4}>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    ログアウト
                                </Link>
                            </Box>
                        </FormControl>
                    </CardBody>
                </Card>
            </Container>
        </GuestLayout>
    );
}

export default VerifyEmail;
