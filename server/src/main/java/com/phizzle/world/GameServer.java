package com.phizzle.world;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.phizzle.world.guice.GameServerModule;
import com.phizzle.world.guice.SocketIOModule;

/**
 * Hello world!
 *
 */
public class GameServer {
    public static void main( String[] args ) {

        final Injector injector = Guice.createInjector(
                new GameServerModule(),
                new SocketIOModule()
        );

        injector.getInstance(GameService.class).run();
    }
}
