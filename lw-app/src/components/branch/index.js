'use strict';

const getBranchXML = (arrShowroom) => {
    let srid = ""
    for (let i in arrShowroom) {
        let arr = arrShowroom[i];
        if (!arr.hasOwnProperty('isCheckbox')) {
            arr.isCheckbox = true
        }
        if (!arr.isCheckbox) 
            continue;
        srid = srid + "<TableID><ColumnID>" + arr.SRID + "</ColumnID></TableID>"
    }
    srid = "<DataSetID>" + srid + "</DataSetID>"
    return srid
}

export {
    getBranchXML,
}