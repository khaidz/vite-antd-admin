
export function isFunction(value: unknown) {
	return typeof value === "function";
}

export function isNumber(value: unknown) {
	return typeof value === "number" && Number.isFinite(value);
}

export function isString(value: unknown) {
	return typeof value === "string";
}

export function isBoolean(value: unknown) {
	return typeof value === "boolean";
}

export function isObject(value: unknown) {
	return typeof value === "object" && value !== null;
}

export function isNull(value: unknown) {
	return value === null;
}

export function isUndefined(value: unknown) {
	return value === undefined;
}
