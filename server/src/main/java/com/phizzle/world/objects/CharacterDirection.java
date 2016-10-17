package com.phizzle.world.objects;

/**
 * Created by PhilipHouse on 10/16/16.
 */
public enum CharacterDirection {
    NORTH (0),
    EAST (1),
    SOUTH (2),
    WEST (3);


    private final int direction;

    CharacterDirection(int direction) {
        this.direction = direction;
    }
}
