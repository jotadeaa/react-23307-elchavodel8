import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Buscador.css"


export const Buscador = () => {
    const navigate = useNavigate()
    // función que capture lo que ingresamos en el buscador y lo envia a la URL

    const [searchText, setSearchText] = ("")

    const handleSubmit = (e) => {
        e.preventDefault();   
        navigate(`/search=${searchText}`);

    }

    return (
        <form className="buscadorContainer" onSubmit={handleSubmit}>
            <div className="buscadorBox">
                <input
                className="buscadorInput"
                    type="text"
                    value={searchText}
                    onChange={(e)=>setSearchText(e.target.value)}
                />
                <button type="submit"
                    className="buscadorButton"><FaSearch /></button>
            </div>
        </form>
    )
}