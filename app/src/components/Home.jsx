import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export const Home = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Link to={'/equipos'}>
                            <Button variant="primary">Equipos</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
};