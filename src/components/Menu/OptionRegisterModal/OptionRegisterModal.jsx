/** @jsxImportSource @emotion/react */
import { registerOption } from "../../../apis/api/menuManagentApi";
import useInsertOptionTitle from "../../../hooks/useInsertOptionTitle";
import useOptionTitle from "../../../hooks/useOptionTitle";
import * as s from "./style";

import React, { useState } from 'react';

function OptionRegisterModal({
    optionModal,
    closeModal,
    options,
    menuId
}) {
    const [adminId, setAdminId] = useState(1);
    const [optionName, setOptionName] = useState();
    const [optionPrice, setOptionPrice] = useState();

    const [optionTitle, setOptionTitle] = useState("");
    const [optionSelectTitleId, setOptionSlectTitleId] = useState();
    const { insertOptionTitle, Optionerror, refresh } = useInsertOptionTitle();
    const { optionTitleId, optionTitleName, error } = useOptionTitle(adminId, menuId, refresh);

    const optionsData = optionTitleId.map((id, index) => ({
        optionTitleId: id,
        titleNames: optionTitleName[index]
    }));

    const handleOptionTitleName = (e) => {
        setOptionTitle(e.target.value);
    };

    const handleOptionName = (e) => {
        setOptionName(e.target.value)
    }
    
    const handleOptionPrice = (e) => {
        setOptionPrice(e.target.value)
    }

    const insertOption = async () => {
        try {
            const params = {
                adminId: adminId,
                menuId: menuId,
                titleId: optionSelectTitleId,
                optionName: optionName,
                optionPrice: optionPrice
            };
            await registerOption(params);
            alert("옵션 이름 추가가 완료되었습니다.");
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div css={s.optionModal}>
            <div>
                <div>
                    옵션 타이틀 추가
                </div>
                <input onChange={handleOptionTitleName} type="text" name="" id="" />
                <button onClick={() => insertOptionTitle(adminId, menuId, optionTitle)}>추가</button>
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
                <div>
                    {options?.map((optionItem, index) => (
                        <div key={index}>
                            <h3>{optionItem.titleName}</h3>
                            <div>
                                {optionItem.optionNames.map((name, idx) => (
                                    <div key={idx}>
                                        {name} + {optionItem.optionPrices[idx]}원
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div onClick={closeModal}>x</div>
            </div>
        </div>
    );
}

export default OptionRegisterModal;