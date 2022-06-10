import { CubeModel } from "../models/cube-model";
import { CELS_NUMBER, COLS_NUMBER } from "./constants";

const round = (n: number | undefined): number => {
    if (!n) {
      return 0;
    }

    return Math.round(n);
}

const getEmptyCube = (): CubeModel => {
    return {
        isCurrent: false,
        value: 0,
        level: 0
    }
}

const copy = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

const getInitialField = () => {
    const fieldsArr = Array.from(Array(COLS_NUMBER), ()=> copy(Array<CubeModel>(CELS_NUMBER).fill(getEmptyCube())));
    const initialElement = fieldsArr[2][0];
    initialElement.isCurrent = true;
    initialElement.level = 1;
    initialElement.value = 2;

    return fieldsArr;
}


export { round, getEmptyCube, copy, getInitialField };