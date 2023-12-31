import * as React from "react";
import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta charSet="utf-8" />
					<meta name="theme-color" content="#000000" />
					{/* Fonts and icons */}
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
						rel="stylesheet"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,500;0,600;0,700;1,300&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body>
					<div id="page-transition"></div>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
