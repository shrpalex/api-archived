// spawnmenu ui component

import { Game } from "shared/Game";
import { Panel } from "../Panel";
import { SpawnmenuCategory } from "./SpawnmenuCategory";
import { Make } from "@rbxts/altmake";

export class Spawnmenu extends Panel { // use panel for no constructor overlap
    // static Category

    static BaseCategories: Array<SpawnmenuCategory> = [
        new SpawnmenuCategory(), // props

        new SpawnmenuCategory(), // npcs
        new SpawnmenuCategory(), // entities

        new SpawnmenuCategory(), // tools
        new SpawnmenuCategory() // others
    ];

    //

    public readonly Categories: Array<SpawnmenuCategory>;

    constructor() {
        super();

        //~ style spawnmenu ~//

        this.Instance.BackgroundColor3 = Color3.fromRGB(9, 7, 23);
        this.Instance.Size = UDim2.fromScale(0.8, 0.8);

        this.Instance.AnchorPoint = new Vector2(0.5, 0.5);
        this.Instance.Position = UDim2.fromScale(0.5, 0.5);

        // Modifiers

        this.AppendModifier(Make("UIAspectRatioConstraint", {
            AspectRatio: 1.45
        }));

        this.AppendModifier(Make("UIStroke", {
            Color: Color3.fromRGB(255, 255, 255),
            Thickness: 0.85
        }));

        this.AppendModifier(Make("UICorner", {
            CornerRadius: new UDim(0, 5)
        }));

        //~ set categories ~//

        this.Categories = Spawnmenu.BaseCategories;
    }

    // Methods

    public Toggle() {
        // rewrite toggle, always use toggle for components to get animations, else use ::SetVisible


    }
}