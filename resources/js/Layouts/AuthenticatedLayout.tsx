import { ReactNode, FC, memo } from 'react';
import { User } from '@/types';
import AuthenticatedHeader from '@/Components/Header/AuthenticatedHeader';
import AuthenticatedAside from '@/Components/Aside/AuthenticatedAside';
import { Box } from '@chakra-ui/react';
import PageContainer from '@/Layouts/PageContainer';

type Props = {
    title: string;
    user: User;
    children: ReactNode;
};

const AuthenticatedLayout: FC<Props> = memo((props) => {
    const { title, user, children } = props;

    return (
        <>
            <AuthenticatedHeader title={title} user={user} />

            <AuthenticatedAside />

            <Box w={{ base: "100%", lg: "calc(100% - 240px)" }} ms="auto" mb={16}>
                <PageContainer>
                    {children}
                </PageContainer>
            </Box>

        </>
    );
});

export default AuthenticatedLayout;
