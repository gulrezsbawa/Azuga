import React from "react";

function SearchBar(props) {
  let authorText = props.authorText;
  return (
    <div>
      <input
        value={authorText}
        onChange={(e) => props.setAuthorText(e.currentTarget.value)}
      />
      <button
        disabled={authorText.trim() === "" || authorText === null}
        onClick={() => props.fetchData()}
        id="id_fetchButton"
        className="btn btn-sm btn-info ml-3"
      >
        Fetch
      </button>
    </div>
  );
}

export default SearchBar;
