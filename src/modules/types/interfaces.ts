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
	status: number;
  }

export interface ApiError<T, D> {
	message: T;
	status: D;
  }	