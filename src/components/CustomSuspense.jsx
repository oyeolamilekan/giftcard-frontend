/**
 * Changes depending the state value being returned
 *
 * @export
 * @param {*} {
 *   children -- The child component being passed in,
 *   fallBackLoading,
 *   fallBackError,
 *   isLoading,
 *   isError
 * }
 * @returns React component
 */
export default function CustomSupense({
    children,
    fallBackEmpty,
    isLoading,
    isEmpty,
    isError
}) {
    if (isError)
        return <div className="text-center mt-4">Something is bad</div>;
    else if (isLoading)
        return <div className="text-center mt-4">Loading boss</div>
    else if (isEmpty)
        return <>{fallBackEmpty}</>
    else
        return <>{children}</>
}