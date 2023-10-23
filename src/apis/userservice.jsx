const USER_SERVICE_API_BASE_URL = process.env.REACT_APP_USER_SERVICE_API_BASE_URL;

export const GetAllScrumTeam = async () => {
    try {
        const response = await fetch(USER_SERVICE_API_BASE_URL + `getallscrumteam`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })

        // if (response.status === 403) {
        //     toast.error('Your Session has been expired, Please login again.');
        //     return window.setTimeout(function () {
        //         localStorage.clear();
        //         window.location.href = "/";
        //     }, 1000);
        // }
        const result = await response.json();
        // console.log(result);
        if (response.ok) {
            return result;
        }
    } catch (error) {
        console.log('Something went wrong , Please try again later.')
    }
}

export const GetAllDevScrumTeam = async () => {
    try {
        const response = await fetch(USER_SERVICE_API_BASE_URL + `getalldevscrumteam`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })

        // if (response.status === 403) {
        //     toast.error('Your Session has been expired, Please login again.');
        //     return window.setTimeout(function () {
        //         localStorage.clear();
        //         window.location.href = "/";
        //     }, 1000);
        // }
        const result = await response.json();
        // console.log(result);
        if (response.ok) {
            return result;
        }
    } catch (error) {
        console.log('Something went wrong , Please try again later.')
    }
}

export const GetMemberInfoById = async (memberId) => {
    try {
        const response = await fetch(USER_SERVICE_API_BASE_URL + `getuserinfo/${memberId}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })

        // if (response.status === 403) {
        //     toast.error('Your Session has been expired, Please login again.');
        //     return window.setTimeout(function () {
        //         localStorage.clear();
        //         window.location.href = "/";
        //     }, 1000);
        // }
        const result = await response.json();
        // console.log(result);
        if (response.ok) {
            return result;
        }
    } catch (error) {
        console.log('Something went wrong , Please try again later.')
    }
}

export const GetAllMembers = async () => {
    try {
        const response = await fetch(USER_SERVICE_API_BASE_URL + `getallmembers`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })

        // if (response.status === 403) {
        //     toast.error('Your Session has been expired, Please login again.');
        //     return window.setTimeout(function () {
        //         localStorage.clear();
        //         window.location.href = "/";
        //     }, 1000);
        // }
        const result = await response.json();
        // console.log(result);
        if (response.ok) {
            return result;
        }
    } catch (error) {
        console.log('Something went wrong , Please try again later.')
    }
}

export const GetLastMemberId = async () => {
    try {
        const response = await fetch(USER_SERVICE_API_BASE_URL + `getlastmemberid`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })

        // if (response.status === 403) {
        //     toast.error('Your Session has been expired, Please login again.');
        //     return window.setTimeout(function () {
        //         localStorage.clear();
        //         window.location.href = "/";
        //     }, 1000);
        // }
        const result = await response.json();
        // console.log(result);
        if (response.ok) {
            return result;
        }
    } catch (error) {
        console.log('Something went wrong , Please try again later.')
    }
}

export const AddNewMember = async (req) => {
    // console.log(req.approvalId,req.memberId,req.description,req.releaseVersion,req.testResult,req.scrumTeamId)
    try {
        const response = await fetch(USER_SERVICE_API_BASE_URL + "addmember", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify({
                "firstName": req.firstName,
                "lastName": req.lastName,
                "mailId": req.mailId,
                "role": req.role,
                "dob": req.dob
            })
        })
        // if (response.status === 403) {
        //     console.log('Your Session has been expired, Please login again.');
        //     return window.setTimeout(function () {
        //         localStorage.clear();
        //         window.location.href = "/";
        //     }, 1000);
        // }
        const result = await response.json();

        if (response.ok) {
            return result;
        }
        else if (response.status === 400) {
            console.log("Premium not paid")
        }
        else if (result.status === 500) {
            console.log(result.message);
        }
    } catch (error) {
        console.log(error);
    }
};

export const AddTeamAndMember = async (req) => {
    // console.log(req.approvalId,req.memberId,req.description,req.releaseVersion,req.testResult,req.scrumTeamId)
    try {
        const response = await fetch(USER_SERVICE_API_BASE_URL + "addmemberteam", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify({
                "memberId":req.memberId,
                "teamId":req.scrumTeamId
            })
        })
        // if (response.status === 403) {
        //     console.log('Your Session has been expired, Please login again.');
        //     return window.setTimeout(function () {
        //         localStorage.clear();
        //         window.location.href = "/";
        //     }, 1000);
        // }
        const result = await response.json();

        if (response.ok) {
            return result;
        }
        else if (response.status === 400) {
            console.log("Premium not paid")
        }
        else if (result.status === 500) {
            console.log(result.message);
        }
    } catch (error) {
        console.log(error);
    }
};

export const EditMemberDetails = async (req) => {
    // console.log(req.memberId,req.firstName,req.lastName,req.role,req.dob);
    try {
        const response = await fetch(USER_SERVICE_API_BASE_URL + "editmemberdetails", {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify({
                "memberId":req.memberId,
                "firstName": req.firstName,
                "lastName": req.lastName,
                "role": req.role,
                "dob": req.dob
            })
        })
        // if (response.status === 403) {
        //     console.log('Your Session has been expired, Please login again.');
        //     return window.setTimeout(function () {
        //         localStorage.clear();
        //         window.location.href = "/";
        //     }, 1000);
        // }
        const result = await response.json();

        if (response.ok) {
            return result;
        }
        else if (response.status === 400) {
            console.log("Premium not paid")
        }
        else if (result.status === 500) {
            console.log(result.message);
        }
    } catch (error) {
        console.log(error);
    }
};

export const GetTeamDetailsByMemberId = async (memberId) => {
    try {
        const response = await fetch(USER_SERVICE_API_BASE_URL + `getteamdetailsbymemberid/${memberId}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })

        // if (response.status === 403) {
        //     toast.error('Your Session has been expired, Please login again.');
        //     return window.setTimeout(function () {
        //         localStorage.clear();
        //         window.location.href = "/";
        //     }, 1000);
        // }
        const result = await response.json();
        // console.log(result);
        if (response.ok) {
            return result;
        }
    } catch (error) {
        console.log('Something went wrong , Please try again later.')
    }
}

export const GetAllMemberByTeamId = async (teamId) => {
    try {
        const response = await fetch(USER_SERVICE_API_BASE_URL + `getallmemberbyteamid/${teamId}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })

        // if (response.status === 403) {
        //     toast.error('Your Session has been expired, Please login again.');
        //     return window.setTimeout(function () {
        //         localStorage.clear();
        //         window.location.href = "/";
        //     }, 1000);
        // }
        const result = await response.json();
        // console.log(result);
        if (response.ok) {
            return result;
        }
    } catch (error) {
        console.log('Something went wrong , Please try again later.')
    }
}

export const GetTeamDetailsByTeamId = async (teamId) => {
    try {
        const response = await fetch(USER_SERVICE_API_BASE_URL + `getscrumteamdetails/${teamId}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })

        // if (response.status === 403) {
        //     toast.error('Your Session has been expired, Please login again.');
        //     return window.setTimeout(function () {
        //         localStorage.clear();
        //         window.location.href = "/";
        //     }, 1000);
        // }
        const result = await response.json();
        // console.log(result);
        if (response.ok) {
            return result;
        }
    } catch (error) {
        console.log('Something went wrong , Please try again later.')
    }
}