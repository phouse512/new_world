package com.phizzle.world.objects.inventory;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by PhilipHouse on 11/5/16.
 */
public class Inventory {

    public List<ItemStack> items;
    public Integer gold;

    public Inventory(Integer gold) {
        items = new ArrayList<ItemStack>();
        this.gold = gold;
    }
}
