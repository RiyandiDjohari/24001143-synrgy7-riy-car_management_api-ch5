import cloudinary from "../middleware/cloudinary";

export const uploadImageHandler = async (image: any, folder: string) => {
    const fileBase64 = image.buffer.toString("base64");
    const file = `data:${image?.mimetype};base64,${fileBase64}`;
  
    try {
      return await cloudinary.uploader.upload(file, {
        folder,
      });
    } catch (err) {
      throw new Error("Something went wrong");
    }
  };