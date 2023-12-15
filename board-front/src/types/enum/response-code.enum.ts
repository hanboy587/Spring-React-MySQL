enum ResponseCode {
    // 200String 
    SUCCESS = "success.",

    // 400
    VALIDATION_FAILED = "Validation Failed.",
    DUPLICATE_EMAIL = "Duplicate Email.",
    DUPLICATE_NICKNAME = "Duplicate Nickname.",
    DUPLICATE_TEL_NUMBER = "Duplicate Tel_number.",
    NOT_EXISTED_USER = "This user does not exist.",
    NOT_EXISTED_BOARD = "This board does not exist",

    // 401
    SIGN_IN_FAIL = "Login information mismatch.",
    AUTHORIZATION_FILA = "Authorization Failed.",
    
    // 403
    NO_PERMISSION = "Do not have permission.",
    
    // 500
    DATABASE_ERROR = "Database Error.",
}

export default ResponseCode;