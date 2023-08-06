import { IcoTable, IcoDefault } from "./IcoTable";

export function convertIco(ico: string): string {
    return IcoTable[ico] ? IcoTable[ico] : IcoTable;
}
