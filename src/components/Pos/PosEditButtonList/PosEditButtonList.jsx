/** @jsxImportSource @emotion/react */
import * as s from "./style";
import PropTypes from 'prop-types';

function PosEditButtonList({ buttons, setTableCount }) {

  const selectCount = (label) => {
    setTableCount(label)
  }

  return (
    <div>
      {
        buttons.map((label, index) => (
          <button key={index} onClick={() => selectCount(label)}>
            {label}
          </button>  
        ))
      }
    </div>
  );
}

// ButtonList 컴포넌트가 buttons라는 prop을 받을 때, 
// 이 buttons prop이 문자열로 이루어진 배열이어야 하며, 반드시 전달되어야 함을 명시
PosEditButtonList.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PosEditButtonList
