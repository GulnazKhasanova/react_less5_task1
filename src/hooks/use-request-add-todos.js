
export const useRequestAddTodos = (refreshTodos, setIsCreating, setNewUserId, setNewTitle) => {


	const requestAddTodos = (newUserId, newTitle) =>{
		console.log(newUserId)
		console.log(newTitle)
		setIsCreating(true);

		fetch('http://localhost:3005/todos', {
			method: 'POST',
			headers: { 'Content-Type':'application/json;charset=utf-8' },
			body: JSON.stringify({
				userId:newUserId,
				title: newTitle,
				completed: 'false'
			})
		})
		.then((responsData)=>responsData.json())
		.then((response) => {
				console.log("Пылесос добавлен Ответ сервера:", response);
				refreshTodos();
		})
		.finally(() => {
			setNewUserId('');
			setNewTitle('');
		})

	};

	return {
		requestAddTodos,
	};
}
