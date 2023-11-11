// spawnmenu ui component

import { Game } from "shared/Game";
import { Panel } from "../Panel";
import { SpawnmenuCategory } from "./SpawnmenuCategory";

export class Spawnmenu extends Panel {
    // static Category

    static BaseCategories = [
        new SpawnmenuCategory(), // props

        new SpawnmenuCategory(), // npcs
        new SpawnmenuCategory(), // entities

        new SpawnmenuCategory(), // tools
        new SpawnmenuCategory() // others
    ];

    //

    public readonly Categories: Game.types.Array<SpawnmenuCategory> = [];

    constructor(ov_ct?: SpawnmenuCategory[]) {
        super();

        //~ set categories ~//

        this.Categories = Spawnmenu.BaseCategories;

        if (ov_ct) {
            this.Categories.push(ov_ct);
        }
    }
}