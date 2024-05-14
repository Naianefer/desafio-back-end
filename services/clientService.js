/**
 * Nome do arquivo: clientService.js
 * Data de criação: 09/05/2024
 * Autor: Naiane Ferreira
 * Matrícula: 01593553
 *
 * Descrição:
 * Este arquivo JavaScript é responsável por implementar as funcionalidades
   de interação do usuário com a interface gráfica do módulo de gerenciamento de clientes.
   Aqui são tratados eventos de cliques, validações de entrada e comunicação
   com APIs para envio e recebimento de dados relacionados aos clientes..
 *
 * Este script é parte o curso de ADS.
 */

   
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/services/firebaseConfig";

class ClientService {
  async addClient(clientData) {
    try {
      const docRef = await addDoc(collection(db, "clients"), clientData);
      console.log("Client added with ID: ", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error adding client: ", error);
      throw error;
    }
  }

  async getClients() {
    try {
      const clientsSnapshot = await getDocs(collection(db, "clients"));
      const clients = clientsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return clients;
    } catch (error) {
      console.error("Error getting clients: ", error);
      throw error;
    }
  }

  async updateClient(clientId, newData) {
    try {
      const clientDocRef = doc(db, "clients", clientId);
      await updateDoc(clientDocRef, newData);
      console.log("Client updated successfully");
    } catch (error) {
      console.error("Error updating client: ", error);
      throw error;
    }
  }

  async deleteClient(clientId) {
    try {
      const clientDocRef = doc(db, "clients", clientId);
      await deleteDoc(clientDocRef);
      console.log("Client deleted successfully");
    } catch (error) {
      console.error("Error deleting client: ", error);
      throw error;
    }
  }
}

export default new ClientService();
