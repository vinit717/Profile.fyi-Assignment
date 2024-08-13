import Head from 'next/head';
import { FC, ReactNode } from 'react';

import Navbar from '@/components/Navbar';

type LayoutProps = {
    title: string;
    children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ title, children }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
                <meta
                    name="description"
                    content="Ecommerce assignment"
                />
                <meta name="author" content="Vinit" />
                <meta property="og:title" content="Profilyi - E-commerce" />
                <meta
                    property="og:description"
                    content="Ecommerce assignment of Profyli"
                />
                <meta property="og:type" content="website" />
            </Head>
            <Navbar />
            <main>{children}</main>
            <footer className="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 E-Commerce Store. All rights reserved.</p>
      </footer>
        </>
    );
};

export default Layout;
