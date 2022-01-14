import {dev_env} from "./config.js"

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const BLUE = "\x1b[34m";
const MAGENTA = "\x1b[35m";
const CYAN = "\x1b[36m";
const WHITE = "\x1b[37m";
const BOLD = "\x1b[1m";
const BLINK = "\x1b[5m";
const RESET = "\x1b[0m"

const debug = (...args) => {
	if(dev_env === "development"){
		console.log(BOLD);
		console.log(WHITE, "====================================== DEBUG ======================================");
		args.forEach(arg => console.log(BLUE, arg));
		console.log(WHITE, "====================================== DEBUG ======================================");
		console.log(RESET);
	}
}

const err = (...args) => {
	console.log(BOLD);
	console.log(RED, "====================================== ERROR ======================================");
	args.forEach(arg => console.log(MAGENTA, arg));
	console.log(RED, "====================================== ERROR ======================================");
	console.log(RESET);
}

export default {debug, err}