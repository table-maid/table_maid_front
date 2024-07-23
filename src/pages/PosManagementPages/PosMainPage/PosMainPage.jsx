/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./style";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  selectedTableIndexState,
  currentTableDataState,
  mergeGroupsState,
  groupPaymentState,
} from "../../../atoms/PosStateAtom";
import CurrentTime from "../../../components/CurrentTime/CurrentTime";
import { useTableColors } from "../../../hooks/useTableColors";
import PosTableItem from "../../../components/PosTableItem/PosTableItem";
import { useQuery } from "react-query";
import { selectFloorTableRequest } from "../../../apis/api/posEdit";
import { adminIdState } from "../../../atoms/AdminIdStateAtom";
import usePosButtonList from "../../../hooks/usePosButtonList";

function PosMainPage() {
  const [adminId] = useRecoilState(adminIdState);
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [selectedTableIndex, setSelectedTableIndex] = useRecoilState(
    selectedTableIndexState
  );
  const [currentTableData, setCurrentTableData] = useRecoilState(
    currentTableDataState
  );
  const [mergeGroups, setMergeGroups] = useRecoilState(mergeGroupsState);
  const [groupPayment, setGroupPayment] = useRecoilState(groupPaymentState);
  const [selectedTableIndices, setSelectedTableIndices] = useState([]);
  const [moveMode, setMoveMode] = useState(false);
  const [orderData, setOrderData] = useState([]); // 메뉴 데이터 상태 추가
  const [storageUpdate, setStorageUpdate] = useState(false); // 로컬 스토리지 업데이트 상태
  const [columns, setColumns] = useState(9);
  const buttons = usePosButtonList();
  const [nowSelectFloor, setNowSelectFloor] = useState(1);
  const [floors, setFloors] = useState([])

  const {
    tableColors,
    updateTableColor,
    getRandomUniquePastelColor,
    usedColors,
  } = useTableColors(tables);

  const editTableQuery = useQuery(
    ["editTableQuery"],
    () => selectFloorTableRequest(adminId),
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
        console.log(response);
        const tables = response.data[0]?.tables || [];
        console.log(tables);
        setTables(tables);
        const currentFloor = response.data.find(
          (floor) => floor.floorNum === nowSelectFloor
        );
        if (currentFloor) {
          setFloors(currentFloor.tables);
          setColumns(getColumns(currentFloor.tables.length));
        }
      },
      onError: (error) => {
        console.log(error);
      }
    }
  );

  // SSE 구독 로직
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8080/send/menus/1");

    eventSource.onopen = async () => {
      console.log("SSE connection opened!");
    };

    eventSource.onerror = (error) => {
      console.error("SSE error:", error);
    };

    eventSource.addEventListener("SSEOrder", (event) => {
      const data = JSON.parse(event.data);
      console.log("SSEOrder event received:", data);

      const tableKey = `table${data[0].tableNumber}`;
      const existingOrder = localStorage.getItem(tableKey);

      let updatedOrders;
      if (existingOrder) {
        const currentOrders = JSON.parse(existingOrder);
        updatedOrders = [...currentOrders, ...data];
      } else {
        updatedOrders = data;
      }
      localStorage.setItem(tableKey, JSON.stringify(updatedOrders));

      // 선택된 테이블에 대한 데이터 변경이 있을 경우 상태 업데이트
      if (selectedTableIndex + 1 === data[0].tableNumber) {
        setOrderData(updatedOrders);
      }

      setStorageUpdate((prev) => !prev); // 로컬 스토리지 업데이트 상태 변경
    });

    return () => {
      eventSource.close();
      console.log("SSE connection closed");
    };
  }, [selectedTableIndex]);

  // 로컬 스토리지 변화를 감지하여 상태 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedTableIndex !== null) {
        loadMenuData(selectedTableIndex);
      }
    }, 1000); // 1초마다 로컬 스토리지 확인

    return () => clearInterval(interval);
  }, [selectedTableIndex, storageUpdate]);

  const handleClick = async (index) => {
    setSelectedTableIndex(index);
    setCurrentTableData(tables[index]);
    loadMenuData(index); // 메뉴 데이터 로드
    navigate(`/pos/table/detail/${index + 1}`);
  };

  const loadMenuData = (index) => {
    const tableKey = `table${index + 1}`;
    const storedData = localStorage.getItem(tableKey);
    if (storedData) {
      setOrderData(JSON.parse(storedData));
    } else {
      setOrderData([]);
    }
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
      selectedItems: sourceTable.selectedItems || [], // selectedItems가 undefined인 경우 빈 배열로 설정
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
      mergedItems = [...mergedItems, ...(table.selectedItems || [])];
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
      mergedItems = [...mergedItems, ...(table.selectedItems || [])];
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
        : table.selectedItems?.length > 0
        ? tableColors[index]
        : "transparent"; // table.selectedItems가 undefined인 경우 처리
        const isSelected = selectedTableIndices.includes(index);
        
        // 테이블 번호에 맞는 주문 데이터를 로컬 스토리지에서 가져오기
        const tableKey = `table${index + 1}`;
      const storedData = localStorage.getItem(tableKey);
      const orders = storedData ? JSON.parse(storedData) : [];
      
      return (
        <PosTableItem
          key={index}
          table={{
            ...table,
            selectedItems: table.selectedItems || [], // selectedItems가 undefined인 경우 빈 배열로 설정
          }}
          index={index}
          headerColor={headerColor}
          isSelected={isSelected}
          handleClick={handleClick}
          handleTableSelect={handleTableSelect}
          groupPayment={groupPayment[index]} // 단체결제
          orders={orders} // 주문 데이터 전달
        />
      );
    });
  };

  const getColumns = (tableCount) => {
    for (let buttonCount of buttons) {
      const [rows, columns] = buttonCount.split('X').map(Number);
      if (rows * columns === tableCount) {
        return rows;
      }
    }
    console.warn(`적절한 columns 값을 찾을 수 없습니다. 테이블 수: ${tableCount}`);
    return Math.ceil(Math.sqrt(tableCount)); // 기본값으로 테이블 수의 제곱근에 가까운 정수를 반환
  };

  const handleSelectFloor = (floorNum) => {
    const selectedFloor = floors.find(floor => floor.floorNum === floorNum);
    if(selectedFloor) {
      setTables(selectedFloor.tables.map(table => ({ ...table, checked: false})));
      setColumns(getColumns(selectedFloor.tables.length));
    }
    setNowSelectFloor(floorNum);
  }

  return (
    <div css={s.posLayout}>
      <div css={s.timeLayout}>
        <CurrentTime />
      </div>
      <div css={s.tableLayout}>
        <div css={s.tableContainer(columns)}>{renderTables()}</div>
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
          <button css={s.managementButton} onClick={handleOrderDetails}>
            주문내역
          </button>
        </div>
      </div>
    </div>
  );
}

export default PosMainPage;
