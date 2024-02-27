export default function validatePassword(password : String) {
    const errors = [];
  
    if (password.length < 8) {
      errors.push("Le mot de passe doit contenir au moins 8 caractères.");
    }
  
    if (!password.match(/[A-Z]/)) {
      errors.push("Le mot de passe doit contenir au moins une lettre majuscule.");
    }
  
    if (!password.match(/[a-z]/)) {
      errors.push("Le mot de passe doit contenir au moins une lettre minuscule.");
    }
  
    if (!password.match(/[0-9]/)) {
      errors.push("Le mot de passe doit contenir au moins un chiffre.");
    }
  
    if (!password.match(/[\^$*.\[\]{}()?\-"!@#%&/\\,><':;|_~`]/)) {
      errors.push("Le mot de passe doit contenir au moins un caractère spécial.");
    }
  
    // Tu peux ajouter d'autres vérifications si nécessaire
  
    return errors; // Retourne une liste vide si tout est bon
  }