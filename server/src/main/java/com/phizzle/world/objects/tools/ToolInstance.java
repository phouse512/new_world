package com.phizzle.world.objects.tools;

import com.phizzle.world.objects.inventory.Storable;

/**
 * Created by PhilipHouse on 11/7/16.
 */
public class ToolInstance implements Storable, Tool {

    private ToolDef toolDef;
    private Integer uses;


    public ToolInstance(ToolDef toolDef) {
        this.toolDef = toolDef;
    }

    public ToolDef getToolDef() {
        return this.toolDef;
    }

    public Integer getUses() {
        return this.uses;
    }

    public void incrementUses() {
        this.uses += 1;
    }
}
