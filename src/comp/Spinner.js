import Spin from "../img/Spinner.gif";

const Spinner = (props) => {
    return (
        <div style={props.bodyDarkStyle} className="text-center">
            <img id="spinner-img" src={Spin} alt="Loading..." />
        </div>
    )
}

export default Spinner;