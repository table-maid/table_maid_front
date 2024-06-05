/** @jsxImportSource @emotion/react */
import * as s from "./style";

function MenuRegisterModal({ categories, categoryId, setCategoryId, setMenuName, setMenuPrice, insertMenu, categoryName, recommend, handleRecommendChange, setMenuModal }) {
    return (
        <div css={s.menuModal}>
            <div>
                <label htmlFor="categories" style={{marginRight:"10px"}}>카테고리 선택</label>
                <select
                    style={{ border: "1px solid black", marginRight: "10px" }}
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
                <div>메뉴이름</div> 
                <input onChange={(e) => setMenuName(e.target.value)} style={{border:"1px solid black"}}  type="text"/>
                <div>메뉴 가격</div>
                <input onChange={(e) => setMenuPrice(e.target.value)} style={{border:"1px solid black"}}  type="text"/>
                <button onClick={() => insertMenu(categoryId, categoryName)}>추가</button>
                <div>메뉴 추천</div>
                <div>
                <input type="checkbox" name="recommend" checked={recommend} onChange={handleRecommendChange}/>
                </div>
                <div onClick={() => setMenuModal(0)}>x</div>
            </div>
        </div>
    );
}

export default MenuRegisterModal;
