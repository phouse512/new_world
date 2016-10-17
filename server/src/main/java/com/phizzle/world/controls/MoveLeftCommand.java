package com.phizzle.world.controls;

import com.phizzle.world.objects.*;
import com.phizzle.world.objects.Character;

import java.util.HashMap;
import java.util.UUID;

/**
 * Created by PhilipHouse on 10/16/16.
 */
public class MoveLeftCommand implements Command {

    public void execute(World world, HashMap<UUID, Character> playerMap,
                        HashMap<String, UUID> locationMap,
                        UUID player) {
        // for now assume, you can always move right
        System.out.println("let's go");
        Character currChar = playerMap.get(player);
        Integer currX = currChar.x;
        Integer currY = currChar.y;

        // don't move the player, just change direction
        if (currChar.direction != CharacterDirection.WEST) {
            currChar.direction = CharacterDirection.WEST;
            return;
        }

        Integer potX = currX -1;
        Integer potY = currY;
        String oldKey = World.getHashKey(currX, currY);

        // validation step
        for (HashMap.Entry<UUID,Character> entry : playerMap.entrySet()) {
            // if there is someone where we want to go, don't let em
            if (entry.getValue().x.equals(potX) && entry.getValue().y.equals(potY)) {
                System.out.println("Someone exists here");
                return;
            }
        }

        // check if in map boundaries
        if (!(potX >= 0 && potX < world.map[0].length && potY >= 0 && potY < world.map.length)) {
            System.out.println("failed the boundary check");
            return;
        }

        currChar.x = potX;
        currChar.y = potY;
        String newKey = World.getHashKey(potX, potY);
        locationMap.remove(oldKey);
        locationMap.put(newKey, player);
    }
}
