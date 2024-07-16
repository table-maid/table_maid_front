/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./style";
import { IoIosArrowDown } from "react-icons/io";


function MenuRegisterModal({ categories, categoryId, setCategoryId, insertMenu, categoryName, recommend, handleRecommendChange, setMenuModal }) {
    const [menuName, setMenuName] = useState();
    const [menuPrice, setMenuPrice] = useState();

    return (
            <div css={s.backdrop}>
        <div css={s.menuModal}>

            <div css={s.modalHeader}>
                <h2>메뉴 등록</h2>
                <button className="closeButton" onClick={() => setMenuModal(0)}>x</button>
            </div>
            <div css={s.modalContent}>
                <div css={s.selectWrapper}>
                    <label htmlFor="categories">카테고리 선택</label>
                    <select
                        name="categories"
                        id="categories"
                        value={categoryId}
                        onChange={(e) => setCategoryId(Number(e.target.value))}
                    >
                        <option value={0}>카테고리 선택</option>
                        {categories.map((cat) => (
                            <option
                                key={cat.menuCategoryId} 
                                value={cat.menuCategoryId}
                                data-name={cat.menuCategoryName}
                            >
                                {cat.menuCategoryName}
                            </option>
                        ))} 
                    </select>
                    <IoIosArrowDown className="select-arrow" />
                </div>
                <div>
                    <label>메뉴 이름</label> 
                    <input onChange={(e) => setMenuName(e.target.value)} type="text"/>
                </div>
                <div>
                    <label>메뉴 가격</label>
                    <input onChange={(e) => setMenuPrice(e.target.value)} type="text"/>
                </div>
                <div className="checkboxContainer">
                    <label>메뉴 추천</label>
                    <input type="checkbox" name="recommend" checked={recommend} onChange={handleRecommendChange}/>
                </div>
            </div>
            <div css={s.modalFooter}>
                <button className="buttons" onClick={() => insertMenu(menuName, menuPrice, categoryId, categoryName)}>추가</button>
                <button className="buttons" onClick={() => setMenuModal(0)}>취소</button>
            </div>
            </div>
        </div>
    );
}

export default MenuRegisterModal;
