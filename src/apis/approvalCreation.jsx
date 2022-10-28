const SUBMIT_APPROVAL_API_BASE_URL = process.env.REACT_APP_APPROVAL_CREATION_API_BASE_URL;


export const SubmitApprovalData = async (req) => {
    // console.log(req.approvalId,req.memberId,req.description,req.releaseVersion,req.testResult,req.scrumTeamId)
    try {
        const response = await fetch(SUBMIT_APPROVAL_API_BASE_URL + "submitApproval", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify({
                "approvalId":req.approvalId,
                "description": req.description,
                "releaseVersion": req.releaseVersion,
                "testResult": req.testResult,
                "solverId": req.solverId,
                "scrumTeamId": req.scrumTeamId
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

export const EditApproval = async (req) => {
    // console.log(req.approvalId,req.memberId,req.description,req.releaseVersion,req.testResult,req.scrumTeamId)
    try {
        const response = await fetch(SUBMIT_APPROVAL_API_BASE_URL + "editApproval", {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify({
                "approvalId":req.approvalId,
                "description": req.description,
                "releaseVersion": req.releaseVersion,
                "testResult": req.testResult
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

export const getLastApprovalId = async () => {
    try {
        const response = await fetch(SUBMIT_APPROVAL_API_BASE_URL + "getLastApprovalId", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })
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

export const deleteApprovalById = async (approvalId) => {
    try {
        const response = await fetch(SUBMIT_APPROVAL_API_BASE_URL + `deleteApproval/${approvalId}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })
        const result = await response.json();
        if (response.ok) {
            console.log("Result is : "+result);
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