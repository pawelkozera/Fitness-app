import { Switch } from "react-native-gesture-handler";
import { useTheme } from "../../context/ThemeContext";
import {Button, Text, TouchableOpacity, View} from "react-native";
import { useState } from "react";
import { styles } from "./style";


export function Settings({ navigation }) {
    const { theme, toggleTheme, isDarkTheme } = useTheme(); 
    const [expanded, setExpanded] = useState(false);
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
    const toggleNotifications = () => setIsNotificationsEnabled(previousState => !previousState);

    const handleLogout = () => {
        navigation.pop(2);
    };

    return (
        <View style={theme.background}>
            <View style={theme.container}>
                <View style={[theme.backgroundItem, {flexDirection: 'row'}]}>
                    <Text style={[theme.text, {marginRight: 80}]}>Dark Theme</Text>
                    <Switch
                        trackColor={{ false: theme.switch.trackFalseColor, true: theme.switch.trackTrueColor}}
                        thumbColor={isDarkTheme ? theme.switch.thumbTrueColor : theme.switch.thumbFalseColor}
                        onValueChange={toggleTheme} 
                        value={isDarkTheme}
                    />
                </View>
                <View style={{flex: 0.85}}>
                    <TouchableOpacity 
                        style={expanded ? [theme.backgroundItem, {borderBottomLeftRadius: 0, borderBottomRightRadius: 0, minWidth: 290}] : [theme.backgroundItem, {minWidth: 290}]} 
                        onPress={() => setExpanded(!expanded)}>
                            <Text style={theme.text}>Profile Details</Text>
                    </TouchableOpacity>
                    {expanded && (
                        <View style={expanded ? [theme.backgroundItem, {borderTopLeftRadius: 0, borderTopRightRadius: 0, flexDirection: 'row'}] : theme.backgroundItem}>
                            <View style={{alignItems: 'flex-start'}}>
                                <Text style={[styles.detailTitle, {color: theme.detail.titleColor}]}>Name:</Text>
                                <Text style={[styles.detailTitle, {color: theme.detail.titleColor}]}>Surname:</Text>
                                <Text style={[styles.detailTitle, {color: theme.detail.titleColor}]}>E-mail:</Text>
                            </View>
                            <View style={{alignItems: 'flex-end'}}>
                                <Text style={[styles.detailText, {color: theme.detail.textColor}]}>John</Text>
                                <Text style={[styles.detailText, {color: theme.detail.textColor}]}>Wick</Text>
                                <Text style={[styles.detailText, {color: theme.detail.textColor}]}>john@email.com</Text>
                            </View>
                        </View>
                    )}
                </View>
                <TouchableOpacity
                    style={styles.logout}
                    onPress={handleLogout} >
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}