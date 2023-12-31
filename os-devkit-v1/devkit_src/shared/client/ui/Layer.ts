import { Make } from "@rbxts/altmake";
import { RunService } from "@rbxts/services";
import { Game } from "shared/Game";

// base Layer class implementation for non-user generated Layers

export abstract class TemplateLayer {
    public readonly Instance: Game.Types.Layer;

    constructor(Parent?: ScreenGui) {
        this.Instance = Make("CanvasGroup", {
            Visible: false,
            Parent: Parent
        });
    }

    public Toggle() {
        this.Instance.Visible = !this.Instance.Visible;
    }

    public SetVisible(e: boolean = true) {
        this.Instance.Visible = e;
    }
}

// extensions of _InhLayer for game reserved layers (debug, ...)

export class DebugLayer extends TemplateLayer {
    constructor(Scale?: number) {
        super();
        
        // give the layer instance the appropriate properties

        Scale = Scale || 1;

        this.Instance.AnchorPoint = new Vector2(0.5, 0.5);
        
        this.Instance.Position = UDim2.fromScale(0.5, 0.5);
        this.Instance.Size = UDim2.fromScale(Scale, Scale);

        // make the needed constraints

        // padding of 0.01

        Make("UIPadding", {
            PaddingTop: new UDim(0.01),
            PaddingLeft: new UDim(0.01),

            Parent: this.Instance
        });

        // list for the items 

        Make("UIListLayout", {
            Wraps: true,
            
            FillDirection: Enum.FillDirection.Vertical,
            ItemLineAlignment: Enum.ItemLineAlignment.Start,
            
            VerticalAlignment: Enum.VerticalAlignment.Top,
            HorizontalAlignment: Enum.HorizontalAlignment.Left,

            Padding: new UDim(0, 2),

            HorizontalFlex: Enum.UIFlexAlignment.SpaceEvenly,

            Parent: this.Instance
        });

        // create textlabels to update

        const fps_handle = Make("TextLabel", {
            Text: "fps (1/dt): //",
            Parent: this.Instance
        });

        const deltadisplay = Make("TextLabel", {
            Text: "delta: //",
            Parent: this.Instance
        });

        // todo make text interchangeable from user settings

        RunService.BindToRenderStep("debug_updater", Enum.RenderPriority.Camera.Value, (dt) => {
            fps_handle.Text = "fps (1/dt): " + math.floor(1 / dt); 
            deltadisplay.Text = "delta: " + Game.Utils.FPoint(dt, 3); // 0.013091345 -> 0.013
        })
    }
}
export class ReservedLayer extends TemplateLayer {} // todo

// user instanced layer

export class InstanceableLayer {
    private Instance: Game.Types.Layer;
    
    constructor(LayerMode: number) {
        this.Instance = Make(LayerMode & Game.Flags.LayerFlag.BaseFrame ? "Frame" : "CanvasGroup")
    }
}