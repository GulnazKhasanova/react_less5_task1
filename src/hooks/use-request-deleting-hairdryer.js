import { useState } from 'react';
import { ref, remove } from 'firebase/database';
import { db } from '../firebase';


export const useRequestDeletingHairDryer = () => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDeletingHairDryer = () =>{
		setIsDeleting(true);

		const referenceDBHairDryer = ref(db, 'products/003')

		remove(referenceDBHairDryer)
		.then((response) => {
				console.log("Фен удален Ответ сервера:", response);
		})
		.finally(() => setIsDeleting(false))
	};

	return {
		isDeleting,
		requestDeletingHairDryer,
	};
}
