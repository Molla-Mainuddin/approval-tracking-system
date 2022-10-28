const APPROVAL_VIEW_API_BASE_URL = process.env.REACT_APP_APPROVAL_VIEW_API_BASE_URL;

export const getAllApprovals = async () => {
    try {
        const response = await fetch(APPROVAL_VIEW_API_BASE_URL + "getAllApprovals", {
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
};

export const getApprovalByMemberId = async (memberId) => {

    try {
        const response = await fetch(APPROVAL_VIEW_API_BASE_URL + `getApprovals/${memberId}`, {
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
};

export const changeStatusByMemberId = async (approvalId,memberId,status) => {

    try {
        const response = await fetch(APPROVAL_VIEW_API_BASE_URL + `changeApprovalStatusById/${memberId}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify({
                "approvalId": approvalId,
                "approvalStatus": status
            })
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
};

export const getApprovalDetailsById = async (approvalId) => {

    try {
        const response = await fetch(APPROVAL_VIEW_API_BASE_URL + `getApprovalDetailsById/${approvalId}`, {
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
};
