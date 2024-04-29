//import { createSlice, nanoid } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./contactsOps";
import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter } from "./filtersSlice";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: { items: [], loading: false, error: null },

  //   reducers: {
  //     addContact: {
  //       reducer(state, action) {
  //         state.items.push(action.payload);
  //       },

  //       prepare(name, number) {
  //         return {
  //           payload: {
  //             name,
  //             number,
  //             id: nanoid(),
  //           },
  //         };
  //       },
  //     },
  //     deleteContact(state, action) {
  //       const index = state.items.findIndex(
  //         (contact) => contact.id === action.payload
  //       );
  //       state.items.splice(index, 1);
  //     },
  //   },
  // });

  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, handleRejected);
  },
});

export const selectContacts = (state) => state.contacts.items;
export const selectIsLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;
// export const { addContact, deleteContact } = contactsSlice.actions;
// export const contactsReducer = contactsSlice.reducer;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    if (filter.trim() === "") {
      return contacts;
    } else {
      return contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
  }
);

export const contactsReducer = contactsSlice.reducer;
