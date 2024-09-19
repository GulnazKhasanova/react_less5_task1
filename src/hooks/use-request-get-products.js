import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';

export const useRequestGetProducts = () => {
	const [products, setProducts]= useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		const referensDB = ref(db, 'products');
		return onValue(referensDB, (snapshot)=> {
			const loadedProducts = snapshot.val() || [];
				console.log(loadedProducts);
			setProducts(loadedProducts);
			setIsLoading(false);

		})
		}, []);

		return {
			isLoading,
			products,
		}

}
