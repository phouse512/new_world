package com.phizzle.world.objects.tools;

/**
 * Created by PhilipHouse on 11/7/16.
 */
public interface Tool {

    public ToolDef getToolDef();
    public Integer getUses();
    public void incrementUses();
}
