/**
 * Nome do arquivo: index.js
 * Data de criação: 08/05/2024
 * Autor: Naiane Ferreira
 * Matrícula: 01593553
 *
 * Descrição:
 * Este arquivo implementa as funcionalidades de um sistema de gerenciamento de clientes.
   Ele inclui componentes para adicionar, editar, excluir e exibir detalhes dos clientes,
   além de se comunicar com uma API para realizar essas operações.
 *
 * Este script é parte o curso de ADS.
 */

import { useEffect, useState } from "react";
import ClientService from "../services/clientService"; // Importe a classe ClientService

export const AddClientForm = ({
  setClientList,
  setEditClient,
  setOpenClientADD,
}) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const observation = formData.get("observation");
    const address = {
      street: formData.get("street"),
      number: formData.get("number"),
      neighborhood: formData.get("neighborhood"),
      complement: formData.get("complement"),
      city: formData.get("city"),
      state: formData.get("state"),
    };
    try {
      await ClientService.addClient({
        name,
        email,
        phone,
        observation,
        address,
      }); // Use as funções a partir da instância de ClientService
      console.log("Client added successfully");
      setEditClient(false);
      setOpenClientADD(false);
      window.alert("Cliente adicionado com sucesso!");
      const clients = await ClientService.getClients(); // Use as funções a partir da instância de ClientService
      setClientList(clients);
    } catch (error) {
      console.error("Failed to add client:", error);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center p-4 bg-red-500 rounded-md ">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center gap-x-2 items-start text-black"
      >
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-start items-start">
            <label className="text-xs text-white">Nome: </label>
            <input
              type="text"
              name="name"
              placeholder="Nome"
              required
              className="p-2 my-1 rounded-md border"
            />
          </div>
          <div className="flex flex-col justify-start items-start">
            <label className="text-xs text-white">E-mail: </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="p-2 my-1 rounded-md border"
            />
          </div>
          <div className="flex flex-col justify-start items-start">
            <label className="text-xs text-white">Telefone: </label>
            <input
              type="text"
              name="phone"
              placeholder="Telefone"
              className="p-2 my-1 rounded-md border"
            />
          </div>
          <div className="flex flex-col justify-start items-start mr-3 mt-1">
            <label className="text-xs text-white">Observação: </label>
            <textarea
              name="observation"
              placeholder="Observação"
              className="p-2 my-1 rounded-md border w-full"
            ></textarea>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-start items-start">
            <label className="text-xs text-white">Rua: </label>
            <input
              type="text"
              name="street"
              placeholder="Rua"
              className="p-2 my-1 rounded-md border"
            />
          </div>
          <div className="flex flex-col justify-start items-start">
            <label className="text-xs text-white">Nº: </label>
            <input
              type="text"
              name="number"
              placeholder="Nº"
              className="p-2 my-1 rounded-md border"
            />
          </div>
          <div className="flex flex-col justify-start items-start">
            <label className="text-xs text-white">Bairro: </label>
            <input
              type="text"
              name="neighborhood"
              placeholder="Bairro"
              className="p-2 my-1 rounded-md border"
            />
          </div>
          <div className="flex flex-col justify-start items-start">
            <label className="text-xs text-white">Complemento: </label>
            <input
              type="text"
              name="complement"
              placeholder="Complemento"
              className="p-2 my-1 rounded-md border"
            />
          </div>
          <div className="flex flex-col justify-start items-start">
            <label className="text-xs text-white">Cidade: </label>
            <input
              type="text"
              name="city"
              placeholder="Cidade"
              className="p-2 my-1 rounded-md border"
            />
          </div>
          <div className="flex flex-col justify-start items-start">
            <label className="text-xs text-white">Estado: </label>
            <input
              type="text"
              name="state"
              placeholder="Estado"
              className="p-2 my-1 rounded-md border"
            />
          </div>
        </div>

        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-5"
        >
          Adicionar Cliente
        </button>
      </form>
    </main>
  );
};

const ClientList = ({ clients, onEdit, onDelete }) => {
  const [showClient, setShowClient] = useState(null);

  const handleShowModal = (client) => {
    setShowClient(client);
  };

  return (
    <ul className="overflow-y-auto h-[50vh]">
      {clients?.map((client) => (
        <li
          key={client.id}
          className="flex flex-col justify-between items-center p-4 my-2 bg-gray-100 rounded-md text-black"
        >
          <div className="flex justify-start items-center gap-x-2">
            <div>
              <span className="font-bold text-gray-900">Nome:</span>{" "}
              {client.name}
            </div>
            <div>
              <span className="font-bold text-gray-900">E-mail:</span>{" "}
              {client.email}
            </div>
            <div>
              <span className="font-bold text-gray-900">Tel:</span>
              {client.phone}
            </div>
            <div>
              <span className="font-bold text-gray-900">Observação:</span>{" "}
              {client.observation}
            </div>
          </div>

          <div className="flex justify-start items-center w-full">
            <button
              style={{ marginRight: "5px" }}
              onClick={() => handleShowModal(client)}
              className="p-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600"
            >
              Mais informações
            </button>
            <button
              style={{ marginRight: "5px" }}
              onClick={() => onEdit(client)}
              className="p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(client.id)}
              className="p-2 bg-red-400 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
            {showClient && showClient.id === client.id && (
              <ModalShow client={client} />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

const ModalShow = ({ client }) => {
  console.log("client ", client);
  return (
    <div className="flex flex-col justify-center items-center bg-gray-200 w-auto h-auto rounded-lg absolute top-0 right-0 py-14 px-5">
      <h2 className="font-bold">Mais informações</h2>
      <h2 className="mb-auto">Nome: {client.name}</h2>
      <span>Email:{client.email}</span>
      <span>Telefone:{client.phone}</span>
      <span>Observação:{client.observation}</span>
      <span>
        Rua:
        {client.address.street}
      </span>{" "}
      <span>
        Nº:
        {client.address.number}
      </span>{" "}
      <span>
        Bairro:
        {client.address.neighborhood}
      </span>{" "}
      <span>
        Complemento:
        {client.address.complement}
      </span>{" "}
      <span>
        Cidade:
        {client.address.city}
      </span>{" "}
      <span>
        Estado:
        {client.address.state}
      </span>{" "}
    </div>
  );
};
export default function MainPage() {
  const [clientList, setClientList] = useState([]);
  const [editClient, setEditClient] = useState(null);
  const [openClientADD, setOpenClientADD] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clients = await ClientService.getClients(); // Aqui está a correção
        setClientList(clients);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  const handleEdit = (client) => {
    setEditClient(client);
  };

  const handleDelete = async (clientId) => {
    try {
      // Exclui o cliente usando o método deleteClient de ClientService
      await ClientService.deleteClient(clientId);
      console.log("Client deleted successfully");

      // Remove o cliente da lista local
      setClientList(clientList.filter((client) => client.id !== clientId));
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const handleShow = (client) => {
    console.log("Show client:", client);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const observation = formData.get("observation");
    const address = {
      street: formData.get("street"),
      number: formData.get("number"),
      neighborhood: formData.get("neighborhood"),
      complement: formData.get("complement"),
      city: formData.get("city"),
      state: formData.get("state"),
    };
    try {
      await ClientService.updateClient(editClient.id, {
        // Correção aqui
        name,
        email,
        phone,
        observation,
        address,
      });
      console.log("Client updated successfully");
      const updatedClients = [...clientList];
      const index = updatedClients.findIndex(
        (client) => client.id === editClient.id
      );
      updatedClients[index] = {
        ...editClient,
        name,
        email,
        phone,
        observation,
        address,
      };
      setClientList(updatedClients);
      setEditClient(null);
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  const resetar = () => {
    setOpenClientADD(false);
    setEditClient(false);
  };
  return (
    <div className="p-8 bg-red-500 h-screen w-screen flex flex-col justify-center items-center overflow-hidden">
      <div className="flex justify-center items-center">
        {openClientADD && (
          <button
            onClick={resetar}
            className="p-2 text-bold text-3xl text-white rounded-md "
          >
            ←
          </button>
        )}
        {editClient && (
          <button
            onClick={resetar}
            className="p-2 text-bold text-3xl text-white rounded-md "
          >
            ←
          </button>
        )}
        <h1 className="text-3xl font-bold">Velvet Valley Store</h1>
      </div>

      {editClient && (
        <form
          onSubmit={handleEditSubmit}
          className="flex justify-start items-start p-4 bg-red-500 rounded-md w-1/2 text-black"
        >
          <div className="flex justify-center items-start w-full">
            <div className="flex flex-col justify-start items-start w-full">
              <div className="flex flex-col mt-5">
                <label className="font-bold text-white text-xs">Nome: </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editClient.name}
                  placeholder="Name"
                  required
                  className="p-2 my-1 rounded-md border"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold text-white text-xs">E-mail: </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={editClient.email}
                  placeholder="Email"
                  required
                  className="p-2 my-1 rounded-md border"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold text-white text-xs">
                  Telefone:
                </label>
                <input
                  type="text"
                  name="phone"
                  defaultValue={editClient.phone}
                  placeholder="Phone"
                  className="p-2 my-1 rounded-md border"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold  text-xs text-white">
                  Observação:
                </label>
                <textarea
                  name="observation"
                  defaultValue={editClient.observation}
                  placeholder="Observation"
                  className="p-2 my-1 rounded-md border"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-center items-center flex-col w-full">
              <label className="font-bold text-xs mx-auto text-white">
                Endereço:
              </label>
              {editClient.address && (
                <>
                  <div className="flex flex-col">
                    <label className="font-bold text-xs text-white">
                      Rua:{" "}
                    </label>
                    <input
                      type="text"
                      name="street"
                      defaultValue={editClient.address.street}
                      placeholder="Street"
                      className="p-2 my-1 rounded-md border"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold text-xs text-white">Nº: </label>
                    <input
                      type="text"
                      name="number"
                      defaultValue={editClient.address.number}
                      placeholder="Number"
                      className="p-2 my-1 rounded-md border"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold text-xs text-white">
                      Bairro:{" "}
                    </label>
                    <input
                      type="text"
                      name="neighborhood"
                      defaultValue={editClient.address.neighborhood}
                      placeholder="Neighborhood"
                      className="p-2 my-1 rounded-md border"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold text-xs text-white">
                      Complemento:{" "}
                    </label>
                    <input
                      type="text"
                      name="complement"
                      defaultValue={editClient.address.complement}
                      placeholder="Complement"
                      className="p-2 my-1 rounded-md border"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold text-xs text-white">
                      Cidade:{" "}
                    </label>
                    <input
                      type="text"
                      name="city"
                      defaultValue={editClient.address.city}
                      placeholder="City"
                      className="p-2 my-1 rounded-md border"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold text-xs text-white">
                      Estado:{" "}
                    </label>
                    <input
                      type="text"
                      name="state"
                      defaultValue={editClient.address.state}
                      placeholder="State"
                      className="p-2 my-1 rounded-md border"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="p-2 bg-blue-500 text-white mt-9 rounded-md hover:bg-blue-600"
          >
            Salvar alterações
          </button>
        </form>
      )}
      {!openClientADD && !editClient && (
        <>
          <ClientList
            clients={clientList}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onShow={handleShow}
          />
          <button
            onClick={() => setOpenClientADD(!openClientADD)}
            className="p-2 bg-emerald-700 text-white rounded-md hover:bg-emerald-800 mt-5"
          >
            Adicionar clientes
          </button>
        </>
      )}
      {openClientADD && (
        <AddClientForm
          setClientList={setClientList}
          setEditClient={setEditClient}
          setOpenClientADD={setOpenClientADD}
        />
      )}
    </div>
  );
}
