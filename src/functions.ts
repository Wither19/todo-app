/**
 * Converts all strings in the given array to lowercase.
 *
 * @param arr - An array of strings to be converted to lowercase.
 * @returns An array of strings where each string is in lowercase.
 */
export function allToLowerCase(arr: Array<string>): Array<string> {
	var lowerArray = arr!.map((item: string) => item.toLowerCase());
	return lowerArray;
}

/**
 * Removes an element from a React state array at the specified index.
 *
 * @param source - The original array from which the element will be removed (Intended for previous React state references).
 * @param endIndex - The index of the element to be removed.
 * @returns A new array with the element removed.
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

/**
 * Marks a todo item as done or not done based on the provided index.
 *
 * @param {Array<any>} source - The array of todo items.
 * @param {boolean} check - The boolean value to set the `done` status of the todo item.
 * @param {number} index - The index of the todo item to be updated.
 * @returns {Array<any>} - A new array with the updated todo item.
 */
export function markTodo(
	source: Array<any>,
	index: number,
	check: boolean
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

/**
 * Renames a todo item in the provided source array at the specified index.
 * If the provided task name is null, the todo item will be renamed to "[Unnamed task]".
 *
 * @param {Array<any>} source - The array of todo items.
 * @param {number} index - The index of the todo item to rename.
 * @param {string | null} taskName - The new name for the todo item. If null, the name will be set to "[Unnamed task]".
 *
 * @returns {Array<any>} A new array with the updated todo item name.
 *
 */
export function renameTodo(
	source: Array<any>,
	index: number,
	taskName: string | null
): Array<any> {
	var arr: Array<any> = [...source];
	arr[index].name = !!taskName ? taskName : "[Unnamed task]";

	return arr;
}

// Executes with renameTodo() to make the todo item log reflect the array.
/**
 * Renames a task in the provided array at the specified index.
 * If the task name is null, it assigns "[Unnamed task]" to the task.
 *
 * @param {Array<string>} source - The array of task names.
 * @param {number} index - The index of the task to rename.
 * @param {string | null} taskName - The new name for the task, or null to assign a default name.
 * @returns {Array<any>} A new array with the updated task name.
 */
export function renameLog(
	source: Array<string>,
	index: number,
	taskName: string | null
): Array<any> {
	var arr: Array<any> = [...source];
	arr[index] = !!taskName ? taskName : "[Unnamed task]";

	return arr;
}
