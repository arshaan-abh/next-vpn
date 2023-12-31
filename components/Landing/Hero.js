import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import getScrollAnimation from "../../utils/getScrollAnimation";
import ScrollAnimationWrapper from "/components/Landing/Layout/ScrollAnimationWrapper";
import { Player } from "@lottiefiles/react-lottie-player";
import styles from "../../styles/CustomStyles.module.css";
import { useRouter } from "next/router";
import ButtonOutlined from "./misc/ButtonOutlined";

const Hero = ({
	listUser = [
		{
			name: "Users",
			number: "390",
			icon: "/assets/Icon/heroicons_sm-user.svg",
		},
		{
			name: "Locations",
			number: "20",
			icon: "/assets/Icon/gridicons_location.svg",
		},
		{
			name: "Server",
			number: "50",
			icon: "/assets/Icon/bx_bxs-server.svg",
		},
	],
}) => {
	const router = useRouter();

	const scrollAnimation = useMemo(() => getScrollAnimation(), []);

	return (
		<div className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto" id="about">
			<ScrollAnimationWrapper>
				<motion.div
					className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16"
					variants={scrollAnimation}
				>
					<div className=" flex flex-col justify-center items-start row-start-2 sm:row-start-1">
						<h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
							Want anything to be easy with <strong>AragonVPN</strong>.
						</h1>
						<p className="text-black-500 mt-4 mb-6">
							Provide a network for all your needs with ease and fun using
							AragonVPN discover interesting features from us.
						</p>
						<ButtonOutlined onClick={() => router.push("/getStarted")} filled>
							Get Started
						</ButtonOutlined>
					</div>
					<div className="flex w-full">
						<motion.div
							className="w-full relative overflow-hidden"
							variants={scrollAnimation}
						>
							<Player
								autoplay
								loop
								speed={0.5}
								src="https://lottie.host/f3885260-73af-4018-a28f-0287afb5ba3c/pHOVeysWN1.json"
								className={styles.player}
							/>
						</motion.div>
					</div>
				</motion.div>
			</ScrollAnimationWrapper>
			<div className="relative w-full flex">
				<ScrollAnimationWrapper className="rounded-lg w-full grid grid-flow-row sm:grid-flow-row grid-cols-1 sm:grid-cols-3 py-9 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-gray-100 bg-white-500 z-10">
					{listUser.map((listUsers, index) => (
						<motion.div
							className="flex items-center justify-start sm:justify-center py-6 sm:pt-8 sm:px-4 w-11/12 sm:w-auto mx-auto sm:mx-0"
							key={index}
							custom={{ duration: 2 + index }}
							variants={scrollAnimation}
						>
							<div className="flex mx-auto w-40 sm:w-auto">
								<div className="flex items-center justify-center bg-orange-100 w-12 h-12 mr-6 rounded-full">
									<Image
										src={listUsers.icon}
										width={24}
										height={24}
										className="h-6 w-6"
										alt="Icon"
									/>
								</div>
								<div className="flex flex-col">
									<p className="text-xl text-black-600 font-bold">
										{listUsers.number}+
									</p>
									<p className="text-lg text-black-500">{listUsers.name}</p>
								</div>
							</div>
						</motion.div>
					))}
				</ScrollAnimationWrapper>
				<div
					className="absolute bg-black-600 opacity-5 w-11/12 roudned-lg h-64 sm:h-48 top-0 mt-8 mx-auto left-0 right-0"
					style={{ filter: "blur(114px)" }}
				></div>
			</div>
		</div>
	);
};

export default Hero;
