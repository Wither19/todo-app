import { FaTrash, FaEdit } from "react-icons/fa";

function TodoListItem(props: any) {
	return (
		<li
			key={props.children}
			className="list-group-item d-flex justify-content-between align-items-center cursor"
			onDoubleClick={props.selectFunction}
		>
			<input
				className="form-check-input my-1"
				type="checkbox"
				checked={props.completed}
				onChange={props.checkFunction}
			/>
			<span className={props.completed ? "completed" : ""}>
				{props.children}
			</span>
			<div>
				<span
					className="badge bg-info rounded-pill cursor mx-2"
					onClick={props.renameFunction}
				>
					<FaEdit size="20" />
				</span>
				<span
					className={`badge bg-${
						props.completed ? "danger" : "secondary"
					} rounded-pill cursor mx-2`}
					onClick={props.deleteFunction}
				>
					<FaTrash size="20" />
				</span>
			</div>
		</li>
	);
}

export default TodoListItem;
