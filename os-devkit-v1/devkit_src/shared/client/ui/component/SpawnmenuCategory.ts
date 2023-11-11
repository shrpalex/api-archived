import { Game } from "shared/Game";

let ukc = 0;

export class SpawnmenuCategory {
    public readonly Name: string;
    public readonly Description: string; // Only shown when hovering
    public readonly ICON: Game.Types.ICON;

    constructor(Name?: string, Description: string = "This is a Category.", Icon: string = "rbxassetid://") {
        this.Name = Name || "Category_" + ukc;

        if (!Name)
            ukc++;

        this.Description = Description;
        this.ICON = Icon;
    }
}