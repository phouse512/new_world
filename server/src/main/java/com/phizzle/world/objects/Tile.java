package com.phizzle.world.objects;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Optional;

/**
 * Created by PhilipHouse on 10/12/16.
 */
public interface Tile {

    public Integer getX();

    public Integer getY();

    public Integer getTile();
}
