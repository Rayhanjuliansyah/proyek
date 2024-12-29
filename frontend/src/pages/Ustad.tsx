import React, { useEffect, useState } from "react";
import { User, Edit3, Trash2, PlusCircle } from "lucide-react";
import { Ustad } from "../types";
import axiosInstance from "../api/axios";

export const UstadPage: React.FC = () => {
  const [ustads, setUstads] = useState<Ustad[]>([]);
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Ustad, "id" | "user">>({
    name: "",
    expertise: [],
    description: "",
    hourlyRate: 0,
    availability: false,
    userId: 0,
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

  // Fetch ustads and users
  useEffect(() => {
    fetchUstads();
    fetchUsers();
  }, []);

  const fetchUstads = async () => {
    try {
      const response = await axiosInstance.get("/ustads");
      if (Array.isArray(response.data.data)) {
        setUstads(response.data.data);
      } else {
        setError("Invalid data format from API");
      }
    } catch (err: any) {
      setError(err.message || "Error fetching ustads");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/users");
      if (Array.isArray(response.data.data)) {
        setUsers(
          response.data.data.map((user: { id: number; name: string }) => ({
            id: user.id,
            name: user.name,
          }))
        );
      } else {
        setError("Invalid user data format from API");
      }
    } catch (err: any) {
      setError(err.message || "Error fetching users");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleExpertiseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      expertise: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { userId, hourlyRate, expertise, description } = formData;
    if (!userId || !hourlyRate || !expertise.length || !description) {
      setError("All fields are required");
      return;
    }

    try {
      if (isEditing && currentId !== null) {
        await axiosInstance.put(`/ustads/${currentId}`, {
          ...formData,
          userId: parseInt(userId.toString(), 10),
          hourlyRate: parseFloat(hourlyRate.toString()),
        });
        setUstads((prev) =>
          prev.map((ustad) => (ustad.id === currentId ? { ...ustad, ...formData } : ustad))
        );
      } else {
        const response = await axiosInstance.post("/ustads", {
          ...formData,
          userId: parseInt(userId.toString(), 10),
          hourlyRate: parseFloat(hourlyRate.toString()),
          availability: formData.availability || false,
        });
        setUstads((prev) => [...prev, response.data.data]);
      }
      resetForm();
      closeModal();
    } catch (err: any) {
      setError(err.response?.data?.message || "Error saving ustad");
    }
  };

  const openConfirmModal = (id: string) => {
    setDeleteId(id);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setDeleteId(null);
    setIsConfirmModalOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await axiosInstance.delete(`/ustads/${deleteId}`);
      setUstads((prev) => prev.filter((ustad) => ustad.id !== deleteId));
    } catch (err: any) {
      setError(err.message || "Error deleting ustad");
    } finally {
      closeConfirmModal();
    }
  };

  const handleEdit = (ustad: Ustad) => {
    setIsEditing(true);
    setCurrentId(ustad.id);
    setFormData({
      name: ustad.name,
      expertise: ustad.expertise,
      description: ustad.description,
      hourlyRate: ustad.hourlyRate,
      availability: ustad.availability,
      userId: ustad.userId,
    });
    openModal();
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({
      name: "",
      expertise: [],
      description: "",
      hourlyRate: 0,
      availability: false,
      userId: 0,
    });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Daftar Ustad</h2>
      <button
        className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center space-x-2"
        onClick={openModal}
      >
        <PlusCircle className="w-5 h-5" />
        <span>Add Ustad</span>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">User</label>
                <select
                  value={formData.userId || ""}
                  onChange={(e) => setFormData({ ...formData, userId: parseInt(e.target.value) })}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">Select a user</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Expertise (comma separated)</label>
                <input
                  type="text"
                  value={formData.expertise.join(", ")}
                  onChange={handleExpertiseChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Hourly Rate</label>
                <input
                  type="number"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Availability</label>
                <input
                  type="checkbox"
                  name="availability"
                  checked={formData.availability}
                  onChange={handleChange}
                  className="mr-2"
                />
                Available
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {isEditing ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
            <p className="mb-6 text-gray-600">Are you sure you want to delete this Ustad?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeConfirmModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        {ustads.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No data available</div>
        ) : (
          ustads.map((ustad) => (
            <div key={ustad.id} className="p-6 border-b last:border-b-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="font-medium">{ustad.name}</h3>
                    <p className="text-sm text-gray-500">
                      Expertise: {ustad.expertise.join(", ")}
                    </p>
                    <p className="text-sm text-gray-500">
                      Rate: ${ustad.hourlyRate}/hour
                    </p>
                    <p className="text-sm text-gray-500">
                      Availability: {ustad.availability ? "Available" : "Not Available"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    className="text-blue-600 hover:text-blue-700"
                    onClick={() => handleEdit(ustad)}
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-700"
                    onClick={() => openConfirmModal(ustad.id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )};
