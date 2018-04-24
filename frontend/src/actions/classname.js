
function classname() {
    let classStr = '';
    for(let i = 0; i < arguments.length; i++) {
        classStr += arguments[i] + ' ';
    }
    return classStr.trim();
}

export default classname;