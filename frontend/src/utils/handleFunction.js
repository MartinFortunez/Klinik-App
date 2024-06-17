import { api } from "../api/api";

export const handleSubmit = async (
  method,
  url,
  createFormData,
  { setSubmitting },
  handleAddClose,
  queryClient,
  keyClient
) => {
  try {
    const formData = createFormData;
    api(method, url, formData, queryClient, keyClient);
    // Setelah berhasil menghapus, refetch data
    await queryClient.invalidateQueries(`${keyClient}`);

    // Menunggu hingga refetch selesai
    await queryClient.refetchQueries(`${keyClient}`);

    handleAddClose();
  } catch (error) {
    console.error("Failed to add data:", error);
  } finally {
    setSubmitting(false);
  }
};

export const handleDelete = async (method, url, queryClient, keyClient) => {
  try {
    const response = await api(method, url, "");
    await queryClient.invalidateQueries(keyClient);
    await queryClient.refetchQueries(keyClient);
    return response;
  } catch (error) {
    console.error("Failed to delete:", error);

    if (error.response && error.response.status === 500) {
      throw new Error("Failed to delete schedule. Server error occurred.");
    } else {
      throw new Error("Failed to delete schedule. Unknown error occurred.");
    }
  }
};
