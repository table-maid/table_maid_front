/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useState } from 'react'
import AuthPageInput from '../../../../components/AuthPage/AuthPageInput/AuthPageInput'
import { useInput } from '../../../../hooks/useInput';
import { signupRequest } from "../../../../apis/api/signup";


function AdminInfoPage() {
    const [adminName, adminNameChange, adminNameMessage] = useInput("adminName");
    const [username, userNameChange, usernameMessage, setUsernameValue, setUsernameMessage] = useInput("username");
    const [password, passwordChange, passwordMessage] = useInput("password");
    const [checkPassword, checkPasswordChange] = useInput("checkPassword");
    const [checkPasswordMessage, setCheckPasswordMessage] = useState(null);
    const [email, emailChange, emailMessage] = useInput("email");
    const [companyNumberST, companyNumberChange, companyNumberMessage, setCompanyNumberValue, setCompanyNumberMessage] = useInput("companyNumber");
    const [companyName, companyNameChange, companyNameMessage] = useInput("companyName");
    const [ownerName, ownerNameChange, ownerNameMessage] = useInput("ownerName");
    const [companyAddress, companyAddressChange, companyAddressMessage, setCompanyAddressValue, setCompanyAddressMessage] = useInput("companyAddress");


    const [isStoreInfo, setIsStoreInfo] = useState(false);

    useEffect(() => {
        if (!checkPassword || !password) {
            setCheckPasswordMessage(() => null);
            return;
        }

        if (checkPassword === password) {
            setCheckPasswordMessage(() => {
                return {
                    type: "success",
                    text: "",
                };
            });
        } else {
            setCheckPasswordMessage(() => {
                return {
                    type: "error",
                    text: "비밀번호가 일치하지 않습니다.",
                };
            });
        }
    }, [checkPassword, password]);

    const isOpenStroeInfo = () => {
        const checkFlags = [
            usernameMessage?.type,
            passwordMessage?.type,
            checkPasswordMessage?.type,
            adminNameMessage?.type,
            emailMessage?.type,
        ];

        if (checkFlags.includes("error") || checkFlags.includes(undefined) || checkFlags.includes(null)) {
            alert("가입 정보를 다시 확인하세요.");
            return;
        }

        setIsStoreInfo(true);
    }

    const isCloseStroeInfo = () => {
        setIsStoreInfo(false);
    }



    const handleSignupSubmit = () => {
        const checkFlags = [
            companyNumberMessage?.type,
            companyNameMessage?.type,
            ownerNameMessage?.type,
            companyAddressMessage?.type,
        ];

        if (checkFlags.includes("error") || checkFlags.includes(undefined) || checkFlags.includes(null)) {
            alert("매장 정보를 다시 확인하세요.");
            return;
        }

        let companyNumber = parseInt(companyNumberST);

        signupRequest({
            adminName,
            username,
            password,
            email,
            companyNumber,
            companyName,
            ownerName,
            companyAddress
        })
        .then((response) => {
            console.log(response);
            if(response.status === 201) {
                alert("회원가입이 완료되었습니다. 로그인 해주세요.");
                // navigate("/auth/signin");
            }
        })
        .catch((error) => {
            if (error.response.status === 400) {
                const errorMap = error.response.data;
                const errorEntries = Object.entries(errorMap);
                console.log(errorMap);
                for (let [k, v] of errorEntries) {
                    if (k === "username") {
                        setUsernameMessage(() => {
                            return {
                                type: "error",
                                text: v,
                            };
                        });
                    } else if (k === "companyNumber") {
                        setCompanyNumberMessage(() => {
                            return {
                                type: "error",
                                text: v
                            }
                        })
                    } else if (k === "companyAddress") {
                        setCompanyAddressMessage(() => {
                            return {
                                type: "error",
                                text: v
                            }
                        })
                    }
                }
            } else {
                alert("회원가입 오류");
            }
        })



    }

    return (
        <div>
            <div>
                <div>
                    <h1>회원가입</h1>
                </div>
                {
                    !isStoreInfo === true
                    ?
                    <>
                        <div>
                        <AuthPageInput
                            type={"text"}
                            name={"adminName"}
                            placeholder={"성명"}
                            value={adminName}
                            onChange={adminNameChange}
                            message={adminNameMessage}
                        />
                        <AuthPageInput
                            type={"text"}
                            name={"username"}
                            placeholder={"아이디"}
                            value={username}
                            onChange={userNameChange}
                            message={usernameMessage}
                        />
                        <AuthPageInput
                            type={"password"}
                            name={"password"}
                            placeholder={"비밀번호"}
                            value={password}
                            onChange={passwordChange}
                            message={passwordMessage}
                        />
                        <AuthPageInput
                            type={"password"}
                            name={"checkPassword"}
                            placeholder={"비밀번호 확인"}
                            value={checkPassword}
                            onChange={checkPasswordChange}
                            message={checkPasswordMessage}
                        />
                        <AuthPageInput
                            type={"text"}
                            name={"email"}
                            placeholder={"이메일"}
                            value={email}
                            onChange={emailChange}
                            message={emailMessage}
                        />
                        </div>

                        <button css={s.signinButton} onClick={isOpenStroeInfo}>
                            다음
                        </button>
                    </>

                    :

                    <>
                        <div>
                        <AuthPageInput
                            type={"text"}
                            name={"adminName"}
                            placeholder={"성명"}
                            value={adminName}
                            onChange={adminNameChange}
                            message={adminNameMessage}
                            disabled
                        />
                        <AuthPageInput
                            type={"text"}
                            name={"username"}
                            placeholder={"아이디"}
                            value={username}
                            onChange={userNameChange}
                            message={usernameMessage}
                            disabled
                        />
                        <AuthPageInput
                            type={"password"}
                            name={"password"}
                            placeholder={"비밀번호"}
                            value={password}
                            onChange={passwordChange}
                            message={passwordMessage}
                            disabled
                        />
                        <AuthPageInput
                            type={"password"}
                            name={"checkPassword"}
                            placeholder={"비밀번호 확인"}
                            value={checkPassword}
                            onChange={checkPasswordChange}
                            message={checkPasswordMessage}
                            disabled
                        />
                        <AuthPageInput
                            type={"text"}
                            name={"email"}
                            placeholder={"이메일"}
                            value={email}
                            onChange={emailChange}
                            message={emailMessage}
                            disabled
                        />
                        </div>

                        <div>
                        <AuthPageInput
                            type={"number"}
                            name={"companyNumber"}
                            placeholder={"사업자등록번호"}
                            value={companyNumberST}
                            onChange={companyNumberChange}
                            message={companyNumberMessage}
                        />
                        <AuthPageInput
                            type={"text"}
                            name={"companyName"}
                            placeholder={"매장명"}
                            value={companyName}
                            onChange={companyNameChange}
                            message={companyNameMessage}
                        />
                        <AuthPageInput
                            type={"text"}
                            name={"ownerName"}
                            placeholder={"대표자명"}
                            value={ownerName}
                            onChange={ownerNameChange}
                            message={ownerNameMessage}
                        />
                        <AuthPageInput
                            type={"text"}
                            name={"companyAddress"}
                            placeholder={"사업장 주소"}
                            value={companyAddress}
                            onChange={companyAddressChange}
                            message={companyAddressMessage}
                        />
                        </div>
                        

                        <button css={s.signinButton} onClick={isCloseStroeInfo}>
                            뒤로가기
                        </button>

                        <button css={s.signinButton} onClick={handleSignupSubmit}>
                            회원가입하기
                        </button>
                    </>



                }
                


            </div>
        </div>
    )
}

export default AdminInfoPage
