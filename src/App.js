import { useState, useEffect } from 'react';
import styles from  './App.module.css';



export const App = () => {
	const [todos, setTodos]= useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch('https://jsonplaceholder.typicode.com/todos')
		.then((loadedData) => loadedData.json())
		.then((loadedTodos) => {
			setTodos(loadedTodos);
		})
		.finally(() => setIsLoading(false))
		}, [])

	return (
		<div className={styles.app}>
			<h1>Todos list</h1>
			{isLoading
			? <div className={styles.loader}></div>
			: todos.map(({userId, id, title, completed}) => {
				return (
				<>
					<input id={userId} type='hidden'></input>
					<div key={id} className={completed ? styles.todo + ' '+ styles.completed
													   : styles.todo + ' '+ styles.new}>
						<p>{title} </p>
					</div>
				</>)
			})}

		</div>
	)
}




