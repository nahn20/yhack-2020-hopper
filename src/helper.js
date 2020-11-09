function combine_dicts(dict1, dict2){ //Dict2 adds any of its values to dict1 possibly overwriting
    let newDict = {};
    newDict = Object.assign(newDict, dict1);
    for(var key in dict2){
        newDict[key] = dict2[key];
    }
    return newDict;
}
export default combine_dicts;
