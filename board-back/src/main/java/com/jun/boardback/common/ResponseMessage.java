package com.jun.boardback.common;

public interface ResponseMessage {
    
    // 200
    String SUCCESS = "success.";

    // 400
    String VALIDATION_FAILED = "Validation Failed.";
    String DUPLICATE_EMAIL = "Duplicate Email.";
    String DUPLICATE_NICKNAME = "Duplicate Nickname.";
    String DUPLICATE_TEL_NUMBER = "Duplicate Tel_number.";
    String NOT_EXISTED_USER = "This user does not exist.";
    String NOT_EXISTED_BOARD = "This board does not exist";

    // 401
    String SIGN_IN_FAIL = "Login information mismatch.";
    String AUTHORIZATION_FILA = "Authorization Failed.";
    
    // 403
    String NO_PERMISSION = "Do not have permission.";
    
    // 500
    String DATABASE_ERROR = "Database Error.";
}
