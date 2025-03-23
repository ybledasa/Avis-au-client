// ✅ Structure de base React + Tailwind pour le tableau de bord admin (mise à jour avec expérience et suggestion)
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, getDocs, query, where, updateDoc, deleteDoc, doc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCl46lrkQejIIz24g1P7Qt2ktNbG0MML4o",
  authDomain: "avis-au-client.firebaseapp.com",
  projectId: "avis-au-client",
  storageBucket: "avis-au-client.appspot.com",
  messagingSenderId: "291367297087",
  appId: "1:291367297087:web:09beaf7794126fc79bd88a",
  measurementId: "G-WESSM7PQZM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function AdminDashboard() {
  const [avis, setAvis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    chargerAvis();
  }, []);

  async function chargerAvis() {
    setLoading(true);
    const q = query(collection(db, 'avisPatients'), where('statut', '==', 'en attente'));
    const snapshot = await getDocs(q);
    const temp = [];
    snapshot.forEach(doc => {
      temp.push({ id: doc.id, ...doc.data() });
    });
    setAvis(temp);
    setLoading(false);
  }

  async function approuverAvis(id) {
    await updateDoc(doc(db, 'avisPatients', id), { statut: 'publié' });
    setToast("Avis approuvé ✅");
    chargerAvis();
  }

  async function supprimerAvis(id) {
    if (confirm("Supprimer cet avis ?")) {
      await deleteDoc(doc(db, 'avisPatients', id));
      setToast("Avis supprimé 🗑️");
      chargerAvis();
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📝 Avis en attente</h1>
      {toast && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-4 shadow">
          {toast}
        </div>
      )}
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table className="w-full bg-white shadow rounded text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Nom</th>
              <th className="p-2 text-left">Sexe</th>
              <th className="p-2 text-left">Hôpital</th>
              <th className="p-2 text-left">Motif</th>
              <th className="p-2 text-left">Expérience</th>
              <th className="p-2 text-left">Suggestion</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {avis.length === 0 && (
              <tr><td colSpan="7" className="text-center p-4">Aucun avis</td></tr>
            )}
            {avis.map(item => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="p-2 font-medium">{item.nomPrenom}</td>
                <td className="p-2">{item.sexe}</td>
                <td className="p-2">{item.hopital}</td>
                <td className="p-2">{item.motif || item.motifAutre}</td>
                <td className="p-2 text-xs text-gray-600 italic">{item.experience || "—"}</td>
                <td className="p-2 text-xs text-gray-600 italic">{item.suggestion || "—"}</td>
                <td className="p-2 space-x-2">
                  <button onClick={() => approuverAvis(item.id)} className="bg-green-500 text-white px-2 py-1 rounded">✅</button>
                  <button onClick={() => supprimerAvis(item.id)} className="bg-red-500 text-white px-2 py-1 rounded">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
