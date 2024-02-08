import axios, { AxiosResponse,  } from "axios";
import { deleteData } from "./deleteData";
import { putData } from "./putData";
import { noteInterface, postNoteInterface, ApiError, ApiResponse} from '../types/interfaces';
import { send } from "process";
import { get } from "http";
const baseURL = 'https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com';
const deleteButtons: HTMLButtonElement[] = [];
const searchButton = document.getElementById('searchButton') as HTMLButtonElement;
// let noteDatas: any = [];




// Funktionen nedan är en fungerande version av den som finns i beskrivningen. Ifall denna används, se över så att alla interfaces används och är importerade.	

export const getUser = async (): Promise<ApiResponse | ApiError> =>{
	try {
 	 const username = (document.getElementById("username-input") as HTMLInputElement).value;	  
	 const response = await axios.get<ApiResponse>(`${baseURL}/api/notes/${username}`);
	
	  displayNotes(response.data)
	  return response.data;
	} catch (error: any) {
	//   console.error(error);
	return {
		message: error.message,
		status: error.response.status
	}
	}
  }




// export async function getUser() {
// 	try {
// 		const username = (document.getElementById("username-input") as HTMLInputElement).value;	  
// 		const response: AxiosResponse = await axios.get<noteInterface>(`${baseURL}/api/notes/${username}`);
			
// 	 	displayNotes(response.data)
// 		 return response.data;
// 	} catch (error: any) {
// 		console.error("Error posting data:", error.response.data);
// 	}
// }


function displayNotes(noteData: any): void{
	
	const notesArr: noteInterface[] = noteData.notes;
	
	const noteFlow = document.querySelector('.noteFlow') as HTMLElement;
	
	// Påminner om att noteflow är tom, eller endast innehåller de notes som redan existerar i APIet. Detta löser problemet där min forEach loop lägger till de redan existerande notesen + 1.
	noteFlow.innerHTML = '';
	
	notesArr.forEach((note: noteInterface) => {
		
		
		//Skapar en section för varje object i APIet, lägger till en class och appendar till noteFlow.
		const noteElement = document.createElement('section') as HTMLElement;
		noteElement.classList.add(note.id.toLowerCase());	
		noteFlow.append(noteElement);
		
		//Här skapar vi ett "time-element" för varje object och tilldelar värdet av tiden en Date Constructor så att den kan arbeta med interfacet "noteInterface"
		const dateCreated = document.createElement('time') as HTMLTimeElement;
		const dateConstructor = new Date(note.createdAt); 
		dateCreated.textContent = `${dateConstructor.toDateString()}`
		dateCreated.classList.add("timeTag");
		
		//Skapar h1 för varje object samt hämtar värdet av title. 
		const titleElement = document.createElement('h1') as HTMLHeadElement;
		titleElement.textContent = `<${note.title}>`;
		titleElement.classList.add('titleTag');
		
		//Skapar en p-tagg för varje object och hämtar värdet note. 
		const noteContentElement = document.createElement('p') as HTMLParagraphElement;
		noteContentElement.classList.add("notePtag",note.id);
		noteContentElement.textContent = note.note;
		noteContentElement.setAttribute("contenteditable", "true");	
		
		
		
		const deleteButton = document.createElement('button') as HTMLButtonElement;
		deleteButton.classList.add('delete-button', note.id);
		deleteButton.textContent = "Delete";
		
		// Delete knappen lyssnar på klick och utför funktionerna inom eventlistenern.
		deleteButton.addEventListener('click', () => {
			deleteData(note.id);
		
			// När ett object raderas i apiet, raderas även det synliga elementet med kodraden nedan.
			noteElement.remove();
		});
		
		const sendUpdateButton = document.createElement('button') as HTMLButtonElement;
		sendUpdateButton.textContent = "Save";
		sendUpdateButton.classList.add('update-button');

		sendUpdateButton.addEventListener('click', () =>{
			putData(note.id, noteContentElement.textContent);
		})

		const noteButtonsCont = document.createElement('div') as HTMLElement;
		
		
		// Skapar en p-tagg för varje object och hämtar värdet username. 
		const usernameElement = document.createElement('p') as HTMLParagraphElement;
		usernameElement.textContent = `- ${note.username}`;
		usernameElement.classList.add('usernameTag');

		noteButtonsCont.append(deleteButton, sendUpdateButton)
		noteElement.append(dateCreated, titleElement, noteContentElement, usernameElement, noteButtonsCont, /* updateButton, updateInputSection,*/  );
		deleteButtons.push(deleteButton);
	})
}

searchButton.addEventListener('click',() => {

	getUser();

});


			
