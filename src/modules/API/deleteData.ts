import axios, {AxiosResponse} from "axios";
import { noteInterface, postNoteInterface } from '../types/interfaces';
import { deleteNoteArr } from "./getData";

const baseURL = 'https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com';

export async function deleteData(noteId: any) {
	console.log(noteId);
	const response: AxiosResponse = await axios.delete(`${baseURL}/api/notes/${noteId}`);
	const responseData: JSON = response.data;  
	console.log(responseData);
	
}

