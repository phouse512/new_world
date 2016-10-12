package com.phizzle.world.guice;

import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketConfig;
import com.corundumstudio.socketio.SocketIOServer;
import com.google.inject.AbstractModule;
import com.google.inject.Provides;

/**
 * Created by PhilipHouse on 10/11/16.
 */
public class SocketIOModule extends AbstractModule {


    @Override
    protected void configure() {
    }

    @Provides
    public SocketIOServer getSocketIOServer() {
        Configuration config = new Configuration();
        config.setHostname("localhost");
        config.setPort(9092);
        SocketConfig socketConfig = new SocketConfig();
        socketConfig.setReuseAddress(true);
        config.setSocketConfig(socketConfig);

        final SocketIOServer server = new SocketIOServer(config);

        server.start();
        return server;
    }
}
