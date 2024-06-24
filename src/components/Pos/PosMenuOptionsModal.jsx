/**@jsxImportSource @emotion/react */
import * as s from "./style";

function PosMenuOptionsModal({ 
  isOpen, 
  onClose, 
  options, 
  handleAddItem,
  menuCount,
  setMenuCount,
  selectedOptions,
  setSelectedOptions
}) {
  if (!isOpen) return null;

  const handleCheckboxChange = (optionItem, name, price, isChecked) => {
    if (isChecked) {
      setSelectedOptions([...selectedOptions, { optionItem, name, price }]);
    } else {
      setSelectedOptions(selectedOptions.filter(item => item.name !== name));
    }
  };

  const handleInsert = () => {
    handleAddItem(menuCount, selectedOptions);
    onClose();
  };

  const handleIncrease = () => {
    setMenuCount(menuCount + 1);
  };

  const handleDecrease = () => {
    setMenuCount(menuCount > 1 ? menuCount - 1 : 1); // 최소값 1
  };

  return (
    <div css={s.modalOverlay}>
      <div css={s.modalContent}>
        <button css={s.closeButton} onClick={onClose}>
            X
        </button>
        <div>
            <div>
                <h3>수량</h3>
                <button onClick={handleIncrease}>+</button>
                <button onClick={handleDecrease}>-</button>
            </div>
            <div>
                <input type="number" name="menuCount" value={menuCount} readOnly />
            </div>
        </div>
        {options?.map((optionItem, index) => (
          <div key={index}>
            <h3>{optionItem.titleName}</h3>
            <div>
              {optionItem.optionNames.map((name, idx) => (
                <div key={idx}>
                  {name} + {optionItem.optionPrices[idx]}원
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleCheckboxChange(optionItem, name, optionItem.optionPrices[idx], e.target.checked)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <div css={s.buttonLayout}>
          <button css={s.insertButton} onClick={handleInsert}>추가</button>
          <button css={s.insertButton} onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default PosMenuOptionsModal;
