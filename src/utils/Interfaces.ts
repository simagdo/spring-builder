export interface IEntityColumn {
    columnName: string,
    type: string
}

export interface IEntity {
    entityName: string,
    tableName: string,
    positionX: number,
    positionY: number,
    collapsed: boolean,
    columns?: Array<IEntityColumn>
}