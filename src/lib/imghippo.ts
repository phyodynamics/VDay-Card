export async function uploadImage(
  file: File,
): Promise<{ permanent_url: string; direct_url: string }> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", "6a2ecc25590fb40b9a59714b68e705b0");

  const response = await fetch("https://api.imghippo.com/v1/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const data = await response.json();

  if (data.success) {
    return {
      permanent_url: data.data.view_url || data.data.url,
      direct_url: data.data.url,
    };
  }

  throw new Error(data.message || "Upload failed");
}
