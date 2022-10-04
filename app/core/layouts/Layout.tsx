import Head from 'next/head';
import React, { FC } from 'react';
import { BlitzLayout } from '@blitzjs/next';

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({ title, children }) => {
	return (
		<React.Fragment>
			<Head>
				<title>{title || 'everybody-gives'}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="h-full w-full bg-hero-pattern p-8 sm:p-20 lg:p-28">
				<div className="h-full bg-white p-8 sm:p-12 lg:p-20">{children}</div>
			</div>
		</React.Fragment>
	);
};

export default Layout;
