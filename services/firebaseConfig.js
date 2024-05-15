/**
 * Nome do arquivo: clientService.js
 * Data de criação: 09/05/2024
 * Autor: Naiane Ferreira
 * Matrícula: 01593553
 *
 * Descrição:
 * Este arquivo JavaScript é responsável por configurar e inicializar o Firebase,
   bem como fornecer acesso ao serviço Firestore para interagir com o banco de dados.
 *
 * Este script é parte o curso de ADS.
 */

   import { initializeApp } from "firebase/app";
   import { getFirestore } from "firebase/firestore";
   
   const firebaseConfig = {
     apiKey: "AIzaSyA_VZ90sbWCPZt1bqSCPP23Rk8uYFEPmfY",
     authDomain: "projetochico-ae74f.firebaseapp.com",
     projectId: "projetochico-ae74f",
     storageBucket: "projetochico-ae74f.appspot.com",
     messagingSenderId: "352039892276",
     appId: "1:352039892276:web:7d9cca24105c7b0886a161",
   };
   
   const firebaseApp = initializeApp(firebaseConfig);
   const db = getFirestore(firebaseApp);
   
   export { firebaseApp, db };
