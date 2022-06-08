import { useState } from "react";
import { View } from "react-native";
import Column from "../Column/Column";
import { styles } from "./PlayingContainerStyles";

export default function PlayingContainer() {
    const [width, setWidth] = useState<number>();
    const colsNumber = 5 // TODO: Вынести в общие константы
    const bordersWidth = 2 // TODO: Вынести в общие константы

    const getColumns = () => {
        const cols = [];
        const colWidth = (Number(width) - bordersWidth) / colsNumber;

        for (let i = 1; i <= colsNumber; i++) {
            cols.push(<Column width={colWidth} order={i} key={i} />);
        }

        return cols;
    }
    
    return (
        <View style={styles.rowsContainer} onLayout={(event) => setWidth(event.nativeEvent.layout.width)}>
            {width && getColumns() }
        </View>
    );
}