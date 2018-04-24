
function classname() {
    let classStr = '';
    arguments.array.forEach(element => {
        classStr += element + ' ';
    });
    return classStr.trim();
}

export default classname;