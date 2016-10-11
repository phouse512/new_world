#ifndef PLAYER_H
#define PLAYER_H

class Player {
    private:
        int x;
        int y;
        int health;
        int stamina;
        int id;

    public:
        Player();
        Player(int, int);
        int get_x();
        int get_y();
};

#endif
