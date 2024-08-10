import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    styles: {
        global: {
            body: {
                backgroundColor: "#eee",
                color: "gray.800",
                fontSize: "16px",
            }
        }
    }
});

export default theme;