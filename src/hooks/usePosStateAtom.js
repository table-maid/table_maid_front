// hooks/usePosStateAtom.js
import { atom } from "recoil";

export const tablesState = atom({
    key: "tablesState",
    default: Array(9).fill({ selectedItems: [], totalPrice: 0 }),
});

export const selectedTableIndexState = atom({ // 테이블이 선택되지 않은 상태
    key: "selectedTableIndexState",
    default: -1,
});

export const currentTableDataState = atom({
    key: "currentTableDataState",
    default: { selectedItems: [], totalPrice: 0 },
});

export const mergeGroupsState = atom({
    key: "mergeGroupsState",
    default: {},
});
