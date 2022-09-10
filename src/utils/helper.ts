export const priceDecimal = (string: string | undefined | number) => {
    if (string !== null && string !== undefined) {
        string = string.toString().replace(".00", "");

        string += "";
        let x = string.split(".");
        let x1 = x[0];
        let x2 = x.length > 1 ? "." + x[1] : "";
        let rgx = /(\d+)(\d{3})/;

        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, "$1" + "." + "$2");
        }

        return x1 + x2;
    } else {
        return "-";
    }
};
