
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload()
    });
    var newSW;
    // Register service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then((reg) => {
                reg.addEventListener('updatefound', () => {
                    // Copy reference of new worker being installed
                    newSW = reg.installing;
                    newSW.addEventListener('statechange', () => {
                        // On service worker state changed(except initial one)
                        if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
                            // display upgrade button
                            document.getElementById('up').style.display = "block";
                        }
                    })
                })
            }).catch((e) => {
                console.log(e);
            });
    }

    var upSW = () => {
        console.log('Initiating upgrade');
        // Send message to new service worker
        newSW.postMessage({ action: 'clearOld' });
        newSW.postMessage({ action: 'skipWaiting' });
    }

