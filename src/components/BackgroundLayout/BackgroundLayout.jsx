/** @jsxImportSource @emotion/react */
import * as s from "./style";

function BackgroundLayout({ children }) {
  return (
    <>
        <div css={s.background}></div>
        <div css={s.layout}>
            { children }
        </div>
    </>
    
  )
}

export default BackgroundLayout
