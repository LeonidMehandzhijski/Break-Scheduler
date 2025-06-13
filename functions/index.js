const functions = require("firebase-functions");
const fetch = require("node-fetch");

// Your list of allowed workplace IP addresses
const ALLOWED_IPS = [
    "89.31.152.19", "89.31.152.18", "89.31.154.155", "89.31.152.20",
    "89.31.153.245", "89.31.152.17", "89.31.152.16", "89.31.152.15",
    "89.31.152.21", "89.31.152.22", "89.31.152.23"
];

const HOSTING_URL = "https://pauzi-a69be.web.app";

// This is the gatekeeper function
exports.ipGuard = functions.https.onRequest(async (req, res) => {
    // Get the user's IP address from the request headers.
    const userIp = (req.headers["x-forwarded-for"] || req.socket.remoteAddress)
        .split(",")[0].trim();

    // Check if the request is coming from Firebase Hosting itself to prevent loops.
    // Our own fetch calls from within the function will not have this header.
    const isFirebaseHostingRequest = req.headers["x-firebase-hosting-from-site"] === "pauzi-a69be";

    if (isFirebaseHostingRequest && !ALLOWED_IPS.includes(userIp)) {
        // --- IP IS NOT ALLOWED ---
        // Fetch the 403.html page and serve it with a 403 Forbidden status.
        try {
            const response = await fetch(`${HOSTING_URL}/403.html`);
            const body = await response.text();
            res.status(403).send(body);
        } catch (error) {
            console.error("Error fetching 403 page:", error);
            res.status(500).send("Error fetching site content.");
        }
    } else {
        // --- IP IS ALLOWED or it's a direct/internal request ---
        // Fetch the actual page from the hosting URL and serve it to the user.
        try {
            const response = await fetch(`${HOSTING_URL}${req.originalUrl}`);
            const body = await response.text();
            
            response.headers.forEach((value, name) => {
                res.setHeader(name, value);
            });

            res.status(response.status).send(body);
        } catch (error) {
            console.error("Error fetching hosting content:", error);
            res.status(500).send("Error fetching site content.");
        }
    }
});
