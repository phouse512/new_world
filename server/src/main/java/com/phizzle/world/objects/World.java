package com.phizzle.world.objects;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


/**
 * Created by PhilipHouse on 10/12/16.
 */
public class World {

    private static ObjectMapper mapper = new ObjectMapper();

    public Tile[][] map;

    public World(int height, int width) {
        map = new Tile[height][width];
        for (int y=0; y<map.length; y++) {
            for (int x=0; x<map[y].length; x++) {
                map[y][x] = new SoilTile(x, y);
            }
        }
    }

    public void setTile(int x, int y, Tile tile) {
        map[y][x] = tile;
    }

    public String serializeMap() {
        String toReturn = "";

        try {
            toReturn = mapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            toReturn += "error";
        }

        return toReturn;
    }

    public static Integer getYFromKey(String key) {
        String[] test = key.split(",");
        return Integer.valueOf(test[1]);
    }

    public static Integer getXFromKey(String key) {
        String[] test = key.split(",");
        return Integer.valueOf(test[0]);
    }

    public static String getHashKey(Integer x, Integer y) {
        return x.toString() + "," + y.toString();
    }
}
