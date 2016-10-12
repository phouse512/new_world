package com.phizzle.world;

import com.corundumstudio.socketio.SocketIOServer;
import com.google.common.util.concurrent.AbstractExecutionThreadService;
import com.google.inject.Inject;
import com.phizzle.world.objects.Tile;
import com.phizzle.world.objects.World;

import java.util.ArrayList;

/**
 * Created by PhilipHouse on 10/11/16.
 */
public class GameService extends AbstractExecutionThreadService {

    private final SocketIOServer socketServer;
    public World world;

    @Inject
    public GameService(SocketIOServer socketIOServer) {
        this.socketServer = socketIOServer;
        this.world = new World(10, 10);

    }

    protected void run() {
        socketServer.addConnectListener( (client) -> {
            System.out.println("client has connected!");
        });

        final long timestep = 200;
        long startTime = System.currentTimeMillis();
        long lag = 0;
        this.world

        while(true) {

            long delta_time = System.currentTimeMillis() - startTime;
            startTime = System.currentTimeMillis();
            lag += delta_time;

            while(lag >= timestep) {
                lag -= timestep;
                System.out.println("F YEAH");
                socketServer.getBroadcastOperations().sendEvent("chats", world.serializeMap());
            }


        }
    }
    
    protected void startUp() {

    }

    protected void triggerShutdown() {
        socketServer.stop();
    }
}
