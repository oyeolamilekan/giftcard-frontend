import { useState } from "react";
import { useParams } from "react-router-dom";
import MyModal from "../components/Modal";
import useAxios from "../hooks/useAxios"
import CustomSupense from "../components/CustomSuspense";
import ProductsContainer from "../components/ProductsContainer";

export default function Products() {

    const [productData, setProductData] = useState({});

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleProductData = (data) => setProductData(data)

    let { id } = useParams();

    const { response: asset, error: assetError, loading: assetLoading } = useAxios({
        method: 'get',
        url: '/accepted_crypto',
        headers: JSON.stringify({ accept: '*/*' }),
    })

    const { response: products, error: productsError, loading: prodcutLoading } = useAxios({
        method: 'get',
        url: `/products/${id}`,
        headers: JSON.stringify({ accept: '*/*' }),
    })


    return (
        <div>
            <CustomSupense
                isLoading={assetLoading && prodcutLoading}
                isError={assetError && productsError}
            >
                <div className="container py-3">
                    <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                        {(products ?? []).map((product, key) => (
                            <>
                                <ProductsContainer {...product} key={key} onClick={() => {
                                    handleShow();
                                    handleProductData(product)
                                }} />
                            </>
                        ))}
                    </div>
                </div>
                <MyModal handleClose={handleClose} showModal={show} crypto={asset}  {...productData} />
            </CustomSupense>
        </div>
    )
}
