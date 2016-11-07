package com.phizzle.world.objects;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.phizzle.world.objects.inventory.Inventory;

/**
 * Created by PhilipHouse on 10/12/16.
 */
public class Character {

    public String name;
    public Integer x;
    public Integer y;
    public CharacterDirection direction;
    public Integer sequence;
    public Inventory inventory;

    @JsonIgnore
    public Integer skin;

    public Character(String name) {
        this.name = name;
        this.direction = CharacterDirection.WEST;
        this.sequence = 0;
        this.inventory = new Inventory(30);
    }
}
