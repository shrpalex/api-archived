// spawnmenu ui component

import { Game } from "shared/Game";
import { Panel } from "../Panel";
import { SpawnmenuCategory } from "./SpawnmenuCategory";
import { Make } from "@rbxts/altmake";
import { TweenService } from "@rbxts/services";

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

    public async Toggle() {
        this.SetVisible(!this.Instance.Visible);
    }

    public async SetVisible(e?: boolean): Promise<number | void> {
        // Check to prevent people spamming ::SetVisible()

        if (this.Instance.GroupTransparency > 0 || this.Instance.GroupTransparency < 1) return Game.ERROR;

        // Animate

        const Start = UDim2.fromScale(0.5, e ? 0.45 : 0.5), End = UDim2.fromScale(0.5, e ? 0.5 : 0.55);
        const Stroke = this.Instance.FindFirstChildOfClass("UIStroke");

        if (!Stroke) return; // assertion for the stroke

        // pre-initialize the Instance for the animation

        Stroke.Transparency = e ? 1 : 0;
        this.Instance.GroupTransparency = e ? 1 : 0;
        this.Instance.Position = Start;

        // animate stuff

        const a0 = TweenService.Create(this.Instance, new TweenInfo(0.25), {
            Position: End,
            GroupTransparency: e ? 0 : 1
        });

        const a1 = TweenService.Create(this.Instance, new TweenInfo(0.25), {
            Transparency: e ? 0 : 1
        });

        // Disposal, client can await

        a0.Play(); a1.Play();

        a0.Completed.Wait();

        a0.Destroy();
        a1.Destroy();
    }
}