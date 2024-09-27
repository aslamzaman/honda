

/**
 * Get data from API. 
 * @param {String} collectionName - Collection Name
 * @returns 
 */
export const fetchDataFromAPI = async (collectionName) => {
    try {
        const sessionData = sessionStorage.getItem(collectionName);
        if (sessionData) {
            console.log("Data from sessionStorage");
            return JSON.parse(sessionData);
        }

        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/${collectionName}`;
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${url}. Status: ${response.status}`);
        }
        const data = await response.json();

        console.log("Data from remote API");
        sessionStorage.setItem(collectionName, JSON.stringify(data));
        return data;
    } catch (error) {
        console.error(`Error fetching data from ${url}: ${error.message || error}`);
        return []; // Return an empty array in case of an error
    }
};



/**
 * Add new data
 * @param {String} collectionName - Collection Name
 * @param {Object} data - JS object
 * @returns
 */
export const postDataToAPI = async (collectionName, data) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/${collectionName}`;
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Failed to save data. Status: ${response.status}`);
        }
        const responseData = await response.json();
        sessionStorage.removeItem(collectionName);
        return `Data saved successfully. New Id: ${responseData._id}`;
    } catch (error) {
        console.error(`Error saving data: ${error.message || error}`);
        throw new Error("Data save was not completed successfully.");
    }
};




/**
 * formated date for input
 * @param {Date} dt  - Date-"yyyy-mm-dd"
 * @returns 
 */
export const formatedDate = (dt) => {
    const timestamp = Date.parse(dt);
    const initialDate = !isNaN(timestamp);
    const days = [
        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
    ];
    const newDate = new Date(dt);
    const fullYear = newDate.getFullYear();
    const monthIndex = newDate.getMonth();
    const date = newDate.getDate();
    return initialDate ? `${fullYear}-${days[monthIndex + 1]}-${days[date]}` : '1970-01-01';
}



/**
 * Formated date with dot -> 31.10.2024 or 31.10.24
 * @param {Date} dt  - Date-"yyyy-mm-dd"
 * @param {Boolean} isFullYear  - True Or False
 * @returns
 */
export const formatedDateDot = (dt, isFullYear) => {
    const days = [
        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
    ];
    const newDate = new Date(dt);
    const fullYear = newDate.getFullYear();
    const monthIndex = newDate.getMonth();
    const date = newDate.getDate();
    const shortYear = fullYear.toString().substring(2, 4);
    const shortDate = `${days[date]}.${days[monthIndex + 1]}.${shortYear}`;
    const fullDate = `${days[date]}.${days[monthIndex + 1]}.${fullYear}`;
    const retDt = isFullYear ? fullDate : shortDate;
    return retDt;
}



