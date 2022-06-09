import { Text, View } from "react-native";
import { ColumnProps } from "../../models/column-props";
import Cube from "../Cube/Cube";
import { styles } from "./ColumnStyles";

export default function Column({ width, order, cubesArr }: ColumnProps) {
    const getColor = () => order % 2 ? '#2a2a32' : '#24242c';

    return (
        <View style={{ width, backgroundColor: getColor() }}>
            {cubesArr?.map((cubeVal: number, index) => <Cube side={width} isHidden={!cubeVal} key={index} />)}
        </View>
    );
}