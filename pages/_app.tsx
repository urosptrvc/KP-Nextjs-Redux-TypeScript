import type {AppProps} from 'next/app';

import '../styles/globals.css';
import {Providers} from "@/components/Providers";
import {Toaster} from "sonner";
import {Layout} from "@/components/Layout";

export default function App({Component, pageProps}: AppProps) {
    return (
        <Layout>
            <Providers>
                <Component {...pageProps} />
                <Toaster position="bottom-right" richColors/>
            </Providers>
        </Layout>
    );
}