import Image from "next/image";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import getScrollAnimation from "../../utils/getScrollAnimation";
import ScrollAnimationWrapper from "/components/Landing/Layout/ScrollAnimationWrapper";
import { Player } from "@lottiefiles/react-lottie-player";
import styles from "../../styles/CustomStyles.module.css";

const features = [
	"Powerfull online protection.",
	"Internet without borders.",
	"Supercharged VPN",
	"No specific time limits.",
];

const Feature = () => {
	const scrollAnimation = useMemo(() => getScrollAnimation(), []);

	return (
		<div
			className="max-w-screen-xl mt-0 mb-6 sm:mt-8 sm:mb-8 px-6 sm:px-8 lg:px-16 mx-auto"
			id="feature"
		>
			<div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8 p y-8">
				<ScrollAnimationWrapper className="flex w-full justify-end">
					<motion.div
						className={`w-full relative overflow-hidden p-4 ${styles.playercontainer}`}
						variants={scrollAnimation}
					>
						<Player
							autoplay
							loop
							src="https://lottie.host/9a72a069-1b92-4602-85a8-3e8eb366dafc/dp4oSBJ62a.json"
							className={styles.player}
						/>
					</motion.div>
				</ScrollAnimationWrapper>
				<ScrollAnimationWrapper>
					<motion.div
						className="flex flex-col justify-center items-center ml-auto w-full h-full lg:w-9/12"
						variants={scrollAnimation}
					>
						<h3 className="text-3xl mb-4 lg:text-4xl font-medium leading-relaxed text-black-600">
							We Provide Many Features You Can Use
						</h3>
						<p className="my-2 mb-4 text-black-500">
							You can explore the features that we provide with fun and have
							their own functions each feature.
						</p>
						<ul className="text-black-500 self-start list-inside ml-8">
							{features.map((feature, index) => (
								<motion.li
									className="relative mb-1 circle-check custom-list"
									custom={{ duration: 2 + index }}
									variants={scrollAnimation}
									key={feature}
									whileHover={{
										scale: 1.1,
										transition: {
											duration: 0.2,
										},
									}}
								>
									{feature}
								</motion.li>
							))}
						</ul>
					</motion.div>
				</ScrollAnimationWrapper>
			</div>
		</div>
	);
};

export default Feature;
