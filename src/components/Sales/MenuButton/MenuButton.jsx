/** @jsxImportSource @emotion/react */
import * as s from "./style";
import nothingImage from "../../../icons8-이미지-없음-100.png"
function MenuButton({ img, menuName, onClick, maxCharsPerLine = 8 }) {
  const splitText  = (text, maxChars) => {
    const regex = new RegExp(`.{1,${maxChars}}`, 'g');
    return text.match(regex).join('\n');
  };

  const imageUrl = img ? img : nothingImage;
  
  return (
    <div css={s.Layout} onClick={onClick}>
      <button css={s.menu}>
        <div css={s.imgLayout}>
        <img src={imageUrl} alt=""css={s.img}/>
        </div>
        <div css={s.menuListLayout}>
          <h1>{splitText(menuName, maxCharsPerLine)}</h1>
        </div>
      </button>
    </div>
  );
}

export default MenuButton;
