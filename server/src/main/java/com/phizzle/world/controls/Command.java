package com.phizzle.world.controls;

import com.phizzle.world.objects.*;
import com.phizzle.world.objects.Character;

import java.util.HashMap;
import java.util.UUID;

/**
 * Created by PhilipHouse on 10/16/16.
 */
public interface Command {

    public void execute(World world, HashMap<UUID, Character> playerMap,
                        HashMap<String, UUID> locationMap, UUID player);
}
