import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

type Props = {
    title: string;
    status: "error" | "success" | "info" | "warning";
};

const useMessage = () => {
    const toast = useToast();

    const getMessage = useCallback((props: Props) => {
        const { title, status } = props;

        toast({
            title,
            status,
            position: "top",
            duration: 2000,
            isClosable: true
        });
    }, [toast]);

    return { getMessage };
};

export default useMessage;