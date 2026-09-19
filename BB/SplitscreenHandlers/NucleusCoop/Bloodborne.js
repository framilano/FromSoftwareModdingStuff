Hub.Handler.Version = 0;
Hub.Handler.Id = "apv0UYDgGi7MKk1BF";
Hub.Maintainer.Name = "framilano";
Hub.Maintainer.Id = "0xMRJDltsx0zljSu6";

var titleIdsAnswersList = ["CUSA03173", "CUSA00900", "CUSA00207", "PCJS50005"];
Game.AddOption("Bloodborne Title Id", "Select your Bloodborne game files region:", "titleIdsAnswer", titleIdsAnswersList);

//Ask user for Bloodborne game files folder path
Game.AddOption("PS4 Games Folder Path", "Enter your PS4 games folder path (the folder containing your CUSA folder):", "ps4GamesFolderPath", []);

Game.ExecutableContext = [];
Game.DirExclusions = [];
Game.KillProcessesOnClose = ["shadnet"]; //Automatically closes this list of processes (names of the executables)
Game.DirSymlinkExclusions = [];
Game.FileSymlinkExclusions = [];
Game.FileSymlinkCopyInstead = [];
Game.GameName = "Bloodborne";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "shadPS4.exe";
Game.GUID = "Bloodborne";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.UseNucleusEnvironment = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "shadPS4";
Game.HasDynamicWindowTitle = true;
Game.RefreshWindowAfterStart = true;
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.BlockRawInput = false;
Game.UserProfileSavePath = "AppData\\Roaming\\shadPS4";
Game.UserProfileConfigPath = "";
Game.UserProfileSavePathNoCopy = true;
Game.UserProfileConfigPathNoCopy = true;
Game.Description = "Bloodborne Splitscreen Co-op based on Wozzardman fork of shadnet server.\n\nRequired files:\n- ShadPS4 fork from Wozzardman: https://github.com/Wozzardman/shadp2p/releases\n- Bloodborne game files\n\nInstructions:\n1. Create a separate folder containing *only* the shadps4 executable you downloaded earlier\n2. Done, just follow the handler setup now!\n\nA bunch of performances patches are enabled by default, you can disable them by editing *Bloodborne.xml* contained in this handler folder.\nThis exact same handler is available on Linux through PartyDeck, but you must setup the server separately.";
Game.PauseBetweenContextAndLaunch = 0;
Game.PauseBetweenProcessGrab = 0;
Game.PauseBetweenStarts = 0;

// OUTDATED OPTIONS, DISABLED TO AVOID CONFLICTS
Game.HookSetCursorPos = false;
Game.HookGetCursorPos = false;
Game.HookGetKeyState = false;
Game.HookGetAsyncKeyState = false;
Game.HookGetKeyboardState = false;
Game.HookFilterRawInput = false;
Game.HookFilterMouseMessages = false;
Game.HookUseLegacyInput = false;
Game.HookDontUpdateLegacyInMouseMsg = false;
Game.HookMouseVisibility = false;

Game.SendNormalMouseInput = false;
Game.SendNormalKeyboardInput = false;
Game.SendScrollWheel = false;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;

// REQUIRED FOR MICE/KEYS
Game.SupportsMultipleKeyboardsAndMice = true;
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.InjectStartup = true;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;
Game.ProtoInput.RegisterRawInputHook = true;
Game.ProtoInput.GetRawInputDataHook = false;
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = true;
Game.ProtoInput.SetCursorPosHook = true;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.RawInputFilter = true;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = false;
Game.ProtoInput.WindowActivateFilter = true;
Game.ProtoInput.WindowActvateAppFilter = false;
Game.ProtoInput.MouseWheelFilter = true;
Game.ProtoInput.MouseButtonFilter = true;
Game.ProtoInput.KeyboardButtonFilter = true;
Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;
Game.ProtoInput.EnableFocusMessageLoop = false;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 1000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = false;
Game.ProtoInput.BlockedMessages = [0x0008, 0x0006];
Game.ProtoInput.RenameHandlesHook = false;
Game.ProtoInput.RenameHandles = [];
Game.ProtoInput.RenameNamedPipes = [];
Game.LockInputAtStart = false;

Game.Play = function() {

  //Game region answer from the user
  var titleId = Context.Options["titleIdsAnswer"]

  //Load patches from Bloodborne.xml in handler folder
  var handlerBloodbornePatchesFilePath = System.IO.Path.Combine(Game.Folder, "Bloodborne.xml");
  Context.StartArguments = "--patch \"" + handlerBloodbornePatchesFilePath + "\" " + titleId + "\"";

  //Run Shadnet Server on Instance 0
  var handlerShadnetExecutableFilePath = System.IO.Path.Combine(Game.Folder, "shadnet\\shadnet.exe");
  if (Context.PlayerID == 0) {
    Context.StartProcess(handlerShadnetExecutableFilePath, "", false);
    System.Threading.Thread.Sleep(3000); //Wait a bit before registering the clients
  }

  //Register Hunter on the server for each instance
  var handlerShadnetSampleExecutableFilePath = System.IO.Path.Combine(Game.Folder, "shadnet\\shadnet-sample.exe");
  Context.StartProcess(handlerShadnetSampleExecutableFilePath, "127.0.0.1 31313 register Hunter" + Context.PlayerID + " 12345 hunter" + Context.PlayerID + "@placeholder.com NucleusCoopBloodborneHandler", false)

  //Getting user answers
  var ps4GamesFolderPath = Context.Options["ps4GamesFolderPath"]
  //Handler.Log(ps4GamesFolderPath)
  
  //Creating instance user folder
  var instanceUserFolderPath =  System.IO.Path.Combine(Context.EnvironmentPlayer, Context.UserProfileSavePath);
  System.IO.Directory.CreateDirectory(instanceUserFolderPath);
  
  //Copy config.json to each instance
  var handlerConfigFilePath = System.IO.Path.Combine(Game.Folder, "config.json");
  var instanceConfigFilePath = System.IO.Path.Combine(instanceUserFolderPath, "config.json");
  System.IO.File.Copy(handlerConfigFilePath, instanceConfigFilePath, true);

  //Copy users.json to each instance with the correct login credentials
  var handlerUsersFilePath = System.IO.Path.Combine(Game.Folder, "users.json");
  var instanceUsersFilePath = System.IO.Path.Combine(instanceUserFolderPath, "users.json");
  System.IO.File.Copy(handlerUsersFilePath, instanceUsersFilePath, true);
  var hunterUsernameLineNumber = Context.FindLineNumberInTextFile(instanceUsersFilePath, '        "shadnet_npid"', Nucleus.SearchType.Contains); 
  var hunterUsername = "Hunter" + Context.PlayerID;
  Handler.Log(Context.PlayerID)
  var dict = [ 
    hunterUsernameLineNumber + '|        "shadnet_npid": "' + hunterUsername + '",',
  ]; 
  Context.ReplaceLinesInTextFile(instanceUsersFilePath, dict);

  //Copy host_overrides.json for each instance
  var handlerHostOverridesFilePath = System.IO.Path.Combine(Game.Folder, "host_overrides.json");
  var instanceHostOverridesFilePath = System.IO.Path.Combine(instanceUserFolderPath, "host_overrides.json");
  System.IO.File.Copy(handlerHostOverridesFilePath, instanceHostOverridesFilePath, true);

  //Create custom_config folder and copy Bloodborne custom config for each instance
  var handlerCustomConfigFilePath = System.IO.Path.Combine(Game.Folder, titleId + ".json");
  var instanceCustomConfigFolderPath = System.IO.Path.Combine(instanceUserFolderPath, "custom_configs");
  System.IO.Directory.CreateDirectory(instanceCustomConfigFolderPath);
  var instanceCustomConfigFilePath = System.IO.Path.Combine(instanceCustomConfigFolderPath, titleId + ".json");
  System.IO.File.Copy(handlerCustomConfigFilePath, instanceCustomConfigFilePath, true);

  //Replacing config.json lines for install path
  var addonInstallDirLineNumber = Context.FindLineNumberInTextFile(instanceConfigFilePath, "addon_install_dir", Nucleus.SearchType.Contains); 
  var addonInstallDirFolderPath = System.IO.Path.Combine(instanceUserFolderPath, "addcont")
  var ps4GamesDirLineNumber = Context.FindLineNumberInTextFile(instanceConfigFilePath, '        "path": ""', Nucleus.SearchType.Contains); 

  var dict = [ 
    addonInstallDirLineNumber + '|    "addon_install_dir": "' + addonInstallDirFolderPath.replace(/\\/g, "\\\\") +'",',
    ps4GamesDirLineNumber + '|        "path": "' + ps4GamesFolderPath.replace(/\\/g, "\\\\") + '"',
  ]; 
  Context.ReplaceLinesInTextFile(instanceConfigFilePath, dict);
};
