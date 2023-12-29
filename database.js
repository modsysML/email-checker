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

    const fetch = store.getAll();

    fetch.onsuccess = (event) => {
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

    transaction.oncomplete = function() {
        db.close();
    }
}