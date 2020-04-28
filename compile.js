"use strict";

require("child_process").spawn("npx", [
	"sass",
	...[
		"default"
	].map(name => `sass/${name}.scss:css/${name}.css`),
	...process.argv.slice(2)
], {
	shell: true,
	stdio: "inherit"
});
