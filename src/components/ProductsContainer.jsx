import Button from 'react-bootstrap/Button';

export default function ProductsContainer({ title, amount, logo, onClick }) {
    return (
        <div className="col">
            <div className='card mb-3 p-5'>
                <img src={logo} className="img-fluid rounded" />
                <br/>
                <p>{title} - {amount}</p>
                <Button variant="primary" onClick={onClick}>
                    Buy GiftCard
                </Button>
            </div>
        </div>
    )
}
