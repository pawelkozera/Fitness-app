import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { styles } from "./style";


export function ExerciseDetails({route, navigation }) {
    const {theme} = useTheme();
    const {exerciseID} = route.params;
    console.log(exerciseID);


    return (
        <View style={theme.background}>
            <View style={theme.container}>
                <Text style={styles.title}>Exercise Details</Text>
            </View>
        </View>
    );
}
