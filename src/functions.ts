type Arr = Array<any>;
type Strs = Array<string>;

type RenameFn = {
	source: Arr | Strs;
	index: number;
	taskName: string | null;
};

/**
 * Converts all strings in the given array to lowercase.
 *
 * @param arr - An array of strings to be converted to lowercase.
 * @returns An array of strings where each string is in lowercase.
 */
export function allToLowerCase(arr: Strs): Strs {
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
export function stateIndexRemove(source: Arr, endIndex: number): Arr {
	var arr: Arr = [];
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
export function markTodo(source: Arr, index: number, check: boolean): Arr {
	var arr: Arr = source.map(
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
 * @returns {Array<any>} A new array with the updated todo item name.
 *
 */
export function renameTodo(fn: RenameFn): Arr {
	var arr: Arr = [...fn.source];
	arr[fn.index].name = !!fn.taskName ? fn.taskName : "[Unnamed task]";

	return arr;
}

/**
 * Renames a task in the provided array at the specified index.
 * If the task name is null, it assigns the string "[Unnamed task]".
 *
 * @param {Array<string>} source - The array of task names.
 * @param {number} index - The index of the task to rename.
 * @param {string | null} taskName - The new name for the task, or null to assign a default name.
 * @returns {Array<any>} A new array with the updated task name.
 */
export function renameLog(fn: RenameFn): Arr {
	var arr: Arr = [...fn.source];
	arr[fn.index] = !!fn.taskName ? fn.taskName : "[Unnamed task]";

	return arr;
}
