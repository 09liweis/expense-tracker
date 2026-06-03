import type { NextPage } from 'next';
import { useEffect, useState, useContext } from 'react';
import ViewSwitcher from '../components/knowledge/ViewSwitcher';
import RandomKnowledgeCard from '../components/knowledge/RandomKnowledgeCard';
import KnowledgeList from '../components/knowledge/KnowledgeList';
import KnowledgeFormModal from '../components/knowledge/KnowledgeFormModal';
import KnowledgeViewModal from '../components/knowledge/KnowledgeViewModal';
import { Knowledge } from 'types';
import AppContext from '../AppContext';

const KnowledgesPage: NextPage = () => {
  const { user } = useContext(AppContext) as { user: { _id: string } | null };
  const isLoggedIn = !!user?._id;

  const [knowledges, setKnowledges] = useState<Knowledge[]>([]);
  const [randomKnowledge, setRandomKnowledge] = useState<Knowledge | null>(null);
  const [viewMode, setViewMode] = useState<'random' | 'list'>('random');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingKnowledge, setViewingKnowledge] = useState<Knowledge | null>(null);
  const [editingKnowledge, setEditingKnowledge] = useState<Knowledge | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    definition: '',
    categories: ''
  });

  useEffect(() => {
    fetchRandomKnowledge();
    fetchKnowledges();
  }, []);

  const fetchKnowledges = async () => {
    try {
      const response = await fetch('/api/knowledges');
      const data = await response.json();
      setKnowledges(data);
    } catch (error) {
      console.error('Failed to fetch knowledges:', error);
    }
  };

  const fetchRandomKnowledge = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/knowledges/random');
      if (response.ok) {
        const data = await response.json();
        setRandomKnowledge(data);
      }
    } catch (error) {
      console.error('Failed to fetch random knowledge:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const categories = formData.categories.split(',').map(cat => cat.trim()).filter(cat => cat);

    const knowledgeData = {
      title: formData.title,
      definition: formData.definition,
      categories
    };

    try {
      if (editingKnowledge?._id) {
        await fetch(`/api/knowledges/${editingKnowledge._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(knowledgeData)
        });
      } else {
        await fetch('/api/knowledges', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(knowledgeData)
        });
      }

      fetchKnowledges();
      closeModal();
    } catch (error) {
      console.error('Failed to save knowledge:', error);
    }
  };

  const handleEdit = (knowledge: Knowledge) => {
    setEditingKnowledge(knowledge);
    setFormData({
      title: knowledge.title,
      definition: knowledge.definition,
      categories: knowledge.categories.join(', ')
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this knowledge?')) {
      try {
        await fetch(`/api/knowledges/${id}`, { method: 'DELETE' });
        fetchKnowledges();
      } catch (error) {
        console.error('Failed to delete knowledge:', error);
      }
    }
  };

  const handleCardClick = (knowledge: Knowledge) => {
    setViewingKnowledge(knowledge);
    setShowViewModal(true);
  };

  const openModal = () => {
    resetForm();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setViewingKnowledge(null);
  };

  const resetForm = () => {
    setEditingKnowledge(null);
    setFormData({ title: '', definition: '', categories: '' });
  };

  const handleFormChange = (data: { title?: string; definition?: string; categories?: string }) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  if (loading) {
    return <div className="max-w-4xl mx-auto p-6">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Knowledge Base
        </h1>
        <div className="flex items-center gap-3">
          <ViewSwitcher viewMode={viewMode} onChange={setViewMode} />
          {isLoggedIn && (
            <button
              type="button"
              onClick={openModal}
              className="inline-flex cursor-pointer items-center justify-center rounded-md bg-primary px-4 py-2 text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Knowledge
            </button>
          )}
        </div>
      </div>

      {viewMode === 'random' && randomKnowledge && (
        <div className="mb-8">
          <RandomKnowledgeCard
            knowledge={randomKnowledge}
            isLoggedIn={isLoggedIn}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onNext={fetchRandomKnowledge}
          />
        </div>
      )}

      {viewMode === 'list' && (
        <KnowledgeList
          knowledges={knowledges}
          isLoggedIn={isLoggedIn}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClick={handleCardClick}
        />
      )}

      <KnowledgeFormModal
        isOpen={showModal}
        editingKnowledge={editingKnowledge}
        formData={formData}
        onClose={closeModal}
        onSubmit={handleSubmit}
        onChange={handleFormChange}
      />

      <KnowledgeViewModal
        knowledge={viewingKnowledge}
        isOpen={showViewModal}
        onClose={closeViewModal}
      />
    </div>
  );
};

export default KnowledgesPage;
