import { Link } from "react-router-dom"

export default function Brand({ title, logo, brandProductId }) {
    return (
        <div className="col">
            <Link to={`product/${brandProductId}`}>
                <div className="card mb-4 rounded-3 shadow-sm">
                    <div className="card-body">
                        <img src={logo} className="img-fluid rounded"/>
                        <br/>
                        <br/>
                        <p>{title}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}
