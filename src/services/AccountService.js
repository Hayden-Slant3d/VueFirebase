import { GoogleAuthProvider, deleteUser, signInWithEmailAndPassword, signInWithRedirect, signOut, updateProfile } from "firebase/auth"
import { auth } from "../firebase"
import { AppState } from "../AppState"
import { User } from "../models/Account"
import { logger } from "../utils/Logger"

class AccountService {

    /**
     * 
     * @param {String} email 
     * @param {String} password 
     */
    async emailLogin(email, password) {
        try {
            if (password.length < 6) {
                throw new Error('Password must be atleast 6 characters long.')
            }
            if (password.toLowerCase() == password) {
                throw new Error('Password must contain at least 1 captilized character.')
            }
            if (!email.includes('@')) {
                throw new Error('Invalid email address.')
            }

            const user = await signInWithEmailAndPassword(auth, email, password)
            AppState.user = new User(user.user)
        }
        catch (error) {
            logger.error(error)
            Pop.error(error)
        }
    }

    async googleLogin() {
        try {
            const provider = new GoogleAuthProvider();
            const user = signInWithRedirect(auth, provider)
            AppState.user = new User(user.user)
        }
        catch (error) {
            logger.error(error)
            Pop.error(error)
        }
    }

    async signOut() {
        try {
            await signOut(auth)
        }
        catch (error) {
            logger.error(error)
            Pop.error(error)
        }
    }

    async getAccount() {
        try {
            const user = auth.currentUser
            AppState.user = user
        }
        catch (error) {
            logger.error(error)
            Pop.error(error)
        }
    }

    async updateAccount(newUser) {
        try {
            const user = auth.currentUser()
            await updateProfile(user, {
                displayName: newUser.displayName ? newUser.displayName : user.displayName,
                photoURL: newUser.photoURL ? newUser.photoURL : user.photoURL,
                emailVerified: newUser.emailVerified ? newUser.emailVerified : user.emailVerified,
            })
        }
        catch (error) {
            logger.error(error)
            Pop.error(error)
        }
    }

    async deleteAccount() {
        try {
            const user = auth.currentUser
            await deleteUser(user)
        }
        catch(error) {
            logger.error(error)
            Pop.error(error)
        }
    }


}

export const accountService = new AccountService()
