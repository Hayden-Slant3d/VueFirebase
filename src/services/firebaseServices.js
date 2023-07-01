import { doc, setDoc, getDoc, updateDoc, deleteDoc, collection, getDocs, runTransaction } from "firebase/firestore";
import { auth, db, firestore } from "../firebase";



/**
 * @module FirebaseApi
 * is used to manage CRUD operations on Firestore database.
 * The operations include reading, creating, updating, deleting documents and
 * incrementing/decrementing values of specific fields in a document. Also, it
 * helps in generating a new ID.
 */
class FirebaseApi {

    /**
    * Reads an entire collection from the Firestore database.
    * @param {string} collectionPath - The path to the Firestore collection.
    * @returns {Promise<Array<Object>>} - A promise that resolves to an array of document data.
    */
    readCollection = async (collectionPath) => {
        const collectionRef = collection(db, collectionPath);
        const collectionSnap = await getDocs(collectionRef);

        const data = collectionSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return data;
    }

    /**
    * Creates a new document in a specified Firestore collection.
    * @param {string} collectionPath - The path to the Firestore collection.
    * @param {string} docId - The ID of the document to create.
    * @param {Object} data - The data to write to the document.
    */
    createDoc = async (collectionPath, docId, data) => {
        try {
            await setDoc(doc(db, collectionPath, docId), data);
        } catch (e) {
            console.error("Error writing document: ", e);
        }
    }

    /**
     * Reads a document from a specified Firestore collection.
     * @param {string} collectionPath - The path to the Firestore collection.
     * @param {string} docId - The ID of the document to read.
     * @returns {Promise<Object|null>} - A promise that resolves to the document data or null if the document does not exist.
     */
    readDoc = async (collectionPath, docId) => {
        const docRef = doc(db, collectionPath, docId);

        try {
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        } catch (e) {
            console.error("Error getting document:", e);
        }
    }

    /**
     * Updates a document in a specified Firestore collection.
     * @param {string} collectionPath - The path to the Firestore collection.
     * @param {string} docId - The ID of the document to update.
     * @param {Object} data - The data to update in the document.
     */
    updateDoc = async (collectionPath, docId, data) => {
        try {
            await updateDoc(doc(db, collectionPath, docId), data);
        } catch (e) {
            console.error("Error updating document: ", e);
        }
    }

    /**
     * Deletes a document from a specified Firestore collection.
     * @param {string} collectionPath - The path to the Firestore collection.
     * @param {string} docId - The ID of the document to delete.
     */
    deleteDoc = async (collectionPath, docId) => {
        try {
            await deleteDoc(doc(db, collectionPath, docId));
        } catch (e) {
            console.error("Error removing document: ", e);
        }
    }

    /**
     * Increments a numeric value in a document in a specified Firestore collection.
     * @param {string} collectionPath - The path to the Firestore collection.
     * @param {string} docId - The ID of the document to update.
     * @param {string} fieldToUpdate - The field to increment.
     * @param {number} valueToAdd - The value to add.
     */
    incrementValue = async (collectionPath, docId, fieldToUpdate, valueToAdd) => {
        try {
            const docRef = doc(db, collectionPath, docId);

            await updateDoc(docRef, {
                [fieldToUpdate]: firestore.FieldValue.increment(Number(valueToAdd)),
            });

        } catch (e) {
            console.error("Error incrementing value:", e);
        }
    }

    /**
     * Decrements a numeric value in a document in a specified Firestore collection.
     * @param {string} collectionPath - The path to the Firestore collection.
     * @param {string} docId - The ID of the document to update.
     * @param {string} fieldToUpdate - The field to decrement.
     * @param {number} valueToSubtract - The value to subtract.
     */
    decrementValue = async (collectionPath, docId, fieldToUpdate, valueToSubtract) => {
        try {
            const docRef = doc(db, collectionPath, docId);

            await updateDoc(docRef, {
                [fieldToUpdate]: firestore.FieldValue.increment(Number(-valueToSubtract)),
            });

        } catch (e) {
            console.error("Error decrementing value:", e);
        }
    }

    /**
     * Generates a new ID based on the count of a specific dataset.
     * @param {string} dataToCountFor - The name of the dataset to count.
     * @returns {Promise<number>} - A promise that resolves to the new ID.
     */
    getNewId = async (dataToCountFor) => {
        try {
            const userId = auth.currentUser.uid
            let newId;
            await runTransaction(db, async (transaction) => {
                const docRef = doc(db, `/users/${userId}/${dataToCountFor}Counter/counter`);
                const docSnap = await transaction.get(docRef);

                if (!docSnap.exists()) {
                    newId = 0;
                    transaction.set(docRef, { value: newId });
                } else {
                    newId = docSnap.data().value + 1;
                    transaction.update(docRef, { value: newId });
                }
            });

            return newId;
        } catch (e) {
            console.error("Error getting new ID: ", e);
        }
    }

}


export const firebaseApi = new FirebaseApi();