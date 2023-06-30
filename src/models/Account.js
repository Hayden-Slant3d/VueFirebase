
export class User {
    constructor(data) {
        const uid = data.uid
        this.displayName = data.displayName
        this.email = data.email
        this.photoURL = data.PhotoURL
        this.emailVerified = data.emailVerified

        // The user's UID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
    }
}