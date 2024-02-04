import { useEffect, useState } from "react";
import Navbar from "./components/navbar"
import { FaSearch, FaPlusCircle } from "react-icons/fa";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from "./components/NotFoundContact";

const App = () => {

  const [contacts, setContacts] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclouse();

  useEffect(() => {

    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");


        onSnapshot(contactsRef, (snapshot) => {
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            }
          });
          setContacts(contactList);
          return contactList;
        })
      } catch (error) {
        console.log(error);
      }

    };

    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");


    onSnapshot(contactsRef, (snapshot) => {
      const contactList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      });

      const filteredContacts = contactList.filter((contact) => contact.name.toLowerCase().includes(value.toLowerCase()))

      setContacts(filteredContacts);
      return filteredContacts;
    })
  }



  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="flex relative items-center flex-grow">
            <FaSearch className="absolute ml-1 text-2xl text-white" />
            <input
              onChange={filterContacts} type="text" className="flex-grow h-10 rounded-md border border-white bg-transparent text-white pl-9" />
          </div>
          <FaPlusCircle onClick={onOpen} className="text-4xl text-white cursor-pointer" />
        </div>
        <div className="mt-4 gap-3 flex flex-col">
          {contacts.length <= 0 ? <NotFoundContact /> : contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
      <ToastContainer position="bottom-center" />
    </>
  )
}

export default App