export const extractNumbers = (text) => {
	const numericValues = text.match(/[-+]?\d+(\.\d+)?/g);

	return numericValues.map((value) => parseFloat(value))[0];
};
