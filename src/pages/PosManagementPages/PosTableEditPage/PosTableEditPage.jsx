/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useState } from "react";
import PosEditButtonList from "../../../components/Pos/PosEditButtonList/PosEditButtonList";
import usePosButtonList from "../../../hooks/usePosButtonList";
import PosEditFloor from "../../../components/Pos/PosEditFloor/PosEditFloor";

function PosTableEditPage() {
  const buttons = usePosButtonList();
  const [isOpenFloorEdit, setIsOpenFloorEdit] = useState(false);
  const [isOpenFloorList, setIsOpenFloorList] = useState(false);
  const [tableCountButton, setTableCountButton] = useState("3X3");
  const [tables, setTables] = useState([]);
  const [columns, setColumns] = useState(0);
  const [floors, setFloors] = useState([
    {
      floorNum: 1,
      floorName: "1층",
      tables: [],
    },
  ]);
  const [nowSelectFloor, setNowSelectFloor] = useState(1);
  const [selectTable, setSelectTable] = useState();

  // 초기 테이블 설정
  useEffect(() => {
    const newTables = Array(9).fill().map((_, i) => ({id: i + 1, tableName: "", checked: false}));
    setTables(newTables);
    setFloors(prevFloors => prevFloors.map(floor => 
      floor.floorNum === 1 ? {...floor, tables: newTables} : floor
    ));
  }, []);

  // tableCountButton 변경 시
  useEffect(() => {
    const [rows, cols] = tableCountButton.split('X').map(Number);
    setColumns(rows);

    const newTables = Array(rows * cols).fill().map((_, i) => ({id: i + 1, tableName: "", checked: false}));
    setTables(newTables);
    setFloors(prevFloors => prevFloors.map(floor => 
      floor.floorNum === nowSelectFloor ? {...floor, tables: newTables} : floor
    ));

  }, [tableCountButton, nowSelectFloor]);


  // 테이블 상태 reset 다 false
  useEffect(() => {
    if(floors.length > 0) {
      const currentFloor = floors.find(floor => floor.floorNum === nowSelectFloor);
      if (currentFloor) {
        const resetTables = currentFloor.tables.map(table => ({...table, checked: false}));
        setTables(resetTables);
      }
    }
  }, [nowSelectFloor, floors]);
  
  // 선택된 층/구역의 테이블 
  const handleSelectFloor = (floorNum) => {
    setNowSelectFloor(floorNum)

    const selectFloor = floors.find((floor) => floor.floorNum === floorNum);
    if (selectFloor) {
      const resultColumns = getColumns(selectFloor.tables.length);
      setColumns(resultColumns);
      setTables(selectFloor.tables.map(table => ({...table, checked: false})));
    }
  }

  // 층 선택될때 css columns 값 재배치
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

  // 테이블 클릭 시
  const handleSelectTable = (tableId) => {
    setTables(prevTables => {
      const newTables = prevTables.map(table => ({
        ...table,
        checked: table.id === tableId ? !table.checked : false
      }));
      
      // floors 상태를 직접 업데이트하지 않고, 별도의 useEffect에서 처리하도록 합니다.
      return newTables;
    });
  };

  return (
    <div css={s.posLayout}>
      
      {/* 테이블 갯수 버튼 */}
      <div>
        <PosEditButtonList buttons={buttons} setTableCount={setTableCountButton}/>
      </div>    

      {/* 테이블들 */}
      <div css={s.tableLayout}>
        <div css={s.tableContainer(columns)}>
          {
            tables.map((table, index) => (
              <div css={s.tableButton(table.checked)} key={index} onClick={() => handleSelectTable(table.id)}> 
                <div css={s.tableHeader}>
                  {table.id}  
                </div> 
              </div>
            ))
          }
        </div>
      </div>

      {/* 옵션 */}
      <div css={s.managmentLayout}>
       <div css={s.managmentContainer}>
        {/* 층/구역 관리 */}
        <button onClick={() => setIsOpenFloorEdit(!isOpenFloorEdit)}>
          층/구역 관리
        </button>
        <div css={s.floorManagement}>
          {isOpenFloorEdit ? <PosEditFloor floors={floors} setFloors={setFloors} setIsOpenFloorEdit={setIsOpenFloorEdit}/> : ""}
        </div>

        <button>삭제</button>
        <button>수정</button>

        <button onClick={() => setIsOpenFloorList(!isOpenFloorList)}>
          {/* 층 삭제시 오류 해결해야됨 */}
          {floors.filter((floor) => floor.floorNum === nowSelectFloor)[0]?.floorName}
        </button>
          {/* 생성된 층/구역 List */}
          <div>
            {
            isOpenFloorList 
            ? 
              floors.map((floor, index) => (             
                <div key={index}>
                  <button onClick={() => handleSelectFloor(floor.floorNum)}>
                    {floor.floorName}
                  </button>
                </div>
              ))
            :
              <></>
            }
          </div>
       </div>
      </div>
        
      











    </div>
  )
}

export default PosTableEditPage
