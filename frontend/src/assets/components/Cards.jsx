import { useNavigate } from "react-router-dom";

function Cards() {
  const navigate = useNavigate();
  const handleOfflineNavigate = () => {
    navigate("/offline-sudoku");
  };
  const handleOnlineNavigate = () => {
    navigate("/online-sudoku");
  };
  const clientConnect = () => {
    navigate("/connect");
  };
  return (
    <div>
      <div className="container-fluid">
        <div className="row  mt-2">
          <div className="col-md-4">
            <div className="card mt-4" onClick={handleOfflineNavigate}>
              <div className="card-body">
                <h5 className="card-title">Sudoku Offline</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mt-4" onClick={handleOnlineNavigate}>
              <div className="card-body">
                <h5 className="card-title">Sudoku Online</h5>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card  mt-4" onClick={clientConnect}>
              <div className="card-body">
                <h5 className="card-title">Play with timer</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
