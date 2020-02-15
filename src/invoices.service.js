import firebase from './firebase';

const invoicesRef = firebase.database().ref('invoices');

export const invoicesFetch = () => {
    return invoicesRef
        .orderByChild('invoice_number')
        .once('value')
        .then((snapshot) => {

            var objects = snapshot.val();
            var invoices = [];

            for (var objID in objects) {
                if (objects.hasOwnProperty(objID)) {
                    invoices.push({
                        ...objects[objID],
                        objID: objID
                    });
                }
            }

            return invoices;
        })
        .catch((err) => {
            console.error(err);
            return [];
        });
}

export default invoicesRef;