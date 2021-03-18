import "./App.css";
import axios from "axios";
import { useState } from "react";
import BooksList from "./components/BooksList";
import ContentDisplay from "./components/ContentDisplay";
import Progress from "./components/Progress";
import SearchBar from "./components/SearchBar";
import PasswordCheck from "./components/PasswordCheck";
import DisplayMinCharacterRequired from "./components/DisplayMinCharacterRequired";
import PasswordCheckList from "./components/PasswordCheckList";
const $ = require("jquery");
function App() {
  const [apiResponse, setApiResponse] = useState([]);
  const [authorText, setAuthorText] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const [minCharacterRequired, setMinCharacterRequired] = useState("");
  const passwordCheckList = [
    "Its length is at least 6",
    "It contains at least one digit",
    "It contains at least one lowercase English character.",
    "It contains at least one uppercase English character.",
    "It contains at least one special character. The special characters are: !@#$%^&*()-+",
  ];
  const [passwordCheckListValues, setPasswordCheckListValues] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const fetchData = () => {
    openModal("progress");
    $("#id_fetchButton").attr("disabled", true);
    axios
      .get("test.json")
      .then((res) => {
        closeModal("progress");
        $("#id_fetchButton").attr("disabled", false);
        let filteredRes = res.data.filter(
          (item) =>
            item.author.toLowerCase() === authorText.toLowerCase() &&
            item.title !== null &&
            item.title.trim() !== ""
        );
        setApiResponse(filteredRes);
        setAuthorText("");
        openModal("displayAuthorListModal");
      })
      .catch((err) => {
        closeModal("progress");
        console.log(err);
      });
  };

  const fetchContent = (articleId) => {
    openModal("progress");
    let filteredContent = apiResponse.filter(
      (item) => item.articleId === articleId
    );

    setContent(filteredContent[0].content);
    closeModal("progress");
    openModal("displayContentModal");
  };

  const openModal = (modelName) => {
    $("#" + modelName).show();
  };

  const closeModal = (modelName) => {
    $("#" + modelName).hide();
  };

  const handlerNewest = () => {
    let sortedList = apiResponse.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
    let newSortedList = [...sortedList];
    setApiResponse(newSortedList);
  };
  const handlerTop = () => {
    let sortedList = apiResponse.sort(function (a, b) {
      return b.upvotes - a.upvotes;
    });
    let newSortedList = [...sortedList];
    setApiResponse(newSortedList);
  };
  const handerPasswordChange = (password) => {
    setPassword(password);
    checkCondition(password);
  };
  const checkCondition = (password) => {
    let passcondition = 0;
    let failedcondition = 0;
    let minAllowed = 6;
    let passwordLength = password.length;
    let regexUppercase = /[A-Z]/; // check if upper case is present
    let regexLowercase = /[a-z]/; // check if lower case is present
    let regexDigitcase = /[0-9]/; // check if digit is present
    let regexSpecialCharacter = /[!@#$%^&*()-+]/; // check if special character is present
    let isLengthCorrect = password.length >= minAllowed;
    let isUpperCase = regexUppercase.test(password);
    let isLowerCase = regexLowercase.test(password);
    let isDigitPresent = regexDigitcase.test(password);
    let isSpecialCharacter = regexSpecialCharacter.test(password);

    if (isUpperCase) {
      passcondition++;
    } else {
      failedcondition++;
    }

    if (isLowerCase) {
      passcondition++;
    } else {
      failedcondition++;
    }
    if (isDigitPresent) {
      passcondition++;
    } else {
      failedcondition++;
    }
    if (isSpecialCharacter) {
      passcondition++;
    } else {
      failedcondition++;
    }
    if (passwordLength === 0) {
      setMinCharacterRequired("");
    } else if (passwordLength + failedcondition < minAllowed) {
      let num = minAllowed - passwordLength;
      setMinCharacterRequired(
        "Additional " + num + " more characters required"
      );
    } else if (
      passwordLength + failedcondition >= minAllowed &&
      failedcondition !== 0
    ) {
      setMinCharacterRequired(
        "Additional " + failedcondition + " more characters required"
      );
    } else if (isLengthCorrect && failedcondition === 0) {
      setMinCharacterRequired("Your password is strong");
    } else {
      setMinCharacterRequired("somethinge went wrong");
    }

    setPasswordCheckListValues([
      isLengthCorrect,
      isDigitPresent,
      isLowerCase,
      isUpperCase,
      isSpecialCharacter,
    ]);
  };
  return (
    <div className="App">
      <div className="row  text-left">
        <div className="col-sm-4">
          <label id="lbl_authorName">Author Name : </label>
        </div>
        <div className="col-sm-8">
          <SearchBar
            authorText={authorText}
            setAuthorText={setAuthorText}
            fetchData={fetchData}
          />
        </div>
      </div>
      <div className="row mt-3  text-left">
        <div className="col-sm-4">
          <label id="lbl_password">Password : </label>
        </div>
        <div className="col-sm-8">
          <PasswordCheck
            password={password}
            handerPasswordChange={handerPasswordChange}
          />
        </div>
      </div>
      <div className="row mt-3 text-left">
        <PasswordCheckList
          passwordCheckList={passwordCheckList}
          passwordCheckListValues={passwordCheckListValues}
        />
      </div>
      <DisplayMinCharacterRequired
        minCharacterRequired={minCharacterRequired}
      />
      <BooksList
        apiResponse={apiResponse}
        closeModal={closeModal}
        fetchContent={fetchContent}
        handlerNewest={handlerNewest}
        handlerTop={handlerTop}
      />
      <ContentDisplay content={content} closeModal={closeModal} />
      <Progress />
    </div>
  );
}

export default App;
