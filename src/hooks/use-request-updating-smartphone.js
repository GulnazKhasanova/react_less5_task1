import { useState } from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';


export const useRequestUpdatingSmartphone = () => {
	const [isUpdating, setIsUpdating] = useState(false);

	const requestUpdatingSmartphone = () =>{

		const referenceDBsmartphone = ref(db, 'products/002');
		set(referenceDBsmartphone, {
			name: 'Смартфон',
			price: 14500
		})
		.then((response) => {
				console.log("Смартфон обновлен Ответ сервера:", response);
		})
		.finally(() => setIsUpdating(false))
	};

	return {
		isUpdating,
		requestUpdatingSmartphone,
	};
}
