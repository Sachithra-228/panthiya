import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const SpecializationContext = createContext();

export const useSpecialization = () => {
  const context = useContext(SpecializationContext);
  if (!context) {
    throw new Error('useSpecialization must be used within a SpecializationProvider');
  }
  return context;
};

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const SpecializationProvider = ({ children }) => {
  const [specializations, setSpecializations] = useState([]);
  const [currentSpecialization, setCurrentSpecialization] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all specializations
  const fetchSpecializations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/specializations`);
      setSpecializations(response.data);
    } catch (err) {
      setError('Failed to fetch specializations');
      console.error('Error fetching specializations:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch specific specialization by ID
  const fetchSpecializationById = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/specializations/${id}`);
      setCurrentSpecialization(response.data);
      return response.data;
    } catch (err) {
      setError(`Failed to fetch specialization: ${id}`);
      console.error('Error fetching specialization:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fetch modules for a specialization
  const fetchModules = async (specializationId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/specializations/${specializationId}/modules`);
      return response.data;
    } catch (err) {
      console.error('Error fetching modules:', err);
      return [];
    }
  };

  // Fetch roadmap for a specialization
  const fetchRoadmap = async (specializationId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/specializations/${specializationId}/roadmap`);
      return response.data;
    } catch (err) {
      console.error('Error fetching roadmap:', err);
      return [];
    }
  };

  // Fetch job opportunities for a specialization
  const fetchJobs = async (specializationId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/specializations/${specializationId}/jobs`);
      return response.data;
    } catch (err) {
      console.error('Error fetching jobs:', err);
      return [];
    }
  };

  // AI Assistant functions
  const getModuleRecommendation = async (level, interests) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/ai/recommend-module`, {
        level,
        interests
      });
      return response.data;
    } catch (err) {
      console.error('Error getting module recommendation:', err);
      return null;
    }
  };

  const getJobSuggestions = async (skills, experience, interests) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/ai/suggest-jobs`, {
        skills,
        experience,
        interests
      });
      return response.data;
    } catch (err) {
      console.error('Error getting job suggestions:', err);
      return null;
    }
  };

  // User progress functions
  const updateUserProgress = async (userId, specializationId, moduleId, completed, progressPercentage) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/${userId}/progress/${specializationId}`, {
        moduleId,
        completed,
        progressPercentage
      });
      return response.data;
    } catch (err) {
      console.error('Error updating progress:', err);
      return null;
    }
  };

  // CV Analysis
  const analyzCV = async (userId, cvFile) => {
    try {
      const formData = new FormData();
      formData.append('cv', cvFile);
      
      const response = await axios.post(`${API_BASE_URL}/users/${userId}/cv-upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (err) {
      console.error('Error analyzing CV:', err);
      return null;
    }
  };

  // Certificate generation
  const generateCertificate = async (userId, specializationId, moduleId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/${userId}/certificate/${specializationId}/${moduleId}`);
      return response.data;
    } catch (err) {
      console.error('Error generating certificate:', err);
      return null;
    }
  };

  useEffect(() => {
    fetchSpecializations();
  }, []);

  const value = {
    specializations,
    currentSpecialization,
    loading,
    error,
    fetchSpecializations,
    fetchSpecializationById,
    fetchModules,
    fetchRoadmap,
    fetchJobs,
    getModuleRecommendation,
    getJobSuggestions,
    updateUserProgress,
    analyzCV,
    generateCertificate,
    setError
  };

  return (
    <SpecializationContext.Provider value={value}>
      {children}
    </SpecializationContext.Provider>
  );
}; 