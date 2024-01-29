export class AuthRequiredError extends Error {
    constructor(message= 'Il faut être connecté pour acceder a ce contenu.'){
        super(message)
        this.name = 'Page pour les utilisateurs connectés uniquement'
    }
}

export class AdminOnlyError extends Error {
    constructor(message= "Il faut être l'administrateur du site pour acceder à ce contenu"){
        super(message)
        this.name = 'Administrateur uniquement'
    }
}