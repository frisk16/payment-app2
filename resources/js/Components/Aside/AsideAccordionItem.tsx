import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from "@chakra-ui/react";
import { FC, memo, ReactNode } from "react";

type Props = {
    title: string;
    children: ReactNode;
    leftIcon: ReactNode;
};

const AsideAccordionItem: FC<Props> = memo((props) => {
    const { title, children, leftIcon } = props;

    return (
        <AccordionItem border="none">
            <AccordionButton h={14} borderBottom="2px solid #eee">
                <Box display="flex" w="full" justifyContent="start" gap={2}>
                    <span>{leftIcon}</span>
                    <span>{title}</span>
                </Box>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel p={0}>
                {children}
            </AccordionPanel>
        </AccordionItem>
    )
});

export default AsideAccordionItem;