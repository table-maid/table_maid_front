/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./style";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

function AgreementAccordion({ title, content, setCheck, check, isAllChecked }) {
  const [isShow, setShow] = useState(false);
  const handleClick = () => {
    setShow(() => !isShow);
  };

  const handleCheckClick = () => {
    setCheck((prev) => {
      if (title === "전체동의") {
        const newCheck = { ...prev };
        Object.keys(newCheck).forEach((key) => {
          newCheck[key] = !isAllChecked;
        });
        return newCheck;
      } else {
        return {
          ...prev,
          [title]: !prev[title],
        };
      }
    });
  };

  return (
    <div css={s.container}>
      <div css={s.checkContainer}>
        <div css={s.checkBox} onClick={handleCheckClick}>
          {check[title] ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </div>
        <h3>{title}</h3>
      </div>
      <span onClick={handleClick}>{isShow ? "접기" : "펼치기"}</span>
      <div>
        <textarea css={s.textarea(isShow)}>{content}</textarea>
      </div>
    </div>
  );
}

export default AgreementAccordion;
