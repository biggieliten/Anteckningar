import axios from "axios";
import { ApiResponse, ApiError, postNoteInterface } from '../types/interfaces';
import { getUser } from "./getData";
import { baseURL } from "./getData";

	const submitButton = document.querySelector(".submit-button") as HTMLButtonElement;
	const postData = async (): Promise<ApiResponse | ApiError<string, number>> => {  
		
		
		const note = (document.getElementById("note-input") as HTMLTextAreaElement).value
		const username = (document.getElementById("username-input") as HTMLInputElement).value
		const title = (document.getElementById("title-input") as HTMLInputElement).value
		
		const noteDataObject: postNoteInterface = {username, title, note};
		
		//Varnar ifall användaren försöker skicka in tomma inputs.
		if (username.trim() === "" || note.trim() === "" || title.trim() === "") {
			alert("Username, note and title cannot be empty");
		}
	
		
		try {    
			const response = await axios.post<ApiResponse>(baseURL + "/api/notes", noteDataObject );    
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
	

	//Behöver använda mig av async och await på eventlistnern för att invänta uppdateringen i textarea för notes. Annars behöver jag klicka på submit två gånger innan den uppdateras.
	submitButton.addEventListener("click", async () => {
		try {
			await postData();
			getUser();
		} catch(error){
			console.error(error);
		
		}
	});

	