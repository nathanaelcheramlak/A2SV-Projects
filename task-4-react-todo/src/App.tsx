import React, { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import "./App.css";

export interface Todo {
	id: number;
	text: string;
	isEditing: boolean;
}

const App: React.FC = () => {
	const [todos, setTodos] = useState<Todo[]>([]);

	const addTodo = (text: string) => {
		const newTodo: Todo = {
			id: Date.now(),
			text,
			isEditing: false,
		};
		setTodos([newTodo, ...todos]);
	};

	const deleteTodo = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	const toggleEdit = (id: number) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
			)
		);
	};

	const updateTodo = (id: number, newText: string) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, text: newText, isEditing: false } : todo
			)
		);
	};

	return (
		<div className="app">
			<h1>Todo List</h1>
			<TodoForm addTodo={addTodo} />
			<ul>
				{todos.map((todo) => (
					<TodoItem
						key={todo.id}
						todo={todo}
						deleteTodo={deleteTodo}
						toggleEdit={toggleEdit}
						updateTodo={updateTodo}
					/>
				))}
			</ul>
		</div>
	);
};

export default App;
