import {ColumnType} from "./Enums";

export interface IEntityColumn {
    columnName: string,
    type: ColumnType,
    insertable?: true | false,
    length?: 255 | number,
    nullable?: true | false,
    precision?: 0 | number,
    scale?: 0 | number,
    unique?: false | true,
    updatable?: true | false
}

export interface IEntity {
    entityName: string,
    tableName: string,
    positionX: number,
    positionY: number,
    collapsed: boolean,
    columns?: Array<IEntityColumn>
}