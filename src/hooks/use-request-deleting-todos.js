import { useState } from 'react';


export const useRequestDeletingTodos = (refreshTodos) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDeletingTodos = ({id}) =>{
		console.log(id)
		setIsDeleting(true);

		fetch('http://localhost:3005/todos/'+id+'', {
			method: 'DELETE'
		})
		.then((responsData)=>responsData.json())
		.then((response) => {
				console.log("Пылесос добавлен Ответ сервера:", response);
				refreshTodos();
		})
		.finally(() => setIsDeleting(false))
	};

	return {
		isDeleting,
		requestDeletingTodos,
	};
}
