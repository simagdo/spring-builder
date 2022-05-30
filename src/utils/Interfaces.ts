export enum ColumnType {
    String = "STRING",
    Integer = "INTEGER"
}

export interface IEntityColumn {
    columnName: string,
    type: ColumnType
}

export interface IEntity {
    entityName: string,
    tableName: string,
    positionX: number,
    positionY: number,
    collapsed: boolean,
    columns?: Array<IEntityColumn>
}