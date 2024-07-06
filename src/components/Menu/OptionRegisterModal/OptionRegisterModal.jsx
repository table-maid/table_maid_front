/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { registerOption } from "../../../apis/api/menuManagentApi";
import useInsertOptionTitle from "../../../hooks/useInsertOptionTitle";
import useOptionTitle from "../../../hooks/useOptionTitle";
import * as s from "./style";
import { IoIosArrowDown } from "react-icons/io";

function OptionRegisterModal({
    optionModal,
    closeModal,
    options,
    menuId,
    menuName
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
                optionTitleId: optionSelectTitleId,
                optionName: optionName,
                optionPrice: optionPrice
            };
            console.log(params)
            await registerOption(params);
            alert("옵션 이름 추가가 완료되었습니다.");
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div css={s.optionModal}>
            <div css={s.modalHeader}>
                <h2>옵션 등록</h2>
                <button className="closeButton" onClick={closeModal}>x</button>
            </div>
            <div css={s.modalContent}>
                <div>
                    <h2>
                        {menuName}
                    </h2>
                </div>
                <div>
                    <label>옵션 타이틀 추가</label>
                    <input onChange={handleOptionTitleName} type="text" />
                    <button onClick={() => insertOptionTitle(adminId, menuId, optionTitle)}>추가</button>
                </div>
                <div css={s.selectWrapper}>
                    <label>옵션 내용 추가</label>
                    <select value={optionSelectTitleId} onChange={(e) => setOptionSlectTitleId(Number(e.target.value))}> 
                        <option value="0">타이틀 선택</option>
                        {optionsData.map(optionItem => (
                            <option key={optionItem.optionTitleId} value={optionItem.optionTitleId} data-name={optionItem.titleNames}>{optionItem.titleNames}</option>
                        ))}
                    </select>
                    <IoIosArrowDown className="select-arrow" />
                </div>
                <div>
                    <label>옵션 이름</label>
                    <input onChange={handleOptionName} type="text"/> 
                </div>
                <div>
                    <label>옵션 가격</label>
                    <input onChange={handleOptionPrice} type="text"/> 
                </div>
            </div>
            <div css={s.modalFooter}>
                <button onClick={insertOption}>추가</button>
                <button onClick={closeModal}>취소</button>
            </div>
        </div>
    );
}

export default OptionRegisterModal;
