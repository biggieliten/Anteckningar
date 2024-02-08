import axios, { AxiosResponse,  } from "axios";
import { getUser } from "./getData";

const baseURL = 'https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com';

// const updatedNote = {
// 	note: "Updated note",
// }

export async function putData(noteID: any, updateNoteValue:any) {
	try{

		const response: AxiosResponse = await axios.put(`${baseURL}/api/notes/${noteID}`,{note: updateNoteValue})
		// console.log(response.data);
		return response.data;
	}catch(error: any){
		console.error("put error", error.response.data);
}
}
// putData();
