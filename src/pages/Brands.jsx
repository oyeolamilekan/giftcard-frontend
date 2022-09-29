import useAxios from "../hooks/useAxios"
import CustomSupense from "../components/CustomSuspense";
import Brand from "../components/Brands";


export default function Brands() {
    const { response: brands, error: brandsError, loading: brandsLoading } = useAxios({
        method: 'get',
        url: '/brands',
        headers: JSON.stringify({ accept: '*/*' }),
    })

    return (
        <div className="container py-3">
            <div className="row row-cols-1 row-cols-md-3 mb-3 text-center d-flex justify-content-center">
                <CustomSupense
                    isLoading={brandsLoading}
                    isError={brandsError}
                >
                    {(brands ?? []).map((brand, key) => (
                        <Brand {...brand} key={key} />
                    ))}
                </CustomSupense>
            </div>
        </div>
    )
}
