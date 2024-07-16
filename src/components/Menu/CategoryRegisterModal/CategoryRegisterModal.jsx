/** @jsxImportSource @emotion/react */
import * as s from "./style";
import useCategoryInsert from '../../../hooks/useCategoryInsert';

function CategoryRegisterModal({companyName, setCategoryModal}) {
    const adminId = 1;
    const { categoryName, handleCategoryName, categoryInsert } =
    useCategoryInsert(adminId);

    return (
        <div css={s.backdrop}>
            <div css={s.menuModal}>
            <div css={s.modalHeader}>
                <h2>메뉴 등록</h2>
                <button className="closeButton" onClick={() => setCategoryModal(0)}>x</button>
            </div>
            <div css={s.modalContent}>
                
                <div>
                    <label>매장 이름</label> 
                    <div>
                        {companyName}
                    </div>
                </div>
                <div>
                    <label>카테고리 이름</label>
                    <div>
                    <input onChange={handleCategoryName} type="text" />
                    </div>
                </div>
            </div>
            <div css={s.modalFooter}>
                <button className="buttons" onClick={categoryInsert}>추가</button>
                <button className="buttons" onClick={() => setCategoryModal(0)}>취소</button>
            </div>
        </div>
        </div>
    );
}

export default CategoryRegisterModal;