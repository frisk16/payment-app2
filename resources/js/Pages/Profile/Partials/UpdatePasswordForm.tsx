import { FC, memo } from 'react';
import { useForm } from '@inertiajs/react';
import useMessage from '@/Fooks/useMessage';
import { Box, FormControl, FormErrorMessage, Heading, Stack, Text } from '@chakra-ui/react';
import PrimaryButton from '@/Components/Button/PrimaryButton';
import SFormLabel from '@/Components/Form/SFormLabel';
import SInput from '@/Components/Form/SInput';

const UpdatePasswordForm: FC = memo(() => {
    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = () => {
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                }

                if (errors.current_password) {
                    reset('current_password');
                }
            },
        });
    };

    const { getMessage } = useMessage();
    {recentlySuccessful && getMessage({ title: "パスワードを変更しました", status: "success" })}

    return (
        <Box w={{ base: "100%", md: "480px", lg: "560px"}}>
            <Heading size="sm">パスワード変更</Heading>
            <Text fontSize="0.7em" color="#555">最低8文字以上で設定してください</Text>

            <Box mt={6}>
                <Stack spacing={6}>

                    <FormControl isInvalid={errors.current_password !== undefined}>
                        <SFormLabel>現在のパスワード</SFormLabel>
                        <SInput
                            type="password"
                            value={data.current_password}
                            onChange={(e) => setData("current_password", e.target.value)}
                        />
                        {errors.current_password !== undefined && (
                            <FormErrorMessage>{errors.current_password}</FormErrorMessage>
                        )}
                    </FormControl>
                    
                    <FormControl isInvalid={errors.password !== undefined}>
                        <SFormLabel>新しいパスワード</SFormLabel>
                        <SInput
                            type="password"
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                        />
                        {errors.password !== undefined && (
                            <FormErrorMessage>{errors.password}</FormErrorMessage>
                        )}
                    </FormControl>

                    <FormControl isInvalid={errors.password_confirmation !== undefined}>
                        <SFormLabel>新しいパスワード(確認用)</SFormLabel>
                        <SInput
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData("password_confirmation", e.target.value)}
                        />
                        {errors.password_confirmation !== undefined && (
                            <FormErrorMessage>{errors.password_confirmation}</FormErrorMessage>
                        )}
                    </FormControl>

                    <FormControl>
                        <PrimaryButton
                            loading={processing}
                            disabled={processing}
                            onClick={() => updatePassword()}
                        >
                            変更
                        </PrimaryButton>
                    </FormControl>

                </Stack>
            </Box>

        </Box>
    );
});

export default UpdatePasswordForm;
