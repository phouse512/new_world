package com.phizzle.world.objects;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Optional;

/**
 * Created by PhilipHouse on 10/12/16.
 */
public class Tile {

    private static ObjectMapper mapper = new ObjectMapper();

    private Integer x;
    private Integer y;
    private Optional<Character> character;
    private Integer tile;

    public Tile(Integer x, Integer y) {
        this.x = x;
        this.y = y;
        this.character = Optional.empty();
        this.tile = 0;
    }

    public void setCharacter(Character character) {
        this.character = Optional.of(character);
    }

    public Integer getX() {
        return this.x;
    }

    public Integer getY() {
        return this.y;
    }

    public Integer getTiel() {
        return this.tile;
    }

    @JsonProperty("character")
    public Character getCharObject() {
        return character.orElse(null);
    }
}
