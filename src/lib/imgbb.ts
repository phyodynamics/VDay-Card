export async function uploadImage(
  file: File,
): Promise<{ permanent_url: string; direct_url: string }> {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("key", "39a517c054a1ce550b8ab0a429c210e0"); // ImgBB API key

  const response = await fetch("https://api.imgbb.com/1/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const data = await response.json();

  if (data.success) {
    return {
      permanent_url: data.data.display_url || data.data.url,
      direct_url: data.data.url,
    };
  }

  throw new Error(data.message || "Upload failed");
}
