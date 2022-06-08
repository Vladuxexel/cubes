import React, { useState } from "react";
import { Text, View } from "react-native";
import Column from "../Column/Column";
import Pointer from "../Pointer/Pointer";
import { styles } from "./PlayingContainerStyles";

export default function PlayingContainer() {
    const [width, setWidth] = useState<number>();
    const [height, setHeight] = useState<number>();
    const colsNumber = 5 // TODO: Вынести в общие константы
    const bordersWidth = 2 // TODO: Вынести в общие константы

    const getColumns = (pointing?: boolean) => {
        const cols = [];
        const colWidth = (Number(width) - bordersWidth) / colsNumber;

        for (let i = 0; i < colsNumber; i++) {
            const item = pointing ? <Pointer width={colWidth} order={i} key={i} /> : <Column width={colWidth} order={i} key={i} />;
            cols.push(item);
        }

        console.log(height)

        return cols;
    }
    
    return (
        <View>
            <View style={[styles.pointersContainer, { height: Number(height) / 5 || 0 }]}>
                { width && getColumns(true) }
            </View>
            <View style={[styles.rowsContainer, { height }]} 
                onLayout={(event) => {
                    const { width } = event.nativeEvent.layout;
                    setWidth(width);
                    const colWidth = (width - bordersWidth) / colsNumber;
                    setHeight(width + colWidth);
                }}>
                { width && getColumns() }
            </View>
        </View>
    );
}