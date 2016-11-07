package com.phizzle.world.objects.tools;

import java.util.HashMap;
import java.util.List;

/**
 * Created by PhilipHouse on 11/7/16.
 */
public class ToolFlyweight {

    private HashMap<Integer, ToolDef> toolMap;

    public ToolFlyweight(List<ToolDef> toolDefList) {
        toolMap = new HashMap<>();
        for (ToolDef toolDef : toolDefList) {
            toolMap.put(toolDef.id, toolDef);
        }
    }

    public ToolDef getTool(Integer id) {
        return toolMap.get(id);
    }

}
