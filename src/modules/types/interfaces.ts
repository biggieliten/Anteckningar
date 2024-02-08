export interface arrayInterface{
	notes: [];
}

export interface noteInterface {
notes: string[];
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
	response: noteInterface[];
	status: number;
  }

export interface ApiError {
	message: string
	status: number
  }