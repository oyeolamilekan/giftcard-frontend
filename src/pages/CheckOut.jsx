import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";
import ConfirmationStatus from "../components/ConfirmationStatus";
import CustomSupense from "../components/CustomSuspense";
import useAxios from "../hooks/useAxios";

export default function CheckOut() {
    const [listenToTransaction, setListenToTransaction] = useState(false)

    const { VITE_BASE_URL } = import.meta.env

    const [giftCardResponse, setGiftCardResponse] = useState({});

    let numberOfConfirmation = 0

    let { id } = useParams();

    const { response: order, error: orderError, loading: orderLoading } = useAxios({
        method: 'get',
        url: `/order_status/${id}`,
        headers: JSON.stringify({ accept: '*/*' }),
    })

    const confirmRequest = async () => {
        try {
            numberOfConfirmation++

            setListenToTransaction(true);

            const myInterval = setInterval(myTimer, 1000);

            async function myTimer() {
                const response = await axios.get(`${VITE_BASE_URL}/order_status/${id}`)

                const { data } = response

                if (data.state == 'paid' || numberOfConfirmation > 50) {
                    setListenToTransaction(false);
                    setGiftCardResponse(data)
                    myStopFunction()
                } else {
                    if (giftCardResponse.state !== data.state) {
                        setGiftCardResponse(data)
                    }
                }
            }

            function myStopFunction() {
                clearInterval(myInterval);
            }

        } catch (error) {
            setListenToTransaction(false);

        }
    }


    return (
        <CustomSupense
            isLoading={orderLoading}
            isError={orderError}
        >
            <div className="d-flex flex-column align-items-center mt-3">
                <ConfirmationStatus state={giftCardResponse?.state ?? ""} />
                <div className="card text-center">
                    <div className="card-body d-flex flex-column align-items-center">
                        <QRCode value={order?.recieveAddress ?? ""} className="d-flex justify-content-center" />
                        <br />
                        <div>Send {order?.expectedAmount ?? 0} of {order?.expectedCurrency ?? ""} to the address above to process your transaction</div>
                        <br />
                        <Button onClick={confirmRequest} disabled={listenToTransaction}>{listenToTransaction ? "Listening to the blockchain" : "I have paid"}</Button>
                    </div>
                </div>
            </div>
        </CustomSupense>
    )
}
