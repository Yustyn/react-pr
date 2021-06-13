const URL = "https://web-cl-om-default-rtdb.firebaseio.com/List.json";

export const getAllContacts = () => {
  const AllContacts = fetch(URL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
  return AllContacts;
};

export const updateContacts = async (contacts) => {
  return await fetch(URL, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contacts),
  });
};
