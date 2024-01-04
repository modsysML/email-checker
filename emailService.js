// emailService.js

function getEmails(callback) {
    const openRequest = indexedDB.open('EmailDB', 1);

    openRequest.onsuccess = function (event) {
        const db = event.target.result;

        const transaction = db.transaction(['emails'], 'readonly');
        const emailStore = transaction.objectStore('emails');

        const getAllRequest = emailStore.getAll();

        getAllRequest.onsuccess = function () {
            const emails = getAllRequest.result;
            callback(emails);
        };

        transaction.onerror = function (event) {
            console.error('Error retrieving emails from IndexedDB');
        };
    };

    openRequest.onerror = function (event) {
        console.error('Error opening database');
    }
}

function storeEmail(emailData) {
    const openRequest = indexedDB.open('EmailDB', 1);

    openRequest.onsuccess = function (event) {
        const db = event.target.result;

        const transaction = db.transaction(['emails'], 'readwrite');
        const emailStore = transaction.objectStore('emails');

        emailStore.add(emailData);

        transaction.oncomplete = function () {
            console.log('Email added to IndexedDB');
        };

        transaction.onerror = function (event) {
            console.error('Error adding email to IndexedDB');
        };
    };

    openRequest.onerror = function (event) {
        console.error('Error opening database');
    }
}

export function trackEmails(trackerJsonUrl, callback) {
    fetch(trackerJsonUrl)
        .then(response => response.json())
        .then(data => {
            // Get all images in the document
            const images = document.querySelectorAll('img');

            // Iterate through each image
            images.forEach(function (image) {
                // Check if the image source matches any tracking pixel URL
                const isTracked = Object.keys(data).some(tracker => {
                    const regex = new RegExp(data[tracker]);
                    return regex.test(image.src);
                });

                if (isTracked) {
                    // Execute the callback with the tracked image
                    callback(image);
                }
            });
        })
        .catch(error => console.error('Error loading tracker.json:', error));
}


//module.exports = {trackEmails};
