import Head from 'next/head';
import React, { FC } from 'react';
import { BlitzLayout } from '@blitzjs/next';

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({ title, children }) => {
	return (
		<>
			<Head>
				<title>{title || 'everybody-gives'}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="h-full w-full bg-hero-pattern p-8 sm:p-20 lg:p-28"><div className='h-full bg-white'>{children}</div></div>
		</>
	);
};

export default Layout;
