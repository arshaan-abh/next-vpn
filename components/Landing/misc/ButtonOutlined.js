import * as React from "react";

const ButtonOutlined = ({ children, onClick }) => {
	return (
		<button
			onClick={onClick}
			className="font-medium tracking-wide py-2 px-5 sm:px-8 border-2 border-orange-500 text-orange-500 bg-white-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-orange-500 hover:text-white-500 transition-all hover:shadow-orange"
		>
			{" "}
			{children}
		</button>
	);
};

export default ButtonOutlined;
