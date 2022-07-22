import img from './Spinner-loading.gif'

const Spinner = () => {
    return (
        <img style={{ display: 'block', width: "50px", height: "50px",objectFit: 'contain', margin: "0 auto"}}  src={img} alt="Error"/>
    )
}

export default Spinner;