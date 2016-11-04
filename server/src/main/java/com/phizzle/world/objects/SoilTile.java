package com.phizzle.world.objects;

/**
 * Created by PhilipHouse on 11/4/16.
 */
public class SoilTile implements Tile{

    public Integer tileType;
    public double moisture;
    public double nutrients;
    public Integer x;
    public Integer y;
    public boolean tilled;


    public SoilTile(Integer x, Integer y) {
        this.x = x;
        this.y = y;
        this.moisture = 0.0;
        this.nutrients = 0.0;
        if (x < 3) {
            this.tilled = true;
        } else {
            this.tilled = false;
        }
    }

    public Integer getX() { return x; }
    public Integer getY() { return y; }
    public Integer getTile() { return tileType; }

}
