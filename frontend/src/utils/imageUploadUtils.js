// src/utils/ImageUploadUtils.js

export async function uploadImageToGCS(file) {
    if (!file) throw new Error('No file provided for upload');

    // Request signed URL from backend
    const response = await fetch(`http://localhost:8080/gcs/sign-url?fileName=${encodeURIComponent(file.name)}`);
    if (!response.ok) {
        throw new Error('Failed to get signed URL');
    }

    const { signedUrl, publicUrl } = await response.json();

    // Upload file directly to GCS using signed URL
    const uploadResponse = await fetch(signedUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': file.type,
        },
        body: file,
    });

    if (!uploadResponse.ok) {
        throw new Error('Failed to upload image to GCS');
    }

    // Return the public URL of the uploaded image
    return publicUrl;
}
