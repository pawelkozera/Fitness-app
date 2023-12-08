import { useTheme } from "../../context/ThemeContext";
import {Text, View} from "react-native";


export function Settings({ navigation }) {
    const {theme} = useTheme();

    return (
    <View style={theme.background}>
        <View style={theme.container}>
            <Text style={theme.text}>Settings</Text>
        </View>
    </View>
        
    );
}
