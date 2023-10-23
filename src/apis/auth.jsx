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
    const data = {"fullName": reqdata.fullName, "password": reqdata.password, "dob":reqdata.dob, "role":reqdata.role, "teamid":reqdata.scrumTeam}

    try {
        const response = await axios.post(Auth_Base_Url + "register", data);
        return response;
    } catch (error) {
        console.log('Something went wrong , Please try again later.');
    }
};

export const ScrumTeamApi = async () => {
    try {
        const response = await axios.get(Auth_Base_Url + "getAllScrumTeam");
        return response;
    } catch (error) {
        console.log('Something went wrong , Please try again later.');
    }
};

export const IsMemberExist = async (memberId) => {
    try {
        const response = await axios.get(Auth_Base_Url + `forgetpassword/ismemberexist/${memberId}`);
        return response;
    } catch (error) {
        console.log('Something went wrong , Please try again later.');
    }
}

export const GetDobByMemberId = async (memberId) => {
    try {
        const response = await axios.get(Auth_Base_Url + `forgetpassword/getdob/${memberId}`);
        return response;
    } catch (error) {
        console.log('Something went wrong , Please try again later.');
    }
}

export const UpdatePasswordByMemberId = async (memberId, newpassword) => {
    try {
        const response = await axios.put(Auth_Base_Url + `forgetpassword/updatepassword/${memberId}/${newpassword}`);
        return response;
    } catch (error) {
        console.log('Something went wrong , Please try again later.');
    }
}