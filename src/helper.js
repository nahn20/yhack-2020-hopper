const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
export function combine_dicts(dict1, dict2){ //Dict2 adds any of its values to dict1 possibly overwriting
    let newDict = {};
    newDict = Object.assign(newDict, dict1);
    for(var key in dict2){
        newDict[key] = dict2[key];
    }
    return newDict;
}

export function getFullString(n, char){
    let s = "";
    for(let i = 0; i < n; i++){
        s += char;
    }
    return s;
}

export function doubleDigitify(digit){
    if(digit < 10 && digit >= 0){
        return "0" + digit;
    }
    return digit;
}
function getHeader(fullDate){
    let month = doubleDigitify(fullDate.getMonth());
    let date = doubleDigitify(fullDate.getDate());
    let day = WEEKDAYS[fullDate.getDay()];
    let header = [`${day}, ${month}/${date}`, `${day}`, `${month}/${date}`];
    return header;
}
export function parseTimeString(s, fullDate){
    let hour = fullDate.getHours();
    let minute = fullDate.getMinutes();
    let initialSlot = 4*hour + Math.floor(minute/15);
    let dataArray = [{header: getHeader(fullDate), highlighted: false, data: []}];
    for(let i = 0; i < initialSlot; i++){ //Filling in before
        dataArray[0].data[i] = 0;
    }
    for(let i = 0; i < s.length; i++){
        let day = Math.floor((i + initialSlot) / 96);
        let slot = (i+initialSlot) % 96;
        if(slot === 0 && i > 0){
            fullDate.setDate(fullDate.getDate()+1);
            dataArray[day] = {header: getHeader(fullDate), highlighted: false, data: []};
        }
        dataArray[day].data[slot] = parseInt(s.charAt(i));
    }
    for(let i = dataArray[dataArray.length-1].data.length; i < 96; i++){
        dataArray[dataArray.length-1].data[i] = 0;
    }
    return dataArray;
}
