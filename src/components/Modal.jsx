import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from '../hooks/useForm';
import { useNavigate } from 'react-router-dom';

function MyModal({ title, id: productId, crypto, amount, showModal, handleClose }) {

    const navigate = useNavigate()

    const [values, handleChange] = useForm({
        name: "",
        email: "",
        senderName: "",
        message: "",
        currency: null,
    });

    const [btnState, setBtnState] = useState(false)

    const generateOrder = async (event) => {
        event.preventDefault();
        setBtnState(true)
        try {
            const data = { ...values, productId }
            const response = await axios.post("https://crypto-giftcard-production.up.railway.app/api/create_order", data)
            navigate(`/checkout/${response.data.id}`)
        } catch (error) {
            console.log(error)
        }
        setBtnState(false)
    }

    return (
        <>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Buy {amount} {title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={generateOrder}>
                        <input placeholder='Reciever name' name='name' value={values.name} onChange={handleChange} required />
                        <input placeholder='Reciever Email' name='email' value={values.email} onChange={handleChange} required />
                        <input placeholder='Sender name' name='senderName' value={values.senderName} onChange={handleChange} required />
                        <input placeholder='Message' name='message' value={values.message} onChange={handleChange} required />
                        <select id="country" name="currency" onChange={handleChange} value={values.asset} required>
                            <option disabled selected value> -- select an option -- </option>
                            {crypto.map((cr) => (
                                <option value={cr.shortTitle}>{cr.title}</option>
                            ))}
                        </select>
                        <div className='d-flex mt-4'>
                            <Button variant="primary" type='submit' disabled={btnState}>
                                {btnState ?
                                    "Processing" : "Proceed"}
                            </Button>
                        </div>
                    </form>
                </Modal.Body>

            </Modal>
        </>
    );
}


export default MyModal;