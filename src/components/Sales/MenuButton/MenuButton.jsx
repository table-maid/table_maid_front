/** @jsxImportSource @emotion/react */
import * as s from "./style";

function MenuButton({ img, menuName, onClick, maxCharsPerLine = 8 }) {
  const splitText  = (text, maxChars) => {
    const regex = new RegExp(`.{1,${maxChars}}`, 'g');
    return text.match(regex).join('\n');
  };
  
  return (
    <div css={s.Layout} onClick={onClick}>
      <button css={s.menu}>
        <div css={s.imgLayout}>
          <img src={img} alt="" />
        </div>
        <div css={s.menuListLayout}>
          <h1>{splitText(menuName, maxCharsPerLine)}</h1>
        </div>
      </button>
    </div>
  );
}

export default MenuButton;
