import React, { useState } from 'react';
import useProducts from '../hooks/use-products';
export type Product = {salesOnly: boolean}
export default function Products() {
    const [checked, setChecked] = useState(false);
    const [loading, error, products] = useProducts({ salesOnly: checked });
    const handleChange = () => setChecked((prev) => !prev);

    if (loading) return <p>Loading...</p>;

    if (error) return <p>{error}</p>;

    return (
        <>
            <label>
                <input type='checkbox' checked={checked} onChange={handleChange} />
                Show Only 🔥 Sale
            </label>
            <ul>
                {products.map((product: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; price: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                    <li key={product.id}>
                        <article>
                            <h3>{product.name}</h3>
                            <p>{product.price}</p>
                        </article>
                    </li>
                ))}
            </ul>
        </>
    );
}
