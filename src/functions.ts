// Iterates through an array to convert all its strings to lowercase.
export function allToLowerCase(arr: Array<string>): Array<string> {
	var lowerArray = arr!.map((item: string) => item.toLowerCase());
	return lowerArray;
}

// Function to update a React state array without a particular index.
export function stateIndexRemove(
	source: Array<any>,
	endIndex: number,
	isEnd: boolean = false
): Array<any> {
	var arr: Array<any> = [];
	if (isEnd) {
		arr = source.slice(0, endIndex);
	} else {
		arr = [...source.slice(0, endIndex), ...source.slice(endIndex + 1)];
	}
	return arr;
}

export function markTodo(
	source: Array<any>,
	check: boolean,
	index: number
): Array<any> {
	var arr: Array<any> = source.map(
		(item: { done: boolean; name: string }, ind: number) => {
			if (ind == index) {
				return {
					done: check != item.done ? check : item.done,
					name: item.name,
				};
			} else {
				return item;
			}
		}
	);

	return arr;
}
