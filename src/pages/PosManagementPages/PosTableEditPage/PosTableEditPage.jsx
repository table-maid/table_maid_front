/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useState } from "react";
import PosEditButtonList from "../../../components/Pos/PosEditButtonList/PosEditButtonList";
import usePosButtonList from "../../../hooks/usePosButtonList";
import PosEditFloor from "../../../components/Pos/PosEditFloor/PosEditFloor";
import PosEditTableName from "../../../components/Pos/PosEditTableName/PosEditTableName";
import { useMutation, useQuery } from "react-query";
import {
  deleteTableRequest,
  saveFloorTableRequest,
  saveTableRequest,
  selectFloorTableRequest,
  updateTableRequest,
} from "../../../apis/api/posEdit";
import { adminIdState } from "../../../atoms/AdminIdStateAtom";
import { useRecoilState } from "recoil";

function PosTableEditPage() {
  const buttons = usePosButtonList();
  const [adminId] = useRecoilState(adminIdState);
  const [isOpenFloorEdit, setIsOpenFloorEdit] = useState(false);
  const [isOpenFloorList, setIsOpenFloorList] = useState(false);
  const [isOpenTableNameEdit, setIsOpenTableNameEdit] = useState(false);
  const [tableCountButton, setTableCountButton] = useState("3X3");
  const [tables, setTables] = useState([]);
  const [columns, setColumns] = useState(3);
  const [nowSelectFloor, setNowSelectFloor] = useState(1);
  const [floors, setFloors] = useState([
    {
      adminId: adminId,
      floorNum: 1,
      floorName: "1층",
      tables: [],
    },
  ]);
  const [editFloorNum, setEditFloorNum] = useState(null);
  const [editTable, setEditTable] = useState(null);

  // 초기 테이블 설정
  useEffect(() => {
    const currentFloor = floors.find(
      (floor) => floor.floorNum === nowSelectFloor
    );
    if (currentFloor) {
      const tableCount = currentFloor.tables.length;
      setTables(
        currentFloor.tables.map((table) => ({
          ...table,
          checked: false,
          deleted: false,
        }))
      );
      setColumns(getColumns(tableCount));
    }
  }, [floors, nowSelectFloor]);

  // tableCountButton 변경 시 테이블 갯수 설정
  useEffect(() => {
    const [rows, cols] = tableCountButton.split("X").map(Number);
    setColumns(rows);
    const newTables = Array(rows * cols)
      .fill()
      .map((_, i) => ({
        adminId: adminId,
        floorNum: i + 1,
        tablesNum: i + 1,
        tablesName: (i + 1).toString(),
        checked: false,
      }));
    setTables(newTables);
    setFloors((prevFloors) =>
      prevFloors.map((floor) =>
        floor.floorNum === nowSelectFloor
          ? { ...floor, tables: newTables }
          : floor
      )
    );
  }, [tableCountButton, nowSelectFloor]);

  // nowSelectFloor가 유효하지 않을 경우 기본값 설정
  useEffect(() => {
    if (floors.length === 0) return;
    const currentFloor = floors.find(
      (floor) => floor.floorNum === nowSelectFloor
    );
    if (!currentFloor) {
      const minFloorNum = Math.min(...floors.map((floor) => floor.floorNum));
      setNowSelectFloor(minFloorNum);
    } else {
      setTables(
        currentFloor.tables.map((table) => ({ ...table, checked: false }))
      );
      setColumns(getColumns(currentFloor.tables.length));
    }
  }, [nowSelectFloor, floors]);

  // Table 조회
  const editTableQuery = useQuery(
    ["editTableQuery"],
    () => selectFloorTableRequest(adminId),
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
        const floorData = response.data;
        setFloors(floorData);
        const currentFloor = floorData.find(
          (floor) => floor.floorNum === nowSelectFloor
        );
        if (currentFloor) {
          setTables(
            currentFloor.tables.map((table) => ({ ...table, checked: false, deleted: false }))
          );
          setColumns(getColumns(currentFloor.tables.length));
        }
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleSelectFloor = (floorNum) => {
    const selectedFloor = floors.find((floor) => floor.floorNum === floorNum);
    if (selectedFloor) {
      setTables(
        selectedFloor.tables.map((table) => ({ ...table, checked: false }))
      );
      setColumns(getColumns(selectedFloor.tables.length));
      setNowSelectFloor(floorNum);
      editTableQuery.refetch();
    }
  };

  // 테이블 클릭 시 상태 변경
  const handleSelectTable = (tableNum) => {
    setTables((prevTables) =>
      prevTables.map((table) => ({
        ...table,
        checked: table.tablesNum === tableNum ? !table.checked : false,
      }))
    );
  };

  // 층 선택될때 css columns 값 재배치
  const getColumns = (tableCount) => {
    for (let buttonCount of buttons) {
      const [rows, columns] = buttonCount.split("X").map(Number);
      if (rows * columns === tableCount) {
        return rows;
      }
    }
    console.warn(
      `적절한 columns 값을 찾을 수 없습니다. 테이블 수: ${tableCount}`
    );
    return Math.ceil(Math.sqrt(tableCount));
  };

  // 테이블 이름 변경
  const updateTableName = (tableNum, newName) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.tablesNum === tableNum ? { ...table, tablesName: newName } : table
      )
    );
    setFloors((prevFloors) =>
      prevFloors.map((floor) =>
        floor.floorNum === nowSelectFloor
          ? {
              ...floor,
              tables: floor.tables.map((table) =>
                table.tablesNum === tableNum
                  ? { ...table, tablesName: newName }
                  : table
              ),
            }
          : floor
      )
    );
  };

  const handleEdit = () => {
    const selectedTable = tables.find((table) => table.checked);
    if (!selectedTable) {
      alert("수정할 테이블을 클릭해주세요");
      return;
    }
    setEditTable(selectedTable);
    setEditFloorNum(nowSelectFloor);
    setIsOpenTableNameEdit(true);
  };

  // 테이블 삭제
  const deleteTableMutation = useMutation({
    mutationKey: "deleteTableMutation",
    mutationFn: deleteTableRequest,
    onSuccess: (response) => {},
    onError: (error) => {
      console.log(error);
    },
  });

  const updateTableMutation = useMutation({
    mutationKey: "updateTableMutation",
    mutationFn: updateTableRequest,
    onSuccess: (response) => {},
    onError: (error) => {
      console.log(error);
    },
  });

  const handleDelete = () => {
    const selectedTable = tables.find((table) => table.checked);
    if (!selectedTable) {
      alert("삭제할 테이블을 클릭해주세요");
      return;
    }
    if (window.confirm("삭제하시겠습니까?")) {
      const updatedTables = tables.map((table) =>
        table.tablesNum === selectedTable.tablesNum
          ? { ...table, deleted: true }
          : table
      );

      setTables(updatedTables);
      setFloors((prevFloors) =>
        prevFloors.map((floor) =>
          floor.floorNum === nowSelectFloor
            ? { ...floor, tables: updatedTables }
            : floor
        )
      );
      localStorage.setItem("floors", JSON.stringify(floors));
      updateTableMutation.mutate({
        adminId: adminId,
        floorNum: nowSelectFloor,
        tablesNum: selectedTable.tablesNum,
        tablesName: "삭제된 테이블입니다",
      });
    }
  };

  // 컴포넌트 초기화 시 로컬 저장소에서 상태 복원
  useEffect(() => {
    const savedFloors = JSON.parse(localStorage.getItem("floors"));
    if (savedFloors) {
      setFloors(savedFloors);
      const currentFloor = savedFloors.find(
        (floor) => floor.floorNum === nowSelectFloor
      );
      if (currentFloor) {
        setTables(
          currentFloor.tables.map((table) => ({
            ...table,
            checked: false,
            deleted: false,
          }))
        );
        setColumns(getColumns(currentFloor.tables.length));
      }
    } else {
      // 초기 데이터 로드 (API 호출 등)
    }
  }, [nowSelectFloor]);

  const saveFloorTableMutation = useMutation({
    mutationKey: "saveFloorTableMutation",
    mutationFn: saveFloorTableRequest,
    onSuccess: (response) => {},
    onError: (error) => {
      console.log(error);
    },
  });

  // 데이터를 서버에 전송할 형식으로 변환
  const processDataForServer = (data) => {
    return data.map((item) => ({
      adminId: item.adminId,
      floorNum: item.floorNum,
      floorName: item.floorName || `층 ${item.floorNum}`,
      tables: item.tables.map((table) => ({
        adminId: table.adminId,
        floorNum: table.floorNum,
        tablesNum: table.tablesNum,
        tablesName: table.tablesName,
      })),
    }));
  };

  const saveTableMutation = useMutation({
    mutationKey: "saveTableMutation",
    mutationFn: saveTableRequest,
    onSuccess: (response) => {
      window.location.replace("/admin/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleAddTable = () => {
    setTables((prevTables) => {
      const maxTableNum = Math.max(
        ...prevTables.map((table) => table.tablesNum),
        0
      );
      const newTable = {
        adminId: adminId,
        checked: false,
        floorNum: nowSelectFloor,
        tablesId: maxTableNum + 1,
        tablesName: (maxTableNum + 1).toString(),
        tablesNum: maxTableNum + 1,
      };
      saveTableMutation.mutate({
        adminId: adminId,
        floorNum: nowSelectFloor,
        tablesNum: maxTableNum + 1,
        tablesName: (maxTableNum + 1).toString(),
      });
      return [...prevTables, newTable];
    });
  };

  const handleSavePosEdit = () => {
    if (window.confirm("층과 테이블 설정을 저장하시겠습니까?")) {
      const currentFloorData = floors.find(
        (floor) => floor.floorNum === nowSelectFloor
      );
      if (!currentFloorData) {
        alert("현재 선택된 층이 없습니다.");
        return;
      }
      const processedFloorData = processDataForServer([currentFloorData]);
      deleteTableMutation.mutate(
        {
          adminId: adminId,
          floorNum: nowSelectFloor,
        },
        {
          onSuccess: () => {
            saveFloorTableMutation.mutate(processedFloorData, {
              onSuccess: () => {
                alert("저장되었습니다.");
              },
              onError: (error) => {
                console.log("저장 실패:", error);
              },
            });
          },
          onError: (error) => {
            console.log("삭제 실패:", error);
          },
        }
      );
    }
  };
  // 기본 층 이름 설정
  const currentFloor = floors.find(
    (floor) => floor.floorNum === nowSelectFloor
  );
  const floorName = currentFloor ? currentFloor.floorName : "층 선택";

  return (
    <div css={s.posLayout}>
      {/* 테이블 갯수 버튼 */}
      <div>
        <PosEditButtonList
          buttons={buttons}
          setTableCount={setTableCountButton}
        />
      </div>

      {/* 테이블들 */}
      <div css={s.tableLayout}>
        <div css={s.tableContainer(columns)}>
          {tables.map((table, index) => (
            <div
              css={s.tableButton(table.checked)}
              key={index}
              onClick={() => handleSelectTable(table.tablesNum)}
            >
              {!table.deleted ? (
                <div css={s.tableHeader}>
                  <div>{table.tablesName}</div>
                </div>
              ) : (
                <div css={s.emptySlot}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 옵션 */}
      <div css={s.managmentLayout}>
        <div css={s.managmentContainer}>
          <button onClick={() => setIsOpenFloorEdit(!isOpenFloorEdit)}>
            층/구역 관리
          </button>
          <div css={s.floorManagement}>
            {isOpenFloorEdit && (
              <PosEditFloor
                floors={floors}
                setFloors={setFloors}
                setIsOpenFloorEdit={setIsOpenFloorEdit}
              />
            )}
          </div>

          <button onClick={handleAddTable}>추가</button>
          <button onClick={handleDelete}>삭제</button>
          <button onClick={handleEdit}>수정</button>

          <div css={s.floorManagement}>
            {isOpenTableNameEdit && (
              <PosEditTableName
                floorNum={editFloorNum}
                table={editTable}
                updateTableName={updateTableName}
                setIsOpenTableNameEdit={setIsOpenTableNameEdit}
              />
            )}
          </div>

          <button onClick={() => setIsOpenFloorList(!isOpenFloorList)}>
            {floorName}
          </button>
          {/* 생성된 층/구역 List */}
          <div>
            {isOpenFloorList &&
              floors.map((floor, index) => (
                <div key={index}>
                  <button onClick={() => handleSelectFloor(floor.floorNum)}>
                    {floor.floorName}
                  </button>
                </div>
              ))}
          </div>
        </div>
        <button onClick={handleSavePosEdit}>저장하기</button>
      </div>
    </div>
  );
}
export default PosTableEditPage;
