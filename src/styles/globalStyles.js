import { StyleSheet } from "react-native";

export const lightTheme = {
    navigation: {
        headerBackground: '#FFFFFF', 
        text: "#000000", 
        inactiveText: '#646464',
        bottomBackground: '#F0F0F0', 
        drawerBackground: '#E5E5E5', 
    },
    background: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFFFFF', 
        padding: 50,
        marginTop: 5,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
    },
    backgroundItem: {
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        padding: 20,
        borderRadius: 50,
    },
    text: {
        fontSize: 20, 
        fontWeight: '600',
        color: '#000000',
    },
    switch: {
        trackFalseColor: '#E1E1E1',
        trackTrueColor: '#B6E0FF', 
        thumbFalseColor: '#FFFFFF', 
        thumbTrueColor: '#007AFF', 
    },
};

  
export const darkTheme = {
    navigation: {
        headerBackground: '#3F3E7D',
        text: "#fff",
        inactiveText: '#a4a3a8',
        bottomBackground: '#080814',
        drawerBackground: '#3B3A8C',
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
        marginTop: 5,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
    },
    backgroundItem: {
        alignItems: 'center',
        backgroundColor: '#3F3E7D',
        padding: 20,
        borderRadius: 50,
    },
    text: {
        fontSize: 20, 
        fontWeight: '600',
        color: '#fff',
    },
    switch: {
        trackFalseColor: '#252526',
        trackTrueColor: '#252526',
        thumbFalseColor: '#fff',
        thumbTrueColor: '#0afafa',
    }
  };