/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import * as s from "./style";
import { deleteOption, deleteOptionTitle, searchMenuDetail, updateMenuDetail, updateMenuOption, updateMenuOptionTitle } from "../../../apis/api/menuManagentApi";
import useCategory from "../../../hooks/useCategory";
import OptionRegisterModal from "../../../components/Menu/OptionRegisterModal/OptionRegisterModal";
import useGetOption from '../../../hooks/useGetOption';
import useOptionTitle from '../../../hooks/useOptionTitle';
import MenuImg from '../../../components/MenuImg/MenuImg';

function MenuManagementDetailPage() {

    const adminId = 1;
    const storeName = "테스트";
    const { menuId } = useParams();
    const { categories } = useCategory(adminId);
    const [optionModal, setOptionModal] = useState(false);
    const navigate = useNavigate();
    const [menuDetail, setMenuDetail] = useState({
            menuCode: '',
            menuState: 1,
            optionPrice: '',
            menuName: '',
            recommendMenu: 1,
            menuCategoryId: '',
            menuImgUrl: '',
            optionList:[]
        });
    
    const [updateOptionData, setUpdateOptionData] = useState({
        adminId: adminId,
        menuId: menuId,
        optionNameId: "",
        optionName:'',
        optionPrice:0,
        titleId:'',
    });
    
    const [updateState, setUpdateState] = useState(0);
    const [updateOptionTitleName, setUpdateOptionTitleName] = useState({
        adminId:adminId,
        menuId:menuId,
        optionTitleId:0,
        titleName:''
    });


    useEffect(() => {
        getMenuDetail(); 

    }, []);


    useEffect(() => {
    }, [updateOptionData]);

    const getMenuDetail = async () => {
        try {
            const param = { adminId, menuId };
            const response = await searchMenuDetail(param);
            setMenuDetail(response.data[0]);
            console.log(response.data[0])
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, type, checked, value } = e.target;
        setMenuDetail(prevDetail => ({
            ...prevDetail,
            [name]: type === 'checkbox' ? (checked ? 2 : 1) : value
        }));
    };

    const handleCategoryChange = (e) => {
        const { value } = e.target;
        setMenuDetail(prevDetail => ({ ...prevDetail, menuCategoryId: Number(value) }));
    };

    const handleUpdateMenuDetail = async () => {
        try {
            await updateMenuDetail(menuDetail);
            alert("메뉴 수정 완료");
            navigate("/menu/management/list");
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateOption = async () => {
        try {
            await updateMenuOption(updateOptionData);
            alert("옵션 수정 완료");
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const handleMenuStateChange = (e) => {
        const { value } = e.target;
        setMenuDetail(prevDetail => ({ ...prevDetail, menuState: parseInt(value) }));
    };

    const handleOptionTitleName = (e) => {
        const newTitleName = e.target.value;
        setUpdateOptionTitleName(prevData => ({
            ...prevData,
            titleName: newTitleName
        }));
    };

    const handleOptionName = (e) => {
        const newOptionName = e.target.value;
        setUpdateOptionData(prevData => ({
            ...prevData,
            optionName: newOptionName
        }));
    };

    const handleOptionPrice = (e) => {
        const newOptionPrice = e.target.value;
        setUpdateOptionData(prevData => ({
            ...prevData,
            optionPrice: newOptionPrice
        }));
    };

    const updateOptionTitle = async () => {
        try {
            await updateMenuOptionTitle(updateOptionTitleName)
            alert("메뉴 제목 수정이 완료되었습니다.")
            window.location.reload();
        } catch (error) {
            console.error(error)
        }
    }
    
    const handelDeleteOptionTitle = async (optionTitleId) => {
        try {
            const data = {
                adminId: adminId,
                optionTitleId: optionTitleId

            }
            await deleteOptionTitle(data)
            alert("메뉴 제목 삭제가 완료되었습니다.")
            window.location.reload();

        } catch (error) {
            console.error(error)
        }
    }

    const handelDeleteOption = async (optionNameId) => {
        try {
            const data = {
                adminId: adminId,
                optionNameId: optionNameId

            }
            await deleteOption(data)
            alert("메뉴 삭제가 완료되었습니다.")
            window.location.reload();
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div css={s.layout}>
            <div>
                <h2>매장단품메뉴관리 등록/수정</h2>
                <button onClick={handleUpdateMenuDetail}>메뉴 저장</button>
            </div>
            <div>
                <div style={{display:"flex"}}>
                    <div>
                        <div>
                            <label>매장명</label>
                            <input type="text" name="storeName" value={storeName} disabled />
                        </div>
                        <div>
                            <label>매뉴코드</label>
                            <input type="text" name="menuCode" value={menuDetail?.menuCode} disabled />
                        </div>
                        <div>
                            <label>판매상태</label>
                            <select name="menuState" value={menuDetail?.menuState} onChange={handleMenuStateChange}>
                                <option value={1}>판매</option>
                                <option value={2}>매진</option>
                            </select>
                        </div>
                        <div>
                            <label>판매가</label>
                            <input type="text" name="menuPrice" value={menuDetail?.menuPrice} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>메뉴명</label>
                            <input type="text" name="menuName" value={menuDetail?.menuName} onChange={handleInputChange} />
                        </div>
                        <div>
                            <input type="checkbox" name="recommendMenu" checked={menuDetail?.recommendMenu === 2} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>카테고리 선택</label>
                            <select name="categoryId" value={menuDetail?.menuCategoryId} onChange={handleCategoryChange}>
                                <option value="선택">선택</option>
                                {categories?.map(cat => (
                                    <option key={cat.menuCategoryId} value={cat.menuCategoryId}>
                                        {cat.menuCategoryName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div> 
                        <MenuImg adminId={adminId} menuImgUrl={menuDetail.menuImgUrl} menuId={menuId} />
                    </div>
                </div>
                {optionModal && (
                    <OptionRegisterModal
                        optionModal={optionModal}
                        closeModal={() => setOptionModal(false)}
                        menuId={menuId}
                    />
                )}
                <h2>메뉴 옵션</h2>
                <div css={s.optionLayout}>
                    <div>
                        <button onClick={() => setOptionModal(true)}>옵션 추가</button>
                        <div>* 옵션 제목 삭제 시 해당하는 옵션 내용이 모두 삭제되니 주의해주세요.</div>
                    </div>
                    <div css={s.optionManagementLayout}>
                        <div css={s.optionManagementTitleLayout}>
                            {menuDetail.optionList?.map((optionItem, index) => {
                                if (!optionItem || !optionItem.optionTitleName) return null; 
                                
                                return (
                                    <div key={index}>
                                        <h3>{optionItem.optionTitleName}
                                            { 
                                            updateState === 0 ?
                                                <>
                                                    <button onClick={() =>{
                                                        setUpdateOptionTitleName(prevData =>({
                                                            ...prevData,
                                                            optionTitleId: optionItem.optionTitleId,
                                                            titleName: optionItem.titleName
                                                        }));
                                                        setUpdateState(2);
                                                    }}>
                                                    수정
                                                    </button>
                                                    <button onClick={() => handelDeleteOptionTitle(optionItem.optionTitleId)}>삭제</button>
                                                </>
                                                :
                                                <></>
                                            }
                                        </h3>
                                        <div>
                                            {optionItem.optionNames.map((name, idx) => {
                                                if (!name || !optionItem.optionPrices[idx]) return null; 
                                                
                                                return (
                                                    <div key={idx}>
                                                        {name} + {optionItem.optionPrices[idx]}원
                                                        {updateState === 0 ? (
                                                            <>
                                                                <button onClick={() => {
                                                                    setUpdateOptionData(prevData => ({
                                                                        ...prevData,
                                                                        optionNameId: optionItem.optionNameIds[idx], 
                                                                        optionName: name,
                                                                        optionPrice: optionItem.optionPrices[idx],
                                                                        titleId: optionItem.optionTitleId
                                                                    }));
                                                                    setUpdateState(1);
                                                                }}>
                                                                수정
                                                                </button>
                                                                <button onClick={() => handelDeleteOption(optionItem.optionNameIds[idx])}>삭제</button>
                                                            </>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {
                            updateState === 1 ?
                            <div css={s.optionManagementContentLayout}>
                                <div>
                                    {
                                        updateState === 0 ?
                                        <div>
                                            <button>삭제</button>
                                        </div>
                                        :
                                        <div>
                                            <button onClick={() => setUpdateState(0)}>뒤로가기</button>
                                            <button onClick={handleUpdateOption}>저장</button>
                                        </div>
                                    }
                                </div>
                                <div>옵션 타이틀</div>
                                <input type="text" value={updateOptionData?.titleName} disabled/>  
                                <div>옵션 이름</div>
                                <input type="text" onChange={handleOptionName} value={updateOptionData?.optionName} />
                                <div>옵션 가격</div>
                                <input type="number" onChange={handleOptionPrice} value={updateOptionData?.optionPrice} />
                                <div>옵션 번호</div>
                                <input type="number" value={updateOptionData?.optionNameId} disabled/>
                            </div>   
                            : updateState === 2 ?
                            <div css={s.optionManagementContentLayout}>
                                <div>
                                    {
                                        updateState === 0 ?
                                        <></>
                                        :
                                        <div>
                                            <button onClick={() => setUpdateState(0)}>뒤로가기</button>
                                            <button onClick={updateOptionTitle}>저장</button>
                                        </div>
                                    }
                                </div>
                                <div>옵션 타이틀 이름</div>
                                <input type="text" onChange={handleOptionTitleName} value={updateOptionTitleName.titleName}  />
                            </div>       
                            :<></>                      
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuManagementDetailPage;
