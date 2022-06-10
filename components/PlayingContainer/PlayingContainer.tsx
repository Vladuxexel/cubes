import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { PlayingContainerProps } from "../../models/playing-container-props";
import Column from "../Column/Column";
import Pointer from "../Pointer/Pointer";
import { styles } from "./PlayingContainerStyles";
import { Accelerometer } from 'expo-sensors';
import { BORDER_WIDTH, COLS_NUMBER } from "../../common/constants";
import { copy, getEmptyCube, getInitialField, round } from "../../common/functions";
import { CubeModel } from "../../models/cube-model";
import { Direction } from "../../models/direction.enum";

export default function PlayingContainer({ ticks }: PlayingContainerProps) {
    const [width, setWidth] = useState<number>();
    const [height, setHeight] = useState<number>();
    const [fieldState, setFieldState] = useState<CubeModel[][]>(() => getInitialField());
    const [rotation, setRotation] = useState<number>();
    const [subscription, setSubscription] = useState<any>(null);

    function unsubscribe() {
      subscription && subscription.remove();
      setSubscription(null);
    };

    useEffect(() => {
      subscribe();
      return () => unsubscribe();
    }, []);

    function subscribe() {
        setSubscription(
            Accelerometer.addListener(
                accelerometerData => setRotation(round(accelerometerData.x))
            )
        );
    };
    
    useEffect(() => {
        if (rotation === 1) {
            moveTo(Direction.Left);
        } else if (rotation === -1) {
            moveTo(Direction.Right);
        }
    }, [rotation]);

    useEffect(() => {
        const fieldCopy = copy(fieldState);
        
        fieldCopy.forEach((element, index) => fieldCopy[index] = moveColumn(element));

        setFieldState(mergeCubes(fieldCopy));
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

    function moveTo(direction: Direction): void {
        const fieldCopy = copy(fieldState);
        const column = fieldCopy.find((column) => column.some((cube) => cube.isCurrent));
        const activeCube = column?.find((cube) => cube.isCurrent);

        if (!column || !activeCube) {
            return;
        }

        const colIndex = fieldCopy.indexOf(column);
        const cubeIndex = column.indexOf(activeCube);

        if (direction === Direction.Left) {
            if (colIndex > 0) {
                fieldCopy[colIndex - 1][cubeIndex] = copy(activeCube);
                fieldCopy[colIndex][cubeIndex] = getEmptyCube();

                setFieldState(fieldCopy);
            }
        } else if (direction === Direction.Right) {
            if (colIndex < 4) {
                fieldCopy[colIndex + 1][cubeIndex] = copy(activeCube);
                fieldCopy[colIndex][cubeIndex] = getEmptyCube();

                setFieldState(fieldCopy);
            }
        }
    }

    const moveColumn = (col: CubeModel[]) => {
        const activeCube = col.find((cube) => cube.isCurrent);
    
        if (!activeCube) {
            return col;
        }

        if (activeCube && (col.indexOf(activeCube) === col.length - 1 || !!col[col.indexOf(activeCube) + 1].level)) {
            activeCube.isCurrent = false;
            
            return setNewCube(col);
        }
    
        const mergedCubesNumber = col.filter((cube) => cube.level && !cube.isCurrent).length;

        if (mergedCubesNumber && activeCube) {
            const tempWithoutMerged = col.slice(0, col.length - mergedCubesNumber);
            const temp = tempWithoutMerged.slice(0, tempWithoutMerged.length - 1);
            temp.unshift(tempWithoutMerged[tempWithoutMerged.length - 1]);
            temp.push(...col.slice(tempWithoutMerged.length));

            return temp;
        }

        const temp = col.slice(0, col.length - 1);
        temp.unshift(col[col.length - 1]);
    
        return temp;
    }

    function setNewCube(col: CubeModel[]): CubeModel[] {
        const colCopy = copy(col);
        const initialElement = colCopy[0];

        initialElement.isCurrent = true;
        initialElement.level = 1;
        initialElement.value = 2;

        return colCopy;
    }

    function mergeCubes(mappedField: CubeModel[][]): CubeModel[][] {
        const fieldCopy = copy(mappedField);
        const column = fieldCopy.find((column) => column.some((cube) => cube.isCurrent));
        const activeCube = column?.find((cube) => cube.isCurrent);

        if (!column || !activeCube) {
            return fieldCopy;
        }

        const cubeIndex = column.indexOf(activeCube);

        if (column.indexOf(activeCube) === column.length - 1 || !!column[column.indexOf(activeCube) + 1].level) {
            const leftCol = fieldCopy[fieldCopy.indexOf(column) - 1];
            const rightCol = fieldCopy[fieldCopy.indexOf(column) + 1];
            let matches = 0;
            
            if (leftCol && leftCol[cubeIndex].level === activeCube.level ) {
                matches++;
                leftCol[cubeIndex] = getEmptyCube();
            }

            if (rightCol && rightCol[cubeIndex].level === activeCube.level ) {
                matches++;
                rightCol[cubeIndex] = getEmptyCube();
            }

            if (column[cubeIndex + 1]?.level && column[cubeIndex + 1].level === activeCube.level ) {
                matches++;
                column[cubeIndex + 1] = getEmptyCube();
            }

            if (matches) {
                activeCube.level += matches;
            }
        }

        return fieldCopy;
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