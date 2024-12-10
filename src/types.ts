export enum NEEDS {
	TRANSCENDENCE = 0,
	SELF_ACTUALISATION = 1,
	AESTHETIC = 2,
	COGNITIVE = 3,
	ESTEEM = 4,
	LOVE_AND_BELONGING = 5,
	SAFETY = 6,
	BIOLOGICAL_AND_PHYSIOLOGICAL = 7
}

export interface Message {
	role: "system" | "user";
	content: string;
}