import React, { useMemo } from "react";
import { motion } from "framer-motion";
import styles from "../../styles/CustomStyles.module.css";
import ButtonOutlined from "./misc/ButtonOutlined";
import getScrollAnimation from "../../utils/getScrollAnimation";
import ScrollAnimationWrapper from "/components/Landing/Layout/ScrollAnimationWrapper";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchAllPackageCryptoArches,
	fetchPackages,
} from "../../store/features/packageSlice";
import { useRouter } from "next/router";
import { rotateArray } from "../../utils/handleArrays";

const Packages = () => {
	const dispatch = useDispatch();

	const router = useRouter();

	const scrollAnimation = useMemo(() => getScrollAnimation(), []);

	const data = useSelector((state) => state.package.data);
	const packageCryptoArchData = useSelector(
		(state) => state.package.cryptoData
	);
	const dataFix = rotateArray(
		data?.map((item) => {
			return {
				...item,
				packageCryptoArch: packageCryptoArchData?.find(
					(data) =>
						data.package.id === item.id &&
						data.cryptoArch.crypto.name === "Tether"
				),
			};
		})
	);

	React.useEffect(() => {
		dispatch(
			fetchPackages({
				sort: "trafficAmount",
				order: 1,
				filter: {},
			})
		);
		dispatch(fetchAllPackageCryptoArches());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			className="bg-gradient-to-b from-white-300 to-white-500 w-full py-14"
			id="pricing"
		>
			<div className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto flex flex-col w-full text-center justify-center">
				<div className="flex flex-col w-full">
					<ScrollAnimationWrapper>
						<motion.h3
							variants={scrollAnimation}
							className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-relaxed"
						>
							Choose Your Plan
						</motion.h3>
						<motion.p
							variants={scrollAnimation}
							className="leading-normal w-10/12 sm:w-7/12 lg:w-6/12 mx-auto my-2 text-center"
						>
							Let's choose the package that is best for you and experience our
							quality services.
						</motion.p>
					</ScrollAnimationWrapper>
					<div className="flex flex-row flex-wrap justify-center gap-0 sm:gap-6 pt-8 pb-4 lg:pt-12 lg:pb-8">
						{dataFix?.map((item, index) => {
							return (
								<ScrollAnimationWrapper
									className={`flex justify-center mb-4 ${styles.custombasis}`}
								>
									<motion.div
										variants={scrollAnimation}
										className="flex flex-col w-full mb-6 justify-center items-center bg-white-500 shadow-xl shadow-orange-150 hover:shadow-2xl hover:shadow-orange-150 rounded-xl py-4 px-6 lg:px-6 xl:px-8"
										whileHover={{
											scale: 1.03,
											transition: {
												duration: 0.2,
											},
										}}
									>
										<p className="text-2xl font-semibold text-black-600 capitalize my-2 sm:my-7">
											{item.title} Plan
										</p>
										<ul className="flex flex-col w-full list-inside pl-6 items-start justify-start text-left text-black-500 flex-grow">
											<li className="relative check custom-list my-2 w-full">
												Duration:
												<span className="float-right text-gray-900 font-font-weight-600">
													{item.duration} days
												</span>
											</li>
											<li className="relative check custom-list my-2 w-full">
												User count:
												<span className="float-right text-gray-900 font-font-weight-600">
													{item.userCount}
												</span>
											</li>
											<li className="relative check custom-list my-2 w-full">
												Traffic:
												<span className="float-right text-gray-900 font-font-weight-600">
													{item.trafficAmount}
												</span>
											</li>
										</ul>
										<div className="flex flex-col w-full justify-center mb-4 flex-none mt-8">
											<p className="text-lg text-black-600 text-center mb-4">
												{item?.packageCryptoArch?.price}{" "}
												{item?.packageCryptoArch?.cryptoArch?.crypto?.symbol}{" "}
												<span className="text-black-500">/ mo</span>
											</p>
											<ButtonOutlined
												onClick={() =>
													router.push(`/shop/paymentmethod/${item.id}`)
												}
												filled
											>
												Select
											</ButtonOutlined>
										</div>
									</motion.div>
								</ScrollAnimationWrapper>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Packages;
