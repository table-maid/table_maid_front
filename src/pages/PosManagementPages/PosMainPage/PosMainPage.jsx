/** @jsxImportSource @emotion/react */
import { useEffect, useState, useRef } from "react";
import * as s from "./style";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  tablesState,
  selectedTableIndexState,
  currentTableDataState,
  mergeGroupsState,
} from "../../../atoms/PosStateAtom";
import { FaPlus } from "react-icons/fa";
import CurrentTime from "../../../components/CurrentTime/CurrentTime";

function PosMainPage() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [tables, setTables] = useRecoilState(tablesState);
  const [selectedTableIndex, setSelectedTableIndex] = useRecoilState(
    selectedTableIndexState
  ); // 선택된 테이블 인덱스
  const [currentTableData, setCurrentTableData] = useRecoilState(
    currentTableDataState
  ); // 현재 테이블 데이터
  const [mergeGroups, setMergeGroups] = useRecoilState(mergeGroupsState); // 합석 상태
  const [selectedTableIndices, setSelectedTableIndices] = useState([]); // 선택된 테이블 인덱스 상태
  const [tableColors, setTableColors] = useState({});
  const [moveMode, setMoveMode] = useState(false);

  const usedColors = useRef(new Set());
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      // 로컬 스토리지에 저장된 색
      const savedColors = localStorage.getItem("tableColors");
      if (savedColors) {
        const parsedColors = JSON.parse(savedColors);
        setTableColors(parsedColors);
        usedColors.current = new Set(Object.values(parsedColors));
      } else {
        // 초기 테이블 색상 설정
        const initialColors = {};
        for (let i = 0; i < tables.length; i++) {
          const color = getRandomUniquePastelColor(usedColors.current);
          initialColors[i] = color;
          usedColors.current.add(color);
        }
        setTableColors(initialColors);
        localStorage.setItem("tableColors", JSON.stringify(initialColors));
      }
      initialized.current = true;
    }
  }, [tables.length]);

  const handleClick = async (index) => {
    // 테이블 클릭했을때 실행
    setSelectedTableIndex(index);
    setCurrentTableData(tables[index]);
    navigate(`/pos/table/detail/${index + 1}`);
  };

  const handleTableSelect = (index) => {
    // 테이블 선택했을 때 실행
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

  const getRandomPastelColor = () => {
    // 랜덤 색
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 25) + 60; // 70%에서 95% 사이의 채도
    const lightness = Math.floor(Math.random() * 25) + 70; // 70%에서 95% 사이의 밝기
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const getRandomUniquePastelColor = (existingColors) => {
    // 기존 색을 겹치지 않게
    let color;
    do {
      color = getRandomPastelColor();
    } while (existingColors.has(color));
    return color;
  };

  const handleMoveMode = () => {
    if (selectedTableIndices.length !== 1) {
      alert("하나의 테이블을 선택하세요.");
      return;
    }
    setMoveMode(true);
  };

  const handleMoveTable = (targetIndex) => {
    if (selectedTableIndices.length !== 1) {
      alert("이동할 테이블을 하나만 선택하세요.");
      return;
    }
    const sourceIndex = selectedTableIndices[0]; // 이동할 테이블 인덱스
    const sourceTable = tables[sourceIndex]; // 이동할 테이블 데이터
    const targetTable = tables[targetIndex]; // 이동 대상 테이블 데이터

    const newTables = [...tables];
    newTables[targetIndex] = {
      ...targetTable,
      selectedItems: sourceTable.selectedItems,
      totalPrice: sourceTable.totalPrice,
    };
    newTables[sourceIndex] = {
      ...sourceTable,
      selectedItems: [],
      totalPrice: 0,
    };

    setTables(newTables);
    setSelectedTableIndex(targetIndex); // 이동 후 선택된 테이블 인덱스 업데이트
    setCurrentTableData(newTables[targetIndex]); // 이동 후 현재 테이블 데이터 업데이트
    setSelectedTableIndices([]); // 선택된 테이블 인덱스 초기화(비우기)
    setMoveMode(false);
  };

  const handleMergeTables = () => {
    if (selectedTableIndices.length < 2) {
      alert("두 개 이상의 테이블을 선택하세요.");
      return;
    }

    const mergeColor = getRandomPastelColor();
    const groupId = new Date().getTime(); // 유니크한 그룹 ID 생성

    const newMergeGroups = { ...mergeGroups };
    const newTableColors = { ...tableColors };
    selectedTableIndices.forEach((index) => {
      newMergeGroups[index] = { color: mergeColor, groupId };
      newTableColors[index] = mergeColor; // 선택된 테이블에 동일한 색상 적용
    });

    setMergeGroups(newMergeGroups);
    setTableColors(newTableColors);
    localStorage.setItem("tableColors", JSON.stringify(newTableColors));
    setSelectedTableIndices([]);
  };

  const handleSeparateTable = () => {
    if (selectedTableIndices.length !== 1) {
      alert("하나의 테이블만 선택하세요.");
      return;
    }

    const tableIndex = selectedTableIndices[0];
    if (!mergeGroups[tableIndex]) {
      alert("합석된 테이블만 분리할 수 있습니다.");
      return;
    }

    const newColor = getRandomUniquePastelColor(usedColors.current);
    usedColors.current.add(newColor);

    setTableColors({
      ...tableColors,
      [tableIndex]: newColor,
    });

    // 합석에서 해당 테이블 제거
    const newMergeGroups = { ...mergeGroups };
    delete newMergeGroups[tableIndex];
    setMergeGroups(newMergeGroups);

    localStorage.setItem(
      "tableColors",
      JSON.stringify({ ...tableColors, [tableIndex]: newColor })
    );
    setSelectedTableIndices([]);
  };

  const renderTables = () => {
    // 주문내역이 있을때 헤더 색상 변경
    return tables.map((table, index) => {
      const hasItems = table.selectedItems.length > 0;
      const headerColor = mergeGroups[index]
        ? mergeGroups[index].color
        : hasItems
        ? tableColors[index]
        : "transparent";

      const isSelected = selectedTableIndices.includes(index);

      return (
        <div
          css={[s.tableButton]}
          key={index}
          onClick={() => handleTableSelect(index)}
        >
          <div css={s.table}>
            <div
              css={[
                s.tableHeader(hasItems),
                { backgroundColor: headerColor },
                isSelected && s.selectedTableHeader,
              ]}
            >
              <span css={s.tableNumber}>{index + 1}</span>
              <span css={s.tablePeople}></span>
            </div>
            <div css={s.tableDetails}>
              {table.selectedItems.length === 0 ? (
                <div css={s.buttonBox}>
                  <div
                    css={s.button}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick(index);
                    }}
                  >
                    <FaPlus size={"50"} />
                  </div>
                </div>
              ) : (
                table.selectedItems.map((item, itemIndex) => (
                  <div css={s.menuBox} key={itemIndex}>
                    <div css={s.menuItem}>
                      <span>{item.menuName}</span>
                      <span>{item.menuCount}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
            {table.totalPrice > 0 && (
              <div css={s.totalPrice}>
                {table.totalPrice.toLocaleString()}원
              </div>
            )}
          </div>
        </div>
      );
    });
  };

  const handleOrderDetails = () => {
    if (selectedTableIndices.length !== 1) {
      alert("하나의 테이블을 선택하세요.");
      return;
    }
    const tableIndex = selectedTableIndices[0];
    setSelectedTableIndex(tableIndex);
    setCurrentTableData(tables[tableIndex]);
    navigate(`/pos/table/detail/${tableIndex + 1}`);
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
          <button css={s.managementButton}>단체지정</button>
          <button css={s.managementButton}>단체결제</button>
          <button css={s.managementButton} onClick={handleOrderDetails}>
            주문내역
          </button>
        </div>
      </div>
    </div>
  );
}

export default PosMainPage;
