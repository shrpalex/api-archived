import { TweenService, Workspace } from "@rbxts/services";
import { Game } from "shared/Game";

export type INPUTENTRY = (Label: number, IState: Enum.UserInputState, IObject: InputObject) => any;

interface ClientCharacter {
    Model: Model,

    Root: BasePart,
    Humanoid: Humanoid
}

export class Client {
    // Properties

    private DeathConnection: RBXScriptConnection;

    public Instance: Player;
    public Character: ClientCharacter;

    public readonly ClientInput: INPUTENTRY = (Label: number, IState: Enum.UserInputState, IObject: InputObject) => {
        const State = IState === Enum.UserInputState.Begin;

        switch(Label) {
            case Game.Enums.InputLabels.RUN:
                this.Run(State);

                break;
            case Game.Enums.InputLabels.CROUCH:
                break;
            default:
                break;
        }

        return Game.SUCCESS;
    }

    // Self-explanatory

    constructor(Source: Player) {
        this.Instance = Source;
        
        const Character = this.Instance.Character || this.Instance.CharacterAdded.Wait()[0];
        
        this.Character = {
            Model: Character,
            
            Root: Character.WaitForChild("HumanoidRootPart") as BasePart,
            Humanoid: Character.WaitForChild("Humanoid") as Humanoid
        };

        this.DeathConnection = this.Character.Humanoid.Died.Connect(() => {
            this.UpdateCharacter();
        });
    }

    // Methods

    /* This is the Run Method which handles the Running Request
     * @func Run
     * @params State (boolean)
     * @return void
    */

    protected Run(State: boolean) {
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