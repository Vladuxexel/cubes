import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { PlayingContainerProps } from "../../models/playing-container-props";
import Column from "../Column/Column";
import Pointer from "../Pointer/Pointer";
import { styles } from "./PlayingContainerStyles";
import { Accelerometer } from 'expo-sensors';
import { BORDER_WIDTH, COLS_NUMBER } from "../../common/constants";
import { copy, getEmptyCube, getInitialField, moveColumn, round } from "../../common/functions";
import { CubeModel } from "../../models/cube-model";

export default function PlayingContainer({ ticks }: PlayingContainerProps) {
    const [width, setWidth] = useState<number>();
    const [height, setHeight] = useState<number>();
    const [fieldState, setFieldState] = useState<CubeModel[][]>(() => getInitialField());
    const [rotation, setRotation] = useState<number>();
    const [subscription, setSubscription] = useState<any>(null);

    let _subscription;

    const _unsubscribe = () => {
      subscription && subscription.remove();
      setSubscription(null);
    };

    useEffect(() => {
      _subscribe();
      return () => _unsubscribe();
    }, []);

    const _subscribe = () => {
      _subscription = Accelerometer.addListener(accelerometerData => {
        setRotation(round(accelerometerData.x));
      });
    };
    
    useEffect(() => {
        if (rotation === 1) {
            moveTo('left');
        } else if (rotation === -1) {
            moveTo('right');
        }
    }, [rotation]);

    useEffect(() => {
        const fieldCopy = copy(fieldState);
        
        fieldCopy.forEach((element, index) => fieldCopy[index] = moveColumn(element));

        setFieldState(fieldCopy);
    }, [ticks]);

    const getColumns = (pointing?: boolean) => {
        const cols = [];
        const colWidth = (Number(width) - BORDER_WIDTH * 2) / COLS_NUMBER;

        for (let i = 0; i < COLS_NUMBER; i++) {
            const item = pointing
                ? <Pointer width={colWidth} order={i} key={i} />
                : <Column width={colWidth} order={i} cubesArr={fieldState[i]} key={i} />;
            cols.push(item);
        }

        return cols;
    }

    function moveTo(direction: string) {
        const column = fieldState.find((column) => column.some((cube) => cube.isCurrent));

        if (!column) {
            return;
        }

        const colIndex = fieldState.indexOf(column);
        const fieldCopy = copy(fieldState);

        if (direction === 'left') {
            if (colIndex > 0) {
                fieldCopy[colIndex - 1] = fieldCopy[colIndex].slice();
                fieldCopy[colIndex] = Array(6).fill(getEmptyCube()); 
                setFieldState(fieldCopy);
            }
        } else if (direction === 'right') {
            if (colIndex < 4) {
                fieldCopy[colIndex + 1] = fieldCopy[colIndex].slice();
                fieldCopy[colIndex] = Array(6).fill(getEmptyCube());
                setFieldState(fieldCopy);
            }
        }
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
                    const colWidth = (width - BORDER_WIDTH * 2) / COLS_NUMBER;
                    setHeight(width + colWidth);
                }}>
                { width && getColumns() }
            </View>
        </View>
    );
}