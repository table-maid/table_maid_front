import React, { useState } from 'react'

function PosEditTableName({selectedTables, updateTableName, setIsOpenTableNameEdit}) {
  const [tableName, setTableName] = useState(selectedTables.tablesName);

  const handleChange = (e) => {
    setTableName(e.target.value);
  }

  const handleSubmit = () => {
    updateTableName(selectedTables.tablesNum, tableName);
    setIsOpenTableNameEdit(false);
  }

  const handleCancle = () => {
    setIsOpenTableNameEdit(false);
  }

  return (
    <div>
      <h1>테이블 수정</h1>
      테이블명
      <input
        type='text'
        value={tableName}
        onChange={handleChange}
      />

      <button onClick={handleCancle}>취소</button>
      <button onClick={handleSubmit}>저장</button>
    </div>
  )
}

export default PosEditTableName
