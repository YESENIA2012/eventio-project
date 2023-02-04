import { makeStyles } from "tss-react/mui";

const styles = makeStyles()(() => {
  return {
    textFieldStyle: {
      marginBottom: 14,
      width: "80%",
    },
  };
});

const getFromLocalStorage = () => {
  const dataUser = JSON.parse(localStorage.getItem("userInformation"));
  return dataUser;
};

export { styles, getFromLocalStorage };
