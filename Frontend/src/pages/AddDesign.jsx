import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import useDesignStore from '../Store/useDesignStore';

const AddDesign = () => {
    // This component renders a form to add a new design
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        htmlFile: null,
        image: null,
        hbsfile: null,
    });

    const navigate = useNavigate();

    const { CreateDesign, isCreatingDesign } = useDesignStore(); 

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await CreateDesign(formData);
        if (res) {
            navigate('/designs'); 
        } else {
            console.error('Failed to create design');
        }
        
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Add New Design</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Title</label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                ></textarea>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">HBS File</label>
                <input
                    type="file"
                    accept=".hbs"
                    onChange={(e) => setFormData({ ...formData, hbsfile: e.target.files[0] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">HTML File</label>
                <input
                    type="file"
                    accept=".html"
                    onChange={(e) => setFormData({ ...formData, htmlFile: e.target.files[0] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <button
                type="submit"
                disabled={isCreatingDesign}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            >
             {  isCreatingDesign ? 'Creating...' : 'Add Design'}
            </button>
        </form>
    </div>
  )
}

export default AddDesign