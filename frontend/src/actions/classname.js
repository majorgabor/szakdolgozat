
 export function classname() {
    let classStr = '';
    for(let i = 0; i < arguments.length; i++) {
        if(!!arguments[i]) {
            classStr += arguments[i].trim() + ' ';
        }
    }
    return classStr.trim();
}