import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../components/Title/Title";
import { selectIsLoading, selectError } from "../redux/contacts/selectors";
import { fetchContacts } from "../redux/contacts/operations";
import ContactForm from "../components/ContactForm/ContactForm";
import ContactList from "../components/ContactList/ContactList";
import SearchBox from "../components/SearchBox/SearchBox";

export default function ContactsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <Title>Your contacts</Title>
      <ContactForm />
      <SearchBox />
      {isLoading && !error && <b>Loading...</b>}
      {error && <b>Something went wrong.</b>}
      <ContactList />
    </>
  );
}
