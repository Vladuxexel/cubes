import { CubeModel } from "./cube-model";

export interface ColumnProps {
    width: number;
    order: number;
    cubesArr?: CubeModel[];
}