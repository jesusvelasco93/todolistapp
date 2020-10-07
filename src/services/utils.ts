const Utils = {
    sortObjects: (array: any[], key: string, order: string="dsc"): any[] => {
        return array.sort((a,b) => {
            if (order === "asc") {
                return (a[key] < b[key]) ? -1 : 1;
            } else {
                return (a[key] < b[key]) ? 1 : -1;
            }
        });
    },
    filterObjects: (array: any[], key: string, textFilter: string): any[] => {
        return array.filter(item => {
            return item[key].toLowerCase().indexOf(textFilter.toLowerCase()) !== -1;
        });
    }
}

export default Utils;