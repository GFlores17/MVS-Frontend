import { io } from "socket.io-client";


const localURL = import.meta.env.VITE_API_LOCAL;
const prodURL = import.meta.env.VITE_API_PROD;

/*
const urlInUse = import.meta.env.PROD
? import.meta.env.VITE_API_PROD
: import.meta.env.VITE_API_LOCAL;
*/

const urlInUse = import.meta.env.VITE_BACKEND_URL;

export const socket = io(`${urlInUse}`, {
  autoConnect: false, // optional
});
