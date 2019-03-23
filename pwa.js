function initPWA() {
    var pwa = document.getElementById("pwa");

    function endPrompt(choice) {
        if (choice.outcome == "accepted") {
            console.log("A2HS prompt accepted.");
        }
        else {
            console.log("A2HS prompt dismissed.");
        }
    }

    function clickPrompt() {
        pwa.classList.add("hidden");
        installer.prompt();
        installer.userChoice.then(endPrompt);
    }

    function showPrompt(installer) {
        installer.preventDefault();
        pwa.classList.remove("hidden");
        pwa.addEventListener("click", clickPrompt);
    }

    if ("serviceWorker" in navigator) {
        if (navigator.serviceWorker.controller) {
            console.log("[PWA Builder] Active service worker found, no need to register.");
        }
        else {
            navigator.serviceWorker.register("serviceworker.js").then(function (e) {
                console.log("[PWA Builder] Service worker has been registered for scope: " + e.scope);
            });
        }
    }

    window.addEventListener("beforeinstallprompt", showPrompt);
}

window.addEventListener("load", initPWA);
