import { StyleSheet } from "react-native";

export const lightTheme = {
    container: {
        backgroundColor: 'blue',
    }, 
  };
  
export const darkTheme = {
    drawer: {
        headerBackground: '#3F3E7D',
        headerText: "#fff",
    },
    background: {
        flex: 1,
        backgroundColor: '#3F3E7D',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#28275E',
        padding: 50,
        marginTop: 10,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
    },
    text: {
        fontSize: 18, 
        fontWeight: '500',
        color: '#fff',
    }
  };