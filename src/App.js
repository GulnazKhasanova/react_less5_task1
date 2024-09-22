import { useState } from 'react';
import { useRequestGetTodos, useRequestAddTodos, useRequestUpdatingTodos, useRequestDeletingTodos  } from './hooks';
import styles from  './App.module.css';


export const App = () => {

	const [isCreating, setIsCreating] = useState(true);
	const [isUpdating, setIsUpdating] = useState(true);
	const [newUserId, setNewUserId] = useState('');
	const [newTitle, setNewTitle] = useState('');
	const [clickChangeFlag, setClickChangeFlag] = useState(false);
	const [newId, setNewId] = useState('');
	const [sortTodos, setSortTodos] = useState(false);


	const onUserIdChange = ({ target }) => {
		setNewUserId(target.value);
		checkedIsCreating(target.value,newTitle, clickChangeFlag);
	}
	const onTitleChange = ({ target }) => {
		console.log( target.value )
		setNewTitle(target.value);
		checkedIsCreating(target.value,newUserId,clickChangeFlag);
	}
	const checkedIsCreating = (a,b, clickChangeFlag) => {
		if (a.length > 3 && b.length > 3){
			if(clickChangeFlag) setIsUpdating(false);
			else setIsCreating(false);
		}
	}

	const  clickChange =({id}) => {
		setClickChangeFlag(true);
		setNewId(id);
	}
	const [refreshTodosFlag, setRefreshTodosFlaf] = useState(false);

	const refreshTodos = () => setRefreshTodosFlaf(!refreshTodosFlag);

	const { isLoading, todos } = useRequestGetTodos(refreshTodosFlag, sortTodos);
	const {	requestAddTodos } = useRequestAddTodos(refreshTodos, setIsCreating, setNewUserId, setNewTitle);
	const { requestUpdatingTodos } = useRequestUpdatingTodos(refreshTodos, setIsUpdating);
	const { isDeleting,	requestDeletingTodos } = useRequestDeletingTodos(refreshTodos);

	const onSortTodos = () => {
		setSortTodos(!sortTodos);
	}

	return (
		<div className={styles.app}>
			<h1>Todos list</h1>
			<input placeholder="Введите логин"  onChange={onUserIdChange} value={newUserId}></input>
			<input placeholder="Введите описание задачи"  onChange={onTitleChange} value={newTitle}></input>

			<button onClick={()=>requestAddTodos(newUserId, newTitle)} disabled={isCreating} >Добавить</button>
			<button className={styles.sort} onClick={onSortTodos}>Сортировать</button>

			{clickChangeFlag
			? <div className={styles.contentForm}>
				<form onSubmit={()=>requestUpdatingTodos(newId, newUserId, newTitle)} className={styles.changeForm}>
					<input
					placeholder="Введите логин"
					onChange={onUserIdChange}
					value={newUserId}></input>
					<input
					placeholder="Введите описание задачи"
					onChange={onTitleChange}
					value={newTitle}></input>
				<button disabled={isUpdating} >Сохранить</button>
				</form>
			 </div>
			: undefined}

			{isLoading
			? <div className={styles.loader}></div>
			: todos.map(({userId, id, title, completed}) => {
				return (
					<div key={id} className={completed === 'true' ? styles.todo + ' '+ styles.completed
																: styles.todo + ' '+ styles.new}>
							<span id={userId} >{userId}</span>
							<p>{title} </p>
						<button  onClick={() => clickChange({id})} >Редактировать</button>
						<button  onClick={()=>requestDeletingTodos({id})} disabled={isDeleting} >Удалить</button>

					</div>)})
			}
		</div>
	)
}




