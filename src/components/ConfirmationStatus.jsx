export default function ConfirmationStatus({ state }) {
    switch (state) {
        case "paid":
            return <div className="alert alert-primary">Payment received thanks for shopping with us.</div>  
        case "processing":
            return <div className="alert alert-secondary">Payment received and the transaction is currently being processed.</div>  
        case "initiated":
            return <div className="alert alert-info">Your transaction is currently being processed.</div>  
        default:
            return <></>
    }
}