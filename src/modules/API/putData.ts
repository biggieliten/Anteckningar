import axios, { AxiosResponse,  } from "axios";
import { baseURL } from "./getData";
import { ApiError, ApiResponse} from "../types/interfaces";


export const putData =  async (noteID: string, updateNoteValue:string): Promise<ApiResponse | ApiError> => {
	try{

		const response: AxiosResponse = await axios.put(`${baseURL}/api/notes/${noteID}`,{note: updateNoteValue})
		// console.log(response.data);
		return response.data;
	} catch (error) {
        if (axios.isAxiosError(error)) {
            const err: ApiError = {
                message: error.message,
                status: error.response ? error.response.status : 500
            };
            return err;
        } else {
            throw error;
        }
    }
};
