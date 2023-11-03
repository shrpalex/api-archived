import { Make } from "@rbxts/altmake";
import { bs } from "shared/bs";

// base Layer class implementation for non-user generated Layers

export abstract class _InhLayer {
    private Instance: bs.Layer;

    constructor(Parent?: ScreenGui) {
        this.Instance = Make("CanvasGroup", {
            Parent: Parent
        });
    }
}

// extensions of _InhLayer for game reserved layers (debug, ...)

export class DebugLayer extends _InhLayer {}
export class ReservedLayer extends _InhLayer {}

// user instanced layer

// 

export class InstanceableLayer {
    private Instance: bs.Layer;
    
    constructor(LayerMode: number) {
        this.Instance = Make(LayerMode & bs.LayerFlag.BaseFrame ? "Frame" : "CanvasGroup")
    }
}