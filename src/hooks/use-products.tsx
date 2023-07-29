import { useEffect, useState } from 'react';
import {Product} from "../components/Products";
// JSX 컴포넌트가 아니라 공유하고 싶은 데이터를 리턴하면 됨.
// 값의 재사용이 아니라, 로직의 재사용이다!
// useState를 여러군데에서 사용한다고 해도 그 로직을 다시 쓰는 것이지, 값을 공유하는게 아니다.
// useProducts도 마찬가지로, 로직을 다시 쓰는 것이고 값을 공유하는게 아니다.
export default function useProducts({ salesOnly }: Product) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();
    const [products, setProducts] = useState<any >([]);
    useEffect(() => {
        console.log('fetching....');
        setLoading(true);
        setError(undefined);
        fetch(`data/${salesOnly ? 'sale_' : ''}products.json`)
            .then((res) => res.json())
            .then((data) => {
                console.log('🔥뜨끈한 데이터를 네트워크에서 받아옴');
                setProducts(data);
            })
            .catch((e) => setError('에러가 발생했음!'))
            .finally(() => setLoading(false));
        return () => {
            console.log('🧹 깨끗하게 청소하는 일들을 합니다.');
        };
    }, [salesOnly]);

    return [loading, error, products];
}
