import { useState } from "react";

import $ from "jquery";

import {
	allToLowerCase,
	stateIndexRemove,
	markTodo,
	renameTodo,
	renameLog,
} from "../functions.ts";

import TodoListItem from "./TodoListItem";
import _ from "lodash";

type Todo = Array<{ name: string; done: boolean }>;

function TodoInternal() {
	// State bound to todo addition input
	const [draftText, setDraftText] = useState<string>("");
	// Object structure for a todo item
	const [todos, setTodos] = useState<Todo>([
		{
			name: "Sample task",
			done: false,
		},
		{
			name: "Sample task 2",
			done: true,
		},
	]);
	// A record of all todos in a simple array, used to detect duplicates.
	const [loggedTodos, setLog] = useState<string[]>([
		"Sample task",
		"Sample task 2",
	]);

	const [deletionQueue, setDeletions] = useState<string[]>([]);

	// Updates the value of the draft state to the input value.
	function updateDraft(): void {
		const draft = document.getElementById("todo-draft") as HTMLInputElement;
		setDraftText(draft.value);
	}

	// Submits what is in the draft to a new entry in the todo array, and the todo log. Updates the UI, of course.
	function submitTodo(event: any): void {
		if (event.which == 13) {
			if (allToLowerCase(loggedTodos).includes(draftText.toLowerCase())) {
				alert("The Todo list already contains this item!");
			} else if (!draftText) {
				alert("You cannot add a blank item!");
			} else {
				setTodos((prev) => [...prev, { name: draftText, done: false }]);
				setLog((prev) => [...prev, draftText]);
				const draft = document.getElementById("todo-draft") as HTMLInputElement;
				draft.value = "";
				updateDraft();
			}
		}
	}

	// Removes the list item through each individual delete button.
	function removeTodo(todoIndex: number): void {
		setTodos((prev) => stateIndexRemove(prev, todoIndex));
		setLog((prev) => stateIndexRemove(prev, todoIndex));
	}

	function handleCheck(event: any, ind: number) {
		setTodos((prev) => markTodo(prev, ind, event.target.checked));
	}

	function handleRename(taskName: string, ind: number) {
		const renameDialog: string = `What would you like to rename '${taskName}'?`;
		var renameInput = prompt(renameDialog) ?? "";
		setTodos((prev) =>
			renameTodo({ source: prev, index: ind, taskName: renameInput })
		);
		setLog((prev) =>
			renameLog({ source: prev, index: ind, taskName: renameInput })
		);
	}

	function handleDelete(taskName: string, ind: number, completed: boolean) {
		if (!completed) {
			const deleteDialog: string = `Are you sure you want to delete '${taskName}'?`;
			var dialog = confirm(deleteDialog);
			if (dialog) {
				removeTodo(ind);
			}
		} else {
			removeTodo(ind);
		}
	}

	function handleSelect(
		deletions: Array<string>,
		ind: number,
		domNode: string
	) {
		$(domNode)!.toggleClass("active");
		if (deletions.includes(todos[ind].name)) {
			setDeletions((prev) => prev.filter(_, (index: number) => index != ind));
		} else {
			let arr: Array<string> = deletions;
			deletions.push(todos[ind].name);
			setDeletions(arr);
		}
	}

	return (
		<>
			<input
				type="text"
				className="input-lg my-5"
				id="todo-draft"
				value={draftText}
				onChange={updateDraft}
				onKeyDown={submitTodo}
			/>
			<div className="row">
				<div className="col-4">
					<ul className="list-group">
						{todos.length != 0 ? (
							todos.map((todo, index) => (
								<>
									<TodoListItem
										key={todo.name}
										listInd={index}
										completed={todo.done}
										checkFunction={() => handleCheck(event, index)}
										renameFunction={() => handleRename(todo.name, index)}
										deleteFunction={() =>
											handleDelete(todo.name, index, todo.done)
										}
										selectFunction={(e: any) => {
											handleSelect(deletionQueue, index, e.target);
										}}>
										{todo.name}
									</TodoListItem>
								</>
							))
						) : (
							<>
								<h1>No Todos Yet</h1>
								<p>Add some!</p>
							</>
						)}
					</ul>
				</div>
			</div>
		</>
	);
}

export default TodoInternal;
