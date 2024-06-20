/** @jsxImportSource @emotion/react */
import { useState } from "react";
import useCategory from "../../../hooks/useCategory";
import * as s from "./style";
import useGetMenus from "../../../hooks/useGetMenu";

function PosTableDetailPage(props) {
    const adminId = 1;
    const [categoryPageNum, setCategoryPageNum] = useState(1);
    const { categories, error: categoriesError } = useCategory(adminId, categoryPageNum); 
    const [categoryId, setCategoryId] = useState(0);
    const {
        menus,
        error: menusError,
        uniqueMenuCategoryNames,
      } = useGetMenus(adminId, categoryId);

      console.log(menus);

    const emptyArray = Array.from({ length: 11 - (categories ? categories.length : 0) }, (_, index) => index);

    return (
        <div css={s.layout}>
            <div css={s.container}>
                <div css={s.tableSection}>
                    <div css={s.tableHeader}>
                        <div>홀 1</div>
                        <div css={s.tableNumber}>👑👑12</div>
                    </div>
                    <div css={s.tableLayout}>
                        <table css={s.table}>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>메뉴</th>
                                    <th>수량</th>
                                    <th>금액</th>
                                    <th>옵션</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>마라탕 떡볶이</td>
                                    <td>1</td>
                                    <td>15,000</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div css={s.totalSection}>
                        <div css={s.selectLayout}>
                            <div css={s.quantityChange}>
                                <button css={s.cancelButton}>전체 취소</button>
                                <button css={s.cancelButton}>수량 변경</button>
                                <button css={s.cancelButton}>+</button>
                                <button css={s.cancelButton}>-</button>
                            </div>
                        </div>
                        <div css={s.calculation}>
                            <div css={s.totalPrice}>
                                <div>총 금액</div>
                                <div>999,999,999</div>
                            </div>
                            <div css={s.paymentLayout}>
                                <div>
                                    <button css={s.paymentButton}>현금결제</button>
                                </div>
                                <div>
                                    <button css={s.paymentButton}>카드결제</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div css={s.menuSection}>
                    <div css={s.menuTabs}>
                        <div css={s.menuBox}>
                            <button css={s.categoryButton} onClick={() => setCategoryId(0)}>전체</button>
                            {
                                categories?.map((category, index) => (
                                    <button key={index} css={s.categoryButton} onClick={() => setCategoryId(category.menuCategoryId)} >{category.menuCategoryName}</button>
                                ))
                            }
                            {
                                emptyArray.map((_, index) => (
                                    <button key={`empty-${index}`} css={s.categoryButton}></button>
                                ))
                            }
                            <div>
                                <button>&lt;</button>
                                <button>&gt;</button>
                            </div>
                        </div>
                    </div>
                    <div css={s.menuItems}>
                        <div css={s.menuItem}>
                            <div>마라 떡볶이</div>
                            <div>15,000</div>
                        </div>
                        
                    </div>
                    <div css={s.bottomButtons}>
                        <button>👑 인원수</button>
                        <button>등록완료</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PosTableDetailPage;
