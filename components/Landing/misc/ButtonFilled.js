import React from "react"

const ButtonFilled = ({ children, onClick }) => {
	return (
		<button
			onClick={onClick}
			className="font-medium tracking-wide py-2 px-5 sm:px-8 outline-none rounded-l-full rounded-r-full capitalize bg-orange-500 text-white-500 transition-all hover:shadow-orange hover:border-2 hover:border-orange-500 hover:text-orange-500 hover:bg-white-500"
		>
			{" "}
			{children}
		</button>
	);
};

export default ButtonFilled;
