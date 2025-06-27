import { privacyContent } from "config/main-config"
import { format, parse } from "date-fns";

export const getEffectiveDate = () => {
    const effectiveDate = privacyContent.effctiveDate;
    let formattedDate;

    if(effectiveDate) {
        const parsedDate = parse(effectiveDate, 'MMddyyyy', new Date());
        formattedDate = format(parsedDate, 'MM/dd/yyyy');
    } else {
        formattedDate = format(new Date(), 'MM/dd/yyyy');
    };


    return formattedDate;
}
