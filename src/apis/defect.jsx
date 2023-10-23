const DEFECT_API_BASE_URL = process.env.REACT_APP_DEFECT_API_BASE_URL;


export const GetAllDefect = async () => {
    try {
        const response = await fetch(DEFECT_API_BASE_URL + `getalldefect`, {
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

export const GetLastDefectId = async () => {
    try {
        const response = await fetch(DEFECT_API_BASE_URL + `getlastdefectid`, {
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

export const GetDefectsByAssignedToMemberId = async (memberId) => {
    try {
        const response = await fetch(DEFECT_API_BASE_URL + `getdefectsbyassignedmemberid/${memberId}`, {
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

export const GetDefectsByCreatedMemberId = async (memberId) => {
    try {
        const response = await fetch(DEFECT_API_BASE_URL + `getdefectsbycreatedmemberid/${memberId}`, {
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

export const SubmitDefect = async (req) => {
    // console.log(req.description,req.releaseVersion,req.assignedToMemberId,req.assignedToScrumTeamId,req.additionalComments)
    try {
        const response = await fetch(DEFECT_API_BASE_URL + "submitdefect", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify({
                "defectSummary":req.defectSummary,
                "description": req.description,
                "releaseVersion": req.releaseVersion,
                "assignedToScrumTeamId":req.assignedToScrumTeamId,
                "assignedToMemberId":req.assignedToMemberId,
                "createdByMemberId":req.createdByMemberId,
                "status":req.status,
                "additionalComments": req.additionalComments
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

export const GetDefectDetailsById = async (defectId) => {
    try {
        const response = await fetch(DEFECT_API_BASE_URL + `getdefectdetailsbyid/${defectId}`, {
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

export const editDefect = async (req) => {
    // console.log(req.approvalId,req.memberId,req.description,req.releaseVersion,req.testResult,req.scrumTeamId)
    try {
        const response = await fetch(DEFECT_API_BASE_URL + "editdefect", {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify({
                "defectId":req.defectId,
                "defectSummary": req.defectSummary,
                "description": req.description,
                "releaseVersion": req.releaseVersion,
                "createdByScrumTeamId": req.createdByScrumTeamId,
                "assignedToMemberId":req.assignedToMemberId,
                "additionalComments": req.additionalComments,
                "status": req.status
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

export const EditDefectResult = async (req) => {
    // console.log(req.defectId,req.testResult);
    try {
        const response = await fetch(DEFECT_API_BASE_URL + "editdefectresult", {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify({
                "defectId":req.defectId,
                "testResult":req.testResult
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

export const ChangeStatus = async (req) => {
    // console.log(req.defectId,req.testResult);
    try {
        const response = await fetch(DEFECT_API_BASE_URL + "changestatus", {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify({
                "defectId":req.defectId,
                "status":req.status
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

export const DeleteDefectById = async (defectId) => {
    try {
        const response = await fetch(DEFECT_API_BASE_URL + `deletedefectbyid/${defectId}`, {
            method: "DELETE",
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
