
export const REGEX = {
    username: {
        regexr: /^[A-Za-z0-9]{5,10}$/,
        text: "영문자, 숫자 5 ~ 10자리 형식이어야 합니다"
    },
    password: {
        regexr: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,128}$/,
        text: "하나의 영문자, 숫자, 특수문자를 포함한 5 ~ 128자리 형식이어야 합니다"
    },
    name: {
        regexr: /^[가-힇]{2,}$/,
        text: "한글문자 형식이어야 합니다"
    },
    email: {
        regexr: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
        text: "이메일 형식이어야 합니다"
    },
    newPassword: {
        regexr: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,128}$/,
        text: "하나의 영문자, 숫자, 특수문자를 포함한 8 ~ 128자리 형식이어야 합니다"
    },
    oldPassword: {
        regexr: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,128}$/,
        text: "하나의 영문자, 숫자, 특수문자를 포함한 8 ~ 128자리 형식이어야 합니다"
    },
    companyNumber: {
        regexr: /^\d{10}$/,
        text: "사업자 등록 번호는 숫자 10자리 형식이어야합니다."
    },
    companyName: {
        regexr: /.{1,}/,
        text: "1자리 이상의 회사명을 입력해 주세요.",
    },
    ownerName: {
        regexr: /^[가-힣a-zA-Z\s.]+$/,
        text: "대표자명에는 숫자, 특수문자가 들어갈 수 없습니다."
    },
    companyAddress: {
        regexr: /.{1,}/,
        text: "주소를 입력해 주세요."
    },
  
  };