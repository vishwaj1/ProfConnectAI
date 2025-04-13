import React, { useEffect, useState } from 'react';
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

export default function Professors() {
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/professors');
        const data = await res.json();
        setProfessors(data);
      } catch (err) {
        console.error('Failed to fetch professors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessors();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {professors.map((prof, index) => (
        <div key={index} className="rounded-2xl shadow-md bg-white p-4">
        <div className="flex items-center space-x-4">
          <img src={prof.image} alt={prof.name} className="w-20 h-20 rounded-full object-cover" />
          <div>
            <h2 className="text-xl font-semibold">{prof.name}</h2>
            <p className="text-sm text-gray-600">{prof.title}</p>
            <p className="text-xs text-gray-500 italic">{prof.campus}</p>
            <p className="text-xs text-gray-500 italic">{prof.email}</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-lg mb-1">Summary</h3>
          <p className="text-sm text-gray-700 whitespace-pre-line">
            {prof.summary}
          </p>
        </div>
        <div className="mt-4">
          <button
            onClick={() => window.location.href = `mailto:${prof.email}`}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
          >
            Email Professor
          </button>
        </div>
      </div>
      ))}
    </div>
  );
}
