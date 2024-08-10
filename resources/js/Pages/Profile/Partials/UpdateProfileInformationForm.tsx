import { Link, useForm } from '@inertiajs/react';
import { FC, memo } from 'react';
import { User } from '@/types';
import { Box, FormControl, FormErrorMessage, Heading, Stack, Text } from '@chakra-ui/react';
import PrimaryButton from '@/Components/Button/PrimaryButton';
import useMessage from '@/Fooks/useMessage';
import SFormLabel from '@/Components/Form/SFormLabel';
import SInput from '@/Components/Form/SInput';

type Props = {
    mustVerifyEmail: boolean;
    status: string;
    user: User;
}

const UpdateProfileInformation: FC<Props> = memo((props) => {
    const { mustVerifyEmail, status, user } = props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const { getMessage } = useMessage();
    {recentlySuccessful && getMessage({ title: "ユーザー情報を更新しました", status: "success" })}


    return (
        <Box w={{ base: "100%", md: "480px", lg: "560px"}}>
            <Heading size="sm">ユーザー情報</Heading>
            <Text fontSize="0.7em" color="#555">アカウントプロフィールの更新</Text>

            <Box mt={6}>
                <Stack spacing={6}>

                    <FormControl isInvalid={errors.name !== undefined}>
                        <SFormLabel>ユーザー名</SFormLabel>
                        <SInput
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        {errors.name !== undefined && (
                            <FormErrorMessage>{errors.name}</FormErrorMessage>
                        )}
                    </FormControl>

                    <FormControl isInvalid={errors.email !== undefined}>
                        <SFormLabel>Eメールアドレス</SFormLabel>
                        <SInput
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        {errors.email !== undefined && (
                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                        )}
                    </FormControl>

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <Box>
                            <p className="text-sm mt-2 text-gray-800">
                                本会員登録が完了していません
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Eメールアドレス確認メールを送信
                                </Link>
                            </p>

                            {status === 'verification-link-sent' && (
                                <Box className="mt-2 font-medium text-sm text-green-600">
                                    確認メールが送信されました、ご確認ください
                                </Box>
                            )}
                        </Box>
                    )}

                    <FormControl>
                        <PrimaryButton
                            loading={processing}
                            disabled={processing}
                            onClick={() => patch(route('profile.update'))}
                        >
                            変更
                        </PrimaryButton>
                    </FormControl>

                </Stack>
            </Box>
        </Box>
    );
});

export default UpdateProfileInformation;
