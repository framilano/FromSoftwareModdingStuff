using SoulsFormats;

int? FindCellIndex(string name, IReadOnlyList<PARAM.Cell> cells) {
    for (int i = 0; i < cells.Count; i++)
    {
        PARAM.Cell cell = cells[i];
        if (cell.Def.InternalName == name)
        {
            return i;
        }
    }
    return null;
}

void SetGemSFX()
{
    string paramInPath = @"assets\gameparam.parambnd.BACKUP.dcx"; // make backup copy to read from
    string paramOutPath = @"assets\gameparam.parambnd.dcx";
    BND4 bnd = BND4.Read(paramInPath);
    foreach (BinderFile file in bnd.Files)
    {   
        if (!file.Name.Contains("SpEffectParam.param"))
        {
            continue;
        }
        PARAM param = PARAM.Read(file.Bytes);
        PARAMDEF paramdef = PARAMDEF.XmlDeserialize(@"assets\SpEffect.xml");
        param.ApplyParamdef(paramdef);

        var fireAttackPowerRateIndex = FindCellIndex("fireAttackPowerRate", param.Rows[0].Cells);
        var stateInfoIndex = FindCellIndex("stateInfo", param.Rows[0].Cells);
        var useSpEffectIndex = FindCellIndex("useSpEffectEffect", param.Rows[0].Cells);

        Console.WriteLine($"fireAttackPowerRateIndex: {fireAttackPowerRateIndex}");
        Console.WriteLine($"stateInfoIndex: {stateInfoIndex}");
        Console.WriteLine($"useSpEffectIndex: {useSpEffectIndex}");

        if (new List<int?> { fireAttackPowerRateIndex, stateInfoIndex, useSpEffectIndex }.Any(v => v == null))
        {
            Console.WriteLine("Bad index");
            return;
        }

        foreach (var row in param.Rows)
        {
            if (row.ID < 10000)
            {
                continue;
            }
            
            //Editing Fire Bloodstone gems stateInfo to 62
            if (
                (float)row.Cells[fireAttackPowerRateIndex!.Value-2].Value == 1 // physicsAttackPowerRate
                && (float)row.Cells[fireAttackPowerRateIndex.Value - 1].Value == 1 // magicAttackPowerRate
                && (float)row.Cells[fireAttackPowerRateIndex.Value].Value > 1 // fireAttackPowerRate
                && (float)row.Cells[fireAttackPowerRateIndex.Value + 1].Value == 1 // thunderAttackPowerRate
            ) {
                row.Cells[stateInfoIndex!.Value].Value = 62; // stateInfo
                row.Cells[useSpEffectIndex!.Value].Value = 1; // useSpEffectEffect
            }
            
            //Editing Bolt Bloodstone gems stateInfo to 61
            if (
                (float)row.Cells[fireAttackPowerRateIndex.Value-2].Value == 1 // physicsAttackPowerRate
                && (float)row.Cells[fireAttackPowerRateIndex.Value - 1].Value == 1 // magicAttackPowerRate
                && (float)row.Cells[fireAttackPowerRateIndex.Value].Value == 1 // fireAttackPowerRate
                && (float)row.Cells[fireAttackPowerRateIndex.Value + 1].Value > 1 // thunderAttackPowerRate
            ) {
                row.Cells[stateInfoIndex!.Value].Value = 61; // stateInfo
                row.Cells[useSpEffectIndex!.Value].Value = 1; // useSpEffectEffect
            }
            
            //Editing Arcane Bloodstone gems stateInfo to 60
            if (
                (float)row.Cells[fireAttackPowerRateIndex.Value-2].Value == 1 // physicsAttackPowerRate
                && (float)row.Cells[fireAttackPowerRateIndex.Value - 1].Value > 1 // magicAttackPowerRate
                && (float)row.Cells[fireAttackPowerRateIndex.Value].Value == 1 // fireAttackPowerRate
                && (float)row.Cells[fireAttackPowerRateIndex.Value + 1].Value == 1 // thunderAttackPowerRate
            ) {
                row.Cells[stateInfoIndex!.Value].Value = 60; // stateInfo
                row.Cells[useSpEffectIndex!.Value].Value = 1; // useSpEffectEffect
            }
        }
        file.Bytes = param.Write();
    }
    bnd.Write(paramOutPath);
}

SetGemSFX();    