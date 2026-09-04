// Entry point.
//
// The app really lives in src/server.js, and `npm start` runs that directly.
// This file exists because hosts that auto-detect a Node app (Render among
// them, when the service is created by hand rather than from render.yaml)
// default to running `node index.js`. Rather than depend on a start command
// being set correctly in a dashboard, the guess is simply made correct.
import "./src/server.js";
