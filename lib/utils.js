
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const TRADUCTION_ITALY = {
    IN_PROCESS: "IN CORSO",
    READY: "PRONTO",
    WAITING: "IN ATTESA",
    HAS_NO_REPAIR: "NON HA RIPARAZIONE",
}


export function getTimeFormat(date = new Date()) {
    const currentDateTime = typeof date == "string" ? new Date(date) : date
    const year = currentDateTime.getFullYear()
    const month = (currentDateTime.getMonth() + 1).toString().padStart(2, '0')
    const day = currentDateTime.getDate().toString().padStart(2, '0')
    const hours = currentDateTime.getHours().toString().padStart(2, '0')
    const minutes = currentDateTime.getMinutes().toString().padStart(2, '0')
    const seconds = currentDateTime.getSeconds().toString().padStart(2, '0')
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
}


export function processingDescriptionLong(description = "", limit = 60) {
    const words = description.split(" ");
    let processedText = [];
    let currentLine = "";
    for (const word of words) {
        if ((currentLine + word).length <= limit) {
            currentLine += (currentLine === "" ? "" : " ") + word;
        } else {
            processedText.push(currentLine);
            currentLine = word;
        }
    }
    if (currentLine !== "") {
        processedText.push(currentLine);
    }
    const finalText = processedText.join("\n");
    return { finalText, length: processedText.length };
}
