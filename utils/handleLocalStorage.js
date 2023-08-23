export function clearLocalStorage() {
	localStorage.clear();
}

export function removeLocalStorageItem(key) {
	localStorage.removeItem(key);
}

export function setLocalStorageItem(key, value, minutes) {
	const now = new Date();
	const item = {
		value: value,
		expiry: now.getTime() + minutes * 60 * 1000,
	};
	localStorage.setItem(key, JSON.stringify(item));
}

export function getLocalStorageItem(key) {
	const item = JSON.parse(localStorage.getItem(key));

	if (!item) {
		return null;
	}

	const now = new Date().getTime();

	if (now > item.expiry) {
		localStorage.removeItem(key);
		return null;
	}

	return item.value;
}
