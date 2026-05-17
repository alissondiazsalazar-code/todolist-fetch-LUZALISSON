import React, { useEffect, useState } from "react";

const Home = () => {
	const [tasks, setTasks] = useState([]);
	const [inputValue, setInputValue] = useState("");

	const username = "LuzAlissonTodo";

	const getTasks = async () => {
		try {
			const response = await fetch(
				`https://playground.4geeks.com/apis/fake/todos/user/${username}`
			);

			const data = await response.json();

			if (Array.isArray(data)) {
				setTasks(data);
			}
		} catch {
			const saved = localStorage.getItem("tasks");
			setTasks(JSON.parse(saved || "[]"));
		}
	};

	const saveTasks = async (updatedTasks) => {
		try {
			await fetch(
				`https://playground.4geeks.com/apis/fake/todos/user/${username}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(updatedTasks)
				}
			);
		} catch {
			localStorage.setItem(
				"tasks",
				JSON.stringify(updatedTasks)
			);
		}
	};

	const addTask = () => {
		if (!inputValue.trim()) return;

		const updatedTasks = [
			...tasks,
			{
				label: inputValue,
				done: false
			}
		];

		setTasks(updatedTasks);
		saveTasks(updatedTasks);
		setInputValue("");
	};

	const deleteTask = (index) => {
		const updatedTasks = tasks.filter(
			(_, i) => i !== index
		);

		setTasks(updatedTasks);
		saveTasks(updatedTasks);
	};

	const clearAllTasks = () => {
		setTasks([]);
		saveTasks([]);
	};

	useEffect(() => {
		getTasks();
	}, []);

	return (
		<div className="container mt-5">

			<h1 className="text-center">
				Mis tareas
			</h1>

			<input
				type="text"
				className="form-control mt-4"
				placeholder="Agregar tarea..."
				value={inputValue}
				onChange={(e) =>
					setInputValue(e.target.value)
				}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						addTask();
					}
				}}
			/>

			<ul className="list-group mt-4">

				{
					tasks.length === 0

						?

						<li className="list-group-item">
							No hay tareas
						</li>

						:

						tasks.map((task, index) => (

							<li
								key={index}
								className="list-group-item d-flex justify-content-between"
							>

								{task.label}

								<button
									className="btn btn-danger btn-sm"
									onClick={() =>
										deleteTask(index)
									}
								>

									X

								</button>

							</li>

						))
				}

			</ul>

			<button
				className="btn btn-dark mt-4"
				onClick={clearAllTasks}
			>

				Eliminar todas

			</button>

		</div>
	);
};

export default Home;