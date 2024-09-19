import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const useRequestAddVacuumCleaner = () => {
	const [isCreating, setIsCreating] = useState(false);

	const requestAddVacuumCleaner = () =>{

		const referenceDB = ref(db, 'products');
		push(referenceDB, {
			name: 'Новый пылесос',
			price : 5990
		})
		.then((response) => {
				console.log("Пылесос добавлен Ответ сервера:", response);

		})
		.finally(() => setIsCreating(false))

	};

	return {
		isCreating,
		requestAddVacuumCleaner,
	};
}
