import React from "react";

function ContentDisplay(props) {
  let content = props.content;
  return (
    <div className="modal" id="displayContentModal">
      <div className="modal-dialog">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header">
            <h4 className="modal-title">Content</h4>
            <button
              type="button"
              className="close"
              onClick={() => props.closeModal("displayContentModal")}
            >
              ×
            </button>
          </div>
          {/* Modal body */}
          <div className="modal-body">
            <p>{content}</p>
          </div>
          {/* Modal footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn  btn-sm btn-danger"
              onClick={() => props.closeModal("displayContentModal")}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentDisplay;
