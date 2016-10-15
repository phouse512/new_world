package com.phizzle.world;

import com.corundumstudio.socketio.SocketIOServer;
import com.google.common.util.concurrent.AbstractExecutionThreadService;
import com.google.inject.Inject;
import com.phizzle.world.network.DataPacket;
import com.phizzle.world.objects.*;
import com.phizzle.world.objects.Character;

import java.util.*;

/**
 * Created by PhilipHouse on 10/11/16.
 */
public class GameService extends AbstractExecutionThreadService {

    public static final String[] NAME_VALUES = new String[] { "bob", "john", "liz", "earnest" };
    public static final Set<String> NAME_SET = new HashSet<String>(Arrays.asList(NAME_VALUES));

    private final SocketIOServer socketServer;
    private HashMap<UUID, Character> players;
    private HashMap<String, UUID> locationHash;
    public World world;

    @Inject
    public GameService(SocketIOServer socketIOServer) {
        this.socketServer = socketIOServer;
        this.world = new World(20, 40);

        this.players = new HashMap<>();
        this.locationHash = new HashMap<>();

    }

    protected void run() {
        socketServer.addConnectListener( (client) -> {
            System.out.println("client has connected!");
            UUID test = client.getSessionId();
            String newPos = getRandomSpotFromWorld();
            Integer x = World.getXFromKey(newPos);
            Integer y = World.getYFromKey(newPos);
            Character newChar = new Character(getRandomName());
            newChar.x = x;
            newChar.y = y;
            this.players.put(test, newChar);
            this.locationHash.put(newPos, test);
        });

        final long timestep = 200;
        long startTime = System.currentTimeMillis();
        long lag = 0;

        while(true) {

            long delta_time = System.currentTimeMillis() - startTime;
            startTime = System.currentTimeMillis();
            lag += delta_time;

            while(lag >= timestep) {
                lag -= timestep;
                System.out.println("F YEAH");
                socketServer.getBroadcastOperations().sendEvent("chats",
                        new DataPacket(this.world, this.players).serialize());
            }
        }
    }

    private String getRandomSpotFromWorld() {
        boolean notDone = true;
        Random rn = new Random();
        String key = "";
        while (notDone) {
            Integer randX = rn.nextInt(this.world.map[0].length);
            Integer randY = rn.nextInt(this.world.map.length);

            key = World.getHashKey(randX, randY);
            UUID existence = this.locationHash.get(key);
            if (existence == null) {
                notDone = false;
            }
        }

        return key;
    }

    private static String getRandomName() {
        String choice = "";
        int size = NAME_SET.size();
        int item = new Random().nextInt(size);
        int i = 0;
        for (String name : NAME_SET) {
            if (i == item) {
                choice = name;
                break;
            }

            i = i+1;
        }
        return choice;
    }

    protected void startUp() {

    }

    protected void triggerShutdown() {
        socketServer.stop();
    }
}
