/// <reference lib="webworker" />
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sw = self as any;

sw.addEventListener("install", () => {
    console.log("Service Worker installing.");
    sw.skipWaiting();
});

sw.addEventListener("activate", () => {
    console.log("Service Worker activating.");
});

sw.addEventListener("fetch", () => {
    // Pass-through for now
});
