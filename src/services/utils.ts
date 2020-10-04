const Utils = {
    sortObjects: (array: any[], key: string, order: string="dsc"): any[] => {
        return array.sort((a,b) => {
            if (order === "asc") {
                return (a[key] < b[key]) ? -1 : 1;
            } else {
                return (a[key] < b[key]) ? 1 : -1;
            }
        });
    }
}

export default Utils;