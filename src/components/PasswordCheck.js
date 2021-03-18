import React from "react";

function PasswordCheck(props) {
  let password = props.password;
  return (
    <div>
      <input
        value={password}
        type="password"
        onChange={(e) => props.handerPasswordChange(e.currentTarget.value)}
      />
    </div>
  );
}

export default PasswordCheck;
