
const emptyUUID = "00000000-0000-0000-0000-000000000000";


/**
 * Creates new entries to the context menu.
 */
browser.contextMenus.create({
    id: "randomUniqueIdentifier",
    title: 'Copy to clipboard random UUID.',
    enabled: true,
    contexts: ["all"]
});

browser.contextMenus.create({
    id: "emptyUniqueIdentifier",
    title: 'Copy to clipboard empty UUID.',
    enabled: true,
    contexts: ["all"]
});

/**
 * Add listener to the created entries on the context menu.
 */
browser.contextMenus.onClicked.addListener(function (info) {
    switch (info.menuItemId) {

        case "randomUniqueIdentifier":
            WriteToClipBoard(GenerateRandomUUID());
            break;

        case "emptyUniqueIdentifier":
            WriteToClipBoard(emptyUUID);
            break;

    }
})


/**
 * Generates a random universally unique identifier.
 * Compliant with RFC4122 V4 -> https://www.ietf.org/rfc/rfc4122.txt
 * 
 * Credits -> https://stackoverflow.com/a/2117523
 */
function GenerateRandomUUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

/**
 * Write the clipboard with the given string.
 * @param {string} newContent New content to be written.
 */
async function WriteToClipBoard(newContent) {
    try {
        await navigator.clipboard.writeText(newContent);
        console.log('Copied to clipboard:', newContent);
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}

/**
 * Reads and returns the actual clipboard text.
 */
async function ReadClipboardContents() {
    try {
        const text = await navigator.clipboard.readText();
        console.log('Clipboard content: ', text);
        return text;
    } catch (err) {
        console.error('Failed to read clipboard contents: ', err);
    }
}