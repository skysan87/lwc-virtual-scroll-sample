export default function getData({ amountOfRecords }) {
    const response = [];
    for(let index = 1; index < amountOfRecords; index++) {
        response.push({
            id: index, 
            name: `dummy${index}`, 
            email: `dummy${index}@xxx.yyy`
        });
    }
    return response;
}
