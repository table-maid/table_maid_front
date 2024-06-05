/** @jsxImportSource @emotion/react */
import * as s from "./style";

// OptionRegisterModal.js
// OptionRegisterModal.js

import React from 'react';

function OptionRegisterModal({
    optionModal,
    handleOptionTitleName,
    insertOptionTitle,
    optionsData,
    setOptionSlectTitleId,
    handleOptionName,
    handleOptionPrice,
    insertOption,
    closeModal 
}) {
    return (
        <div css={s.optionModal}>
            <div>
                <div>
                    옵션 타이틀 추가
                </div>
                <input onChange={handleOptionTitleName} type="text" name="" id="" />
                <button onClick={insertOptionTitle}>추가</button>
                <div>
                    옵션 내용 추가
                </div>
                <div>
                    <select value={optionsData.optionTitleId} onChange={(e) => setOptionSlectTitleId(Number(e.target.value))}> 
                        <option value="0">타이틀 선택</option>
                        {optionsData.map(optionItem => (
                            <option key={optionItem.optionTitleId} value={optionItem.optionTitleId} data-name={optionItem.titleNames}>{optionItem.titleNames}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <input onChange={handleOptionName} type="text"/> 이름
                </div>
                <div>
                    <input onChange={handleOptionPrice} type="text"/> 가격
                </div>
                <div><button onClick={insertOption}>추가</button></div>
                <div onClick={closeModal}>x</div>
            </div>
        </div>
    );
}

export default OptionRegisterModal;
