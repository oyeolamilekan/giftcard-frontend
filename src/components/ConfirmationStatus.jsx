export default function ConfirmationStatus({ state }) {
    switch (state) {
        case "paid":
            return <div className="alert alert-primary">Payment recieved thanks for shopping with us</div>  
        case "processing":
            return <div className="alert alert-primary">Payment has been received and we are confirming from blockchain</div>  
        case "initiated":
            return <div className="alert alert-primary">Currently listening to your payment on the blockchain</div>  
        default:
            return <></>
    }
}