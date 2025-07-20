import React, { useState } from "react";

interface Props {
	addTodo: (text: string) => void;
}

const TodoForm: React.FC<Props> = ({ addTodo }) => {
	const [text, setText] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!text.trim()) return;
		addTodo(text.trim());
		setText("");
	};

	return (
		<form onSubmit={handleSubmit} className="todo-form">
			<input
				type="text"
				value={text}
				placeholder="Add a task..."
				onChange={(e) => setText(e.target.value)}
			/>
			<button type="submit">Add</button>
		</form>
	);
};

export default TodoForm;
