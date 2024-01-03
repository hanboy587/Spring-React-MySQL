package com.jun.boardback.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {

    String upload(MultipartFile file);
    // import 주의!
    Resource getImage(String fileName);
    
}
