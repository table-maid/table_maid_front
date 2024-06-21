/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { agreedState } from "../../../../atoms/agreedStateAtom";
import { useNavigate, useSearchParams } from "react-router-dom";
import Agreement from "../../../../components/AuthPage/Agreement/Agreement";
import { marketingTerms, serviceTerms } from "./terms";

function TACPage() {
  const [agreed, setAgreed] = useRecoilState(agreedState);
  const [check, setCheck] = useState({
    "이용약관 동의 (필수)": false,
    "마켓팅 동의 (선택)": false,
    "만 14세 이상 동의 (필수)": false,
    전체동의: false,
  });
  const [searchParams] = useSearchParams();
  const oAuth2Name = searchParams.get("name");
  const provider = searchParams.get("provider");
  const navigator = useNavigate();

  useEffect(() => {
    const allChecked = Object.values(check)
      .slice(0, -1)
      .every((value) => value);
    setCheck((prev) => ({ ...prev, 전체동의: allChecked }));
    setAgreed(allChecked);
  }, [check]);

  const handleNextClick = () => {
    if (!!oAuth2Name || !!provider) {
      navigator(`/auth/user/signup?name=${oAuth2Name}&provider=${provider}`);
    } else {
      navigator("/auth/user/signup");
    }
  };

  return (
    <div css={s.pageLayout}>
      <div css={s.header}>
        <h1>약관동의</h1>
      </div>
      <div css={s.pageContainer}>
        <div css={s.agreeBox}>
          <div css={s.container}>
            <div css={s.agree}>
              <Agreement
                title={"전체동의"}
                setCheck={setCheck}
                check={check}
                isAllChecked={check["전체동의"]}
              />
              <Agreement
                title={"만 14세 이상 동의 (필수)"}
                setCheck={setCheck}
                check={check}
              />
              <Agreement
                title={"이용약관 동의 (필수)"}
                content={serviceTerms}
                setCheck={setCheck}
                check={check}
              />
              <Agreement
                title={"마켓팅 동의 (선택)"}
                content={marketingTerms}
                setCheck={setCheck}
                check={check}
              />
            </div>
          </div>
        </div>
        <div css={s.buttonBox}>
          <button disabled={!agreed} onClick={handleNextClick} css={s.button}>
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

export default TACPage;
