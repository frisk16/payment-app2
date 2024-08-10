import { extendTheme } from "@chakra-ui/react";

const chakraStyle = extendTheme({
    styles: {
        global: {
            body: {
                backgroundColor: "#eee",
                color: "gray.800",
                fontSize: "16px",
            }
        }
    }
})

export default chakraStyle;