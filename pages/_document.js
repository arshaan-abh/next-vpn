import React from "react";
import Document, { Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          <link
            rel="shortcut icon"
            href="/assets/img/brand/favicon.ico"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/assets/img/brand/apple-icon.png"
          />
          {/* Fonts and icons */}
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
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
      </html>
    );
  }
}

export default MyDocument;
