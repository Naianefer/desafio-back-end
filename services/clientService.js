import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

class ClientService {
  async addClient(clientData) {
    try {
      const docRef = await addDoc(collection(db, 'clients'), clientData);
      console.log('Client added with ID: ', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding client: ', error);
      throw error;
    }
  }

  async getClients() {
    try {
      const clientsSnapshot = await getDocs(collection(db, 'clients'));
      const clients = clientsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return clients;
    } catch (error) {
      console.error('Error getting clients: ', error);
      throw error;
    }
  }

  async updateClient(clientId, newData) {
    try {
      const clientDocRef = doc(db, 'clients', clientId);
      await updateDoc(clientDocRef, newData);
      console.log('Client updated successfully');
    } catch (error) {
      console.error('Error updating client: ', error);
      throw error;
    }
  }

  async deleteClient(clientId) {
    try {
      const clientDocRef = doc(db, 'clients', clientId);
      await deleteDoc(clientDocRef);
      console.log('Client deleted successfully');
    } catch (error) {
      console.error('Error deleting client: ', error);
      throw error;
    }
  }
}

export default new ClientService();
