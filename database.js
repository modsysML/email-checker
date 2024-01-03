const indexDB = 
window.indexedDB ||
window.mozIndexedDB ||
window.webkitindexedDB ||
window.msindexedDB ||
window.shimindexedDB;

const request = indexDB.open('EmailDatabase');

request.onerror = function(event) {
    console.log('An error occured in indexDB');
    console.log(event)
}

request.onupgradeneeded = function() {
    const db = request.result;
    const store = db.createObjectStore('mails', { keyPath: "id" });
    store.createIndex('mail_title', ['title'], { unique: false });
    store.createIndex('mail_text', ['title', 'text'], { unique: false });
}

request.onsuccess = function() {
    const db = request.result;
    const transaction = db.transaction('mails', 'readwrite');
    const store = transaction.objectStore('mails');

    store.put({ id: 1, title: "Test 1", text: "Hello" });
    store.put({ id: 2, title: "Test 2", text: "Bonjour" });

    const dataContent = store.getAll();

    dataContent.onsuccess = (event) => {
        const data = event.target.result
        const box = document.getElementById('mails')

        data.forEach((item) => {
            const mail = document.createElement('li')
            let title = item.title
            let text = item.text
            let combined = title + ': ' + text
            mail.textContent = combined
            
            box.appendChild(mail)
        })
    }

    // Tracker code
// Function to check email for tracking
const checkEmail = (email, trackingPattern) => {
    if (!email) {
        return null; // Handle the case where email is undefined or null
    }

    for (const [provider, pattern] of Object.entries(trackingPattern)) {
        if (new RegExp(pattern).test(email)) {
            return provider;
        }
    }
    return null;
};


const loadFile = async (filePath) => {
    try {
        const response = await fetch(filePath);
        const trackingPatterns = await response.json();
        return trackingPatterns;
    } catch (error) {
        console.error('Error loading file:', error);
        throw error;
    }
};

const trackerFilePath = '/tracker.json';

let trackingPattern;

loadFile(trackerFilePath)
.then((result) => {
    trackingPattern = result

    const request = indexedDB.open('EmailDatabase');

        request.onsuccess = function () {
            const db = request.result;
            const transaction = db.transaction('mails', 'readwrite');
            const store = transaction.objectStore('mails');

            // Your other IndexedDB operations

            const dataContent = store.getAll();

            dataContent.onsuccess = function (event) {
                const emails = event.target.result;

                // Now you can iterate through emails and check for tracking
                emails.forEach(email => {
                    const provider = checkEmail(email, trackingPattern);
                    if (provider) {
                        console.log(`Email '${email}' contains tracking from ${provider}`);
                    } else {
                        console.log(`Email '${email}' does not contain known tracking`);
                    }
                });
            };

            dataContent.onerror = function (event) {
                console.error('Error getting emails:', event.target.error);
            };
        };

        request.onerror = function (event) {
            console.error('Error opening database:', event.target.error);
        }
})
.catch(error => {
    console.error('Error:', error);
});
    
    transaction.oncomplete = function() {
        db.close();
    }
}