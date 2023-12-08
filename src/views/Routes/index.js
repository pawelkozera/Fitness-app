import {Text, View} from "react-native";
import { useTheme } from "../../context/ThemeContext";


export function Routes({ navigation }) {
    const {theme} = useTheme();

    return (
        <View style={theme.background}>
            <View style={theme.container}>
                <Text style={theme.text}>Routes</Text>
            </View>
        </View>
    );
}
