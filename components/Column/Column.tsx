import { Text, View } from "react-native";
import { ColumnProps } from "../../models/column-props";

export default function Column({ width, order }: ColumnProps) {
    const getColor = () => order % 2 ? '#24242c' : '#2a2a32';

    return (
        <View style={{ width, backgroundColor: getColor() }}>
            <Text>{width}</Text>
            <Text>{order}</Text>
        </View>
    );
}