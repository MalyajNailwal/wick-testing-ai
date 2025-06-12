
export interface UploadedImage {
  id: string;
  file: File;
  url: string;
  name: string;
  size: number;
}

export class ImageService {
  static async uploadImage(file: File): Promise<UploadedImage> {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('Please select a valid image file');
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error('Image size must be less than 10MB');
    }

    // Create preview URL
    const url = URL.createObjectURL(file);

    return {
      id: `img_${Date.now()}`,
      file,
      url,
      name: file.name,
      size: file.size
    };
  }

  static async analyzeImage(image: UploadedImage): Promise<string> {
    // Placeholder for image analysis - in real implementation, this would send to an AI service
    return `I can see you've uploaded an image called "${image.name}". This appears to be an automotive-related image. Could you tell me what specific information you'd like about this image? I can help with vehicle identification, parts recognition, maintenance advice, or any other automotive questions related to what you've shown me.`;
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
