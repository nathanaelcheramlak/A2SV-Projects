import React, { useState } from "react";
import type { Todo } from "../App";

interface Props {
	todo: Todo;
	deleteTodo: (id: number) => void;
	toggleEdit: (id: number) => void;
	updateTodo: (id: number, newText: string) => void;
}

const TodoItem: React.FC<Props> = ({
	todo,
	deleteTodo,
	toggleEdit,
	updateTodo,
}) => {
	const [editText, setEditText] = useState(todo.text);

	const handleUpdate = () => {
		if (editText.trim()) {
			updateTodo(todo.id, editText.trim());
		}
	};

	return (
		<li className="todo-item">
			{todo.isEditing ? (
				<>
					<input
						value={editText}
						onChange={(e) => setEditText(e.target.value)}
					/>
					<button onClick={handleUpdate}>Save</button>
				</>
			) : (
				<>
					<span>{todo.text}</span>
					<button onClick={() => toggleEdit(todo.id)}>Edit</button>
				</>
			)}
			<button onClick={() => deleteTodo(todo.id)}>Delete</button>
		</li>
	);
};

export default TodoItem;
