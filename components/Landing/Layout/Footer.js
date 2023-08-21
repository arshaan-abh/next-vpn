import * as React from "react";
import Facebook from "../../../public/assets/Icon/facebook.svg";
import Twitter from "../../../public/assets/Icon/twitter.svg";
import Instagram from "./../../../public/assets/Icon/instagram.svg";
import Image from "next/image";

const Footer = () => {
	return (
		<div className="bg-white-300 sm:pt-32 sm:pb-24 pt-12 pb-20">
			<div className="max-w-screen-xl w-full mx-auto px-6 sm:px-8 lg:px-16 flex flex-row flex-wrap">
				<div className="flex flex-col items-start basis-full lg:basis-2/5 mt-6">
					<div className="mb-4">
						<Image src="/assets/logo.svg" alt="logo" height={36} width={160} />
					</div>
					<p className="mb-4">
						<strong className="font-medium">AragonVPN</strong> is a private
						virtual network that has unique features and has high security.
					</p>
					<div className="flex w-full mt-2 mb-8 -mx-2">
						<div className="mx-2 bg-white-500 rounded-full items-center justify-center flex p-2 shadow-md">
							<Facebook className="h-6 w-6" />
						</div>
						<div className="mx-2 bg-white-500 rounded-full items-center justify-center flex p-2 shadow-md">
							<Twitter className="h-6 w-6" />
						</div>
						<div className="mx-2 bg-white-500 rounded-full items-center justify-center flex p-2 shadow-md">
							<Instagram className="h-6 w-6" />
						</div>
					</div>
					<p className="text-gray-400">
						©{new Date().getFullYear()} - AragonVPN
					</p>
				</div>
				<div className="flex flex-col basis-1/2 lg:basis-1/5 mt-6">
					<p className="text-black-600 mb-4 font-medium text-lg">Product</p>
					<ul className="text-black-500">
						<li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
							Download{" "}
						</li>
						<li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
							Pricing{" "}
						</li>
						<li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
							Locations{" "}
						</li>
						<li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
							Server{" "}
						</li>
						<li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
							Countries{" "}
						</li>
						<li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
							Blog{" "}
						</li>
					</ul>
				</div>
				<div className="flex flex-col basis-1/2 lg:basis-1/5 mt-6">
					<p className="text-black-600 mb-4 font-medium text-lg">Engage</p>
					<ul className="text-black-500">
						<li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
							AragonVPN ?{" "}
						</li>
						<li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
							FAQ{" "}
						</li>
						<li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
							Tutorials{" "}
						</li>
						<li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
							About Us{" "}
						</li>
						<li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
							Privacy Policy{" "}
						</li>
						<li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
							Terms of Service{" "}
						</li>
					</ul>
				</div>
				<div className="flex flex-col basis-1/2 lg:basis-1/5 mt-6">
					<p className="text-black-600 mb-4 font-medium text-lg">Earn Money</p>
					<ul className="text-black-500">
						<li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
							Affiliate{" "}
						</li>
						<li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
							Become Partner{" "}
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Footer;
