import time

FPS = 1
"""
def game_logic(dt):
    time.sleep(0.9)

start_time = time.time()
while True:
    print("tick")
    game_logic(1)
    time.sleep(1.0 - ((time.time() - start_time) % 1.0))
"""

import threading

players = {}

def add_player(player_name, starting_X, starting_Y):
    players[player_name] 

def hello():
    threading.Timer(0.015, hello).start()
    print("inside physics loop")

hello()
