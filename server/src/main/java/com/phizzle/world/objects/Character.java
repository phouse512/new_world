package com.phizzle.world.objects;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Created by PhilipHouse on 10/12/16.
 */
public class Character {

    public String name;
    public Integer x;
    public Integer y;
    public CharacterDirection direction;

    @JsonIgnore
    public Integer skin;

    public Character(String name) {
        this.name = name;
        this.direction = CharacterDirection.WEST;
    }
}
