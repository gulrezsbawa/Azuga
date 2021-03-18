import React from "react";

function BooksList(props) {
  let apiResponse = props.apiResponse;

  return (
    <div className="modal" id="displayAuthorListModal">
      <div className="modal-dialog">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header">
            <h4 className="modal-title">Books</h4>
            <button
              type="button"
              className="close"
              onClick={() => props.closeModal("displayAuthorListModal")}
            >
              ×
            </button>
          </div>
          {/* Modal body */}
          <div className="modal-body">
            <table className="table table-bordered" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Upvotes</th>
                  <th>Dates</th>
                </tr>
              </thead>
              <tbody id="BookListBody">
                {apiResponse.length > 0 ? (
                  apiResponse.map((item) => {
                    return (
                      <tr className="tdBookList" key={item.articleId}>
                        <td>
                          <button
                            onClick={() => props.fetchContent(item.articleId)}
                            className="btn btn-link"
                          >
                            {item.title}
                          </button>
                        </td>
                        <td>{item.upvotes}</td>
                        <td>{item.date}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr id="noResultTD">
                    <td colSpan="4" className="text-center p-4">
                      No Results
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Modal footer */}
          <div className="modal-footer">
            {apiResponse.length > 0 ? (
              <>
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => props.handlerNewest()}
                >
                  Newest
                </button>
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => props.handlerTop()}
                >
                  Top
                </button>
              </>
            ) : null}
            <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={() => props.closeModal("displayAuthorListModal")}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BooksList;
