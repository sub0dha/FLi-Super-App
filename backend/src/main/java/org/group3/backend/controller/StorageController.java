package org.group3.backend.controller;

import com.google.cloud.storage.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URL;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@RestController
public class StorageController {

    @Value("${gcs.bucket.name}")
    private String bucketName;

    private final Storage storage;

    public StorageController() {
        // Initialize Storage client using default project ID
        this.storage = StorageOptions.getDefaultInstance().getService();
    }

    @GetMapping("/gcs/sign-url")
    public ResponseEntity<Map<String, String>> generateSignedUrl(
            @RequestParam String fileName) {
        try {
            // Sanitize filename if needed
            String sanitizedFileName = fileName.replaceAll("[^a-zA-Z0-9.-]", "_");

            // Generate signed URL
            BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, sanitizedFileName).build();

            URL signedUrl = storage.signUrl(
                    blobInfo,
                    15, // URL valid for 15 minutes
                    TimeUnit.MINUTES,
                    Storage.SignUrlOption.httpMethod(HttpMethod.PUT),
                    Storage.SignUrlOption.withContentType()
            );

            // Construct public URL
            String publicUrl = String.format("https://storage.googleapis.com/%s/%s",
                    bucketName, sanitizedFileName);

            return ResponseEntity.ok(Map.of(
                    "signedUrl", signedUrl.toString(),
                    "publicUrl", publicUrl
            ));

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
