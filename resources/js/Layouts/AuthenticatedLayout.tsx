import { ReactNode, FC, memo, useState } from 'react';
import { User } from '@/types';
import AuthenticatedHeader from '@/Components/Header/AuthenticatedHeader';
import AuthenticatedAside from '@/Components/Aside/AuthenticatedAside';
import { Box } from '@chakra-ui/react';
import PageContainer from '@/Layouts/PageContainer';
import Loading from '@/Components/Progress/Loading';

type Props = {
    title: string;
    user: User;
    updateCount: number;
    children: ReactNode;
};

const AuthenticatedLayout: FC<Props> = memo((props) => {
    const { title, user, updateCount, children } = props;

    const [logoutProcessing, setLogoutProcessing] = useState(false);

    return (
        <>
            {logoutProcessing && (
                <Loading />
            )}

            <AuthenticatedHeader
                title={title}
                user={user}
                updateCount={updateCount}
                setLogoutProcessing={setLogoutProcessing}    
            />

            <AuthenticatedAside
                updateCount={updateCount}
                setLogoutProcessing={setLogoutProcessing}
            />

            <Box w={{ base: "100%", lg: "calc(100% - 240px)" }} ms="auto" mb={16}>
                <PageContainer>
                    {children}
                </PageContainer>
            </Box>

        </>
    );
});

export default AuthenticatedLayout;
