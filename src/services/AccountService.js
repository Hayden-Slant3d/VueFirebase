import { GoogleAuthProvider, deleteUser, signInWithEmailAndPassword, signInWithRedirect, signOut, updateProfile, createUserWithEmailAndPassword, applyActionCode, verifyPasswordResetCode, confirmPasswordReset, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../firebase"
import { AppState } from "../AppState"
import { User } from "../models/Account"
import { logger } from "../utils/Logger"

/**
 * @module AccountService
 * This module handles all user authentication related actions
 */
class AccountService {

    /**
     * Register a new user using email and password
     * @param {string} displayName - The user's display name
     * @param {string} email - The user's email
     * @param {string} password - The user's password
     */
    async emailRegister(displayName, email, password) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            user.displayName = displayName
            await this.updateProfile(auth.currentUser, new User(user))
        }
        catch (error) {
            logger.error(error)
            Pop.error(error)
        }
    }


    /**
     * Authenticate a user using email and password
     * @param {string} email - The user's email
     * @param {string} password - The user's password
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

    /**
     * Authenticates a Firebase client using a full-page redirect flow.
     */
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

    /**
     * Sign out the current authenticated user
     */
    async signOut() {
        try {
            await signOut(auth)
        }
        catch (error) {
            logger.error(error)
            Pop.error(error)
        }
    }

    /**
     * Retrieve the current authenticated user's details
     */
    async getAccount() {
        try {
            const user = auth.currentUser.reload()
            AppState.user = user
        }
        catch (error) {
            logger.error(error)
        }
    }

    /**
     * Update the current authenticated user's details
     * @param {Object} newUser - The new user details
     */
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
        }
    }

    /**
     * Delete the current authenticated user's account
     */
    async deleteAccount() {
        try {
            const user = auth.currentUser
            await deleteUser(user)
        }
        catch (error) {
            logger.error(error)
            Pop.error(error)
        }
    }

    // ACCOUNT UTILS

    /**
     * Send an email verification to the current authenticated user
     */
    async sendEmailVerification() {
        try {
            await sendEmailVerification(auth.currentUser)
        }
        catch (error) {
            logger.error(error)
        }
    }

    /**
     * Send a password reset email
     * @param {string} email - The email to send the password reset link
     */
    async sendPasswordReset(email) {
        try {
            await sendPasswordResetEmail(auth, email)
        }
        catch (error) {
            logger.error(error)
        }
    }

    /**
     * Verify a user's email with a given code
     * @param {string} oobCode - The code to verify the user's email
     */
    async verifyEmailVerification(oobCode) {
        try {
            await applyActionCode(auth, oobCode)
        }
        catch (error) {
            logger.error(error)
        }
    }

    /**
     * Reset a user's password with a given code and new password
     * @param {string} oobCode - The code to verify the user's email
     * @param {string} newPassword - The new password for the user
     */
    async verifyPasswordReset(oobCode, newPassword) {
        try {
            const emailCheck = await verifyPasswordResetCode(auth, oobCode)
            if (emailCheck == auth.currentUser.email) {
                await confirmPasswordReset(auth, oobCode, newPassword);
            }
        }
        catch (error) {
            logger.error(error)
        }
    }


}

export const accountService = new AccountService()
