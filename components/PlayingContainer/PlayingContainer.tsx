import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { PlayingContainerProps } from "../../models/playing-container-props";
import Column from "../Column/Column";
import Pointer from "../Pointer/Pointer";
import { styles } from "./PlayingContainerStyles";

export default function PlayingContainer({ ticks }: PlayingContainerProps) {
    const [width, setWidth] = useState<number>();
    const [height, setHeight] = useState<number>();
    const [fieldState, setFieldState] = useState<any>(() => {
        const arr = Array.from(Array(5), ()=> Array(6).fill(0));
        arr[0][0] = 1;

        return arr;
    });
    const colsNumber = 5 // TODO: Вынести в общие константы
    const bordersWidth = 2 // TODO: Вынести в общие константы

    useEffect(() => {
        const fieldCopy = JSON.parse(JSON.stringify(fieldState));

        const move = (arr: number[]) => {
            const temp = arr.slice(0, arr.length - 1);
            temp.unshift(arr[arr.length - 1]);
            return temp;
        }
        
        fieldCopy[0] = move(fieldCopy[0]);

        setFieldState(fieldCopy);
    }, [ticks]);

    const getColumns = (pointing?: boolean) => {
        const cols = [];
        const colWidth = (Number(width) - bordersWidth) / colsNumber;

        for (let i = 0; i < colsNumber; i++) {
            const item = pointing
                ? <Pointer width={colWidth} order={i} key={i} />
                : <Column width={colWidth} order={i} cubesArr={fieldState[i]} key={i} />;
            cols.push(item);
        }

        return cols;
    }

    return (
        <View>
            <View style={[styles.pointersContainer, { height: Number(height) / 5 || 0  }]}>
                { width && getColumns(true) }
            </View>
            <View style={[styles.rowsContainer, { height }]} 
                onLayout={(event) => {
                    const { width } = event.nativeEvent.layout;
                    setWidth(width);
                    const colWidth = (width - bordersWidth) / colsNumber;
                    setHeight(width + colWidth);
                }}>
                    {/* TODO: Отображать массив columns. Попробовать двигать эл-ты push-ем */}
                { width && getColumns() }
            </View>
        </View>
    );
}