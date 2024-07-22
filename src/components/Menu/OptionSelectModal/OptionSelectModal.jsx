/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./style";
import useGetOption from "../../../hooks/useGetOption"; 

function OptionSelectModal({ closeModal, menuId, onApply }) {
  const adminId = 1;
  const { options, error } = useGetOption(adminId, menuId); 
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (
    optionTitleId,
    optionName,
    optionPrice,
    isChecked
  ) => {
    if (isChecked) {
      setSelectedOptions((prevSelectedOptions) => [
        ...prevSelectedOptions,
        { optionTitleId, optionName, optionPrice },
      ]);
    } else {
      setSelectedOptions((prevSelectedOptions) =>
        prevSelectedOptions.filter(
          (option) =>
            option.optionTitleId !== optionTitleId ||
            option.optionName !== optionName
        )
      );
    }
  };

  const handleApplyOptions = () => {
    console.log("선택된 옵션:", selectedOptions);
    if (onApply) {
      onApply(selectedOptions);
    }
    closeModal();
  };

  return (
    <div css={s.backdrop}>

    <div css={s.layout}>
      <div css={s.optionModal}>
        <div css={s.container}>
          <h1>옵션 목록</h1>
          <div>
            {error ? (
              <div>옵션 데이터 조회 오류: {error.message}</div>
            ) : options.length > 0 ? (
              options.map((optionItem, index) => (
                <div key={index} css={s.itemBox}>
                  <h3>{optionItem.titleName}</h3>
                  <div>
                    {optionItem.optionNames.map((name, idx) => (
                      <div key={idx} css={s.list}>
                        <label>
                          <input
                            type="checkbox"
                            onChange={(e) =>
                              handleCheckboxChange(
                                optionItem.optionTitleId,
                                name,
                                optionItem.optionPrices[idx],
                                e.target.checked
                              )
                            }
                          />
                          <span>
                            {name} + {optionItem.optionPrices[idx]}원
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div>옵션이 없습니다.</div>
            )}
          </div>
          <button onClick={handleApplyOptions} css={s.button}>
            옵션 변경하기
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default OptionSelectModal;
