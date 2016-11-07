package com.phizzle.world.objects.tools;

/**
 * Created by PhilipHouse on 11/7/16.
 */
public class ToolDef {

    public Integer id;
    public String name;
    public boolean till;
    public double moisture;

    public ToolDef(Integer id, String name, boolean till, double moisture) {
        this.id = id;
        this.name = name;
        this.till = till;
        this.moisture = moisture;
    }
}
