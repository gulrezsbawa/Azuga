import React from "react";

function Progress() {
  return (
    <div className="modal" id="progress">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <div
              className="spinner-border"
              style={{ width: "6rem", height: "6rem" }}
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progress;
