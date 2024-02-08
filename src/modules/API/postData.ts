import axios, { AxiosResponse,  } from "axios";
import { postNoteInterface } from '../types/interfaces';
import { noteInterface } from '../types/interfaces';
import { getUser } from "./getData";


// import { deleteNoteArr } from "./getData";


const baseURL = 'https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com';
	
	const submitButton = document.querySelector(".submit-button") as HTMLButtonElement;
	const postData = async () => {  
		
		
		const note = (document.getElementById("note-input") as HTMLTextAreaElement).value
		const username = (document.getElementById("username-input") as HTMLInputElement).value
		const title = (document.getElementById("title-input") as HTMLInputElement).value
		
		// let username = usernameInput.value;
		// let title = titleInput.value;
		// let note = noteInput.value;
		const noteDataObject: postNoteInterface = {username, title, note};
		
		console.log("Request Payload:", noteDataObject)

		// if (username.trim() === "" || note.trim() === "") {
		// 	console.error("Username and note cannot be empty.");
		// 	return; // Exit the function if inputs are empty.
		// }
	
		
		try {    
			const response: AxiosResponse = await axios.post<noteInterface>(baseURL + "/api/notes", noteDataObject );    
			return response;
		} 
		catch (error: any) {
			console.error("Error posting data:", error.response.data);
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

	