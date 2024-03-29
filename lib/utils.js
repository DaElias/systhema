
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const TRADUCTION_ITALY = {
    IN_PROCESS: "IN CORSO",
    READY: "PRONTO",
    WAITING: "IN ATTESA",
    HAS_NO_REPAIR: "NON HA RIPARAZIONE",
}

export function covertArrayToHas({ key, array }) {
    const hashMapByKey = {};
    for (let i = 0; i < array.length; i++) {
        let element = array[i];
        let keyValue = element[key]
        hashMapByKey[keyValue] = element;
    }
    return hashMapByKey
}

export function clearObject(object = {}) {
    const newObject = {}
    for (let key in object) {
        let element = object[key]
        if (element)
            newObject[key] = element
    }
    return newObject
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

export const HAS_PROVINCE = Object.values({
    "AG": "Agrigento",
    "AL": "Alessandria",
    "AN": "Ancona",
    "AO": "Aosta",
    "AR": "Arezzo",
    "AP": "Ascoli Piceno",
    "AT": "Asti",
    "AV": "Avellino",
    "BA": "Bari",
    "BT": "Barletta-Andria-Trani",
    "BL": "Belluno",
    "BN": "Benevento",
    "BG": "Bergamo",
    "BI": "Biella",
    "BO": "Bologna",
    "BZ": "Bolzano",
    "BS": "Brescia",
    "BR": "Brindisi",
    "CA": "Cagliari",
    "CL": "Caltanissetta",
    "CB": "Campobasso",
    "CI": "Carbonia-Iglesias",
    "CE": "Caserta",
    "CT": "Catania",
    "CZ": "Catanzaro",
    "CH": "Chieti",
    "CO": "Como",
    "CS": "Cosenza",
    "CR": "Cremona",
    "KR": "Crotone",
    "CN": "Cuneo",
    "EN": "Enna",
    "FM": "Fermo",
    "FE": "Ferrara",
    "FI": "Florence",
    "FG": "Foggia",
    "FC": "Forlì-Cesena",
    "FR": "Frosinone",
    "GE": "Genoa",
    "GO": "Gorizia",
    "GR": "Grosseto",
    "IM": "Imperia",
    "IS": "Isernia",
    "SP": "La Spezia",
    "AQ": "L'Aquila",
    "LT": "Latina",
    "LE": "Lecce",
    "LC": "Lecco",
    "LI": "Livorno",
    "LO": "Lodi",
    "LU": "Lucca",
    "MC": "Macerata",
    "MN": "Mantua",
    "MS": "Massa and Carrara",
    "MT": "Matera",
    "VS": "Medio Campidano",
    "ME": "Messina",
    "MI": "Milan",
    "MO": "Modena",
    "MB": "Monza and Brianza",
    "NA": "Naples",
    "NO": "Novara",
    "NU": "Nuoro",
    "OG": "Ogliastra",
    "OT": "Olbia-Tempio",
    "OR": "Oristano",
    "PD": "Padua",
    "PA": "Palermo",
    "PR": "Parma",
    "PV": "Pavia",
    "PG": "Perugia",
    "PU": "Pesaro and Urbino",
    "PE": "Pescara",
    "PC": "Piacenza",
    "PI": "Pisa",
    "PT": "Pistoia",
    "PN": "Pordenone",
    "PZ": "Potenza",
    "PO": "Prato",
    "RG": "Ragusa",
    "RA": "Ravenna",
    "RC": "Reggio Calabria",
    "RE": "Reggio Emilia",
    "RI": "Rieti",
    "RN": "Rimini",
    "RM": "Rome",
    "RO": "Rovigo",
    "SA": "Salerno",
    "SS": "Sassari",
    "SV": "Savona",
    "SI": "Siena",
    "SO": "Sondrio",
    "SR": "Syracuse",
    "TA": "Taranto",
    "TE": "Teramo",
    "TR": "Terni",
    "TP": "Trapani",
    "TN": "Trento",
    "TV": "Treviso",
    "TS": "Trieste",
    "TO": "Turin",
    "UD": "Udine",
    "VA": "Varese",
    "VE": "Venice",
    "VB": "Verbano-Cusio-Ossola",
    "VC": "Vercelli",
    "VR": "Verona",
    "VV": "Vibo Valentia",
    "VI": "Vicenza",
    "VT": "Viterbo"
})