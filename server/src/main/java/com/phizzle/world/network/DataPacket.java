package com.phizzle.world.network;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.phizzle.world.objects.*;
import com.phizzle.world.objects.Character;

import java.util.HashMap;
import java.util.UUID;

/**
 * Created by PhilipHouse on 10/15/16.
 */
public class DataPacket {


    // TODO: add a MIXIN to ignore serialization of inventory and other extraneous char
    // data, as talked about here: http://stackoverflow.com/questions/7421474/how-can-i-tell-jackson-to-ignore-a-property-for-which-i-dont-have-control-over
    private static ObjectMapper mapper = new ObjectMapper();

    private final World world;
    private final HashMap<UUID, Character> playerMap;

    public DataPacket(World world, HashMap<UUID, Character> playerMap) {
        this.world = world;
        this.playerMap = playerMap;
    }

    public String serialize() {
        String toReturn = "";

        try {
            toReturn = mapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            System.out.print(e);
            toReturn += "error";
        }

        return toReturn;
    }

    public World getWorld() {
        return this.world;
    }

    public HashMap<UUID, Character> getPlayerMap() {
        return this.playerMap;
    }
}
