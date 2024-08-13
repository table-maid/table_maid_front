/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import useCategory from "../../../hooks/useCategory";
import useGetMenus from "../../../hooks/useGetMenu";
import useGetOption from "../../../hooks/useGetOption";
import PosMenuOptionsModal from "../../../components/Pos/PosMenuOptionsModal";
import { tablesState, selectedTableIndexState, groupPaymentState } from "../../../atoms/PosStateAtom";
import * as s from "./style";

function PosTableDetailPage(props) {
    const adminId = 1;
    const { tableId } = useParams();
    const [categoryPageNum, setCategoryPageNum] = useState(1);
    const [menuPageNum, setMenuPageNum] = useState(1);
    const { categories, error: categoriesError } = useCategory(adminId, categoryPageNum); 
    const [categoryId, setCategoryId] = useState(0);
    const [menuId, setMenuId] = useState(0);
    const { menus, error: menusError, uniqueMenuCategoryNames } = useGetMenus(adminId, categoryId, menuPageNum);
    const { options, error: optionsError } = useGetOption(adminId, menuId);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [menuCount, setMenuCount] = useState(1);
    const [checkedItems, setCheckedItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    
    const [tables, setTables] = useRecoilState(tablesState);
    const selectedTableIndex = useRecoilValue(selectedTableIndexState);
    const [groupPayment] = useRecoilState(groupPaymentState); // 단체지정 상태


    const emptyCategoryArray = Array.from({ length: 5 - (categories ? categories.length : 0) }, (_, index) => index);
    const emptyMenuArray = Array.from({ length: 25 - (menus ? menus.length : 0) }, (_, index) => index);

    const totalCategoryPages = Math.ceil((categories ? categories.length : 0) / 4);
    const totalMenuPages = Math.ceil((menus ? menus.length : 0) / 24);

    useEffect(() => {  
        const savedItems = JSON.parse(localStorage.getItem(`table${tableId}`)) || [];  
        console.log(savedItems[0]) 
        setSelectedItems(savedItems);
        console.log(selectedItems) 
 
    }, [menus]);

    useEffect(() => { 
        const currentTable = tables[selectedTableIndex] || {};
        setSelectedItems(currentTable.selectedItems || []);
        setTotalPrice(currentTable.totalPrice || 0);
    }, [tables, selectedTableIndex]);

    const calculateTotalPrice = (selectedItems) => {
        return selectedItems.reduce((acc, item) => {
            return acc + (item.menu.menuPrice + item.optionTotalPrice) * item.count;
        }, 0);
    }

    useEffect(() => {
        const total = calculateTotalPrice(selectedItems);
        setTotalPrice(total);
        console.log(total);
    }, [selectedItems]);

    const openModal = (menuId) => {
        setMenuId(menuId);
        setSelectedOptions([]);
        setMenuCount(1);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const updateGroupItems = (groupId, newItems) => {
        const newTables = tables.map((table, index) => {
            if (groupPayment[index]?.groupId === groupId) {
                return {
                    ...table,
                    selectedItems: newItems,
                    totalPrice: newItems.reduce((sum, item) => sum + (item.menuPrice + item.optionTotalPrice) * item.menuCount, 0),
                };
            }
            return table;
        });
        setTables(newTables);
    };

    const handleAddItem = (count, options) => {
        const selectedMenu = menus.find(menu => menu.menuId === menuId);
        console.log(options)
        const optionTotalPrice = options.reduce((total, opt) => total + opt.optionPrice, 0);
        const newItem = {
            menu: selectedMenu,
            count,
            options,
            tableNumber: tableId,
            optionTotalPrice: optionTotalPrice
        };
        const newSelectedItems = [...selectedItems, newItem];
        const tableKey = `table${tableId}`;
        localStorage.setItem(tableKey, JSON.stringify(newSelectedItems));

        const groupId = groupPayment[selectedTableIndex]?.groupId;
        if (groupId) {
            updateGroupItems(groupId, newSelectedItems);
        } else {
            const updatedTables = [...tables];
            updatedTables[selectedTableIndex] = { ...updatedTables[selectedTableIndex], selectedItems: newSelectedItems, totalPrice: totalPrice + (selectedMenu.menuPrice + optionTotalPrice) * menuCount };
            setTables(updatedTables);
        }
        console.log(newSelectedItems)

        closeModal();
    };

    const handleSelectItem = (index) => {
        if (checkedItems.includes(index)) {
            setCheckedItems(checkedItems.filter(item => item !== index));
        } else {
            setCheckedItems([...checkedItems, index]);
        }
    };

    const handleCancelSelected = () => {
        const updatedItems = selectedItems.filter((item, index) => !checkedItems.includes(index));
        setSelectedItems(updatedItems);
    
        const tableKey = `table${tableId}`;
        localStorage.setItem(tableKey, JSON.stringify(updatedItems));
    
        const groupId = groupPayment[selectedTableIndex]?.groupId;
        if (groupId) {
            updateGroupItems(groupId, updatedItems);
        } else {
            const updatedTables = [...tables];
            updatedTables[selectedTableIndex] = { ...updatedTables[selectedTableIndex], selectedItems: updatedItems, totalPrice: updatedItems.reduce((sum, item) => sum + (item.menu.menuPrice + item.options.reduce((acc, opt) => acc + opt.optionPrice, 0)) * item.count, 0) };
            setTables(updatedTables);
        }
    
        setCheckedItems([]);
    };

    const handleCancelAll = () => {
        setSelectedItems([]);
    
        const tableKey = `table${tableId}`;
        localStorage.removeItem(tableKey);
    
        const groupId = groupPayment[selectedTableIndex]?.groupId;
        if (groupId) {
            updateGroupItems(groupId, []);
        } else {
            const updatedTables = [...tables];
            updatedTables[selectedTableIndex] = { ...updatedTables[selectedTableIndex], selectedItems: [], totalPrice: 0 };
            setTables(updatedTables);
        }
    
        setCheckedItems([]);
    };

    const handleIncreaseCount = () => {
        const updatedItems = selectedItems.map((item, index) => {
            if (checkedItems.includes(index)) {
                return { ...item, count: item.count + 1 };
            }
            return item;
        });
        setSelectedItems(updatedItems);
    
        const tableKey = `table${tableId}`;
        localStorage.setItem(tableKey, JSON.stringify(updatedItems));
    
        const groupId = groupPayment[selectedTableIndex]?.groupId;
        if (groupId) {
            updateGroupItems(groupId, updatedItems);
        } else {
            const updatedTables = [...tables];
            updatedTables[selectedTableIndex] = { ...updatedTables[selectedTableIndex], selectedItems: updatedItems, totalPrice: updatedItems.reduce((sum, item) => sum + (item.menu.menuPrice + item.options.reduce((acc, opt) => acc + opt.optionPrice, 0)) * item.count, 0) };
            setTables(updatedTables);
        }
    };
    
    const handleDecreaseCount = () => {
        const updatedItems = selectedItems.map((item, index) => {
            if (checkedItems.includes(index) && item.count > 1) {
                return { ...item, count: item.count - 1 };
            }
            return item;
        });
        setSelectedItems(updatedItems);
    
        const tableKey = `table${tableId}`;
        localStorage.setItem(tableKey, JSON.stringify(updatedItems));
    
        const groupId = groupPayment[selectedTableIndex]?.groupId;
        if (groupId) {
            updateGroupItems(groupId, updatedItems);
        } else {
            const updatedTables = [...tables];
            updatedTables[selectedTableIndex] = { ...updatedTables[selectedTableIndex], selectedItems: updatedItems, totalPrice: updatedItems.reduce((sum, item) => sum + (item.menu.menuPrice + item.options.reduce((acc, opt) => acc + opt.optionPrice, 0)) * item.count, 0) };
            setTables(updatedTables);
        }
    };
    const handleRegisterComplete = () => { // 현재 테이블 상태 업데이트
        const updatedTables = [...tables];
        updatedTables[selectedTableIndex] = { ...updatedTables[selectedTableIndex], selectedItems, totalPrice };
        setTables(updatedTables);
        console.log(tables)
        // navigate("/pos/main");
    };

    return (
        <div css={s.layout}>
            <div css={s.container}>
                <div css={s.tableSection}>
                    <div css={s.tableHeader}>
                        <div>홀 {tableId}</div>
                    </div>
                    <div css={s.tableLayout}>
                        <table css={s.table}>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>메뉴</th>
                                    <th>수량</th>
                                    <th>옵션</th>
                                    <th>금액</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {selectedItems?.map((item, index) => (
                                <tr key={index} onClick={() => handleSelectItem(index)}>
                                    <td>{index + 1}</td>
                                    <td>{item.menu.menuName}</td>
                                    <td>{item.count}</td>
                                    <td>{item.options?.map(opt => `${opt.optionName} + ${opt.optionPrice.toLocaleString()}원`).join(", ")}</td>
                                    <td>{((item.menu.menuPrice + item.options?.reduce((acc, opt) => acc + opt.optionPrice, 0)) * item.count).toLocaleString()}원</td>
                                    <td><input type="checkbox" checked={checkedItems.includes(index)} onChange={(e) => e.stopPropagation()} /></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div css={s.totalSection}>
                        <div css={s.selectLayout}>
                            <div css={s.quantityChange}>
                                <button css={s.cancelButton} onClick={handleCancelAll}>전체 취소</button>
                                <button css={s.cancelButton} onClick={handleCancelSelected}>선택 취소</button>
                                <button css={s.cancelButton} onClick={handleIncreaseCount}>+</button>
                                <button css={s.cancelButton} onClick={handleDecreaseCount}>-</button>
                            </div>
                        </div>
                        <div css={s.calculation}>
                            <div css={s.totalPrice}>
                                <div>총 금액</div>
                                <div>{totalPrice.toLocaleString()}원</div>
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
                            {categories?.map((category, index) => (
                                <button key={index} css={s.categoryButton} onClick={() => setCategoryId(category.menuCategoryId)}>{category.menuCategoryName}</button>
                            ))}
                            {emptyCategoryArray.map((_, index) => (
                                <button key={`empty-${index}`} css={s.categoryButton}></button>
                            ))}
                            <div>
                                <button 
                                    onClick={() => setCategoryPageNum(categoryPageNum - 1)} 
                                    disabled={categoryPageNum === 1}
                                >
                                    &lt;
                                </button>
                                <button 
                                    onClick={() => setCategoryPageNum(categoryPageNum + 1)} 
                                    disabled={categories.length < 5}
                                >
                                    &gt;
                                </button>
                            </div>
                           
                        </div>
                    </div>
                    <div css={s.menuItems}>
                        {menus?.map(menu => (
                            <div key={menu.menuId} css={s.menuItem} onClick={() => openModal(menu.menuId)}>
                                <div>{menu.menuName}</div>
                                <div>{menu.menuPrice.toLocaleString()}원</div>
                            </div>
                        ))}
                        {emptyMenuArray?.map((_, index) => (
                            <div key={index} css={s.menuItem}>
                                <div></div>
                                <div></div>
                            </div>
                        ))}
                        <div>
                            {menuPageNum > 1 && (
                                <>
                                    <button onClick={() => setMenuPageNum(menuPageNum - 1)}>&lt;</button>
                                    <button>&gt;</button>
                                </>
                            )}
                            {menuPageNum < totalMenuPages && (
                                <>
                                    <button>&lt;</button>
                                    <button onClick={() => setMenuPageNum(menuPageNum + 1)}>&gt;</button>
                                </>
                            )}
                        </div>
                    </div>
                    <div css={s.bottomButtons}>
                        <button onClick={handleRegisterComplete}>등록완료</button>
                    </div>
                </div>
            </div>
            <PosMenuOptionsModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                options={options} 
                handleAddItem={handleAddItem} 
                menuCount={menuCount}
                setMenuCount={setMenuCount}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
            />
        </div>
    );
}

export default PosTableDetailPage;
