import * as React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router, { withRouter } from "next/router";
import { Provider } from "react-redux";
import store from "../store/store";
import "../styles/tailwind.css";
import "../styles/slick.css";
import "../styles/MUIStyle.css";
import "../styles/index.css";

import PageChange from "../components/PageChange/PageChange.js";

import "../assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/scss/nextjs-argon-dashboard.scss";
import Script from "next/script";

Router.events.on("routeChangeStart", (url) => {
	ReactDOM.render(
		<PageChange path={url} />,
		document.getElementById("page-transition")
	);
	/* todo issue build logs */
	/* todo issue https://nextjs.org/docs/messages/opt-out-auto-static-optimization */
});
Router.events.on("routeChangeComplete", () => {
	ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
});
Router.events.on("routeChangeError", () => {
	ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
});

export default withRouter(
	class MyApp extends App {
		static async getInitialProps({ Component, router, ctx }) {
			let pageProps = {};

			if (Component.getInitialProps) {
				pageProps = await Component.getInitialProps(ctx);
			}

			return { pageProps };
		}
		render() {
			const { Component, pageProps } = this.props;

			const Layout = Component.layout || (({ children }) => <>{children}</>);

			return (
				<Provider store={store}>
					<Head>
						<meta
							name="viewport"
							content="width=device-width, initial-scale=1, shrink-to-fit=no"
						/>
						<title>AragonVPN - Panel</title>
					</Head>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</Provider>
			);
		}
	}
);
