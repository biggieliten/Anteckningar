import axios, {AxiosResponse} from "axios";
import { baseURL } from "./getData";
import { ApiResponse, ApiError } from '../types/interfaces';

export const deleteData = async (noteId: string): Promise<ApiResponse | ApiError<string, number>> => {

	try {
		const response: AxiosResponse = await axios.delete(`${baseURL}/api/notes/${noteId}`);
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

