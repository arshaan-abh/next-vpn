import * as React from "react";

const ButtonOutlined = ({ children, onClick, filled = false}) => {
	const filledStyles = "!bg-orange-500 text-white-500";
	return (
		<button
			onClick={onClick}
			className={`font-medium tracking-wide py-2 px-5 sm:px-8 border-2 border-orange-500 text-orange-500 bg-white-500 outline-none rounded-l-full rounded-r-full capitalize hover:text-white-500 transition-all hover:shadow-orange hover:bg-orange-500 ${filled ? filledStyles : ""}`}
		>
			{children}
		</button>
	);
};

export default ButtonOutlined;
