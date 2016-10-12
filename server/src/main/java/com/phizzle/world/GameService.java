package com.phizzle.world;

import com.corundumstudio.socketio.SocketIOServer;
import com.google.common.util.concurrent.AbstractExecutionThreadService;
import com.google.inject.Inject;

/**
 * Created by PhilipHouse on 10/11/16.
 */
public class GameService extends AbstractExecutionThreadService {

    private final SocketIOServer socketServer;

    @Inject
    public GameService(SocketIOServer socketIOServer) {
        this.socketServer = socketIOServer;
    }

    protected void run() {
        socketServer.addConnectListener( (client) -> {
            System.out.println("client has connected!");
        });

        while(true) {
            System.out.println("F YEAH");
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                System.out.println("f");
            }

            socketServer.getBroadcastOperations().sendEvent("chats", "yeah");
        }
    }
    
    protected void startUp() {

    }

    protected void triggerShutdown() {
        socketServer.stop();
    }
}
