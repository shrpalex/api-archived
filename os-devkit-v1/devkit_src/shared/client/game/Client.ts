import { RunService, TweenService, Workspace } from "@rbxts/services";
import { Game } from "shared/Game";
import { _root } from "../ui/root";

export type INPUTENTRY = (Label: number, IState: Enum.UserInputState, IObject: InputObject) => any;

interface ClientCharacter {
    Model: Model,

    Root: BasePart,
    Humanoid: Humanoid
}

export class Client {
    // Properties

    private DeathConnection: RBXScriptConnection;

    // 

    public Instance: Player;
    public Character: ClientCharacter;
    public Root: _root;

    // Character Stuff

    // Bleedout interploation array

    public readonly BloodVolume = 8; // % (total mass (kg))
    public readonly BleedoutArr: Array<number> = [
            0, // head, instant death if its higher than 0.1
        0,  0,  0, // arms (1 -> 100ml/s), torso -> (35ml/s per 0.1)
          // //
          0 , 0, // legs (1 -> 150ml/s)
    ];

    public ClientState: Game.Enums.ClientState = Game.Enums.ClientState.NONE;

    // Input

    public readonly ClientInput: INPUTENTRY = (Label: number, IState: Enum.UserInputState, IObject: InputObject) => {
        const State = IState === Enum.UserInputState.Begin;

        switch(Label) {
            // See Game.Enums.InputLabels for Entry Definitions

            case Game.Enums.InputLabels.RUN:
                this.Run(State);

                break;
            case Game.Enums.InputLabels.CROUCH:
                this.Crouch(State);

                break;
            case Game.Enums.InputLabels.SWALK:
                break;
            case Game.Enums.InputLabels.GRAB:
                break;
            case Game.Enums.InputLabels.PLAYERLIST:
                break;
            case Game.Enums.InputLabels.MENU:
                break;
            case Game.Enums.InputLabels.DEBUG:
                this.Root.Debug.SetVisible(State);
                break;
            case Game.Enums.InputLabels.DEBUGCMOD:
                break;
            case Game.Enums.InputLabels.SPAWNMENU:
                this.Root.Spawnmenu.SetVisible(State);

                break;
            case Game.Enums.InputLabels.CONSOLE:
                break;
            default:
                break;
        }

        return Game.SUCCESS;
    }

    // Self-explanatory

    constructor(Source: Player) {
        this.Instance = Source; // initialize Instance
        
        const Character = this.Instance.Character || this.Instance.CharacterAdded.Wait()[0];
        
        // initialize Character interface

        this.Character = {
            Model: Character,
            
            Root: Character.WaitForChild("HumanoidRootPart") as BasePart,
            Humanoid: Character.WaitForChild("Humanoid") as Humanoid
        };

        // initalize gui

        this.Root = new _root(this.Instance.WaitForChild("PlayerGui") as PlayerGui);

        this.DeathConnection = this.Character.Humanoid.Died.Connect(() => {
            this.UpdateCharacter();
        });

        RunService.BindToRenderStep("__gr_INPUTUPDATE__", Enum.RenderPriority.Input.Value, (dt: number) => {
            
        });
    }

    // Methods

    /* This is the Run Method which handles the Running Request
     * @func Run
     * @params State (boolean)
     * @return void
    */



    protected async Run(State: boolean) {
        if (this.GetHumanoid().MoveDirection === Vector3.zero || this.GetHumanoid().FloorMaterial === Enum.Material.Air) return;
        if (this.ClientState !== Game.Enums.ClientState.NONE) { this.Crouch(false); return; }

        this.GetHumanoid().UseJumpPower = true; // Set this to true so it takes JumpPower

        // create the two tweens

        const walk = TweenService.Create(this.GetHumanoid(), new TweenInfo(Game.Data.RUN_ACCEL_TIME), { WalkSpeed: State ? Game.Data.RUN_SPEED : Game.Data.DEFAULT_SPEED, JumpPower: State ? Game.Data.RUN_PJUMP : Game.Data.DEFAULT_PJUMP }),
        fov = TweenService.Create((Workspace.CurrentCamera as Camera), new TweenInfo(Game.Data.RUN_FOV_TIME), { FieldOfView: State ? Game.Data.RUN_FOV : Game.Data.DEFAULT_FOV });

        // play the tweens

        walk.Play();
        fov.Play();

        // dispose of the tween instances

        fov.Completed.Wait();

        walk.Destroy();
        fov.Destroy();
    }

    /* This is the Crouch Method which handles the Crouching Request
     * @func Crouch
     * @params State (boolean)
     * @return void
    */

    protected async Crouch(State: boolean) {
        if (this.GetHumanoid().FloorMaterial === Enum.Material.Air) return;
        if (this.ClientState !== Game.Enums.ClientState.NONE) { this.Run(false); return; }
        this.GetHumanoid().UseJumpPower = true;

        // create the tween and bind to RenderStepped

        const walk = TweenService.Create(this.GetHumanoid(), new TweenInfo(Game.Data.RUN_ACCEL_TIME), {
            WalkSpeed: State ? Game.Data.CROUCH_SPEED : Game.Data.DEFAULT_SPEED,
            JumpPower: State ? Game.Data.CROUCH_PJUMP : Game.Data.DEFAULT_PJUMP,

            CameraOffset: State ? new Vector3(this.GetHumanoid().CameraOffset.X, this.GetHumanoid().CameraOffset.Y - 0.5, this.GetHumanoid().CameraOffset.Z) : new Vector3(this.GetHumanoid().CameraOffset.X, this.GetHumanoid().CameraOffset.Y + 0.5, this.GetHumanoid().CameraOffset.Z)
        });

        walk.Play();
        walk.Destroy();
    }

    /* A method that updates the Character interface
     * @func UpdateCharacter
     * @param void
     * @return void
    */

    private UpdateCharacter() {
        if (this.Character.Model) return;

        const Character = this.Instance.Character || this.Instance.CharacterAdded.Wait()[0];
        
        this.Character = {
            Model: Character,
            
            Root: Character.WaitForChild("HumanoidRootPart") as BasePart,
            Humanoid: Character.WaitForChild("Humanoid") as Humanoid
        };
    }

    /* A method that returns the current Humanoid. If the Humanoid is undefined it Updates the Character Interface
     * @func GetHumanoid
     * @param void
     * @return Humanoid
    */

    public GetHumanoid(): Humanoid {
        if (!this.Character.Humanoid)
            this.UpdateCharacter();

        return this.Character.Humanoid;
    }
}