/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

function Modal({ message }) {
const navigate = useNavigate()
    function goBackHome() {
        navigate('/')
    }
  return (
    <div>
      <div id="modalDiv">
        <p>{message}</p>
        <button id="homeButton" onClick={goBackHome}>Go Home</button>
      </div>
    </div>
  );
}

export default Modal;
