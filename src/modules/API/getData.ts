import axios from "axios";
export const baseURL = 'https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com';
import { displayNotes } from "./display";
import { ApiError, ApiResponse } from '../types/interfaces';


// Funktionen nedan är en fungerande version av den som finns i beskrivningen. Ifall denna används, se över så att alla interfaces används och är importerade.	

export const getUser = async (): Promise<ApiResponse | ApiError<string, number>> =>{
	try {
 	 const username = (document.getElementById("username-input") as HTMLInputElement).value;	  
	 const response = await axios.get<ApiResponse>(`${baseURL}/api/notes/${username}`);
	
	  displayNotes(response.data)
	  return response.data;
	} catch (error) {
        if (axios.isAxiosError(error)) {
            const err: ApiError<string, number> = {
                message: error.message, 
                status: error.response ? error.response.status : 500
            };

            return err;

        } else {
            throw error;
        }
    }
};
