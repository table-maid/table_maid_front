/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./style";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

function Agreement({ title, content, setCheck, check, isAllChecked, noToggle }) {
  const [isShow, setShow] = useState(false);

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
        <div
          css={s.checkBox(check[title])}
          onClick={handleCheckClick}
        >
          {check[title] ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </div>
        <h3>{title}</h3>
      </div>
      {!noToggle && (
        <>
          <span onClick={() => setShow((prev) => !prev)}>
            {isShow ? "접기" : "펼치기"}
          </span>
          <div>
            <textarea css={s.textarea(isShow)} readOnly value={content} />
          </div>
        </>
      )}
    </div>
  );
}

export default Agreement;
