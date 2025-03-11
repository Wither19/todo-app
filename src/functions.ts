// Iterates through an array to convert all its strings to lowercase.
export function allToLowerCase(arr: Array<string>): Array<string> {
	var lowerArray = arr!.map((item: string) => item.toLowerCase());
	return lowerArray;
}

/**
 * Function to update a React state array without a particular index.
 * @param {Array<any>} [source] The source array borrowed from a previous state.
 * @param {number} [endIndex] The index to be removed.
 */
export function stateIndexRemove(
	source: Array<any>,
	endIndex: number
): Array<any> {
	var arr: Array<any> = [];
	if (endIndex == source.length - 1) {
		arr = source.slice(0, endIndex);
	} else {
		arr = [...source.slice(0, endIndex), ...source.slice(endIndex + 1)];
	}
	return arr;
}

// Changes the checkbox value in the todo array.
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

// Renames an existing item in the todo array.
export function renameTodo(
	source: Array<any>,
	index: number,
	taskName: string | null
): Array<any> {
	var arr: Array<any> = [...source];
	arr[index].name = !!taskName ? taskName : "[Unnamed task]";

	return arr;
}

// Updates with the renamed todo in the log.
export function renameLog(
	source: Array<string>,
	index: number,
	taskName: string | null
): Array<any> {
	var arr: Array<any> = [...source];
	arr[index] = !!taskName ? taskName : "[Unnamed task]";

	return arr;
}
