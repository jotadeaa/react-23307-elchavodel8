import loading from '../assets/loading.gif';

export const Loading = () => {
    return (
        <div className="d-flex justify-content-center mt-5 mb-5">
            <img src={loading} alt="loading" />
        </div>
    )
}