export async function uploadImage(
  file: File,
): Promise<{ permanent_url: string; direct_url: string }> {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("key", "39a517c054a1ce550b8ab0a429c210e0"); // ImgBB API key

  try {
    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      console.error("ImgBB upload error:", data);
      const errorMsg = data.error?.message || data.message || "Failed to upload image";
      throw new Error(`Upload failed: ${errorMsg}`);
    }

    return {
      permanent_url: data.data.display_url || data.data.url,
      direct_url: data.data.url,
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error("Failed to upload image");
  }
}
