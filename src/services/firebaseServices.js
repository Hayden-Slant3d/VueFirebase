import { doc, setDoc, getDoc, updateDoc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";


class FirebaseApi {

    // Create
    createDoc = async (collectionPath, docId, data) => {
        try {
            await setDoc(doc(db, collectionPath, docId), data);
            console.log("Document successfully written!");
        } catch (e) {
            console.error("Error writing document: ", e);
        }
    }

    // Read
    readDoc = async (collectionPath, docId) => {
        const docRef = doc(db, collectionPath, docId);

        try {
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                return docSnap.data();
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        } catch (e) {
            console.error("Error getting document:", e);
        }
    }

    // Update
    updateDoc = async (collectionPath, docId, data) => {
        try {
            await updateDoc(doc(db, collectionPath, docId), data);
            console.log("Document successfully updated!");
        } catch (e) {
            console.error("Error updating document: ", e);
        }
    }

    // Delete
    deleteDoc = async (collectionPath, docId) => {
        try {
            await deleteDoc(doc(db, collectionPath, docId));
            console.log("Document successfully deleted!");
        } catch (e) {
            console.error("Error removing document: ", e);
        }
    }

    readCollection = async (collectionPath) => {
        const collectionRef = collection(db, collectionPath);
        const collectionSnap = await getDocs(collectionRef);

        const data = collectionSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return data;
    }



}


export const firebaseApi = new FirebaseApi();