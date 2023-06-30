import { auth } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { AppState } from '../AppState.js'
import { Pop } from '../utils/Pop.js';



export function AuthGuard(to, from, next) {
    if (Object.keys(AppState.user).length > 0) {
        next();
    } else {
        Pop.error('You are unauthorized to view this page')
        next('/');
    }
}

export function setupAuthListener() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, update AppState.user
            AppState.user = user;
        } else {
            // No user is signed in, clear AppState.user
            AppState.user = {};
        }
    });
}
