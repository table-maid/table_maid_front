/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./style";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  tablesState,
  selectedTableIndexState,
  currentTableDataState,
  mergeGroupsState,
  groupPaymentState,
} from "../../../atoms/PosStateAtom";
import CurrentTime from "../../../components/CurrentTime/CurrentTime";
import { useTableColors } from "../../../hooks/useTableColors";
import PosTableItem from "../../../components/PosTableItem/PosTableItem";

function PosMainPage() {
  const navigate = useNavigate();
  const [tables, setTables] = useRecoilState(tablesState);
  const [selectedTableIndex, setSelectedTableIndex] = useRecoilState(
    selectedTableIndexState
  );
  const [currentTableData, setCurrentTableData] = useRecoilState(
    currentTableDataState
  ); // 현재 테이블 데이터
  
  const [mergeGroups, setMergeGroups] = useRecoilState(mergeGroupsState);
  const [groupPayment, setGroupPayment] = useRecoilState(groupPaymentState); // 단체결제 상태
  const [selectedTableIndices, setSelectedTableIndices] = useState([]);
  const [moveMode, setMoveMode] = useState(false);


  const {
    tableColors,
    updateTableColor,
    getRandomUniquePastelColor,
    usedColors,
  } = useTableColors(tables);

  // SSE 구독 로직
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8080/send/menus/1");
  
    eventSource.onopen = async () => {
      await console.log("SSE connection opened!");
    };
  
    eventSource.onerror = (error) => {
      console.log("SSE error:", error);
    };
  
    eventSource.addEventListener("SSEOrder", (event) => {
      console.log("SSEOrder event received");
      const data = JSON.parse(event.data);
      console.log(data);
      
      const tableKey = `table${data[0].tableNumber}`;
      const existingOrder = localStorage.getItem(tableKey);
  
      if (existingOrder) {
        // 주문이 이미 있으면 기존 메뉴에 새 주문 추가
        const currentOrders = JSON.parse(existingOrder);
        const updatedOrders = [...currentOrders, ...data];
        localStorage.setItem(tableKey, JSON.stringify(updatedOrders));
        console.log('Updated orders for table:', data[0].tableNumber);
      } else {
        // 주문이 없으면 새로운 데이터 저장
        localStorage.setItem(tableKey, JSON.stringify(data));
        console.log('New order saved for table:', data[0].tableNumber);
      }
    });
  
    return () => {
      eventSource.close();
      console.log('SSE connection closed');
    };
  }, []);
  

  const handleClick = async (index) => {
    setSelectedTableIndex(index);
    setCurrentTableData(tables[index]);
    navigate(`/pos/table/detail/${index + 1}`);
  };

  const handleTableSelect = (index) => {
    if (moveMode) {
      handleMoveTable(index);
    } else {
      if (selectedTableIndices.includes(index)) {
        setSelectedTableIndices(
          selectedTableIndices.filter((i) => i !== index)
        );
      } else {
        setSelectedTableIndices([...selectedTableIndices, index]);
      }
    }
  };

  const handleMoveMode = () => {
    if (selectedTableIndices.length !== 1) {
      alert("하나의 테이블을 선택해주세요.");
      return;
    }
    setMoveMode(true);
  };

  const handleMoveTable = (targetIndex) => {
    if (selectedTableIndices.length !== 1) {
      alert("이동할 테이블을 하나만 선택해주세요.");
      return;
    }
    const sourceIndex = selectedTableIndices[0];
    const sourceTable = tables[sourceIndex];
    const targetTable = tables[targetIndex];

    const newTables = [...tables];
    newTables[targetIndex] = {
      ...targetTable,
      selectedItems: [...sourceTable.selectedItems],
      totalPrice: sourceTable.totalPrice,
    };
    newTables[sourceIndex] = {
      ...sourceTable,
      selectedItems: [],
      totalPrice: 0,
    };

    const newMergeGroups = { ...mergeGroups };
    const newGroupPayment = { ...groupPayment };

    if (mergeGroups[sourceIndex]) {
      newMergeGroups[targetIndex] = { ...mergeGroups[sourceIndex] };
      delete newMergeGroups[sourceIndex];
    }

    if (groupPayment[sourceIndex]) {
      newGroupPayment[targetIndex] = { ...groupPayment[sourceIndex] };
      delete newGroupPayment[sourceIndex];
    }

    updateTableColor(targetIndex, tableColors[sourceIndex]);
    updateTableColor(
      sourceIndex,
      getRandomUniquePastelColor(usedColors.current)
    ); // 이동 전 테이블에 새로운 색상 지정

    setTables(newTables);
    setMergeGroups(newMergeGroups);
    setGroupPayment(newGroupPayment);
    setSelectedTableIndex(targetIndex); // 이동 후 선택된 테이블 인덱스 업데이트
    setCurrentTableData(newTables[targetIndex]); // 이동 후 현재 테이블 데이터 업데이트
    setSelectedTableIndices([]); // 선택된 테이블 인덱스 초기화(비우기)
    setMoveMode(false);
  };

  const handleMergeTables = () => {
    if (selectedTableIndices.length < 2) {
      alert("두 개 이상의 테이블을 선택해주세요.");
      return;
    }

    const mergeColor = getRandomUniquePastelColor(usedColors.current);
    const groupId = new Date().getTime(); // 고유한 그룹 ID 생성

    const newMergeGroups = { ...mergeGroups };

    selectedTableIndices.forEach((index) => {
      newMergeGroups[index] = { color: mergeColor, groupId };
      updateTableColor(index, mergeColor);
    });

    setMergeGroups(newMergeGroups);
    setSelectedTableIndices([]);
  };

  const handleGroupAssignment = () => {
    if (selectedTableIndices.length < 2) {
      alert("두 개 이상의 테이블을 선택해주세요.");
      return;
    }

    const groupColor = getRandomUniquePastelColor(usedColors.current);
    const groupId = new Date().getTime();

    const newGroupPayment = { ...groupPayment };

    let mergedItems = [];
    let mergedTotalPrice = 0;

    selectedTableIndices.forEach((index) => {
      const table = tables[index];
      mergedItems = [...mergedItems, ...table.selectedItems];
      mergedTotalPrice += table.totalPrice;

      newGroupPayment[index] = { color: groupColor, groupId };
      updateTableColor(index, groupColor);
    });

    setGroupPayment(newGroupPayment);

    const newTables = tables.map((table, i) =>
      selectedTableIndices.includes(i)
        ? { ...table, selectedItems: mergedItems, totalPrice: mergedTotalPrice }
        : table
    );

    setTables(newTables);
    setSelectedTableIndices([]);
  };

  const updateGroupItems = (groupId, newItems) => {
    const newTables = tables.map((table, index) => {
      if (groupPayment[index]?.groupId === groupId) {
        return {
          ...table,
          selectedItems: newItems,
          totalPrice: newItems.reduce(
            (sum, item) => sum + item.price * item.menuCount,
            0
          ),
        };
      }
      return table;
    });
    setTables(newTables);
  };

  const handleItemUpdate = (tableIndex, newItems) => {
    const groupId = groupPayment[tableIndex]?.groupId;
    if (groupId) {
      updateGroupItems(groupId, newItems);
    } else {
      const newTables = [...tables];
      newTables[tableIndex] = {
        ...newTables[tableIndex],
        selectedItems: newItems,
        totalPrice: newItems.reduce(
          (sum, item) => sum + item.price * item.menuCount,
          0
        ),
      };
      setTables(newTables);
    }
  };

  const handleGroupPayment = () => {
    if (selectedTableIndices.length !== 1) {
      alert("하나의 단체 테이블을 선택해주세요.");
      return;
    }

    const tableIndex = selectedTableIndices[0];

    if (!groupPayment[tableIndex]) {
      alert("단체 테이블만 가능합니다.");
      return;
    }

    const groupId = groupPayment[tableIndex].groupId;
    const groupPaymentIndices = Object.keys(groupPayment)
      .filter((key) => groupPayment[key].groupId === groupId)
      .map((key) => parseInt(key));

    let mergedItems = [];
    let mergedTotalPrice = 0;

    groupPaymentIndices.forEach((index) => {
      const table = tables[index];
      mergedItems = [...mergedItems, ...table.selectedItems];
      mergedTotalPrice += table.totalPrice;
    });

    setCurrentTableData({
      selectedItems: mergedItems,
      totalPrice: mergedTotalPrice,
    });

    setSelectedTableIndex(tableIndex);
    navigate(`/pos/table/detail/${tableIndex + 1}`);
  };

  const handleSeparateTable = () => {
    if (selectedTableIndices.length !== 1) {
      alert("합석된 테이블을 선택해주세요.");
      return;
    }

    const tableIndex = selectedTableIndices[0];

    if (!mergeGroups[tableIndex]) {
      alert("합석된 테이블만 분리할 수 있습니다.");
      return;
    }

    const newColor = getRandomUniquePastelColor(usedColors.current);
    usedColors.current.add(newColor);

    const newMergeGroups = { ...mergeGroups };

    if (mergeGroups[tableIndex]) {
      delete newMergeGroups[tableIndex];
    }

    updateTableColor(tableIndex, newColor);

    setMergeGroups(newMergeGroups);
    setSelectedTableIndices([]);
  };

  const handleOrderDetails = () => {
    if (selectedTableIndices.length !== 1) {
      alert("하나의 테이블을 선택해주세요.");
      return;
    }
    const tableIndex = selectedTableIndices[0];
    setSelectedTableIndex(tableIndex);
    setCurrentTableData(tables[tableIndex]);
    navigate(`/pos/table/detail/${tableIndex + 1}`);
  };

  const renderTables = () => {
    return tables.map((table, index) => {
      const headerColor = mergeGroups[index]
        ? mergeGroups[index].color
        : groupPayment[index]
        ? groupPayment[index].color
        : table.selectedItems.length > 0
        ? tableColors[index]
        : "transparent";
      const isSelected = selectedTableIndices.includes(index);

      return (
        <PosTableItem
          key={index}
          table={table}
          index={index}
          headerColor={headerColor}
          isSelected={isSelected}
          handleClick={handleClick}
          handleTableSelect={handleTableSelect}
          groupPayment={groupPayment[index]} // 단체결제
        />
      );
    });
  };

  return (
    <div css={s.posLayout}>
      <div css={s.timeLayout}>
        <div>
          <CurrentTime />
        </div>
      </div>
      <div css={s.tableLayout}>
        <div css={s.tableContainer}>{renderTables()}</div>
      </div>
      <div css={s.managmentLayout}>
        <div css={s.managmentContainer}>
          <button css={s.managementButton} onClick={handleMergeTables}>
            합석
          </button>
          <button css={s.managementButton} onClick={handleMoveMode}>
            이동
          </button>
          <button css={s.managementButton} onClick={handleSeparateTable}>
            분리
          </button>
          <button css={s.managementButton} onClick={handleGroupAssignment}>
            단체지정
          </button>
          <button css={s.managementButton} onClick={handleGroupPayment}>
            단체결제
          </button>
          <button css={s.managementButton} onClick={handleOrderDetails}>
            주문내역
          </button>
        </div>
      </div>
    </div>
  );
}

export default PosMainPage;
