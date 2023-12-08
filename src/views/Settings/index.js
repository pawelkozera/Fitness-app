import { Switch } from "react-native-gesture-handler";
import { useTheme } from "../../context/ThemeContext";
import {Text, View} from "react-native";
import { useState } from "react";


export function Settings({ navigation }) {
    const { theme, toggleTheme, isDarkTheme } = useTheme(); 
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
    const toggleNotifications = () => setIsNotificationsEnabled(previousState => !previousState);

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
                <View style={[theme.backgroundItem, {flexDirection: 'row', marginTop: 20}]}>
                    <Text style={[theme.text, {marginRight: 80}]}>Notifications</Text>
                    <Switch
                        trackColor={{ false: theme.switch.trackFalseColor, true: theme.switch.trackTrueColor}}
                        thumbColor={isNotificationsEnabled ? theme.switch.thumbTrueColor : theme.switch.thumbFalseColor}
                        onValueChange={toggleNotifications}
                        value={isNotificationsEnabled}
                    />
                </View>
            </View>
        </View>
    );
}