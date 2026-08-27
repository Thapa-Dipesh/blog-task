import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImageToCloudinary(
  file: File | Blob | null | undefined,
  fallbackUrl: string = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
): Promise<string> {
  if (!file || !(file instanceof Blob) || file.size === 0) {
    return fallbackUrl;
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = file.type || "image/jpeg";
    const base64Data = `data:${mimeType};base64,${buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64Data, {
      folder: "blog_images",
      resource_type: "image",
    });

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return fallbackUrl;
  }
}

export { cloudinary };
