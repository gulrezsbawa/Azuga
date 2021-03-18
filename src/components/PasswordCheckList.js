import React from "react";

function PasswordCheckList(props) {
  return (
    <div>
      <ul className="ul_CheckList">
        {props.passwordCheckList.map((item, index) => {
          let clsName = props.passwordCheckListValues[index] ? "checked" : "";
          return (
            <li className={clsName} key={index + "_" + item}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PasswordCheckList;
