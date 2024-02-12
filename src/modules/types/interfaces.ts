// export interface arrayInterface{
// 	notes: [];
// }

export interface noteInterface {
id: string;
username: string;
title :string;
note: string;
createdAt: Date;
}

export interface postNoteInterface {
	username: string;
	title: string;
	note: string;
}

export interface ApiResponse {
	notes: noteInterface[];
	// response: noteInterface[];
	status: number;
  }

export interface ApiError {
	message: string
	status: number
  }