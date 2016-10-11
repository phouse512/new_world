// player class
#include <iostream>
#include "Player.h"

Player::Player()
{
}

Player::Player(int x, int y)
{
    this->x = x;
    this->y = y;
}

int Player::get_x()
{
    return this->x;
}

int Player::get_y()
{
    return this->y;
}
