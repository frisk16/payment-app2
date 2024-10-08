import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/theme';

const appName = import.meta.env.VITE_APP_NAME || '帳簿管理システム';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ChakraProvider theme={theme}>
                <App {...props} />
            </ChakraProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
