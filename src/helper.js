const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export const THEME = ["orange", "white", "grey"];


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
export function getFullList(n, char){
    let list = [];
    for(let i = 0; i < n; i++){
        list.push(char);
    }
    return list;
}
export function smushData(data){
    let smush = [];
    for(let i = 0; i < data.length; i++){
        smush = smush.concat(data[i].data);
    }
    return smush;
}
export function chopDataStart(data){ //Chops the end off of data
    let shiftCount = 0;
    loop1:
    for(let i = 0; i < data.length; i++){
        for(let j = 0; j < data[i].data.length; j++){
            if(data[i].data[j] === 2){
                break loop1;
            }
        }
        shiftCount++;
    }
    data.splice(0, shiftCount);
    return shiftCount;
}

export function chopDataEnd(data){ //Chops the end off of data
    for(let i = data.length-1; i >= 0; i--){
        for(let j = 0; j < data[i].data.length; j++){
            if(data[i].data[j] === 2){
                return data;
            }
        }
        data.pop();
    }
    return data;
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
export function getDataDict(date){
    return {header: getHeader(date), highlighted: false, data: []};
}
export function parseTimeString(s, fullDate){
    let hour = fullDate.getHours();
    let minute = fullDate.getMinutes();
    let initialSlot = 4*hour + Math.floor(minute/15);
    let dataArray = [getDataDict(fullDate)];
    for(let i = 0; i < initialSlot; i++){ //Filling in before
        dataArray[0].data[i] = 0;
    }
    for(let i = 0; i < s.length; i++){
        let day = Math.floor((i + initialSlot) / 96);
        let slot = (i+initialSlot) % 96;
        if(slot === 0 && i > 0){
            fullDate.setDate(fullDate.getDate()+1);
            dataArray[day] = getDataDict(fullDate);
        }
        dataArray[day].data[slot] = parseInt(s.charAt(i));
    }
    for(let i = dataArray[dataArray.length-1].data.length; i < 96; i++){
        dataArray[dataArray.length-1].data[i] = 0;
    }
    return dataArray;
}
export function parseTimeList(list, fullDate){
    let hour = fullDate.getHours();
    let minute = fullDate.getMinutes();
    let initialSlot = 4*hour + Math.floor(minute/15);
    let dataArray = [getDataDict(fullDate)];
    for(let i = 0; i < initialSlot; i++){ //Filling in before
        dataArray[0].data[i] = 0;
    }
    for(let i = 0; i < list.length; i++){
        let day = Math.floor((i + initialSlot) / 96);
        let slot = (i+initialSlot) % 96;
        if(slot === 0 && i > 0){
            fullDate.setDate(fullDate.getDate()+1);
            dataArray[day] = getDataDict(fullDate);
        }
        dataArray[day].data[slot] = parseInt(list[i]);
    }
    for(let i = dataArray[dataArray.length-1].data.length; i < 96; i++){
        dataArray[dataArray.length-1].data[i] = 0;
    }
    return dataArray;
}