#include <chrono>
#include<iostream>
#include<string>
#include<sys/time.h>
#include<unistd.h>
#include "Player.h"

#define MAP_WIDTH 10
#define MAP_HEIGHT 10
#define PHYSICS_LOOP 33

using namespace std::chrono_literals;

int world [MAP_HEIGHT][MAP_WIDTH];
int x, y;

constexpr std::chrono::nanoseconds timestep(100ms);

int main()
{
    using clock = std::chrono::high_resolution_clock;

    std::chrono::nanoseconds lag(0ns);
    auto time_start = clock::now();
    
    std::cout.flush();
    std::cout << "mar";
    Player test(4, 2);
    
    for (y=0; y< MAP_HEIGHT; y++)
        for (x=0; x < MAP_WIDTH; x++)
        {
            world[y][x] = (y + 1)*(x+1);
        }


    std::cout << "marhar";
//    cout << "\n" << test.get_x();
    std::cout << "heck yeah";
    while (true)
    {
        auto delta_time = clock::now() - time_start;
        time_start = clock::now();
        lag += std::chrono::duration_cast<std::chrono::nanoseconds>(delta_time);
   //     std::cout << lag.count() << std::endl;
   //     std::cout << "timestep: " << timestep.count() << std::endl;
        while(lag >= timestep) {
            lag -= timestep;
            std::cout << "inside loop" << std::endl;
        }
    }
    
    return 0;
}
