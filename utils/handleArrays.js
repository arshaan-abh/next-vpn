export function rotateArray(arr) {
	if (arr.length <= 1) {
		return arr;
    }
    
	const lastElement = arr.pop();
	arr.unshift(lastElement);

	return arr;
}
