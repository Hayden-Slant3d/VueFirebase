import { auth } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { AppState } from '../AppState.js'
import { Pop } from '../utils/Pop.js';


/**
 * Guard to protect routes that require authentication
 * @param {Route} to - The target Route object being navigated to.
 * @param {Route} from - The current route being navigated away from.
 * @param {Function} next - The function to resolve this navigation.
 * Call `next` with the path to redirect to, or `false` to abort.
 */
export function AuthGuard(to, from, next) {
    if (Object.keys(AppState.user).length > 0) {
        next();
    } else {
        Pop.error('You are unauthorized to view this page')
        next('/');
    }
}

/**
 * Sets up a Firebase authentication state listener
 * Listener gets called whenever the user's sign-in state changes
 * Updates the AppState.user accordingly
 */
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
