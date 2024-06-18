import React from 'react'
import AuthPageInput from '../../../components/AuthPage/AuthPageInput/AuthPageInput'
import { useInput } from '../../../hooks/useInput';
import { searchUsernameByEmailRequest } from '../../../apis/api/account';
import { useMutation } from 'react-query';

function SearchUserNamePage() {
    const [adminName, adminNameChange, adminNameMessage] = useInput("adminName");
    const [email, emailChange, emailMessage] = useInput("email");


    const searchUsernameByEmailMutation = useMutation({
        mutationKey: "searchUsernameByEmailMutation",
        mutationFn: searchUsernameByEmailRequest,
        retry: 0,
        onSuccess: (response) => {
            console.log(response.data);
            if (response.data === false) {
                alert("해당 사용자가 존재하지 않습니다");
                return;
            }
            alert("해당 메일로 계정이름을 전송하였습니다.");
            // setIsMailSended(() => true);
            // setSecound(() => 180);
            // setTimeout(() => {
            //     setIsMailSended(() => false);
            // }, 180000);
        },
        onError: (error) => {
            alert(error.response.data)
        }
    });

    const handleEmailSendClick = () => {
        if(window.confirm("메일은 전송하겠습니까?")) {
            searchUsernameByEmailMutation.mutate({
                adminName: adminName,
                email: email
            });
        }
    }

    return (
        <div>
            <h1>계정 찾기</h1>
            <div>
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
                        name={"email"}
                        placeholder={"이메일"}
                        value={email}
                        onChange={emailChange}
                        message={emailMessage}
                    />
                </div>
                <div>
                    <button onClick={handleEmailSendClick}>메일 전송</button>
                </div>

            </div>
        </div>
    )
}

export default SearchUserNamePage


