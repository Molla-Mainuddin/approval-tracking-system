import { toast } from 'react-toastify';

export const notify = (actionType, message) => {
    switch (actionType) {
        case "LOGIN_SUCCESS":
            return toast.success(message);
        case "LOGIN_ERROR":
            return toast.error(message);
        case "LOGOUT_SUCCESS":
            return toast.success(message);
        case "EMPTY_FIELD":
            return toast.error(message);
        case "SUBMIT_SUCCESS":
            return toast.success(message);
        case "SUBMIT_FAILED":
            return toast.error(message);
        case "INVALID_DATA":
            return toast.error(message);
        default:
            return toast.success("success");
    }
}