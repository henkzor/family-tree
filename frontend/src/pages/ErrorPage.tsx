import {  useRouteError } from "react-router-dom"
import MainNavigation from "../components/Navigation/MainNavigation";

export default function Error() {

    const error  = useRouteError();

    let title = "Feeeel";
    let errorCode = 450
    let message = "Felfelfelfelfel";

    if (error instanceof Object){
        const err = error as { status?: number; statusText?: string; message?: string, data?: string };
        title = err.statusText || title;
        errorCode = err.status || errorCode;
        message = err.message? err.message:  err.data || message;
    } 

        
    return (
        <div className="text-center">
            <MainNavigation />
            <div className="mt-20 text-center">
                <h2>{title}</h2>
                <p>{errorCode}</p>
                <p>{message}</p>

            </div>
        </div>
    )
}