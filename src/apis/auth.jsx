import axios from "axios";

const Auth_Base_Url = process.env.REACT_APP_AUTHORIZATION_API_BASE_URL;

export const LoginApi = async (reqdata) => {

    const data = {"memberId": reqdata.memberId, "password": reqdata.password}
    try {
        const response = await axios.post(Auth_Base_Url + "login", data);
        return response;
    } catch (error) {
        console.log('Something went wrong , Please try again later.');
    }
};

export const RegistrationApi = async (reqdata) => {
    const data = {"username": reqdata.memberName, "password": reqdata.password, "role":reqdata.memberRole}

    try {
        const response = await axios.post(Auth_Base_Url + "register", data);
        return response;
    } catch (error) {
        console.log('Something went wrong , Please try again later.');
    }
};