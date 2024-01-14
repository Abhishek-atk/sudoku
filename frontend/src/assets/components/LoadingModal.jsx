import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

function LoadingModal() {
  const navigate = useNavigate();
  function goBackHome() {
    navigate("/");
  }
  return (
    <>
      <div id="modalDiv">
        <Oval
          visible={true}
          height="50"
          width="50"
          color="#4fa94d"
          ariaLabel="oval-loading"
          wrapperStyle={{ display: "inline-block" }}
          wrapperClass="mx-auto"
        />
        <p>connecting...</p>
        <button id="homeButton" onClick={goBackHome}>
          Go Home
        </button>
      </div>
    </>
  );
}

export default LoadingModal;
