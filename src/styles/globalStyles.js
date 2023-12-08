import { StyleSheet } from "react-native";

export const lightTheme = {
    navigation: {
        headerBackground: '#bbbbfa',
        text: "#1F1F1F", 
        inactiveText: '#5f5f66', 
        bottomBackground: '#0a0a1f', 
        drawerBackground: '#c3c3fa', 
    },
    background: {
        flex: 1,
        backgroundColor: '#bbbbfa', 
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#a3a3f7', 
        padding: 50,
        marginTop: 5,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
    },
    backgroundItem: {
        alignItems: 'center',
        backgroundColor: '#bbbbfa', 
        padding: 20,
        borderRadius: 50,
    },
    text: {
        fontSize: 20, 
        fontWeight: '600',
        color: '#1F1F1F',
    },
    switch: {
        trackFalseColor: '#DAD7E0', // 
        trackTrueColor: '#B9A6FF',
        thumbFalseColor: '#FFFFFF',
        thumbTrueColor: '#7F7AFF', 
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