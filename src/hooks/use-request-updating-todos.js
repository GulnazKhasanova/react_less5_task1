
export const useRequestUpdatingTodos = (refreshTodos, setIsUpdating) => {


	const requestUpdatingTodos = (newId, newUserId, newTitle) =>{
		setIsUpdating(true);

		fetch('http://localhost:3005/todos/'+newId+'', {
			method: 'PUT',
			headers: { 'Content-Type':'application/json;charset=utf-8' },
			body: JSON.stringify({
				userId:newUserId,
				title: newTitle,
				completed: false
			})
		})
		.then((responsData)=>responsData.json())
		.then((response) => {
				console.log("Задача обновлена Ответ сервера:", response);
				refreshTodos();
		})
		.finally(() => setIsUpdating(false))
	};

	return {
		requestUpdatingTodos,
	};
}
